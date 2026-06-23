/**
 * Módulo de conexión con la API de TMDB
 */

// Función para obtener películas por género
async function getMoviesByGenre(genreId) {
    try {
        const url = `${TMDB_CONFIG.baseURL}/discover/movie?api_key=${TMDB_CONFIG.apiKey}&with_genres=${genreId}&sort_by=popularity.desc&language=${TMDB_CONFIG.language}&page=1`;
        
        // Hacemos la petición a la API
        const response = await fetch(url);
        const data = await response.json();
        
        // Devolvemos solo el array de resultados
        return data.results; 
    } catch (error) {
        console.error('Error al obtener películas:', error);
        return []; // Si falla, devolvemos un array vacío para que la app no se rompa
    }
}

// Función auxiliar para construir la URL de las imágenes
function getPosterUrl(posterPath) {
    if (!posterPath) {
        // Si la película no tiene póster, usamos una imagen por defecto
        return 'https://via.placeholder.com/300x450?text=Sin+Imagen';
    }
    return `${TMDB_CONFIG.imageURL}${posterPath}`;
}

// Función para obtener películas con diferentes criterios de ordenamiento
async function getMoviesByGenre(genreId, sortBy = 'popularity.desc') {
    try {
        const url = `${TMDB_CONFIG.baseURL}/discover/movie?api_key=${TMDB_CONFIG.apiKey}&with_genres=${genreId}&sort_by=${sortBy}&language=${TMDB_CONFIG.language}&page=1`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        return data.results; 
    } catch (error) {
        console.error('Error al obtener películas:', error);
        return [];
    }
}

// Función auxiliar para construir la URL de las imágenes
function getPosterUrl(posterPath) {
    if (!posterPath) {
        return 'https://via.placeholder.com/300x450?text=Sin+Imagen';
    }
    return `${TMDB_CONFIG.imageURL}${posterPath}`;
}