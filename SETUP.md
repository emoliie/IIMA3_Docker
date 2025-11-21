# 🚀 Guide de Configuration Complète - Mood Tracker

## Architecture du Projet

```
MoodTracker/
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js          # API Express.js
├── frontend/              # ← C'est ici !
│   ├── Dockerfile
│   ├── package.json
│   ├── src/
│   │   ├── components/    # DailyMoodEntry, HistoryView, Statistics
│   │   ├── styles/        # CSS pour chaque composant
│   │   └── App.tsx        # Composant principal
│   └── vite.config.ts
├── docker-compose.yml     # Configuration Docker
└── init.sql              # Initialisation BD
```

## 🎯 Pour Démarrer en Local

### 1. Backend (serveur API)

```bash
cd backend
npm install
# Configurer les variables d'environnement
export DB_HOST=localhost
export DB_USER=root
export DB_PASSWORD=votre_mot_de_passe
export DB_NAME=moodtracker
export DB_PORT=3306

node server.js
# Serveur lancé sur http://localhost:5000
```

### 2. Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
# Application disponible sur http://localhost:5000
```

## 🐳 Avec Docker Compose (Recommandé)

```bash
# À la racine du projet
docker-compose up

# Attendez que tout se lance :
# - MySQL sur localhost:3306
# - Backend sur localhost:5000
# - Frontend sur localhost:3000
```

## 📋 Interface Utilisateur

### Page 1 : Entrée Quotidienne (📝)
- Sélectionnez votre humeur du jour
- Ajoutez une note optionnelle
- Cliquez sur "Enregistrer mon humeur"

### Page 2 : Historique (📋)
- Visualisez tous vos jours enregistrés
- Supprimez une entrée si besoin
- Voir les notes associées

### Page 3 : Statistiques (📊)
- Total d'entrées enregistrées
- Distribution des humeurs en pourcentage
- Graphique des 7 derniers jours

## ✨ Fonctionnalités Implémentées

✅ Formulaire de saisie d'humeur quotidienne
✅ Sélection visuelle avec emojis (😄 🙂 😐 😔)
✅ Historique complet avec suppression
✅ Statistiques avec graphiques
✅ API REST complète (CRUD)
✅ Base de données MySQL
✅ Responsive design (mobile-friendly)
✅ Messages d'erreur et de succès
✅ Gestion des états de chargement
✅ Variables d'environnement pour dev/prod

## 🎨 Design & Couleurs

- **Dégradé violet** : #667eea → #764ba2
- **Interface moderne** : Cards, transitions fluides
- **Responsive** : Adapté mobile, tablette, desktop
- **Accessible** : Bonnes pratiques WCAG

## 🔧 Configuration des Variables d'Environnement

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:5000
```

### Frontend Production (`.env.production`)
```env
VITE_API_URL=/api
```

### Backend (variables système ou `.env`)
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root_password
DB_NAME=moodtracker
DB_PORT=3306
```

## 📡 Endpoints API

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/moods` | Récupérer toutes les entrées |
| GET | `/api/moods/:date` | Récupérer une entrée par date |
| POST | `/api/moods` | Créer/Mettre à jour une entrée |
| DELETE | `/api/moods/:date` | Supprimer une entrée |
| GET | `/api/stats` | Obtenir les statistiques |
| GET | `/api/health` | Vérifier la connexion BD |

## 🧪 Tester l'Application

```bash
# 1. Lancer le backend
cd backend && npm run dev

# 2. Lancer le frontend (dans un autre terminal)
cd frontend && npm run dev

# 3. Ouvrir http://localhost:5173 (Vite) ou http://localhost:3000

# 4. Enregistrer une humeur
# 5. Vérifier l'historique
# 6. Consulter les statistiques
```

## 🐛 Dépannage

### "Cannot connect to API"
- Vérifier que le backend tourne sur http://localhost:5000
- Vérifier la variable `VITE_API_URL` dans `.env`

### "Database connection error"
- Vérifier que MySQL est lancé
- Vérifier les identifiants BD (host, user, password)
- Vérifier que la BD `moodtracker` existe

### Port déjà utilisé
```bash
# Frontend
npx vite --port 3001

# Backend
PORT=5001 node server.js
```

## 📚 Technologies Utilisées

**Frontend:**
- React 19.2
- TypeScript 5.9
- Vite 7.2
- CSS3 (Responsive Design)

**Backend:**
- Node.js + Express
- MySQL
- CORS pour les requêtes cross-origin

## 🎓 Structure des Composants

```typescript
App.tsx (Principal)
├── DailyMoodEntry (Saisie du jour)
├── HistoryView (Liste des entrées)
└── Statistics (Graphiques & stats)
```

Chaque composant :
- Gère ses propres états (useState)
- Communique via l'API
- A son propre fichier CSS
- Est réutilisable et maintenable

## 🔐 Sécurité

- ✅ CORS configuré côté backend
- ✅ Validation des données
- ✅ Protection contre les injections SQL (parameterized queries)
- ✅ Gestion des erreurs appropriée

## 📱 Responsive Breakpoints

- **Desktop** : ≥ 1024px
- **Tablette** : 768px - 1023px
- **Mobile** : < 768px

L'interface s'adapte automatiquement à tous les écrans !
