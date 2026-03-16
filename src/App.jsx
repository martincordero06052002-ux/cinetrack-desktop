import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';

const Buscador = () => {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);

  const buscar = async () => {
    if (!query) return;
    const peliculas = await window.api.buscarPeliculas(query);
    setResultados(peliculas);
  };

  const guardarEnColeccion = async (pelicula) => {
    const res = await window.api.guardarPelicula(pelicula);
    if(res.success) alert(`"${pelicula.title}" guardada en tu colección.`);
    else alert("Hubo un error o ya está en tu colección.");
  };

  return (
    <div>
      <h2>Buscador TMDB</h2>
      <div className="search-bar">
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && buscar()}
          placeholder="Ej: El Padrino, Interstellar..." 
        />
        <button onClick={buscar}>Buscar</button>
      </div>

      <div className="movies-grid">
        {resultados.map((p) => (
          <div key={p.id} className="movie-card">
            <img 
              src={p.poster_path ? `https://image.tmdb.org/t/p/w500${p.poster_path}` : 'https://via.placeholder.com/500x750?text=Sin+Poster'} 
              alt={p.title} 
              className="movie-poster"
            />
            <div className="movie-title">{p.title}</div>
            <button className="btn-save" onClick={() => guardarEnColeccion(p)}>+ Añadir</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const MiColeccion = () => {
  const [coleccion, setColeccion] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      const peliculasGuardadas = await window.api.obtenerColeccion();
      setColeccion(peliculasGuardadas);
    };
    cargarDatos();
  }, []);

  return (
    <div>
      <h2>Mi Colección</h2>
      {coleccion.length === 0 ? <p>Tu colección está vacía.</p> : null}
      <div className="movies-grid">
        {coleccion.map((p) => (
          <div key={p.id_local} className="movie-card">
            <img 
              src={p.poster_path ? `https://image.tmdb.org/t/p/w500${p.poster_path}` : 'https://via.placeholder.com/500x750?text=Sin+Poster'} 
              alt={p.titulo} 
              className="movie-poster"
            />
            <div className="movie-title">{p.titulo}</div>
            <div style={{textAlign: 'center', paddingBottom: '10px', fontSize: '12px', color: '#00e054'}}>{p.estado}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="sidebar">
          <h1 style={{color: '#00e054'}}>CineTrack</h1>
          <Link to="/">Buscador</Link>
          <Link to="/coleccion">Mi Colección</Link>
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Buscador />} />
            <Route path="/coleccion" element={<MiColeccion />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}