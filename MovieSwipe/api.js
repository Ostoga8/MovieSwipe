/**
 * Módulo de conexión con la API de TMDB
 */

// Obtener el idioma del navegador para pedirlo a TMDB
function getTmdbLanguage() {
    const userLang = navigator.language;
    const langMap = {
        'zh': 'zh-CN',
        'zh-CN': 'zh-CN',
        'zh-TW': 'zh-CN',
        'ja': 'ja',
        'ko': 'ko',
        'es': 'es-ES',
        'en': 'en-US',
        'fr': 'fr-FR',
        'de': 'de-DE',
        'it': 'it-IT',
        'pt': 'pt-PT'
    };
    
    const shortLang = userLang.split('-')[0];
    return langMap[userLang] || langMap[shortLang] || 'en-US';
}

// Función para obtener películas con diferentes criterios de ordenamiento
async function getMoviesByGenre(genreId, sortBy = 'popularity.desc') {
    try {
        const tmdbLang = getTmdbLanguage();
        const url = `${TMDB_CONFIG.baseURL}/discover/movie?api_key=${TMDB_CONFIG.apiKey}&with_genres=${genreId}&sort_by=${sortBy}&language=${tmdbLang}&page=1`;
        
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