# 😊 Mood Tracker

Une application web moderne pour suivre votre humeur au quotidien. Construite avec React, TypeScript, Node.js, Express et MySQL, entièrement dockerisée.

![Mood Tracker](https://img.shields.io/badge/version-3.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 📸 Captures d'écran

### Interface principale
- **Aujourd'hui** : Enregistrez votre humeur du jour avec une note optionnelle
- **Historique** : Consultez toutes vos entrées passées
- **Statistiques** : Visualisez la distribution de vos humeurs et les 7 derniers jours

## ✨ Fonctionnalités

- ✅ Enregistrement quotidien de l'humeur (4 moods : Excellent 😄, Bien 🙂, Neutre 😐, Mauvais 😔)
- ✅ Ajout de notes personnelles pour chaque entrée
- ✅ Historique complet de toutes les entrées
- ✅ Statistiques avec distribution des humeurs
- ✅ Visualisation des 7 derniers jours
- ✅ Interface moderne et responsive (Tailwind CSS)
- ✅ Encodage UTF-8 complet (emojis + accents)
- ✅ Base de données MySQL avec clés étrangères
- ✅ API REST complète
- ✅ Dockerisation complète (frontend + backend + MySQL)

## 🏗️ Architecture

### Stack technique

**Frontend :**
- React 19.2
- TypeScript
- Tailwind CSS
- Vite

**Backend :**
- Node.js 18
- Express
- MySQL2

**Base de données :**
- MySQL 8.0
- Encodage UTF-8 (utf8mb4)

### Structure de la base de données

```sql
-- Table des moods disponibles
CREATE TABLE moods (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    emoji VARCHAR(10) NOT NULL
);

-- Table des utilisateurs
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Table des entrées
CREATE TABLE entries (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL UNIQUE,
    mood_id INT NOT NULL,
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (mood_id) REFERENCES moods(id)
);
```

## 🚀 Démarrage rapide

### Prérequis

- Docker
- Docker Compose

### Installation

1. **Cloner le repository**
```bash
git clone <votre-repo>
cd mood-tracker
```

2. **Créer le fichier `.env`**
```bash
cp .env.example .env
```

Puis **éditez le fichier `.env`** et remplacez les valeurs par vos propres mots de passe sécurisés :
```env
# MySQL Database Configuration
MYSQL_ROOT_PASSWORD=your_secure_root_password
MYSQL_DATABASE=moodtracker
MYSQL_USER=mooduser
MYSQL_PASSWORD=your_secure_password

# Backend Database Connection
DB_HOST=mysql
DB_USER=mooduser
DB_PASSWORD=your_secure_password
DB_NAME=moodtracker
DB_PORT=3306

# Frontend API Configuration
VITE_API_URL=http://localhost:5002
```

⚠️ **Important** : Remplacez `your_secure_root_password` et `your_secure_password` par des mots de passe forts de votre choix.

3. **Lancer l'application**
```bash
docker-compose up -d
```

4. **Accéder à l'application**
- **Frontend** : http://localhost:3001
- **Backend API** : http://localhost:5002

### Données initiales

L'application est initialisée avec :
- 4 moods par défaut (Excellent, Bien, Neutre, Mauvais)
- Un utilisateur de test (credentials définis dans [init.sql](init.sql))

## 📡 API Endpoints

### Moods
- `GET /api/moods` - Liste tous les moods disponibles
- `GET /api/moods/:name` - Récupère un mood par nom

### Entries
- `GET /api/entries` - Liste toutes les entrées
- `GET /api/entries/:date` - Récupère une entrée par date (YYYY-MM-DD)
- `GET /api/entries/month/:year/:month` - Entrées d'un mois
- `POST /api/entries` - Créer/mettre à jour une entrée
- `DELETE /api/entries/:date` - Supprimer une entrée

### Statistiques
- `GET /api/stats` - Statistiques globales
- `GET /api/stats/:year/:month` - Statistiques d'un mois

### Health Check
- `GET /api/health` - Vérifier l'état du service

### Exemple de requête

**Créer une entrée :**
```bash
curl -X POST http://localhost:5002/api/entries \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2025-11-21",
    "mood_id": 1,
    "note": "Super journée !"
  }'
```

**Réponse :**
```json
{
  "message": "Entrée créée",
  "entry": {
    "id": 5,
    "date": "2025-11-21",
    "mood_id": 1,
    "mood": "Excellent",
    "mood_emoji": "😄",
    "note": "Super journée !",
    "created_at": "2025-11-21 12:00:00",
    "updated_at": "2025-11-21 12:00:00"
  }
}
```

## 🛠️ Développement

### Structure du projet

```
mood-tracker/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── entryController.js
│   │   │   └── moodTypeController.js
│   │   ├── routes/
│   │   │   ├── entryRoutes.js
│   │   │   └── moodTypeRoutes.js
│   │   └── app.js
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── DailyMoodEntry.tsx
│   │   │   ├── HistoryView.tsx
│   │   │   └── Statistics.tsx
│   │   ├── config/
│   │   │   └── api.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── package.json
│   └── Dockerfile
├── init.sql
├── docker-compose.yml
├── .env
└── README.md
```

### Commandes utiles

**Rebuild complet :**
```bash
docker-compose down -v
docker-compose up -d --build
```

**Voir les logs :**
```bash
docker-compose logs -f
docker logs mood_backend -f
docker logs mood_frontend -f
docker logs mood_mysql -f
```

**Accéder à MySQL :**
```bash
docker exec -it mood_mysql mysql -u mooduser -p moodtracker
```
Vous serez invité à saisir le mot de passe défini dans votre fichier `.env`.

**Tester l'API :**
```bash
./test-api-new.sh
```

## 🎨 Personnalisation

### Ajouter de nouveaux moods

1. Modifier `init.sql` :
```sql
INSERT INTO moods (name, emoji) VALUES
    ('Votre mood', '🎭');
```

2. Rebuild :
```bash
docker-compose down -v && docker-compose up -d
```

### Modifier les couleurs Tailwind

Éditer `frontend/tailwind.config.js` :
```js
theme: {
  extend: {
    colors: {
      primary: {
        500: '#your-color',
        // ...
      },
    },
  },
}
```

## 🔧 Dépannage

### Problème d'encodage UTF-8

Si les emojis ne s'affichent pas correctement :
```bash
docker-compose down -v
docker-compose up -d
```

### Le frontend ne se connecte pas au backend

Vérifier que `VITE_API_URL` dans `.env` pointe vers `http://localhost:5002`.

### Base de données vide après rebuild

C'est normal ! `init.sql` ne s'exécute que lors de la **première** création du volume. Utilisez `docker-compose down -v` pour supprimer les volumes.

## 📝 License

MIT

## 🤝 Contributions

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 👨‍💻 Auteur

Créé par Yohan Seneret, Mila Paounov et Emilie Xu.
