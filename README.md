# IUGET — Feuille de notes académiques

Projet Vite + React + Tailwind CSS pour la gestion des feuilles de notes de l'IUGET.

## 🎯 Fonctionnalités

- ✅ Saisie rapide des métadonnées (filière, spécialité, cours, semestre, semaine, année, enseignant)
- ✅ Génération d'un tableau dynamique d'étudiants
- ✅ Logo IUGET intégré automatiquement
- ✅ Export PDF A4 professionnel avec jsPDF
- ✅ Design moderne avec couleurs IUGET (bleu, rouge, gris)
- ✅ Interface responsive et intuitive

## 📋 Structure du projet

```
NOTE_IUGET/
├── src/
│   ├── main.jsx           # Point d'entrée React
│   ├── App.jsx            # Composant wrapper
│   ├── IugetGradeSheet.jsx # Composant principal
│   └── index.css          # Styles Tailwind + polices
├── public/
│   └── iuget.png          # Logo IUGET
├── index.html             # Page HTML
├── package.json           # Dépendances
├── vite.config.js         # Config Vite
├── tailwind.config.cjs    # Config Tailwind
├── postcss.config.cjs     # Config PostCSS
├── netlify.toml           # Config Netlify
└── .gitignore             # Fichiers ignorés
```

## 🚀 Installation et lancement local

```powershell
# Installer les dépendances
npm install

# Lancer le serveur de développement (http://localhost:5173)
npm run dev

# Construire pour production
npm run build

# Prévisualiser la build production
npm run preview
```

## 📤 Déploiement sur Netlify

### Option 1 : Déploiement direct via Git

1. Créez un compte sur [Netlify](https://netlify.com)
2. Connectez votre repository GitHub/GitLab
3. Netlify détectera automatiquement la configuration et déploiera

### Option 2 : Déploiement via CLI Netlify

```powershell
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter
netlify login

# Déployer
netlify deploy --prod
```

### Option 3 : Déploiement manuel (drag & drop)

```powershell
# Générer la build
npm run build

# Uploader le dossier 'dist' sur https://app.netlify.com/drop
```

## 📝 Utilisation

1. **Remplissez les informations du cours** : filière, spécialité, cours, semestre, semaine, année, enseignant
2. **Définissez le nombre d'étudiants** → le tableau se génère automatiquement
3. **Complétez le tableau** : nom, matricule, note pour chaque étudiant
4. **Cliquez sur "⬇️ PDF"** pour télécharger le document A4 formaté

### Nom du fichier PDF généré

Format : `IUGET_{Specialite}_{Cours}_{Semaine}.pdf`

Exemple : `IUGET_Génie_Logiciel_Algorithmes_Semaine1.pdf`

## 🎨 Couleurs IUGET

- **Bleu principal** : `#1A3A70`
- **Rouge** : `#D32F2F`
- **Gris** : `#5A5A5A`

## 📦 Dépendances principales

- **React** 18.2.0
- **Vite** 5.0.0
- **Tailwind CSS** 3.4.0
- **jsPDF** 2.5.1
- **jsPDF AutoTable** 3.5.25

## 🔧 Configuration

### Tailwind CSS

Le fichier `tailwind.config.cjs` contient les couleurs personnalisées IUGET.

### Vite

`vite.config.js` configure le serveur, le port (5173) et la build.

### Netlify

`netlify.toml` configure les directives de build et redirection pour SPA.

## 📄 Notes

- Le logo `iuget.png` doit être placé dans le dossier `public/`
- Le PDF utilise la police Helvetica native de jsPDF pour la compatibilité maximale
- L'interface est responsive (mobile, tablette, desktop)

## 📞 Support

Pour toute question ou amélioration, contactez votre administrateur IUGET.

---

**Dernière mise à jour** : 25 novembre 2025
