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

const navLinks = [...document.querySelectorAll('header nav a[href]')]
    .filter(link => link.textContent.trim());
const sectionLinks = navLinks
    .map(link => {
        const href = link.getAttribute('href');
        const sectionId = href.startsWith('#') ? href.slice(1) : 'hero';
        return { link, section: document.getElementById(sectionId) };
    })
    .filter(item => item.section);

function updateActiveLink() {
    const activationLine = window.innerHeight * 0.35;
    let current = sectionLinks[0];

    for (const item of sectionLinks) {
        if (item.section.getBoundingClientRect().top <= activationLine) {
            current = item;
        } else {
            break;
        }
    }

    navLinks.forEach(link => link.classList.toggle('active', link === current.link));
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
window.addEventListener('resize', updateActiveLink);
window.addEventListener('hashchange', updateActiveLink);
updateActiveLink();
