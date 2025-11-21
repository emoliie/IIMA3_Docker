import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config/api";

interface Mood {
  id: number;
  name: string;
  emoji: string;
}

interface DailyMoodEntryProps {
  onMoodSubmitted: () => void;
}

export default function DailyMoodEntry({
  onMoodSubmitted,
}: DailyMoodEntryProps) {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [todayEntry, setTodayEntry] = useState<any>(null);
  const [moods, setMoods] = useState<Mood[]>([]);

  useEffect(() => {
    fetchTodayEntry();
    fetchMoods();
  }, []);

  const fetchMoods = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/moods`);

      if (response.ok) {
        const data = await response.json();
        setMoods(data.moods || []);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des moods :", error);
    }
  };

  const fetchTodayEntry = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const response = await fetch(`${API_BASE_URL}/api/entries/${today}`);

      if (response.ok) {
        const data = await response.json();
        setTodayEntry(data);
        const mood = moods.find((m) => m.name === data.mood);
        if (mood) setSelectedMood(mood);
        setComment(data.note || "");
      }
    } catch (error) {
      console.error("Erreur lors du chargement de l'entrée:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedMood) {
      setMessage({ type: "error", text: "Veuillez sélectionner une humeur" });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const today = new Date().toISOString().split("T")[0];
      const response = await fetch(`${API_BASE_URL}/api/entries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: today,
          mood_id: selectedMood.id,
          note: comment || null,
        }),
      });

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Votre humeur a été enregistrée !",
        });
        await fetchTodayEntry();
        onMoodSubmitted();
        setTimeout(() => setMessage(null), 3000);
      } else {
        const error = await response.json();
        setMessage({
          type: "error",
          text: error.error || "Erreur lors de l'enregistrement",
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Erreur de connexion au serveur" });
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Comment allez-vous aujourd'hui ?
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {moods.map((mood) => (
              <button
                key={mood.id}
                type="button"
                className={`
                  flex flex-col items-center justify-center p-6 rounded-xl
                  border-2 transition-all duration-200 hover:scale-105
                  ${
                    selectedMood?.id === mood.id
                      ? "border-purple-600 bg-purple-50 shadow-lg"
                      : "border-gray-200 bg-white hover:border-purple-300"
                  }
                `}
                onClick={() => setSelectedMood(mood)}
                title={mood.name}
              >
                <span className="text-5xl mb-2">{mood.emoji}</span>
                <span className="text-sm font-medium text-gray-700">
                  {mood.name}
                </span>
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700"
            >
              Ajouter une note (optionnel)
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Décrivez votre journée, ce qui vous a rendu heureux/triste..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Enregistrement..." : "Enregistrer mon humeur"}
          </button>
        </form>

        {message && (
          <div
            className={`mt-6 p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}
          >
            {message.type === "success" && "✅ "}
            {message.type === "error" && "❌ "}
            {message.text}
          </div>
        )}

        {todayEntry && (
          <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-gray-700">
              Votre entrée d'aujourd'hui:{" "}
              <strong className="text-purple-600">
                {todayEntry.mood_emoji} {todayEntry.mood}
              </strong>
            </p>
            {todayEntry.note && (
              <p className="mt-2 text-sm text-gray-600">
                Note: {todayEntry.note}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
