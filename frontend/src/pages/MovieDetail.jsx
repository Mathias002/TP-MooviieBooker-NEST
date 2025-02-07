import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/movies/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((error) => console.error('Erreur:', error));
  }, [id]);

  if (loading) return <p style={{color: 'white', fontWeight: 'bold'}}>Chargement...</p>;
  if (!movie) return <p style={{color: 'white', fontWeight: 'bold'}}>Film introuvable</p>;

  return (
    <div className="movie-detail">
      <img src={movie.backdrop_url} alt={movie.title} className="backdrop" />
      <div className="info">
        <img src={movie.poster_url} alt={movie.title} className="poster" />
        <div className="text">
          <h1>{movie.title} ({movie.release_date.split('-')[0]})</h1>
          <p><strong>Titre Original:</strong> {movie.original_title}</p>
          <p><strong>Langue:</strong> {movie.original_language.toUpperCase()}</p>
          <p><strong>Note:</strong> {movie.vote_average} / 10 ({movie.vote_count} votes)</p>
          <p><strong>Popularité:</strong> {movie.popularity}</p>
          <p><strong>Genres:</strong> {movie.genres.join(', ')}</p>
          <p><strong>Synopsis:</strong> {movie.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
