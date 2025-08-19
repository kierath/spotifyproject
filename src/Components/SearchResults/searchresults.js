// src/Components/SearchBar/SearchResults.js
import './searchresults.css';


function SearchResults({ results }) {
  return (
    <div className="SearchResultsWrapper">
    <ul>
      {results.map(artist => (
        <li className="artistItem" key={artist.id}>
          {artist.images[0] && (
            <img src={artist.images[0].url} alt={artist.name} width="50" />
          )}
          {artist.name}
        </li>
      ))}
    </ul>
    </div>
  );
}

export default SearchResults;
