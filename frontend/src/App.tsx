import { useState } from 'react'
import './App.css'
import DailyMoodEntry from './components/DailyMoodEntry'
import HistoryView from './components/HistoryView'
import Statistics from './components/Statistics'

type View = 'entry' | 'history' | 'stats'

function App() {
  const [currentView, setCurrentView] = useState<View>('entry')
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleMoodSubmitted = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>😊 Mood Tracker</h1>
        <p>Suivez votre humeur au quotidien</p>
      </header>

      <nav className="navigation">
        <button 
          className={`nav-btn ${currentView === 'entry' ? 'active' : ''}`}
          onClick={() => setCurrentView('entry')}
        >
          📝 Aujourd'hui
        </button>
        <button 
          className={`nav-btn ${currentView === 'history' ? 'active' : ''}`}
          onClick={() => setCurrentView('history')}
        >
          📋 Historique
        </button>
        <button 
          className={`nav-btn ${currentView === 'stats' ? 'active' : ''}`}
          onClick={() => setCurrentView('stats')}
        >
          📊 Statistiques
        </button>
      </nav>

      <main className="content">
        {currentView === 'entry' && (
          <DailyMoodEntry onMoodSubmitted={handleMoodSubmitted} />
        )}
        {currentView === 'history' && (
          <HistoryView refreshTrigger={refreshTrigger} />
        )}
        {currentView === 'stats' && (
          <Statistics refreshTrigger={refreshTrigger} />
        )}
      </main>
    </div>
  )
}

export default App
