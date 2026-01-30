import { useState, useEffect } from 'react';

function QuoteOfTheDay() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuote = async (signal) => {
    setLoading(true);
    setError(null);
    try {
      //   najstabilniejsze API 'dummyjson'
      const response = await fetch('https://dummyjson.com/quotes/random', { signal });
      
      if (!response.ok) throw new Error('Błąd połączenia');
      
      const data = await response.json();
      
      // DummyJSON zwraca obiekt: { quote: "Treść...", author: "Autor..." }
      setQuote({
        text: data.quote,   // Tutaj jest zmiana: .quote zamiast .content
        author: data.author
      });

    } catch (err) {
      if (err.name !== 'AbortError') {
        setError('Nie udało się pobrać cytatu');
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController(); 
    fetchQuote(controller.signal);
    return () => controller.abort(); 
  }, []);

  if (loading) return <div style={{padding: '10px'}}>Ładowanie cytatu...</div>;
  
  if (error) return (
    <div style={{padding: '10px', color: 'red'}}>
        <p>{error}</p>
        <button onClick={() => fetchQuote()}>Spróbuj ponownie</button>
    </div>
  );

  return (
    <div className="quote" style={{ 
        margin: '20px 0', 
        padding: '15px', 
        backgroundColor: '#f8f9fa', 
        borderLeft: '4px solid #28a745', // Zmieniłem kolor na zielony, na szczęście!
        borderRadius: '4px'
    }}>
      <p style={{ fontStyle: 'italic', fontSize: '1.1em' }}>"{quote?.text}"</p>
      <p style={{ fontWeight: 'bold', textAlign: 'right', marginTop: '5px' }}>— {quote?.author}</p>
      
      <button 
        onClick={() => fetchQuote()} 
        style={{ marginTop: '10px', padding: '5px 10px', cursor: 'pointer' }}
      >
        Nowy cytat
      </button>
    </div>
  );
}

export default QuoteOfTheDay;