import React, { useState } from 'react';

export default function App() {
  const [quote, setQuote] = useState(null); // Use null to handle no quote
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  // Fetch a random quote from the API
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.quotable.io/random');
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }
      const data = await response.json();
      setQuote(data);
    } catch (error) {
      console.error('Error fetching quote:', error);
    } finally {
      setLoading(false);
    }
  };

  // Convert text to speech
  const speakText = () => {
    if (!quote || !quote.content) return; // Ensure quote and content are available

    const utterance = new SpeechSynthesisUtterance(quote.content);

    // Set up events to manage speaking state
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);

    // Speak the utterance
    speechSynthesis.speak(utterance);
  };

  return (
    <>
      <div className="w-full min-h-screen bg-slate-800 flex flex-col items-center justify-center p-6">
        <h1 className="text-5xl text-center text-white">Quote Generator</h1>
        <div className="block mt-9 mx-6 p-4">
          {quote && (
            <blockquote className="block rounded-lg text-3xl text-white bg-gray-700 p-4">
              <p>"{quote.content}"</p>
              <footer>- {quote.author}</footer>
            </blockquote>
          )}
        </div>
        <button
          onClick={fetchData}
          className="block rounded-lg mx-6 p-4 mt-5 bg-blue-500 text-white"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Next'}
        </button>
        {quote && (
          <button
            onClick={speakText}
            className="block rounded-lg mx-6 p-4 mt-5 bg-green-500 text-white"
            disabled={speaking}
          >
            {speaking ? 'Speaking...' : 'Speak'}
          </button>
        )}
      </div>
    </>
  );
}


