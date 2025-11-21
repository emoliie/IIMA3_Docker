# 🚀 Quick Start Guide - Mood Tracker

## ⚡ Démarrage en 5 minutes

### Option 1️⃣ : Mode Développement (Rapide)

```bash
# Terminal 1 - Backend API
cd backend
npm install
npm run dev
# ✅ Écoute sur http://localhost:5000

# Terminal 2 - Frontend React
cd frontend
npm install
npm run dev
# ✅ Écoute sur http://localhost:5173

# Ouvrir le navigateur : http://localhost:5173
```

### Option 2️⃣ : Docker Compose (Complet)

```bash
# À la racine du projet
docker-compose up

# ✅ Frontend  : http://localhost:3000
# ✅ Backend   : http://localhost:5000
# ✅ MySQL     : localhost:3306
```

---

## 📋 Checklist Rapide

- [ ] Node.js installé (`node -v`)
- [ ] NPM installé (`npm -v`)
- [ ] Docker installé (pour option 2) (`docker --version`)
- [ ] Cloner/télécharger le projet
- [ ] Lancer backend et frontend
- [ ] Ouvrir http://localhost:3000 ou http://localhost:5173

---

## 📝 Tester l'Application

### 1. Saisir une Humeur
```
1. Cliquez sur [📝 Aujourd'hui]
2. Sélectionnez une émotion (😄 🙂 😐 😔)
3. Ajoutez une note (optionnel)
4. Cliquez [Enregistrer mon humeur]
✅ Message: "Votre humeur a été enregistrée !"
```

### 2. Consulter l'Historique
```
1. Cliquez sur [📋 Historique]
2. Voyez toutes vos entrées
3. Supprimez si vous voulez (🗑️)
```

### 3. Voir les Statistiques
```
1. Cliquez sur [📊 Statistiques]
2. Visualisez votre distribution d'humeurs
3. Consultez les 7 derniers jours
```

---

## 🔧 Configuration Rapide

### Backend
L'API écoute sur `http://localhost:5000`

Endpoints disponibles :
- `GET /api/moods` - Toutes les entrées
- `POST /api/moods` - Créer/Mettre à jour
- `DELETE /api/moods/:date` - Supprimer
- `GET /api/stats` - Statistiques

### Frontend
Utilise Vite pour le développement (`npm run dev`)

Variables d'environnement dans `.env` :
```
VITE_API_URL=http://localhost:5000
```

---

## ❌ Dépannage Rapide

### "API unreachable"
```bash
# Vérifier que le backend tourne
curl http://localhost:5000/api/health

# Si erreur, lancer le backend
cd backend && npm run dev
```

### "Cannot find modules"
```bash
# Installer les dépendances
cd frontend && npm install
```

### "Port déjà utilisé"
```bash
# Utiliser un autre port
npm run dev -- --port 3001
```

### "Database connection error"
```bash
# Vérifier MySQL (avec Docker)
docker-compose ps

# Si pas lancé
docker-compose up -d mysql
```

---

## 📱 Testée sur

✅ Chrome / Firefox / Safari
✅ Desktop (1920px, 1366px, 1024px)
✅ Tablet (768px)
✅ Mobile (480px, 375px, 320px)

---

## 📚 Documentation Complète

Pour plus de détails, voir :
- `FRONTEND_README.md` - Guide du frontend
- `SETUP.md` - Configuration complète
- `DESIGN_GUIDE.md` - Système de design
- `API_EXAMPLES.md` - Exemples API
- `UI_DEMO.md` - Démonstration visuelle

---

## 🎯 Prochaines Étapes

### Basique
1. ✅ Lancer l'application
2. ✅ Tester les 3 pages
3. ✅ Créer quelques entrées
4. ✅ Consulter historique et stats

### Intermédiaire
1. Tester sur mobile
2. Tester suppression d'entrées
3. Tester message d'erreur (déconnecter API)
4. Personnaliser les couleurs/fonts

### Avancé
1. Ajouter une nouvelle fonctionnalité
2. Implémenter authentification
3. Ajouter dark mode
4. Déployer en production

---

## 🌟 Fonctionnalités Clés

✨ **Saisie intuitive** - 4 emojis pour choisir
📊 **Statistiques visuelles** - Graphiques colorés
📋 **Historique complet** - Toutes vos entrées
📱 **Responsive** - Fonctionne partout
🎨 **Design moderne** - Interface attrayante
🔐 **Sécurisé** - Validation des données
⚡ **Rapide** - Construit avec Vite

---

## 💡 Conseil

Si vous êtes nouveau à React/TypeScript :
1. Commencez par lire `App.tsx`
2. Explorez `DailyMoodEntry.tsx`
3. Consultez les CSS pour le styling
4. Testez les modifications en local

---

## 🎉 Vous êtes Prêt !

Lancez l'application et profitez de votre Mood Tracker ! 😊

```bash
npm run dev
# Puis ouvrir http://localhost:5173
```

Bon développement ! 🚀
