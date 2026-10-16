const themeToggleButton = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);
}


themeToggleButton.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        htmlElement.removeAttribute('data-theme'); 
        localStorage.setItem('theme', 'light');
        updateIcon('light');
    } else {
        htmlElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        updateIcon('dark');
    }
});

function updateIcon(theme) {
    if (theme === 'dark') {
        themeIcon.src = 'img/sol.png'; 
        themeIcon.alt = 'Cambiar a modo claro';
    } else {
        themeIcon.src = 'img/luna-creciente.png';  
        themeIcon.alt = 'Cambiar a modo oscuro';
    }
}