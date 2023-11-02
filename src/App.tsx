import React, { useState, useEffect } from 'react';
import './style.css';

const API_KEY = '7d617b0e7e3306180bff411df0084230';
const API_URL = 'https://www.flickr.com/services/rest/';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = (query: string) => {
    fetch(
      `${API_URL}?method=flickr.photos.search&api_key=${API_KEY}&text=${query}&format=json&nojsoncallback=1`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.photos && data.photos.photo) {
          setResults(data.photos.photo);
          setError(null);
        } else {
          setError('Nie znaleziono wyników.');
          setResults([]);
        }
      })
      .catch((err) => {
        setError('Wystąpił błąd podczas komunikacji z API.');
        setResults([]);
      });
  };

  useEffect(() => {
    handleSearch('Zwierzęta');
  }, []);

  return (
    <div className="App">
      <h1>Wyszukiwarka Flickr</h1>
      <div>
        <button onClick={() => handleSearch('Zwierzęta')}>Zwierzęta</button>
        <button onClick={() => handleSearch('Krajobrazy')}>Krajobrazy</button>
        <button onClick={() => handleSearch('Miasta')}>Miasta</button>
        <button onClick={() => handleSearch('Inne')}>Inne</button>
      </div>
      <input
        type="text"
        placeholder="Wyszukaj"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={() => handleSearch(searchTerm)}>Szukaj</button>
      {error && <p>{error}</p>}
      <div className="results">
        {results.map((photo) => (
          <img
            key={photo.id}
            src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`}
            alt={photo.title}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
