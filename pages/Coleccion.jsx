import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';

export default function Coleccion() {
  const [coleccion, setColeccion] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      const peliculasGuardadas = await window.api.obtenerColeccion();
      setColeccion(peliculasGuardadas);
    };

    cargarDatos();
  }, []);

  const verDetalles = (pelicula) => {
    alert(`En el Hito 5 abriremos la ficha de: ${pelicula.titulo}`);
  };

  return (
    <div>
      <h2 style={{borderBottom: '1px solid #2c3440', paddingBottom: '10px'}}>Películas Vistas</h2>
      {coleccion.length === 0 ? <p>No has registrado ninguna película aún.</p> : null}
      
      <div className="movies-grid">
        {coleccion.map((p) => (
          <MovieCard key={p.id_local} pelicula={p} accionTexto="Ver Ficha" onAccion={verDetalles} />
        ))}
      </div>
    </div>
  );
}