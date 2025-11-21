# 📝 Exemples d'API pour Mood Tracker

Ce fichier contient des exemples pour tester l'API du Mood Tracker.

## 1. Récupérer toutes les entrées

```bash
curl -X GET http://localhost:5000/api/moods
```

**Réponse :**
```json
{
  "total": 4,
  "entries": [
    {
      "date": "2025-11-20",
      "mood": "excellent",
      "mood_emoji": "😄",
      "note": "Excellent journée !"
    },
    {
      "date": "2025-11-19",
      "mood": "good",
      "mood_emoji": "🙂",
      "note": null
    }
  ]
}
```

## 2. Récupérer une entrée spécifique

```bash
curl -X GET http://localhost:5000/api/moods/2025-11-20
```

**Réponse :**
```json
{
  "date": "2025-11-20",
  "mood": "excellent",
  "mood_emoji": "😄",
  "note": "Excellent journée !"
}
```

## 3. Créer une nouvelle entrée

```bash
curl -X POST http://localhost:5000/api/moods \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2025-11-20",
    "mood": "excellent",
    "mood_emoji": "😄",
    "note": "Journée incroyable !"
  }'
```

**Réponse :**
```json
{
  "message": "Entrée créée",
  "entry": {
    "date": "2025-11-20",
    "mood": "excellent",
    "mood_emoji": "😄",
    "note": "Journée incroyable !"
  }
}
```

## 4. Mettre à jour une entrée existante

```bash
curl -X POST http://localhost:5000/api/moods \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2025-11-20",
    "mood": "good",
    "mood_emoji": "🙂",
    "note": "Journée normale finalement"
  }'
```

**Réponse :**
```json
{
  "message": "Entrée mise à jour",
  "entry": {
    "date": "2025-11-20",
    "mood": "good",
    "mood_emoji": "🙂",
    "note": "Journée normale finalement"
  }
}
```

## 5. Supprimer une entrée

```bash
curl -X DELETE http://localhost:5000/api/moods/2025-11-20
```

**Réponse :**
```json
{
  "message": "Entrée supprimée avec succès"
}
```

## 6. Obtenir les statistiques

```bash
curl -X GET http://localhost:5000/api/stats
```

**Réponse :**
```json
{
  "totalEntries": 4,
  "moodDistribution": [
    {
      "mood": "excellent",
      "mood_emoji": "😄",
      "count": 2
    },
    {
      "mood": "good",
      "mood_emoji": "🙂",
      "count": 1
    },
    {
      "mood": "neutral",
      "mood_emoji": "😐",
      "count": 1
    }
  ],
  "recentEntries": [
    {
      "date": "2025-11-20",
      "mood": "excellent",
      "mood_emoji": "😄"
    },
    {
      "date": "2025-11-19",
      "mood": "good",
      "mood_emoji": "🙂"
    }
  ]
}
```

## 7. Health Check

```bash
curl -X GET http://localhost:5000/api/health
```

**Réponse :**
```json
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

## 📋 Énumération des humeurs

| Valeur | Emoji | Description |
|--------|-------|-------------|
| `excellent` | 😄 | Excellent/Très heureux |
| `good` | 🙂 | Bon/Heureux |
| `neutral` | 😐 | Neutre/Normal |
| `bad` | 😔 | Mauvais/Triste |

## 🧪 Tester avec Postman

1. Importer les endpoints ci-dessus dans Postman
2. Utiliser l'environnement avec la variable `{{api_url}}` = `http://localhost:5000`
3. Tester chaque endpoint

## 🔗 Intégration Frontend

Le frontend utilise automatiquement ces endpoints via les composants :

- **DailyMoodEntry.tsx** → `POST /api/moods` + `GET /api/moods/{date}`
- **HistoryView.tsx** → `GET /api/moods` + `DELETE /api/moods/{date}`
- **Statistics.tsx** → `GET /api/stats`

## ⚠️ Gestion des erreurs

### Erreur 400 : Données manquantes

```json
{
  "error": "date, mood et mood_emoji sont requis"
}
```

### Erreur 404 : Entrée non trouvée

```json
{
  "error": "Aucune entrée pour cette date"
}
```

### Erreur 500 : Erreur serveur

```json
{
  "error": "Message d'erreur détaillé"
}
```

### Erreur 503 : Base de données non accessible

```json
{
  "status": "unhealthy",
  "database": "disconnected",
  "error": "Message d'erreur"
}
```

## 💡 Notes

- Les dates doivent être au format `YYYY-MM-DD`
- Chaque date peut avoir qu'une seule entrée
- Les notes sont optionnelles (peuvent être `null`)
- Les statistiques incluent les 7 derniers jours automatiquement
