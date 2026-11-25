const themeToggleButton = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
const initialTheme = savedTheme === 'light' ? 'light' : 'dark';
applyTheme(initialTheme);


themeToggleButton.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
});

function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    htmlElement.style.colorScheme = theme;

    const isDark = theme === 'dark';
    themeIcon.src = isDark
        ? './img/modo-nocturno.png'
        : './img/modo-claro.png';
        
    themeIcon.alt = isDark
        ? 'Icono para cambiar a modo claro'
        : 'Icono para cambiar a modo oscuro';
    themeToggleButton.setAttribute('aria-pressed', String(!isDark));
    themeToggleButton.setAttribute(
        'aria-label',
        isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
    );
    themeToggleButton.title = isDark
        ? 'Cambiar a modo claro'
        : 'Cambiar a modo oscuro';

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
        themeColor.setAttribute('content', isDark ? '#020617' : '#f6f7eb');
    }
}

document.querySelectorAll('.project-carousel').forEach(carousel => {
    const slides = [...carousel.querySelectorAll('.project-carousel-slide')];
    const previousButton = carousel.querySelector('[data-carousel-prev]');
    const nextButton = carousel.querySelector('[data-carousel-next]');
    const counter = carousel.querySelector('[data-carousel-count]');

    if (!slides.length || !previousButton || !nextButton || !counter) {
        console.error('El carrusel del proyecto no tiene imágenes o controles completos.');
        return;
    }

    let activeSlide = 0;

    function showSlide(index) {
        activeSlide = (index + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => {
            slide.hidden = slideIndex !== activeSlide;
        });
        counter.textContent = `${activeSlide + 1} / ${slides.length}`;
        counter.setAttribute('aria-label', `Imagen ${activeSlide + 1} de ${slides.length}`);
        previousButton.disabled = slides.length < 2;
        nextButton.disabled = slides.length < 2;
    }

    previousButton.addEventListener('click', () => showSlide(activeSlide - 1));
    nextButton.addEventListener('click', () => showSlide(activeSlide + 1));
    showSlide(activeSlide);
});

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
    if (!sectionLinks.length) {
        return;
    }

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
