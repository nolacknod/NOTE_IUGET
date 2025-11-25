# ✅ Checklist avant déploiement Netlify

## 📦 Vérifications locales

- [ ] `npm install` fonctionne sans erreur
- [ ] `npm run dev` lance le serveur sur http://localhost:5173
- [ ] La page s'affiche correctement
- [ ] Le logo IUGET apparaît dans le header
- [ ] Les champs de formulaire fonctionnent
- [ ] Le tableau se génère quand on saisit le nombre d'étudiants
- [ ] Générer un PDF fonctionne
- [ ] Le nom du PDF est correct : `IUGET_{Specialite}_{Cours}_{Semaine}.pdf`
- [ ] `npm run build` crée le dossier `dist/` sans erreur

## 🌐 Avant le déploiement Netlify

- [ ] Repository Git créé et pushé sur GitHub/GitLab/Bitbucket
- [ ] `netlify.toml` présent à la racine
- [ ] `.nvmrc` présent (spécifie Node.js 18.17.0)
- [ ] `.gitignore` configuré correctement
- [ ] `README.md` mis à jour avec instructions
- [ ] `package.json` avec toutes les dépendances
- [ ] `public/iuget.png` présent

## 🚀 Sur Netlify

- [ ] Compte Netlify créé (gratuit)
- [ ] Compte GitHub/GitLab connecté à Netlify
- [ ] Nouveau site créé depuis Git
- [ ] Build command : `npm run build`
- [ ] Publish directory : `dist`
- [ ] Node version : `18.17.0` (lu depuis `.nvmrc`)
- [ ] Site déployé avec succès
- [ ] URL disponible (ex: https://votre-site.netlify.app)
- [ ] Page s'affiche correctement en production
- [ ] PDF export fonctionne
- [ ] Responsive fonctionne sur mobile

## 🔧 Configuration optionnelle

- [ ] Domaine personnalisé configuré (optionnel)
- [ ] HTTPS activé (automatique avec Netlify)
- [ ] Environment variables ajoutées (si nécessaire)

## 📝 Documentation

- [ ] `README.md` à jour
- [ ] `NETLIFY_DEPLOY.md` lu et compris
- [ ] Tests locaux passés

---

**Status** : [ ] Prêt à déployer  
**Date de vérification** : _____________  
**Personne responsable** : _____________