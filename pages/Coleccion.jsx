// src/pages/Coleccion.jsx
import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';

export default function Coleccion() {
  const [coleccion, setColeccion] = useState([]);

  const cargarDatos = async () => {
    const peliculasGuardadas = await window.api.obtenerColeccion();
    setColeccion(peliculasGuardadas);
  };

  useEffect(() => {
    cargarDatos();
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const eliminar = async (id_local) => {
    if(window.confirm("¿Seguro que quieres borrarla?")) {
      await window.api.eliminarPelicula(id_local);
      cargarDatos(); 
    }
  };

  const marcarVista = async (id_local) => {
    await window.api.actualizarEstado(id_local, 'VISTA');
    cargarDatos(); 
  };

  return (
    <div>
      <h2 style={{borderBottom: '1px solid #2c3440', paddingBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px'}}>Tu Diario</h2>
      {coleccion.length === 0 ? <p style={{color: '#899aa9'}}>No hay películas.</p> : null}
      
      <div className="movies-grid">
        {coleccion.map((p) => (
          <MovieCard 
            key={p.id_local} 
            pelicula={p} 
            estado={p.estado}
            
            // Si no está vista, muestra el botón verde de "Marcar Vista", sino "Ver Ficha"
            textoPrincipal={p.estado === 'VISTA' ? "Ver Ficha" : "✔ Marcar Vista"}
            accionPrincipal={(pelicula) => p.estado === 'VISTA' ? alert("Ficha en desarrollo") : marcarVista(pelicula.id_local)}
            
            // Muestra siempre el botón rojo de borrar
            textoSecundaria="🗑 Borrar"
            accionSecundaria={(pelicula) => eliminar(pelicula.id_local)}
          />
        ))}
      </div>
    </div>
  );
}