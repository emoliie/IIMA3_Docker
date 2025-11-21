import { useState, useEffect } from 'react'
import '../styles/Statistics.css'

interface MoodStats {
  mood: string
  mood_emoji: string
  count: number
}

interface StatsData {
  totalEntries: number
  moodDistribution: MoodStats[]
  recentEntries: Array<{
    date: string
    mood: string
    mood_emoji: string
  }>
}

interface StatisticsProps {
  refreshTrigger: number
}

export default function Statistics({ refreshTrigger }: StatisticsProps) {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  useEffect(() => {
    fetchStats()
  }, [refreshTrigger])

  const fetchStats = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_BASE_URL}/api/stats`)
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      } else {
        setError('Impossible de charger les statistiques')
      }
    } catch (error) {
      setError('Erreur de connexion au serveur')
      console.error('Erreur:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getPercentage = (count: number, total: number) => {
    return total === 0 ? 0 : Math.round((count / total) * 100)
  }

  if (isLoading) {
    return <div className="stats-container"><p className="loading">Chargement...</p></div>
  }

  if (error) {
    return <div className="stats-container"><p className="error">{error}</p></div>
  }

  if (!stats) {
    return <div className="stats-container"><p>Aucune donnée</p></div>
  }

  return (
    <div className="stats-container">
      <div className="stats-header">
        <h2>📊 Vos statistiques</h2>
      </div>

      <div className="stats-grid">
        {/* Total Entries */}
        <div className="stat-card total-card">
          <h3>Total d'entrées</h3>
          <p className="stat-number">{stats.totalEntries}</p>
          <p className="stat-label">jours enregistrés</p>
        </div>

        {/* Mood Distribution */}
        <div className="stat-card distribution-card">
          <h3>Distribution des humeurs</h3>
          <div className="mood-distribution">
            {stats.moodDistribution.length > 0 ? (
              stats.moodDistribution.map((mood) => (
                <div key={mood.mood} className="mood-stat">
                  <div className="mood-stat-header">
                    <span className="mood-emoji">{mood.mood_emoji}</span>
                    <span className="mood-name">{mood.mood}</span>
                  </div>
                  <div className="mood-bar-container">
                    <div
                      className="mood-bar"
                      style={{
                        width: `${getPercentage(mood.count, stats.totalEntries)}%`,
                      }}
                    />
                  </div>
                  <div className="mood-stat-footer">
                    <span className="count">{mood.count}</span>
                    <span className="percentage">{getPercentage(mood.count, stats.totalEntries)}%</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">Aucune donnée</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Entries */}
      <div className="recent-entries-section">
        <h3>7 derniers jours</h3>
        {stats.recentEntries.length > 0 ? (
          <div className="recent-entries-list">
            {stats.recentEntries.map((entry) => {
              const date = new Date(entry.date + 'T00:00:00')
              const dayName = date.toLocaleDateString('fr-FR', { weekday: 'short' })
              const dayNum = date.toLocaleDateString('fr-FR', { day: 'numeric' })
              
              return (
                <div key={entry.date} className="recent-entry-item">
                  <div className="recent-date">
                    <span className="day-name">{dayName}</span>
                    <span className="day-num">{dayNum}</span>
                  </div>
                  <span className="recent-emoji">{entry.mood_emoji}</span>
                  <span className="recent-mood">{entry.mood}</span>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="no-data">Aucune entrée cette semaine</p>
        )}
      </div>
    </div>
  )
}
