// Navegación básica entre pantallas
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

// Selector de mood (por ahora solo navega)
document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const genre = e.target.dataset.genre;
        console.log('Género seleccionado:', genre);
        showScreen('screen-swipe');
    });
});

// Botones de swipe (por ahora solo navegan)
document.getElementById('btn-accept').addEventListener('click', () => {
    console.log('Aceptada');
    showScreen('screen-result');
});

document.getElementById('btn-reject').addEventListener('click', () => {
    console.log('Rechazada');
});