import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [mood, setMood] = useState(null);
  const [feedback, setFeedback] = useState("");

  const getFeedback = (mood) => {
    switch (mood) {
      case "positive":
        return "🌞 That’s awesome! Keep the good energy going.";
      case "neutral":
        return "🕊️ It’s okay to feel neutral. Stay mindful.";
      case "negative":
        return "💙 Sorry you're feeling down. Take a break and breathe.";
      default:
        return "";
    }
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;

    try {
      const res = await fetch("https://mood-api.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      if (data.mood) {
        setMood(data.mood);
        setFeedback(getFeedback(data.mood));
      }
    } catch (error) {
      console.error("API Error:", error);
      setMood("error");
      setFeedback("Something went wrong. Make sure the backend is running.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white p-10 rounded-3xl shadow-xl border border-gray-200 mx-4">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-4">Mood Tracker</h1>
        <p className="text-center text-gray-500 mb-6">Tell me how you feel today 💬</p>

        <textarea
          rows="5"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="I feel..."
          className="w-full p-4 text-lg bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 transition placeholder-gray-400"
        />

        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg px-8 py-3 rounded-xl transition-all shadow-lg"
          >
            Analyze Mood
          </button>
        </div>

        {mood && (
          <div className="mt-10 text-center">
            <p className="text-2xl font-semibold capitalize text-gray-800">
              Detected Mood: {mood}
            </p>
            <p className="text-md text-gray-600 mt-2">{feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
