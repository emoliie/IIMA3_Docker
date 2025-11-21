# 😊 Mood Tracker - Frontend

Une application React moderne pour suivre votre humeur quotidienne avec une belle interface.

## Fonctionnalités

### 📝 Entrée Quotidienne
- Sélectionnez votre humeur du jour parmi 4 options : **Excellent**, **Bon**, **Neutre**, **Mauvais**
- Chaque humeur est représentée par un emoji coloré
- Ajoutez une note optionnelle pour décrire votre journée
- Vos données sont automatiquement synchronisées avec le backend

### 📋 Historique
- Consultez toutes vos entrées d'humeur précédentes
- Chaque entrée affiche la date, l'émotion et la note (si présente)
- Supprimez une entrée si vous le souhaitez
- Les entrées sont triées par date décroissante

### 📊 Statistiques
- **Total d'entrées** : Nombre de jours enregistrés
- **Distribution des humeurs** : Visualisez le pourcentage et la répartition de chaque humeur avec des graphiques de progression
- **7 derniers jours** : Regardez rapidement votre humeur sur la dernière semaine

## Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Compiler pour la production
npm run build
```

## Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
VITE_API_URL=http://localhost:5000
```

Pour la production (`.env.production`) :

```env
VITE_API_URL=/api
```

## Architecture

```
src/
├── App.tsx                          # Composant principal avec navigation
├── App.css                          # Styles globaux
├── index.css                        # Styles de base
├── main.tsx                         # Point d'entrée
├── components/
│   ├── DailyMoodEntry.tsx          # Saisie de l'humeur du jour
│   ├── HistoryView.tsx              # Historique des humeurs
│   └── Statistics.tsx               # Statistiques et graphiques
└── styles/
    ├── DailyMoodEntry.css           # Styles du composant d'entrée
    ├── HistoryView.css              # Styles de l'historique
    └── Statistics.css               # Styles des statistiques
```

## Composants

### DailyMoodEntry
- Affiche 4 boutons pour sélectionner l'humeur
- Permet d'ajouter une note (optionnelle)
- Charge l'entrée d'aujourd'hui au démarrage
- Affiche un message de confirmation après l'enregistrement

### HistoryView
- Récupère toutes les entrées du serveur
- Affiche chaque entrée avec mise en évidence
- Permet de supprimer une entrée
- Affiche un message si aucune entrée n'existe

### Statistics
- Récupère les statistiques du serveur
- Affiche le nombre total d'entrées
- Montre la distribution des humeurs avec graphiques
- Affiche les 7 derniers jours

## Communiquer avec le Backend

L'application communique avec l'API backend via les endpoints suivants :

- `GET /api/moods` - Récupérer toutes les entrées
- `GET /api/moods/:date` - Récupérer une entrée par date
- `POST /api/moods` - Créer ou mettre à jour une entrée
- `DELETE /api/moods/:date` - Supprimer une entrée
- `GET /api/stats` - Obtenir les statistiques

## Format des données

### Entrée (Entry)
```typescript
{
  date: "2025-11-20",
  mood: "excellent" | "good" | "neutral" | "bad",
  mood_emoji: "😄" | "🙂" | "😐" | "😔",
  note: string | null
}
```

### Statistiques (Stats)
```typescript
{
  totalEntries: number,
  moodDistribution: [
    {
      mood: string,
      mood_emoji: string,
      count: number
    }
  ],
  recentEntries: [
    {
      date: string,
      mood: string,
      mood_emoji: string
    }
  ]
}
```

## Styles et Design

- **Couleurs** : Gradient violet/pourpre (#667eea to #764ba2)
- **Responsive** : Mobile-first, adapté à tous les écrans
- **Animations** : Transitions fluides et hover effects
- **Accessibilité** : Bonnes pratiques d'accessibilité

## Dépendances

- **React** 19.2.0
- **TypeScript** 5.9.3
- **Vite** 7.2.2
- **ESLint** pour la qualité du code

## Développement

```bash
# Lancer le serveur de développement avec HMR
npm run dev

# Vérifier les erreurs TypeScript et linter
npm run lint

# Compiler et bâtir pour la production
npm run build

# Prévisualiser la version produit
npm run preview
```

## Notes

- L'application utilise `import.meta.env.VITE_API_URL` pour charger l'URL de l'API
- Les données sont persistées sur le serveur (base de données MySQL)
- L'interface se met à jour automatiquement après chaque action (création, suppression, modification)
- Les erreurs de connexion sont affichées à l'utilisateur
