document.querySelectorAll('a[href^="#"]').forEach(enlace => {
    enlace.addEventListener('click', function (e) {
        const selector = this.getAttribute('href');
        const target = document.querySelector(selector);
        if (!target) return; // evita errores si no existe la sección
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Indicador de sección activa (throttle con requestAnimationFrame)
let ticking = false;
window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
        const fromTop = window.scrollY + 80;
        document.querySelectorAll("nav ul li a").forEach(link => {
            const href = link.getAttribute("href");
            const section = document.querySelector(href);
            if (!section) return;
            if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
        ticking = false;
    });
});

// Inicializar Swiper solo si existe (evita errores)
if (document.querySelector(".mySwiper")) {
  const swiper = new Swiper(".mySwiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

