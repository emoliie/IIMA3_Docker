import { useState, useEffect } from 'react'
import '../styles/DailyMoodEntry.css'

interface Mood {
  id: number
  name: string
  emoji: string
}

interface DailyMoodEntryProps {
  onMoodSubmitted: () => void
}

const MOODS: Mood[] = [
  { id: 1, name: 'excellent', emoji: '😄' },
  { id: 2, name: 'good', emoji: '🙂' },
  { id: 3, name: 'neutral', emoji: '😐' },
  { id: 4, name: 'bad', emoji: '😔' },
]

export default function DailyMoodEntry({ onMoodSubmitted }: DailyMoodEntryProps) {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null)
  const [comment, setComment] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [todayEntry, setTodayEntry] = useState<any>(null)

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  useEffect(() => {
    fetchTodayEntry()
  }, [])

  const fetchTodayEntry = async () => {
    try {
      const today = new Date().toISOString().split('T')[0]
      const response = await fetch(`${API_BASE_URL}/api/moods/${today}`)
      
      if (response.ok) {
        const data = await response.json()
        setTodayEntry(data)
        const mood = MOODS.find(m => m.name === data.mood)
        if (mood) setSelectedMood(mood)
        setComment(data.note || '')
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'entrée:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedMood) {
      setMessage({ type: 'error', text: 'Veuillez sélectionner une humeur' })
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      const today = new Date().toISOString().split('T')[0]
      const response = await fetch(`${API_BASE_URL}/api/moods`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: today,
          mood: selectedMood.name,
          mood_emoji: selectedMood.emoji,
          note: comment || null,
        }),
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Votre humeur a été enregistrée !' })
        await fetchTodayEntry()
        onMoodSubmitted()
        setTimeout(() => setMessage(null), 3000)
      } else {
        const error = await response.json()
        setMessage({ type: 'error', text: error.error || 'Erreur lors de l\'enregistrement' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur de connexion au serveur' })
      console.error('Erreur:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="daily-entry-container">
      <div className="entry-card">
        <h2>Comment allez-vous aujourd'hui ?</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="moods-grid">
            {MOODS.map((mood) => (
              <button
                key={mood.id}
                type="button"
                className={`mood-button ${selectedMood?.id === mood.id ? 'selected' : ''}`}
                onClick={() => setSelectedMood(mood)}
                title={mood.name}
              >
                <span className="mood-emoji">{mood.emoji}</span>
                <span className="mood-label">{mood.name}</span>
              </button>
            ))}
          </div>

          <div className="comment-section">
            <label htmlFor="comment">Ajouter une note (optionnel)</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Décrivez votre journée, ce qui vous a rendu heureux/triste..."
              rows={4}
            />
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Enregistrement...' : 'Enregistrer mon humeur'}
          </button>
        </form>

        {message && (
          <div className={`message ${message.type}`}>
            {message.type === 'success' && '✅ '}
            {message.type === 'error' && '❌ '}
            {message.text}
          </div>
        )}

        {todayEntry && (
          <div className="current-status">
            <p>Votre entrée d'aujourd'hui: <strong>{todayEntry.mood_emoji} {todayEntry.mood}</strong></p>
            {todayEntry.note && <p className="note-preview">Note: {todayEntry.note}</p>}
          </div>
        )}
      </div>
    </div>
  )
}
