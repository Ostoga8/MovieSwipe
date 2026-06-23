// Variables globales
let currentMovies = [];
let currentIndex = 0;
let selectedGenre = null;
let acceptedMovies = []; // ← AÑADIR: Para guardar las que aceptas
let currentSort = 'popularity.desc'; // ← Nuevo: filtro activo

// Navegación entre pantallas
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Botón volver
document.getElementById('btn-back').addEventListener('click', () => {
    showScreen('screen-mood');
});

// Botón reiniciar
document.getElementById('btn-restart').addEventListener('click', () => {
    showScreen('screen-mood');
});

// Selector de mood - Cargar películas reales
document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
        const genre = e.target.dataset.genre;
        selectedGenre = genre;
        
        // REINICIAR listas
        acceptedMovies = [];
        currentMovies = [];
        currentIndex = 0;
        
        console.log('Género seleccionado:', GENRES[genre]);
        console.log('Filtro:', currentSort);
        console.log('Cargando películas...');
        
        // Obtener películas de la API con el filtro seleccionado
        currentMovies = await getMoviesByGenre(genre, currentSort);
        
        if (currentMovies.length > 0) {
            console.log(`${currentMovies.length} películas cargadas`);
            showScreen('screen-swipe');
            displayMovie(currentIndex);
        } else {
            alert(t('no_movies'));
        }
    });
});

// Función para cambiar el filtro de ordenamiento
function setSortFilter(sortType, btnElement) {
    currentSort = sortType;
    
    // 1. Quitar la clase 'active' de TODOS los botones
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 2. Añadir la clase 'active' SOLO al botón clicado
    if (btnElement) {
        btnElement.classList.add('active');
    }
    
    console.log('Filtro cambiado a:', sortType);
}

// Función para mostrar película en la tarjeta
function displayMovie(index) {
    if (index >= currentMovies.length) {
        showResult();
        return;
    }
    
    const movie = currentMovies[index];
    
    // Actualizar DOM
    document.getElementById('movie-poster').src = getPosterUrl(movie.poster_path);
    document.getElementById('movie-title').textContent = movie.title;
    document.getElementById('movie-year').textContent = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
    document.getElementById('card-count').textContent = `${index + 1}/${currentMovies.length}`;
    
    // AÑADIR: Descripción (sinopsis)
    const overviewEl = document.getElementById('movie-overview');
    if (overviewEl) {
        if (movie.overview && movie.overview.trim() !== '') {
            overviewEl.textContent = movie.overview;
            overviewEl.classList.remove('no-overview'); // Quitar estilo de error si existía
        } else {
            // Mensaje con personalidad si no hay traducción
            // Por esto:
            overviewEl.textContent = t('no_overview');
            overviewEl.classList.add('no-overview'); // Añadir estilo italic
        }
    }
}

// Botón aceptar (swipe right)
document.getElementById('btn-accept').addEventListener('click', () => {
    const movie = currentMovies[currentIndex];
    console.log('✅ Aceptada:', movie.title);
    
    // GUARDAR en la lista de aceptadas
    acceptedMovies.push(movie);
    
    currentIndex++;
    displayMovie(currentIndex);
});

// Botón rechazar (swipe left)
document.getElementById('btn-reject').addEventListener('click', () => {
    console.log('❌ Rechazada:', currentMovies[currentIndex].title);
    currentIndex++;
    displayMovie(currentIndex);
});

// Función para mostrar el resultado final
function showResult() {
    // Verificar si hay películas aceptadas
    if (acceptedMovies.length === 0) {
        // Si no aceptó ninguna, mostrar mensaje
        document.getElementById('result-rating').textContent = '';
        // Por esto:
        document.getElementById('result-title').textContent = t('no_accepted');
        document.getElementById('result-overview').textContent = t('no_accepted_desc');
        document.getElementById('result-poster').src = 'https://via.placeholder.com/250x375?text=Sin+Pel%C3%ADculas';
    } else {
        // Algoritmo: seleccionar la película con mayor rating DE LAS ACEPTADAS
        const winner = acceptedMovies.reduce((best, current) => {
            return current.vote_average > best.vote_average ? current : best;
        });
        
        // Actualizar pantalla de resultado
        document.getElementById('result-poster').src = getPosterUrl(winner.poster_path);
        document.getElementById('result-title').textContent = winner.title;
        document.getElementById('result-rating').textContent = `⭐ ${winner.vote_average.toFixed(1)}`;
        document.getElementById('result-overview').textContent = winner.overview || 'Sin sinopsis disponible';
    }
    
    showScreen('screen-result');
}