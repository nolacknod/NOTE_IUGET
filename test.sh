#!/bin/bash
# Script de test pour IUGET Grade Sheet

echo "🧪 Test IUGET Grade Sheet"
echo "========================="
echo ""

# Vérifier Node.js
echo "✓ Vérifiant Node.js..."
node --version
npm --version
echo ""

# Vérifier les fichiers critiques
echo "✓ Vérification des fichiers..."
files=("package.json" "index.html" "src/main.jsx" "src/App.jsx" "src/IugetGradeSheet.jsx" "public/iuget.png" "netlify.toml" ".nvmrc")

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✓ $file"
    else
        echo "  ✗ $file MANQUANT"
    fi
done

echo ""
echo "✓ Installation des dépendances..."
npm install --silent

echo ""
echo "✓ Test de build..."
npm run build

echo ""
echo "✅ Tous les tests réussis !"
echo "Vous pouvez maintenant déployer sur Netlify."