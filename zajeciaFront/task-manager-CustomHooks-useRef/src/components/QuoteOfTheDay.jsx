import { useCallback } from 'react';
import { useFetch } from '../hooks/useFetch';

function QuoteOfTheDay() {
  // ZABEZPIECZENIE: Opakowujemy funkcję w useCallback, aby zapobiec pętli nieskończonej!
  const transformQuote = useCallback((data) => ({
    text: data.quote,
    author: data.author
  }), []); // Pusta tablica zależności = funkcja tworzy się tylko raz

  const { data: quote, loading, error, refetch } = useFetch('https://dummyjson.com/quotes/random', {
    transform: transformQuote // Przekazujemy zapamiętaną funkcję
  });

  if (loading) return <div style={{padding: '10px'}}>Ładowanie cytatu...</div>;
  
  if (error) return (
    <div style={{padding: '10px', color: 'red'}}>
        <p>{error}</p>
        <button onClick={refetch}>Spróbuj ponownie</button>
    </div>
  );

  return (
    <div className="quote" style={{ 
        margin: '20px 0', 
        padding: '15px', 
        backgroundColor: '#f8f9fa', 
        borderLeft: '4px solid #28a745', 
        borderRadius: '4px'
    }}>
      <p style={{ fontStyle: 'italic', fontSize: '1.1em' }}>"{quote?.text}"</p>
      <p style={{ fontWeight: 'bold', textAlign: 'right', marginTop: '5px' }}>— {quote?.author}</p>
      
      <button 
        onClick={refetch}
        style={{ marginTop: '10px', padding: '5px 10px', cursor: 'pointer' }}
      >
        Nowy cytat
      </button>
    </div>
  );
}

export default QuoteOfTheDay;