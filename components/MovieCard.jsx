import React from 'react';

export default function MovieCard({ pelicula, estado, textoPrincipal, accionPrincipal, textoSecundaria, accionSecundaria }) {
  const posterUrl = pelicula.poster_path 
    ? `https://image.tmdb.org/t/p/w500${pelicula.poster_path}` 
    : 'https://via.placeholder.com/500x750?text=Sin+Poster';

  const titulo = pelicula.title || pelicula.titulo;

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      backgroundColor: 'var(--bg-card)', 
      borderRadius: '6px', 
      overflow: 'hidden',
      border: '1px solid #2c3440'
    }}>
      
      {/* SECCIÓN 1: PÓSTER Y ESTADO */}
      <div style={{ position: 'relative', aspectRatio: '2/3' }}>
        <img src={posterUrl} alt={titulo} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        
        {/* Etiqueta de VISTA / PENDIENTE en la esquina */}
        {estado && (
          <div style={{ 
            position: 'absolute', top: '8px', right: '8px', 
            backgroundColor: estado === 'VISTA' ? '#00e054' : '#40bcf4', 
            color: '#14181c', padding: '4px 8px', borderRadius: '4px', 
            fontSize: '11px', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,0,0,0.8)' 
          }}>
            {estado === 'VISTA' ? '👀 VISTA' : '🕒 PEND.'}
          </div>
        )}
      </div>

      {/* SECCIÓN 2: TÍTULO Y BOTONES (SIEMPRE VISIBLES) */}
      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, backgroundColor: '#1c2228' }}>
        
        {/* Título recortado para que no rompa el diseño */}
        <div style={{ 
          fontSize: '13px', fontWeight: 'bold', color: 'white', 
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          textAlign: 'center', marginBottom: '5px'
        }}>
          {titulo}
        </div>
        
        {/* Botón Principal (Guardar, Marcar Vista o Ver Ficha) */}
        {accionPrincipal && (
          <button 
            onClick={() => accionPrincipal(pelicula)}
            style={{ 
              width: '100%', padding: '8px', border: 'none', borderRadius: '4px',
              backgroundColor: textoPrincipal.includes('Vista') || textoPrincipal.includes('Guardar') ? '#00e054' : '#2c3440',
              color: textoPrincipal.includes('Vista') || textoPrincipal.includes('Guardar') ? '#14181c' : 'white',
              fontWeight: 'bold', cursor: 'pointer', fontSize: '12px'
            }}
          >
            {textoPrincipal}
          </button>
        )}

        {/* Botón Secundario (Borrar) */}
        {accionSecundaria && (
          <button 
            onClick={() => accionSecundaria(pelicula)}
            style={{ 
              width: '100%', padding: '8px', border: 'none', borderRadius: '4px',
              backgroundColor: '#d9534f', color: 'white',
              fontWeight: 'bold', cursor: 'pointer', fontSize: '12px'
            }}
          >
            {textoSecundaria}
          </button>
        )}

      </div>
    </div>
  );
}