# 🚀 Guide de déploiement sur Netlify

## ✅ Prérequis

- Compte GitHub, GitLab ou Bitbucket
- Compte Netlify (gratuit sur https://netlify.com)
- Repository Git avec ce projet

## 📋 Étapes de déploiement

### 1️⃣ Préparer le repository GitHub

```powershell
# À la racine du projet
git init
git add .
git commit -m "Initial commit: IUGET Grade Sheet"
git remote add origin https://github.com/VOTRE_USERNAME/NOTE_IUGET.git
git branch -M main
git push -u origin main
```

### 2️⃣ Connecter Netlify à GitHub

1. Allez sur [https://netlify.com](https://netlify.com)
2. Cliquez sur **"Sign up"** ou **"Log in"**
3. Connectez-vous avec GitHub
4. Cliquez sur **"New site from Git"**
5. Sélectionnez **"GitHub"**
6. Autorisez Netlify à accéder à vos repositories
7. Sélectionnez le repository `NOTE_IUGET`

### 3️⃣ Configurer le build

Netlify détectera automatiquement `netlify.toml`. Vérifiez :

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: `18.17.0` (défini dans `.nvmrc`)

Cliquez sur **"Deploy site"**

### 4️⃣ Attendre le déploiement

Netlify va :
1. Cloner le repository
2. Installer les dépendances (`npm install`)
3. Générer la build (`npm run build`)
4. Publier le dossier `dist`

### 5️⃣ Accéder à votre site

Une fois déployé, vous recevrez une URL comme :
```
https://votre-site-random.netlify.app/
```

## 🔧 Configuration du domaine personnalisé

1. Dans les paramètres du site Netlify
2. Allez dans **"Domain settings"**
3. Cliquez sur **"Add custom domain"**
4. Entrez votre domaine (ex: `gradesheet.iuget.edu`)
5. Suivez les instructions pour configurer les DNS

## ♻️ Mise à jour automatique

Après le premier déploiement, chaque push sur `main` redéploiera automatiquement :

```powershell
git add .
git commit -m "Mise à jour description"
git push origin main
```

Netlify redéploiera en ~1-2 minutes.

## 🆘 Dépannage

### Le build échoue ?

Vérifiez les logs Netlify :
1. Allez dans **"Deploys"** sur le dashboard
2. Cliquez sur le déploiement échoué
3. Lisez les logs dans **"Deploy log"**

Causes courantes :
- Version Node incompatible → mettre à jour `.nvmrc`
- Dépendances manquantes → vérifier `package.json`
- Erreurs React → vérifier la console

### Le site charge mais affiche une erreur blanche ?

```
1. Vérifiez que public/iuget.png existe
2. Vérifiez les logs du navigateur (F12)
3. Vérifiez que netlify.toml est bien configuré
```

### Tout fonctionne localement mais pas sur Netlify ?

```powershell
# Testez la build en local
npm run build
npm run preview

# Doit fonctionner sur http://localhost:4173
```

## 📝 Variables d'environnement (optionnel)

Si vous avez besoin de variables secrètes :

1. Dans le dashboard Netlify, allez dans **"Site settings"**
2. Allez dans **"Build & deploy"** → **"Environment"**
3. Cliquez **"Edit variables"**
4. Ajoutez vos variables (ex: API keys, tokens)

## 💾 Sauvegardes et backups

Votre site est hébergé chez Netlify. Pour garder une copie locale :

```powershell
# Cloner depuis GitHub
git clone https://github.com/VOTRE_USERNAME/NOTE_IUGET.git

# Télécharger la build depuis Netlify
# Dashboard Netlify → "Deploys" → Cliquez sur un déploiement → "Download"
```

## 🎯 Prochaines étapes possibles

- Ajouter un formulaire de contact (Netlify Forms)
- Configurer les redirections personnalisées
- Ajouter des webhooks pour intégrations tierces
- Mettre en place des Analytics

---

**Besoin d'aide ?** Consultez la [documentation Netlify](https://docs.netlify.com/)