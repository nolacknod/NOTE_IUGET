# 📖 Commandes rapides IUGET Grade Sheet

## 🚀 Développement

```bash
# Installer les dépendances
npm install

# Lancer le serveur de dev (http://localhost:5173)
npm run dev

# Arrêter le serveur : Ctrl+C
```

## 🏗️ Production

```bash
# Générer la build optimisée
npm run build

# Prévisualiser la build localement (http://localhost:4173)
npm run preview
```

## 📤 Déploiement

### Netlify (recommandé)

```bash
# Installation de Netlify CLI
npm install -g netlify-cli

# Se connecter
netlify login

# Déployer en production
netlify deploy --prod

# Ou simplement : push sur GitHub et laisser Netlify faire
git push origin main
```

### Vercel (alternative)

```bash
# Installation de Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel --prod
```

## 🧪 Tests

```bash
# Vérifier la build
npm run build

# Tester la build en local
npm run preview

# Vérifier les fichiers critiques
ls -la public/
ls -la src/
```

## 🗑️ Nettoyage

```bash
# Supprimer node_modules (pour refaire un install propre)
rm -rf node_modules

# Supprimer la build
rm -rf dist/

# Supprimer cache Vite
rm -rf .vite/
```

## 📊 Debugging

```bash
# Voir la version de Node
node --version

# Voir la version de npm
npm --version

# Voir les logs de la build
npm run build 2>&1 | tee build.log

# Voir les dépendances
npm list

# Chercher les vulnérabilités
npm audit
npm audit fix
```

## 🌍 Accès à votre site

**Local** : http://localhost:5173/  
**Preview build** : http://localhost:4173/  
**Production Netlify** : https://votre-site.netlify.app/  
**Production Vercel** : https://iuget-gradesheet.vercel.app/  

## 💡 Tips

- Appuyer sur `h` + `Enter` dans le terminal de dev pour voir les commandes Vite
- Appuyer sur `r` pour recharger
- Appuyer sur `q` pour quitter
- Les fichiers `public/` sont servis directement (ex: `/iuget.png`)
- HMR (Hot Module Replacement) activé par défaut en dev