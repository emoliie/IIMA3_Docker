import { useState } from "react";
import DailyMoodEntry from "./components/DailyMoodEntry";
import HistoryView from "./components/HistoryView";
import Statistics from "./components/Statistics";

type View = "entry" | "history" | "stats";

function App() {
  const [currentView, setCurrentView] = useState<View>("entry");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleMoodSubmitted = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen">
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            😊 Mood Tracker
          </h1>
          <p className="text-white/90 text-lg">
            Suivez votre humeur au quotidien
          </p>
        </div>
      </header>

      <nav className="sticky top-0 z-10 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex gap-2 justify-center">
            <button
              className={`
                px-6 py-3 rounded-lg font-medium transition-all duration-200
                ${
                  currentView === "entry"
                    ? "bg-white text-purple-600 shadow-lg"
                    : "text-white hover:bg-white/20"
                }
              `}
              onClick={() => setCurrentView("entry")}
            >
              📝 Aujourd'hui
            </button>
            <button
              className={`
                px-6 py-3 rounded-lg font-medium transition-all duration-200
                ${
                  currentView === "history"
                    ? "bg-white text-purple-600 shadow-lg"
                    : "text-white hover:bg-white/20"
                }
              `}
              onClick={() => setCurrentView("history")}
            >
              📋 Historique
            </button>
            <button
              className={`
                px-6 py-3 rounded-lg font-medium transition-all duration-200
                ${
                  currentView === "stats"
                    ? "bg-white text-purple-600 shadow-lg"
                    : "text-white hover:bg-white/20"
                }
              `}
              onClick={() => setCurrentView("stats")}
            >
              📊 Statistiques
            </button>
          </div>
        </div>
      </nav>

      <main className="pb-12">
        {currentView === "entry" && (
          <DailyMoodEntry onMoodSubmitted={handleMoodSubmitted} />
        )}
        {currentView === "history" && (
          <HistoryView refreshTrigger={refreshTrigger} />
        )}
        {currentView === "stats" && (
          <Statistics refreshTrigger={refreshTrigger} />
        )}
      </main>
    </div>
  );
}

export default App;
