// Navegación suave
        document.querySelectorAll('a[href^="#"]').forEach(enlace => {
            enlace.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil después de hacer clic
                if (document.getElementById('nav-menu').classList.contains('show')) {
                    document.getElementById('nav-menu').classList.remove('show');
                }
            });
        });

        // Cambiar clase activa en navegación al hacer scroll
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

        // Inicializar Swiper para los carruseles
        var swipers = document.querySelectorAll('.mySwiper');
        swipers.forEach(function(swiperElement) {
            new Swiper(swiperElement, {
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
        });

        // Menú móvil
        document.getElementById('mobile-menu').addEventListener('click', function() {
            document.getElementById('nav-menu').classList.toggle('show');
        });

        // Cerrar menú al hacer clic fuera de él
        document.addEventListener('click', function(event) {
            const navMenu = document.getElementById('nav-menu');
            const mobileMenu = document.getElementById('mobile-menu');
            
            if (!navMenu.contains(event.target) && !mobileMenu.contains(event.target) && navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
            }
        });