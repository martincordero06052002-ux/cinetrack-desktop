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

  const eliminar = async (pelicula) => {
    if(window.confirm(`¿Seguro que quieres borrar ${pelicula.titulo}?`)) {
      await window.api.eliminarPelicula(pelicula.id_local);
      cargarDatos(); 
    }
  };

  const marcarVista = async (pelicula) => {
    await window.api.actualizarEstado(pelicula.id_local, 'VISTA');
    cargarDatos(); 
  };

  return (
    <div>
      <h2 style={{borderBottom: '1px solid #2c3440', paddingBottom: '10px', color: 'white'}}>Tu Diario</h2>
      {coleccion.length === 0 ? <p style={{color: '#899aa9'}}>No has registrado ninguna película aún.</p> : null}
      
      <div className="movies-grid">
        {coleccion.map((p) => (
          <MovieCard 
            key={p.id_local} 
            pelicula={p} 
            estado={p.estado}
            
            // Botón 1: Marcar Vista o Ver Ficha
            textoPrincipal={p.estado === 'VISTA' ? "Ver Ficha" : "✔ Marcar Vista"}
            accionPrincipal={p.estado === 'VISTA' ? () => alert("Ficha en desarrollo (Hito 5)") : marcarVista}
            
            // Botón 2: El dichoso botón de Borrar
            textoSecundaria="🗑 Borrar"
            accionSecundaria={eliminar}
          />
        ))}
      </div>
    </div>
  );
}