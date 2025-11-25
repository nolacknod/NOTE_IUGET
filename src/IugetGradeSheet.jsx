import React, { useState, useEffect } from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const LOGO_PATH = '/iuget.png'

export default function IugetGradeSheet() {
    const [metadata, setMetadata] = useState({
        filiere: '',
        specialite: '',
        cours: '',
        semestre: '',
        semaine: '',
        annee: '',
        enseignant: '',
    })

    const [studentCount, setStudentCount] = useState(0)
    const [students, setStudents] = useState([])
    const [logoDataUrl, setLogoDataUrl] = useState(null)

    // Load logo on mount
    useEffect(() => {
        const loadLogo = async () => {
            try {
                const res = await fetch(LOGO_PATH)
                const blob = await res.blob()
                const reader = new FileReader()
                reader.onload = () => setLogoDataUrl(reader.result)
                reader.readAsDataURL(blob)
            } catch (e) {
                console.log('Logo non trouvé, continuant...')
            }
        }
        loadLogo()
    }, [])

    // Keep students array in sync when studentCount changes
    useEffect(() => {
        const n = Math.max(0, parseInt(studentCount || 0, 10))
        setStudents(prev => {
            const next = [...prev]
            if (next.length > n) return next.slice(0, n)
            while (next.length < n) next.push({ nom: '', matricule: '', note: '' })
            return next
        })
    }, [studentCount])

    function handleMetadataChange(e) {
        const { name, value } = e.target
        setMetadata(prev => ({ ...prev, [name]: value }))
    }

    function handleStudentFieldChange(index, field, value) {
        setStudents(prev => {
            const copy = prev.map(r => ({ ...r }))
            copy[index] = { ...copy[index], [field]: value }
            return copy
        })
    }

    function addRow() {
        setStudents(prev => [...prev, { nom: '', matricule: '', note: '' }])
        setStudentCount(prev => parseInt(prev || 0, 10) + 1)
    }

    function removeRow(index) {
        setStudents(prev => prev.filter((_, i) => i !== index))
        setStudentCount(prev => Math.max(0, (parseInt(prev || 0, 10) - 1)))
    }

    function exportToPdf() {
        const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })
        const pageWidth = doc.internal.pageSize.getWidth()
        const pageHeight = doc.internal.pageSize.getHeight()
        const margin = 15
        let cursorY = margin

        // Couleurs IUGET
        const blueColor = [26, 58, 112] // #1A3A70
        const redColor = [211, 47, 47]  // #D32F2F
        const grayColor = [90, 90, 90]  // #5A5A5A

        // Header background
        doc.setFillColor(blueColor[0], blueColor[1], blueColor[2])
        doc.rect(0, 0, pageWidth, 55, 'F')

        // Logo
        if (logoDataUrl) {
            try {
                doc.addImage(logoDataUrl, 'PNG', margin, 5, 20, 20)
            } catch (e) { }
        }

        // Institution name (white)
        doc.setTextColor(255, 255, 255)
        doc.setFontSize(12)
        doc.setFont('helvetica', 'bold')
        doc.text('IUGET', pageWidth / 2, 15, { align: 'center' })
        doc.setFontSize(9)
        doc.setFont('helvetica', 'normal')
        doc.text('INSTITUT UNIVERSITAIRE DES GRANDES ECOLES DES TROPIQUES', pageWidth / 2, 22, { align: 'center' })

        // Decorative line
        doc.setDrawColor(redColor[0], redColor[1], redColor[2])
        doc.setLineWidth(1)
        doc.line(margin, 28, pageWidth - margin, 28)

        cursorY = 35

        // Metadata block
        doc.setTextColor(grayColor[0], grayColor[1], grayColor[2])
        doc.setFontSize(10)
        doc.setFont('helvetica', 'bold')

        const metaData = [
            { label: 'Filière:', value: metadata.filiere || '-' },
            { label: 'Spécialité:', value: metadata.specialite || '-' },
            { label: 'Cours:', value: metadata.cours || '-' },
            { label: 'Semestre:', value: metadata.semestre || '-' },
            { label: 'Semaine:', value: metadata.semaine || '-' },
            { label: 'Année académique:', value: metadata.annee || '-' },
            { label: 'Enseignant:', value: metadata.enseignant || '-' },
        ]

        const colWidth = (pageWidth - 2 * margin) / 2
        let colIndex = 0

        metaData.forEach((item, idx) => {
            const xPos = margin + (colIndex * colWidth)
            doc.setFont('helvetica', 'bold')
            doc.setFontSize(9)
            doc.text(item.label, xPos, cursorY, { maxWidth: 40 })
            doc.setFont('helvetica', 'normal')
            doc.text(item.value, xPos + 45, cursorY, { maxWidth: colWidth - 50 })

            colIndex++
            if (colIndex === 2) {
                colIndex = 0
                cursorY += 6
            }
        })

        cursorY += 8

        // Decorative line before table
        doc.setDrawColor(blueColor[0], blueColor[1], blueColor[2])
        doc.setLineWidth(0.5)
        doc.line(margin, cursorY, pageWidth - margin, cursorY)

        cursorY += 5

        // Table
        const head = [["Nom de l'étudiant", 'Matricule', 'Note']]
        const body = students.map(s => [s.nom || '', s.matricule || '', s.note || ''])

        doc.autoTable({
            head,
            body,
            startY: cursorY,
            margin: { left: margin, right: margin },
            styles: {
                font: 'helvetica',
                fontSize: 9,
                cellPadding: 4,
                halign: 'left',
                valign: 'middle',
                lineColor: [200, 200, 200],
                lineWidth: 0.3
            },
            headStyles: {
                fillColor: blueColor,
                textColor: 255,
                fontStyle: 'bold',
                halign: 'center'
            },
            rowStyles: {
                alternateRowColor: [245, 245, 245]
            },
            columnStyles: {
                0: { cellWidth: 85 },
                1: { cellWidth: 50 },
                2: { cellWidth: 35 }
            },
            didDrawPage: (data) => {
                // Footer
                const pageCount = doc.internal.pages.length - 1
                doc.setFontSize(8)
                doc.setTextColor(150)
                doc.text(`Page ${doc.internal.getNumberOfPages()}`, pageWidth / 2, pageHeight - 10, { align: 'center' })
            }
        })

        // Signature area
        const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 12 : cursorY + 30
        doc.setTextColor(grayColor[0], grayColor[1], grayColor[2])
        doc.setFontSize(10)
        doc.setFont('helvetica', 'normal')
        doc.text("Signature de l'enseignant :", margin, finalY)
        doc.setFont('helvetica', 'bold')
        doc.text(metadata.enseignant || '________________', margin + 65, finalY)

        // Save PDF
        const safeSpecialite = (metadata.specialite || 'specialite').replace(/\s+/g, '_')
        const safeCourse = (metadata.cours || 'cours').replace(/\s+/g, '_')
        const safeSemaine = (metadata.semaine || 'semaine').replace(/\s+/g, '_')
        const filename = `IUGET_${safeSpecialite}_${safeCourse}_${safeSemaine}.pdf`
        doc.save(filename)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 font-sans">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-20 border-b-4 border-iugetRed">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-14 h-14 bg-gradient-to-br from-iugetBlue to-iugetRed rounded-xl flex items-center justify-center overflow-hidden shadow-md">
                            {logoDataUrl ? (
                                <img src={logoDataUrl} alt="Logo IUGET" className="object-contain w-full h-full p-1" />
                            ) : (
                                <div className="text-white text-xs font-bold">IUGET</div>
                            )}
                        </div>
                        <div>
                            <div className="text-base font-bold text-iugetBlue">IUGET</div>
                            <div className="text-xs text-iugetGray">Feuille de notes académiques</div>
                        </div>
                    </div>
                    <div className="ml-auto text-right">
                        <div className="text-sm font-semibold text-iugetBlue">Export PDF A4</div>
                        <div className="text-xs text-iugetGray">Format académique professionnel</div>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-12">
                <div className="max-w-6xl mx-auto px-6">

                    {/* Form Card */}
                    <section className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-iugetRed">
                        <h2 className="text-2xl font-bold text-iugetBlue mb-6">Informations du cours</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-iugetGray">Filière</label>
                                <input name="filiere" value={metadata.filiere} onChange={handleMetadataChange}
                                    placeholder="Ex: Informatique"
                                    className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:outline-none focus:border-iugetRed transition" />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-iugetGray">Spécialité</label>
                                <input name="specialite" value={metadata.specialite} onChange={handleMetadataChange}
                                    placeholder="Ex: Génie Logiciel"
                                    className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:outline-none focus:border-iugetRed transition" />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-iugetGray">Cours</label>
                                <input name="cours" value={metadata.cours} onChange={handleMetadataChange}
                                    placeholder="Ex: Algorithmes"
                                    className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:outline-none focus:border-iugetRed transition" />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-iugetGray">Semestre</label>
                                <input name="semestre" value={metadata.semestre} onChange={handleMetadataChange}
                                    placeholder="Ex: S1, S2"
                                    className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:outline-none focus:border-iugetRed transition" />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-iugetGray">Semaine</label>
                                <input name="semaine" value={metadata.semaine} onChange={handleMetadataChange}
                                    placeholder="Ex: Semaine 1"
                                    className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:outline-none focus:border-iugetRed transition" />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-iugetGray">Année académique</label>
                                <input name="annee" value={metadata.annee} onChange={handleMetadataChange}
                                    placeholder="2025/2026"
                                    className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:outline-none focus:border-iugetRed transition" />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-iugetGray">Nombre d'étudiants</label>
                                <input type="number" min="0" value={studentCount} onChange={(e) => setStudentCount(e.target.value)}
                                    placeholder="0"
                                    className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:outline-none focus:border-iugetRed transition" />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-iugetGray">Nom de l'enseignant</label>
                                <input name="enseignant" value={metadata.enseignant} onChange={handleMetadataChange}
                                    placeholder="Votre nom complet"
                                    className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:outline-none focus:border-iugetRed transition" />
                            </div>
                        </div>
                    </section>

                    {/* Table Card */}
                    <section className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-iugetBlue">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-iugetBlue">Liste des étudiants</h2>
                            <div className="flex items-center gap-3">
                                <button onClick={addRow}
                                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-iugetBlue to-iugetRed text-white font-semibold shadow-md hover:shadow-lg transition">+ Ajouter</button>
                                <button onClick={exportToPdf}
                                    className="px-4 py-2 rounded-lg bg-white border-2 border-iugetRed text-iugetRed font-semibold hover:bg-red-50 transition">⬇️ PDF</button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gradient-to-r from-iugetBlue to-blue-900 text-white">
                                        <th className="text-left px-6 py-4 font-bold rounded-tl-lg">Nom de l'étudiant</th>
                                        <th className="text-left px-6 py-4 font-bold">Matricule</th>
                                        <th className="text-center px-6 py-4 font-bold">Note</th>
                                        <th className="text-center px-6 py-4 font-bold rounded-tr-lg">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-8 text-center text-iugetGray">Définissez le nombre d'étudiants pour commencer.</td>
                                        </tr>
                                    )}
                                    {students.map((s, idx) => (
                                        <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                            <td className="px-6 py-4 border-b border-gray-200">
                                                <input value={s.nom} onChange={(e) => handleStudentFieldChange(idx, 'nom', e.target.value)}
                                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:border-iugetBlue transition" />
                                            </td>
                                            <td className="px-6 py-4 border-b border-gray-200">
                                                <input value={s.matricule} onChange={(e) => handleStudentFieldChange(idx, 'matricule', e.target.value)}
                                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:border-iugetBlue transition" />
                                            </td>
                                            <td className="px-6 py-4 border-b border-gray-200 text-center">
                                                <input value={s.note} onChange={(e) => handleStudentFieldChange(idx, 'note', e.target.value)}
                                                    className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-center focus:outline-none focus:border-iugetRed transition" />
                                            </td>
                                            <td className="px-6 py-4 border-b border-gray-200 text-center">
                                                <button onClick={() => removeRow(idx)} className="px-3 py-2 rounded-lg bg-red-50 text-iugetRed border border-red-200 hover:bg-red-100 transition">✕</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 text-sm text-iugetGray">
                            {students.length} étudiant{students.length > 1 ? 's' : ''} — Vous pouvez ajouter, modifier ou supprimer des lignes librement.
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="text-center mt-12">
                        <div className="bg-white rounded-2xl p-6 shadow-md border-t-4 border-iugetRed">
                            <p className="text-sm text-iugetGray">
                                IUGET — Feuille de notes académiques
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                Document généré via système d'évaluation
                            </p>
                        </div>
                    </footer>
                </div>
            </main>
        </div>
    )
}
