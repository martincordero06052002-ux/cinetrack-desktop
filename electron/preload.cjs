const { contextBridge, ipcRenderer } = require('electron');

// Exponemos una API global para que React pueda hablar con Node.js
contextBridge.exposeInMainWorld('api', {
  buscarPeliculas: (query) => ipcRenderer.invoke('buscar-peliculas', query),
  guardarPelicula: (pelicula) => ipcRenderer.invoke('guardar-pelicula', pelicula),
  obtenerColeccion: () => ipcRenderer.invoke('obtener-coleccion')
});