# 📁 Structure du projet IUGET Grade Sheet

```
NOTE_IUGET/
│
├── 📂 src/
│   ├── main.jsx                 # Point d'entrée React
│   ├── App.jsx                  # Composant wrapper principal
│   ├── IugetGradeSheet.jsx      # Composant principal (UI + PDF export)
│   └── index.css                # Styles Tailwind + import de polices
│
├── 📂 public/
│   └── iuget.png                # Logo IUGET (PNG recommandé)
│
├── 📂 .netlify/
│   └── functions/
│       └── example.js           # Exemple de fonction serverless (optionnel)
│
├── 📂 .github/
│   └── workflows/
│       └── build.yml            # Actions GitHub CI/CD
│
├── 📄 index.html                # Point d'entrée HTML
├── 📄 package.json              # Dépendances npm
├── 📄 package-lock.json         # Verrouillage des versions
│
├── 📄 vite.config.js            # Configuration Vite
├── 📄 tailwind.config.cjs       # Configuration Tailwind CSS
├── 📄 postcss.config.cjs        # Configuration PostCSS
│
├── 📄 netlify.toml              # Configuration Netlify (build + redirects)
├── 📄 vercel.json               # Configuration Vercel (alternative)
│
├── 📄 .nvmrc                    # Version Node.js (18.17.0)
├── 📄 .gitignore                # Fichiers ignorés par Git
├── 📄 .env.example              # Variables d'environnement (exemple)
│
├── 📚 README.md                 # Documentation principale
├── 📚 NETLIFY_DEPLOY.md         # Guide de déploiement Netlify
├── 📚 QUICK_START.md            # Commandes rapides
├── 📚 CHECKLIST_DEPLOYMENT.md   # Checklist pré-déploiement
├── 📚 PROJECT_STRUCTURE.md      # Ce fichier
│
└── 📄 test.sh                   # Script de test (bash)
```

## 📊 Explication des fichiers

### Source Code (src/)

| Fichier | Rôle |
|---------|------|
| `main.jsx` | Point d'entrée React - crée la racine et monte App |
| `App.jsx` | Composant wrapper - importe et affiche IugetGradeSheet |
| `IugetGradeSheet.jsx` | Composant principal (372 lignes) - UI + logique PDF |
| `index.css` | Styles Tailwind + import Inter + variables CSS |

### Configuration (racine)

| Fichier | Rôle |
|---------|------|
| `package.json` | Dépendances React, Vite, Tailwind, jsPDF |
| `vite.config.js` | Config serveur dev (port 5173), build, plugins |
| `tailwind.config.cjs` | Couleurs IUGET personnalisées |
| `postcss.config.cjs` | Processeurs postcss (Tailwind, autoprefixer) |

### Déploiement

| Fichier | Rôle |
|---------|------|
| `netlify.toml` | **Nécessaire pour Netlify** - build + redirects SPA |
| `vercel.json` | Alternative pour Vercel |
| `.nvmrc` | Force Node 18.17.0 (lecture par Netlify) |
| `.github/workflows/build.yml` | CI/CD GitHub Actions (test build) |

### Documentation

| Fichier | Rôle |
|---------|------|
| `README.md` | Documentation générale + utilisation |
| `NETLIFY_DEPLOY.md` | Guide complet déploiement Netlify |
| `QUICK_START.md` | Commandes npm et accès rapide |
| `CHECKLIST_DEPLOYMENT.md` | Checklist avant déploiement |

### Autres

| Fichier | Rôle |
|---------|------|
| `.gitignore` | Fichiers à exclure de Git (node_modules, dist, etc) |
| `.env.example` | Template variables environnement |
| `test.sh` | Script bash de vérification |

## 🔄 Flux de fichiers

```
index.html
    ↓
src/main.jsx (React root)
    ↓
src/App.jsx
    ↓
src/IugetGradeSheet.jsx
    ├─ Utilise: index.css (Tailwind)
    ├─ Charger: public/iuget.png
    └─ Export: jsPDF → PDF A4
```

## 📦 Build Vite

```
src/ + public/
    ↓ (npm run build)
Vite build
    ↓
dist/
├── index.html (minifiée)
├── assets/
│   ├── main.xxxxx.js
│   └── index.xxxxx.css
└── iuget.png (copié)
    ↓ (déployer sur Netlify)
Production
```

## 🚀 Déploiement

```
Push GitHub
    ↓
Netlify webhook
    ↓
git clone + npm install
    ↓
npm run build
    ↓
Publier dist/
    ↓
https://votre-site.netlify.app
```

## ✨ Technos

- **React** 18.2.0 - UI
- **Vite** 5.0.0 - Build tool
- **Tailwind CSS** 3.4.0 - Styling
- **jsPDF** 2.5.1 - PDF export
- **Node** 18.17.0 - Runtime

## 📝 Notes

- Tous les fichiers `.cjs` (Common JS) sont pour la compatibilité Node/Vite
- `.netlify/functions/` peut accueillir des serverless functions futures
- GitHub Actions vérifie que la build réussit à chaque push
- Netlify relit `.nvmrc` pour installer la bonne version de Node