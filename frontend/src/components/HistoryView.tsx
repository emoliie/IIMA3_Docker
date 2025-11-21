import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config/api";

interface Entry {
  date: string;
  mood: string;
  mood_emoji: string;
  note: string | null;
}

interface HistoryViewProps {
  refreshTrigger: number;
}

export default function HistoryView({ refreshTrigger }: HistoryViewProps) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEntries();
  }, [refreshTrigger]);

  const fetchEntries = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/entries`);
      if (response.ok) {
        const data = await response.json();
        setEntries(data.entries || []);
      } else {
        setError("Impossible de charger l'historique");
      }
    } catch (error) {
      setError("Erreur de connexion au serveur");
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (date: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette entrée ?")) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/entries/${date}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setEntries(entries.filter((e) => e.date !== date));
      } else {
        alert("Erreur lors de la suppression");
      }
    } catch (error) {
      alert("Erreur de connexion");
      console.error("Erreur:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString + "T00:00:00").toLocaleDateString(
      "fr-FR",
      options
    );
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

  if (entries.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
          <p className="text-6xl mb-4">📭</p>
          <p className="text-xl text-gray-700 mb-2">
            Aucune entrée pour le moment
          </p>
          <p className="text-gray-500">Commencez à enregistrer vos humeurs !</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-t-2xl shadow-2xl p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            📋 Historique de vos humeurs
          </h2>
          <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
            {entries.length} entrée{entries.length > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-b-2xl shadow-2xl divide-y divide-gray-200">
        {entries.map((entry) => (
          <div
            key={entry.date}
            className="p-6 hover:bg-gray-50 transition-colors duration-150"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <span className="text-5xl">{entry.mood_emoji}</span>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    {formatDate(entry.date)}
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {entry.mood}
                  </p>
                </div>
              </div>
              <button
                className="text-2xl hover:scale-110 transition-transform duration-150 opacity-60 hover:opacity-100"
                onClick={() => handleDelete(entry.date)}
                title="Supprimer"
              >
                🗑️
              </button>
            </div>

            {entry.note && (
              <div className="mt-4 ml-20 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-700 text-sm">{entry.note}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
