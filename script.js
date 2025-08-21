// Scroll suave al hacer clic en los enlaces del menú
document.querySelectorAll('a[href^="#"]').forEach(enlace => {
    enlace.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Resaltar sección activa en el menú
window.addEventListener('scroll', () => {
    let fromTop = window.scrollY + 80;
    document.querySelectorAll("nav ul li a").forEach(link => {
        let section = document.querySelector(link.getAttribute("href"));
        if (
            section.offsetTop <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop
        ) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
});
