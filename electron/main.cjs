const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const axios = require('axios');
const { initDB, db } = require('./database.cjs');

// Tu API Key real de TMDB
const TMDB_API_KEY = '9d681f9d0dc8e125ab04ffc4a6992123';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    backgroundColor: '#14181c', // Color de fondo estilo Letterboxd
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'), // Conectamos el puente
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadURL('http://localhost:5173');
}

app.whenReady().then(() => {
  initDB();
  createWindow();
});

// --- FUNCIONALIDAD 1: Buscar en TMDB (API) ---
ipcMain.handle('buscar-peliculas', async (event, query) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}&language=es-ES`);
    return response.data.results; // Devuelve la lista de películas a React
  } catch (error) {
    console.error("Error buscando en TMDB:", error);
    return [];
  }
});

// --- FUNCIONALIDAD 2: CRUD LOCAL (SQLite) ---

// Create (Guardar)
ipcMain.handle('guardar-pelicula', (event, pelicula) => {
  try {
    const stmt = db.prepare('INSERT OR IGNORE INTO Peliculas_Guardadas (tmdb_id, titulo, poster_path, estado) VALUES (?, ?, ?, ?)');
    stmt.run(pelicula.id, pelicula.title, pelicula.poster_path, 'PENDIENTE');
    return { success: true, message: 'Película guardada' };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Read (Leer Colección)
ipcMain.handle('obtener-coleccion', (event) => {
  try {
    const stmt = db.prepare('SELECT * FROM Peliculas_Guardadas ORDER BY id_local DESC');
    return stmt.all();
  } catch (error) {
    return [];
  }
});

// Update (Actualizar Estado a "VISTA")
ipcMain.handle('actualizar-estado', (event, id_local, nuevoEstado) => {
  try {
    const stmt = db.prepare('UPDATE Peliculas_Guardadas SET estado = ? WHERE id_local = ?');
    stmt.run(nuevoEstado, id_local);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Delete (Borrar Película)
ipcMain.handle('eliminar-pelicula', (event, id_local) => {
  try {
    const stmt = db.prepare('DELETE FROM Peliculas_Guardadas WHERE id_local = ?');
    stmt.run(id_local);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});