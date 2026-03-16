const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const axios = require('axios');
const { initDB, db } = require('./database.cjs');

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
ipcMain.handle('guardar-pelicula', (event, pelicula) => {
  try {
    const stmt = db.prepare('INSERT OR IGNORE INTO Peliculas_Guardadas (tmdb_id, titulo, poster_path, estado) VALUES (?, ?, ?, ?)');
    stmt.run(pelicula.id, pelicula.title, pelicula.poster_path, 'PENDIENTE');
    return { success: true, message: 'Película guardada' };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('obtener-coleccion', (event) => {
  try {
    const stmt = db.prepare('SELECT * FROM Peliculas_Guardadas ORDER BY id_local DESC');
    return stmt.all();
  } catch (error) {
    return [];
  }
});