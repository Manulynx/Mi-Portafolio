document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Efecto de escritura para el texto typing
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const phrases = ['Software Engineer', 'Python Developer', 'Web Developer', 'Problem Solver'];
        let currentPhrase = 0;
        let currentChar = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeWriter() {
            const currentText = phrases[currentPhrase];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, currentChar - 1);
                currentChar--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentText.substring(0, currentChar + 1);
                currentChar++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && currentChar === currentText.length) {
                // Pausa al final de la escritura
                isDeleting = true;
                typingSpeed = 1500; // Pausa antes de empezar a borrar
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentPhrase = (currentPhrase + 1) % phrases.length;
                typingSpeed = 500; // Pausa antes de empezar a escribir nueva frase
            }
            
            setTimeout(typeWriter, typingSpeed);
        }
        
        // Iniciar efecto de escritura después de una pausa
        setTimeout(typeWriter, 1000);
    }

    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');

            // Soporte para botón "Volver arriba" y anclas vacías
            if (href === '#' || href === '' || href === '#top') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }

            // Cerrar menú móvil después de hacer clic
            const navMenu = document.getElementById('nav-menu');
            if (navMenu && navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
            }
        });
    });

    // Cambiar clase activa en navegación al hacer scroll
    function updateActiveNavItem() {
        let fromTop = window.scrollY + 100;
        
        document.querySelectorAll("nav ul li a").forEach(link => {
            let section = document.querySelector(link.getAttribute("href"));
            if (section) {
                if (
                    section.offsetTop <= fromTop &&
                    section.offsetTop + section.offsetHeight > fromTop
                ) {
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                }
            }
        });
        
        // Mostrar/ocultar botón "Volver arriba"
        let backToTopButton = document.querySelector('.back-to-top');
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    }
    
    window.addEventListener('scroll', updateActiveNavItem);
    updateActiveNavItem(); // Ejecutar al cargar la página

    // Inicializar Swiper para los carruseles
    var swipers = document.querySelectorAll('.mySwiper');
    swipers.forEach(function(swiperElement) {
        new Swiper(swiperElement, {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            effect: "fade",
            fadeEffect: {
                crossFade: true
            },
        });
    });

    // Menú móvil
    const mobileMenuBtn = document.getElementById('mobile-menu');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            document.getElementById('nav-menu').classList.toggle('show');
        });
    }

    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        const navMenu = document.getElementById('nav-menu');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (navMenu && mobileMenu && !navMenu.contains(event.target) && !mobileMenu.contains(event.target) && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
        }
    });

    // Manejar el formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Aquí normalmente enviarías los datos a un servidor
            // Por ahora, solo mostraremos una alerta
            alert(`¡Gracias ${name} por tu mensaje! Te responderé lo antes posible.`);
            contactForm.reset();
        });
    }

    // Animación para los números de estadísticas o contadores (si los agregaras en el futuro)
    function startCounters() {
        const counters = document.querySelectorAll('.counter-value');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let count = 0;
            const increment = Math.ceil(target / 60); // Velocidad de conteo
            
            const updateCounter = () => {
                if (count < target) {
                    count += increment;
                    if (count > target) count = target;
                    counter.textContent = count;
                    setTimeout(updateCounter, 30);
                }
            };
            
            updateCounter();
        });
    }
    
    // Función para verificar si un elemento está visible en la ventana
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Iniciar animaciones cuando elementos entran en el viewport
    function checkAnimations() {
        const animatedElements = document.querySelectorAll('.counter-section');
        animatedElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                startCounters();
                element.classList.add('animated');
            }
        });
    }

    // Verificar animaciones al hacer scroll
    window.addEventListener('scroll', checkAnimations);
    checkAnimations(); // Verificar al cargar la página
});