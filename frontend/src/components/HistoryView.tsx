import { useState, useEffect } from 'react'
import '../styles/HistoryView.css'

interface Entry {
  date: string
  mood: string
  mood_emoji: string
  note: string | null
}

interface HistoryViewProps {
  refreshTrigger: number
}

export default function HistoryView({ refreshTrigger }: HistoryViewProps) {
  const [entries, setEntries] = useState<Entry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  useEffect(() => {
    fetchEntries()
  }, [refreshTrigger])

  const fetchEntries = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_BASE_URL}/api/moods`)
      if (response.ok) {
        const data = await response.json()
        setEntries(data.entries || [])
      } else {
        setError('Impossible de charger l\'historique')
      }
    } catch (error) {
      setError('Erreur de connexion au serveur')
      console.error('Erreur:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (date: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette entrée ?')) {
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/moods/${date}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setEntries(entries.filter(e => e.date !== date))
      } else {
        alert('Erreur lors de la suppression')
      }
    } catch (error) {
      alert('Erreur de connexion')
      console.error('Erreur:', error)
    }
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return new Date(dateString + 'T00:00:00').toLocaleDateString('fr-FR', options)
  }

  if (isLoading) {
    return <div className="history-container"><p className="loading">Chargement...</p></div>
  }

  if (error) {
    return <div className="history-container"><p className="error">{error}</p></div>
  }

  if (entries.length === 0) {
    return (
      <div className="history-container">
        <div className="empty-state">
          <p>📭 Aucune entrée pour le moment</p>
          <p>Commencez à enregistrer vos humeurs !</p>
        </div>
      </div>
    )
  }

  return (
    <div className="history-container">
      <div className="history-header">
        <h2>📋 Historique de vos humeurs</h2>
        <p>{entries.length} entrée{entries.length > 1 ? 's' : ''}</p>
      </div>

      <div className="entries-list">
        {entries.map((entry) => (
          <div key={entry.date} className="entry-item">
            <div className="entry-header">
              <div className="entry-date-mood">
                <span className="mood-emoji-large">{entry.mood_emoji}</span>
                <div className="date-mood-text">
                  <p className="entry-date">{formatDate(entry.date)}</p>
                  <p className="entry-mood">{entry.mood}</p>
                </div>
              </div>
              <button
                className="delete-btn"
                onClick={() => handleDelete(entry.date)}
                title="Supprimer"
              >
                🗑️
              </button>
            </div>

            {entry.note && (
              <div className="entry-note">
                <p>{entry.note}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
