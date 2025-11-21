# 😊 Mood Tracker - Application Complète

> Une application web moderne pour suivre votre humeur quotidienne avec style !

## 🎯 À Propos

**Mood Tracker** est une application full-stack complète permettant de :
- 📝 **Enregistrer** votre humeur chaque jour
- 📋 **Consulter** l'historique de vos entrées
- 📊 **Analyser** vos patterns d'humeur avec des graphiques

## ✨ Fonctionnalités

### 📝 Saisie Quotidienne
- 4 niveaux d'humeur avec emojis : 😄 🙂 😐 😔
- Champ de note optionnel pour détailler votre journée
- Synchronisation automatique avec la base de données

### 📋 Historique Complet
- Vue de toutes vos entrées passées
- Suppression facile d'entrées
- Dates formatées en français
- Affichage des notes

### 📊 Statistiques Visuelles
- Total d'entrées enregistrées
- Distribution des humeurs en pourcentage
- Graphiques en barres colorées
- Vue des 7 derniers jours

### 🎨 Design Moderne
- Interface intuitive et attrayante
- Dégradé violet/pourpre (#667eea → #764ba2)
- Design responsive (mobile, tablet, desktop)
- Animations fluides et transitions

## 🚀 Démarrage Rapide

### Option 1: Mode Développement
```bash
# Terminal 1 - Backend
cd backend && npm install && npm run dev

# Terminal 2 - Frontend
cd frontend && npm install && npm run dev

# Ouvrir http://localhost:5173
```

### Option 2: Docker Compose (Recommandé)
```bash
docker-compose up
# Frontend: http://localhost:3000
```

## 📚 Documentation

| Document | Description |
|----------|-------------|
| **[QUICK_START.md](./QUICK_START.md)** | Démarrage en 5 minutes ⚡ |
| **[SETUP.md](./SETUP.md)** | Configuration complète 🏗️ |
| **[FRONTEND_SUMMARY.md](./FRONTEND_SUMMARY.md)** | Résumé du frontend 📋 |
| **[frontend/FRONTEND_README.md](./frontend/FRONTEND_README.md)** | Guide du frontend 📖 |
| **[DESIGN_GUIDE.md](./DESIGN_GUIDE.md)** | Système de design 🎨 |
| **[API_EXAMPLES.md](./API_EXAMPLES.md)** | Exemples API 🔌 |
| **[UI_DEMO.md](./UI_DEMO.md)** | Démonstration UI 📱 |
| **[README_DOCUMENTATION.md](./README_DOCUMENTATION.md)** | Index documentation 📚 |

**→ [Voir l'index complet de la documentation](./README_DOCUMENTATION.md)**

## 🏗️ Architecture

```
Frontend (React 19 + TypeScript)
├── App.tsx (Navigation)
├── DailyMoodEntry.tsx (Saisie)
├── HistoryView.tsx (Historique)
└── Statistics.tsx (Statistiques)
         ↓
Backend (Node.js + Express)
├── GET/POST /api/moods
├── DELETE /api/moods/:date
└── GET /api/stats
         ↓
Database (MySQL)
└── entries, moods, users
```

## 🛠️ Stack Technologique

### Frontend
- **React** 19.2.0 - Framework UI
- **TypeScript** 5.9.3 - Typage statique
- **Vite** 7.2.2 - Build tool moderne
- **CSS3** - Styling responsive

### Backend
- **Node.js** - Runtime
- **Express.js** - Framework web
- **MySQL** 8.0 - Base de données
- **CORS** - Requêtes cross-origin

### DevOps
- **Docker** - Containerisation
- **Docker Compose** - Orchestration
- **Nginx** - Proxy reverse (production)

## 📁 Structure du Projet

```
IIMA3_Docker/
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js (API REST)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── styles/
│   │   └── App.tsx
│   ├── Dockerfile
│   └── package.json
├── init.sql (Initialisation BD)
├── docker-compose.yml (Orchestration)
└── documentation/ (Guides)
```

## 🔌 API Endpoints

```
GET    /api/moods              → Récupérer toutes les entrées
GET    /api/moods/:date        → Entrée d'une date spécifique
POST   /api/moods              → Créer/Mettre à jour une entrée
DELETE /api/moods/:date        → Supprimer une entrée
GET    /api/stats              → Statistiques
GET    /api/health             → Vérifier la connexion
```

## 🎨 Design System

### Couleurs Principales
- **Primaire** : #667eea (Violet)
- **Accent** : #764ba2 (Pourpre)
- **Texte** : #333333 (Noir)
- **Fond** : #ffffff (Blanc)

### Typage
- **Police** : Segoe UI, sans-serif
- **Titres** : 2.5rem, 700 weight
- **Corps** : 1rem, 400 weight

## 📱 Responsivité

- ✅ Mobile (< 480px) - 2 colonnes
- ✅ Tablet (480px - 768px) - Layout adapté
- ✅ Desktop (> 768px) - Layout complet

## ⚙️ Configuration

### Variables d'Environnement

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:5000
```

**Backend**
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=moodtracker
DB_PORT=3306
```

## 🧪 Test de l'Application

### Étapes
1. Lancer l'application (voir Démarrage Rapide)
2. Enregistrer une humeur (📝)
3. Vérifier dans l'historique (📋)
4. Consulter les statistiques (📊)
5. Tester sur mobile (F12)

### Test API
```bash
# Récupérer toutes les entrées
curl http://localhost:5000/api/moods

# Créer une entrée
curl -X POST http://localhost:5000/api/moods \
  -H "Content-Type: application/json" \
  -d '{"date":"2025-11-20","mood":"excellent","mood_emoji":"😄","note":"Superbe!"}'
```

## 🐛 Troubleshooting

### "Cannot connect to API"
1. Vérifier que le backend tourne : `curl http://localhost:5000/api/health`
2. Vérifier `VITE_API_URL` dans `.env`

### "Database connection error"
1. Vérifier MySQL : `docker-compose ps`
2. Vérifier les credentials

### "Port déjà utilisé"
1. Changer de port : `npm run dev -- --port 3001`
2. Ou tuer le processus

[Voir plus de solutions →](./QUICK_START.md#dépannage-rapide)

## 📈 Améliorations Futures

### Phase 2
- [ ] Authentification utilisateur
- [ ] Dark mode
- [ ] Filtres avancés
- [ ] Export données (CSV)

### Phase 3
- [ ] Progressive Web App (PWA)
- [ ] Offline mode
- [ ] WebSocket temps réel
- [ ] Photos/images
- [ ] Notifications

## 🤝 Contribution

Les contributions sont bienvenues ! Pour proposer des améliorations :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir [LICENSE](./LICENSE) pour détails.

## 👨‍💻 Auteur

- **Frontend** : React TypeScript modern interface
- **Backend** : Node.js Express REST API
- **Database** : MySQL relational database
- **DevOps** : Docker & Docker Compose

## 🙏 Remerciements

- React team pour cet excellent framework
- Vite team pour le build tool rapide
- Express.js community
- Docker pour la containerization

## 📞 Support

Pour obtenir de l'aide :
1. Consulter la [documentation complète](./README_DOCUMENTATION.md)
2. Vérifier le [guide de configuration](./SETUP.md)
3. Voir les [exemples API](./API_EXAMPLES.md)
4. Ouvrir une issue sur GitHub

## 🎯 Prochaines Étapes

1. ✅ Lancer l'application ([QUICK_START.md](./QUICK_START.md))
2. ✅ Tester les fonctionnalités
3. ✅ Consulter la documentation
4. ✅ Personnaliser (design, features)
5. ✅ Déployer en production

## 📊 Statistiques du Projet

- **Frontend** : 3 composants React
- **Styles** : 4 fichiers CSS responsifs
- **Documentation** : 8 fichiers guides
- **Code** : 403 lignes React, 627 lignes CSS
- **Configuration** : Docker Compose + Env

## 🌟 Points Forts

✨ Architecture **moderne et scalable**
✨ Design **élégant et responsive**
✨ Documentation **exhaustive et claire**
✨ Code **clean, typé et maintenable**
✨ Déploiement **facile avec Docker**
✨ API **RESTful et sécurisée**
✨ Performance **optimisée avec Vite**

---

## 🚀 Bon développement !

Commencez avec [QUICK_START.md](./QUICK_START.md) et profitez de votre Mood Tracker !

**Questions ?** → Consultez [README_DOCUMENTATION.md](./README_DOCUMENTATION.md)

😊 **Happy coding!**
