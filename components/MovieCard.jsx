import React from 'react';

export default function MovieCard({ pelicula, accionTexto, onAccion }) {
  const posterUrl = pelicula.poster_path 
    ? `https://image.tmdb.org/t/p/w500${pelicula.poster_path}` 
    : 'https://via.placeholder.com/500x750?text=Sin+Poster';

  const titulo = pelicula.title || pelicula.titulo; // TMDB usa 'title', la BBDD local usa 'titulo'

  return (
    <div className="movie-card">
      <img src={posterUrl} alt={titulo} className="movie-poster" />
      
      {/* Capa oscura que aparece al pasar el ratón */}
      <div className="movie-overlay">
        <div className="overlay-title">{titulo}</div>
        <button className="btn-action" onClick={() => onAccion(pelicula)}>
          {accionTexto}
        </button>
      </div>
    </div>
  );
}