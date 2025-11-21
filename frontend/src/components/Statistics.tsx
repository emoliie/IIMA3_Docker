import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config/api";

interface MoodStats {
  mood: string;
  mood_emoji: string;
  count: number;
}

interface StatsData {
  totalEntries: number;
  moodDistribution: MoodStats[];
  recentEntries: Array<{
    date: string;
    mood: string;
    mood_emoji: string;
  }>;
}

interface StatisticsProps {
  refreshTrigger: number;
}

export default function Statistics({ refreshTrigger }: StatisticsProps) {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, [refreshTrigger]);

  const fetchStats = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/stats`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        setError("Impossible de charger les statistiques");
      }
    } catch (error) {
      setError("Erreur de connexion au serveur");
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPercentage = (count: number, total: number) => {
    return total === 0 ? 0 : Math.round((count / total) * 100);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          <p className="text-white mt-4">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
          <p className="text-gray-500">Aucune donnée</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          📊 Vos statistiques
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Total Entries */}
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-medium opacity-90 mb-2">
              Total d'entrées
            </h3>
            <p className="text-5xl font-bold mb-1">{stats.totalEntries}</p>
            <p className="text-sm opacity-80">jours enregistrés</p>
          </div>

          {/* Mood Distribution */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Distribution des humeurs
            </h3>
            <div className="space-y-4">
              {stats.moodDistribution.length > 0 ? (
                stats.moodDistribution.map((mood) => (
                  <div key={mood.mood} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{mood.mood_emoji}</span>
                        <span className="font-medium text-gray-700">
                          {mood.mood}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">{mood.count}</span>
                        <span className="font-semibold text-purple-600">
                          {getPercentage(mood.count, stats.totalEntries)}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${getPercentage(
                            mood.count,
                            stats.totalEntries
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">Aucune donnée</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Entries */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            7 derniers jours
          </h3>
          {stats.recentEntries.length > 0 ? (
            <div className="grid grid-cols-7 gap-2">
              {stats.recentEntries.map((entry) => {
                const date = new Date(entry.date + "T00:00:00");
                const dayName = date.toLocaleDateString("fr-FR", {
                  weekday: "short",
                });
                const dayNum = date.toLocaleDateString("fr-FR", {
                  day: "numeric",
                });

                return (
                  <div
                    key={entry.date}
                    className="bg-white rounded-lg p-3 text-center border border-gray-200 hover:border-purple-300 transition-colors"
                  >
                    <div className="text-xs text-gray-500 font-medium mb-1">
                      {dayName}
                    </div>
                    <div className="text-xs text-gray-600 font-bold mb-2">
                      {dayNum}
                    </div>
                    <div className="text-3xl mb-1">{entry.mood_emoji}</div>
                    <div className="text-xs text-gray-600 truncate">
                      {entry.mood}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              Aucune entrée cette semaine
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
