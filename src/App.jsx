import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [answer, setAnswer] = useState('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  async function generateAnswer() {
    try {
      setLoading(true);
      setAnswer('');

      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_API_KEY}`,
        method: 'post',
        data: {
          contents: [
            {
              parts: [{ text: question }],
            },
          ],
        },
      });

      const result = response.data.candidates[0]?.content?.parts[0]?.text || 'No response';
      setAnswer(result);
    } catch (error) {
      console.error('Error generating answer:', error);
      setAnswer('Please try again, error in generating answer!');
    } finally {
      setLoading(false);
    }
  }

  function clearFields() {
    setQuestion('');
    setAnswer('');
  }

  return (
    <div className="app-container">
      <h1 className="app-title">AKSHATA'S AI</h1>
      <div className="card">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question here..."
          rows="5"
        ></textarea>
        <div className="button-group">
          <button onClick={generateAnswer} disabled={loading} className="generate-button">
            {loading ? 'Generating...' : 'Generate Answer'}
          </button>
          <button onClick={clearFields} className="clear-button" disabled={loading}>
            Clear
          </button>
        </div>
        {loading && <div className="spinner"></div>}
        {answer && <div className="answer-box"><p>{answer}</p></div>}
      </div>
    </div>
  );
}

export default App;
