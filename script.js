document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Sistema de traducciones
    const translations = {
        es: {
            'nav-inicio': 'Inicio',
            'nav-sobre-mi': 'Sobre mí',
            'nav-proyectos': 'Proyectos',
            'nav-habilidades': 'Habilidades',
            'nav-contacto': 'Contacto',
            'hero-greeting': '¡Hola, mundo! Soy',
            'hero-typing': 'Ingeniero de Software',
            'hero-description': 'Especializado en transformar ideas en soluciones tecnológicas innovadoras con enfoque en análisis lógico, creatividad y atención al detalle.',
            'sobre-mi-title': 'Sobre mí',
            'sobre-mi-subtitle': 'Ingeniero de Software especializado en desarrollo backend y arquitecturas escalables',
            'sobre-mi-p1': 'Graduado en la Universidad de Ciencias Informáticas (UCI), Cuba (07-2024), con sólida experiencia en <strong>Django</strong>, <strong>Python</strong> y desarrollo de <strong>APIs REST</strong>. Especializado en sistemas de comercio electrónico y aplicaciones fintech con enfoque en seguridad y rendimiento.',
            'sobre-mi-p2': 'Mi experiencia incluye implementación de <strong>arquitecturas MVC</strong>, diseño de <strong>bases de datos relacionales</strong> (MySQL, PostgreSQL), integración de <strong>sistemas de pago</strong> y desarrollo de <strong>paneles administrativos</strong> con análisis de datos en tiempo real.',
            'sobre-mi-p3': 'Aplico metodologías ágiles como <strong>Scrum</strong>, principios <strong>SOLID</strong> y patrones de diseño para crear software mantenible y escalable. Mi enfoque combina buenas prácticas de desarrollo con <strong>testing automatizado</strong> y <strong>integración continua</strong>.',
            'proyectos-title': 'Proyectos',
            'project1-title': 'LikeHome E-commerce Platform',
            'project1-desc': 'Plataforma web completa para comercio electrónico que centraliza:',
            'project1-feature1': 'Gestión de inventario con seguimiento en tiempo real',
            'project1-feature2': 'Sistema de carritos y procesamiento de pedidos',
            'project1-feature3': 'Gestión de clientes y usuarios con control de acceso basado en roles',
            'project1-feature4': 'Panel de analítica con visualización de datos mensuales',
            'project1-feature5': 'Generación automática de PDFs para facturas y ofertas',
            'project1-feature6': 'API REST para integraciones externas',
            'project1-tech': 'Backend robusto con Django y APIs REST, complementado con frontend responsivo y base de datos optimizada.',
            'project2-title': 'Eglis S.A. - Sistema de Remesas',
            'project2-desc': 'Aplicación web financiera diseñada para automatizar procesos críticos de remesas y pagos:',
            'project2-feature1': 'Sistema de autenticación y autorización seguro',
            'project2-feature2': 'Procesamiento y validación de transacciones financieras',
            'project2-feature3': 'Notificaciones en tiempo real para usuarios y administradores',
            'project2-feature4': 'Dashboard administrativo con herramientas de gestión',
            'project2-feature5': 'Interfaz adaptativa para dispositivos móviles y escritorio',
            'project2-tech': 'Implementado con Django, JavaScript moderno y técnicas de UX centradas en el usuario para operaciones financieras.',
            'project-more-info': 'Más información',
            'habilidades-title': 'Habilidades',
            'skills-languages': 'Lenguajes',
            'skills-frameworks': 'Frameworks & Librerías',
            'skills-tools': 'Bases de Datos & Herramientas',
            'skills-methodologies': 'Metodologías & Soft Skills',
            'contacto-title': 'Contacto',
            'contact-email': 'Email',
            'contact-phone': 'Teléfono',
            'contact-linkedin': 'LinkedIn',
            'contact-github': 'GitHub',
            'cv-title': 'Mi CV',
            'cv-download': 'Descargar CV',
            'footer-copyright': '© 2025 - Manuel Marin. Todos los derechos reservados.',
            'about-education': 'Educación:',
            'about-location': 'Ubicación:',
            'about-languages': 'Idiomas:',
            'about-specialization': 'Especialización:',
            'about-education-value': 'Ingeniería de Software, UCI (2024)',
            'about-location-value': 'Cuba (Disponible para trabajo remoto)',
            'about-languages-value': 'Español (nativo), Inglés (B1-B2, en mejora continua)',
            'about-specialization-value': 'Backend Development, APIs REST, E-commerce',
            'skill-python': 'Python',
            'skill-javascript': 'JavaScript',
            'skill-typescript': 'TypeScript',
            'skill-htmlcss': 'HTML/CSS',
            'skill-django': 'Django',
            'skill-fastapi': 'FastAPI',
            'skill-nodejs': 'Node.js / Express',
            'skill-sqlmodel': 'SQLModel / PydanticAI',
            'tool-mysql': 'MySQL',
            'tool-postgresql': 'PostgreSQL',
            'tool-git': 'Git',
            'tool-github': 'GitHub',
            'tool-vscode': 'VS Code',
            'tool-pycharm': 'PyCharm',
            'tool-docker': 'Docker',
            'tool-restful': 'RESTful APIs',
            'methodology-scrum': 'Scrum',
            'methodology-analysis': 'Análisis de Sistemas',
            'methodology-design': 'Diseño de Software',
            'softskill-teamwork': 'Trabajo en Equipo',
            'softskill-problemsolving': 'Resolución de Problemas',
            'softskill-learning': 'Aprendizaje Rápido',
            'softskill-communication': 'Comunicación Efectiva',
            'softskill-adaptability': 'Adaptabilidad'
        },
        en: {
            'nav-inicio': 'Home',
            'nav-sobre-mi': 'About Me',
            'nav-proyectos': 'Projects',
            'nav-habilidades': 'Skills',
            'nav-contacto': 'Contact',
            'hero-greeting': 'Hello, world! I am',
            'hero-typing': 'Software Engineer',
            'hero-description': 'Specialized in transforming ideas into innovative technological solutions with a focus on logical analysis, creativity and attention to detail.',
            'sobre-mi-title': 'About Me',
            'sobre-mi-subtitle': 'Software Engineer specialized in backend development and scalable architectures',
            'sobre-mi-p1': 'Graduated from the University of Computer Sciences (UCI), Cuba (07-2024), with solid experience in <strong>Django</strong>, <strong>Python</strong> and <strong>REST APIs</strong> development. Specialized in e-commerce systems and fintech applications with focus on security and performance.',
            'sobre-mi-p2': 'My experience includes implementation of <strong>MVC architectures</strong>, design of <strong>relational databases</strong> (MySQL, PostgreSQL), integration of <strong>payment systems</strong> and development of <strong>administrative panels</strong> with real-time data analysis.',
            'sobre-mi-p3': 'I apply agile methodologies like <strong>Scrum</strong>, <strong>SOLID</strong> principles and design patterns to create maintainable and scalable software. My approach combines best development practices with <strong>automated testing</strong> and <strong>continuous integration</strong>.',
            'proyectos-title': 'Projects',
            'project1-title': 'LikeHome E-commerce Platform',
            'project1-desc': 'Complete web platform for e-commerce that centralizes:',
            'project1-feature1': 'Real-time inventory management and tracking',
            'project1-feature2': 'Shopping cart system and order processing',
            'project1-feature3': 'Customer and user management with role-based access control',
            'project1-feature4': 'Analytics dashboard with monthly data visualization',
            'project1-feature5': 'Automatic PDF generation for invoices and quotes',
            'project1-feature6': 'REST API for external integrations',
            'project1-tech': 'Robust backend with Django and REST APIs, complemented by responsive frontend and optimized database.',
            'project2-title': 'Eglis S.A. - Remittance System',
            'project2-desc': 'Financial web application designed to automate critical remittance and payment processes:',
            'project2-feature1': 'Secure authentication and authorization system',
            'project2-feature2': 'Financial transaction processing and validation',
            'project2-feature3': 'Real-time notifications for users and administrators',
            'project2-feature4': 'Administrative dashboard with management tools',
            'project2-feature5': 'Adaptive interface for mobile devices and desktop',
            'project2-tech': 'Implemented with Django, modern JavaScript and UX techniques focused on user experience for financial operations.',
            'project-more-info': 'More information',
            'habilidades-title': 'Skills',
            'skills-languages': 'Languages',
            'skills-frameworks': 'Frameworks & Libraries',
            'skills-tools': 'Databases & Tools',
            'skills-methodologies': 'Methodologies & Soft Skills',
            'contacto-title': 'Contact',
            'contact-email': 'Email',
            'contact-phone': 'Phone',
            'contact-linkedin': 'LinkedIn',
            'contact-github': 'GitHub',
            'cv-title': 'My CV',
            'cv-download': 'Download CV',
            'footer-copyright': '© 2025 - Manuel Marin. All rights reserved.',
            'about-education': 'Education:',
            'about-location': 'Location:',
            'about-languages': 'Languages:',
            'about-specialization': 'Specialization:',
            'about-education-value': 'Software Engineering, UCI (2024)',
            'about-location-value': 'Cuba (Available for remote work)',
            'about-languages-value': 'Spanish (native), English (B1-B2, continuously improving)',
            'about-specialization-value': 'Backend Development, REST APIs, E-commerce',
            'skill-python': 'Python',
            'skill-javascript': 'JavaScript',
            'skill-typescript': 'TypeScript',
            'skill-htmlcss': 'HTML/CSS',
            'skill-django': 'Django',
            'skill-fastapi': 'FastAPI',
            'skill-nodejs': 'Node.js / Express',
            'skill-sqlmodel': 'SQLModel / PydanticAI',
            'tool-mysql': 'MySQL',
            'tool-postgresql': 'PostgreSQL',
            'tool-git': 'Git',
            'tool-github': 'GitHub',
            'tool-vscode': 'VS Code',
            'tool-pycharm': 'PyCharm',
            'tool-docker': 'Docker',
            'tool-restful': 'RESTful APIs',
            'methodology-scrum': 'Scrum',
            'methodology-analysis': 'Systems Analysis',
            'methodology-design': 'Software Design',
            'softskill-teamwork': 'Teamwork',
            'softskill-problemsolving': 'Problem Solving',
            'softskill-learning': 'Fast Learning',
            'softskill-communication': 'Effective Communication',
            'softskill-adaptability': 'Adaptability'
        }
    };

    // Estado actual
    let currentLang = localStorage.getItem('language') || 'es';
    let isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Función para cambiar idioma
    function changeLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('language', lang);
        
        // Actualizar todos los elementos con data-lang
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });
        
        // Actualizar frases del typing effect
        if (window.typeWriterInterval) {
            clearInterval(window.typeWriterInterval);
        }
        const typingElement = document.querySelector('.typing-text');
        if (typingElement) {
            const phrases = lang === 'es' 
                ? ['Ingeniero de Software', 'Desarrollador Python', 'Desarrollador Web', 'Solucionador de Problemas']
                : ['Software Engineer', 'Python Developer', 'Web Developer', 'Problem Solver'];
            
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
                    isDeleting = true;
                    typingSpeed = 1500;
                } else if (isDeleting && currentChar === 0) {
                    isDeleting = false;
                    currentPhrase = (currentPhrase + 1) % phrases.length;
                    typingSpeed = 500;
                }
                
                window.typeWriterInterval = setTimeout(typeWriter, typingSpeed);
            }
            
            setTimeout(typeWriter, 1000);
        }
        
        // Actualizar botón de idioma
        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) {
            langToggle.innerHTML = lang === 'es' ? '<i class="fas fa-globe"></i>' : '<i class="fas fa-globe-americas"></i>';
            langToggle.setAttribute('title', lang === 'es' ? 'Switch to English' : 'Cambiar a Español');
        }
    }

    // Función para cambiar modo oscuro
    function toggleDarkMode() {
        isDarkMode = !isDarkMode;
        localStorage.setItem('darkMode', isDarkMode);
        
        const body = document.body;
        const themeToggle = document.getElementById('theme-toggle');
        
        if (isDarkMode) {
            body.classList.add('dark-mode');
            themeToggle.classList.remove('light-mode-icon');
            themeToggle.classList.add('dark-mode-icon');
            themeToggle.setAttribute('title', 'Switch to Light Mode');
        } else {
            body.classList.remove('dark-mode');
            themeToggle.classList.remove('dark-mode-icon');
            themeToggle.classList.add('light-mode-icon');
            themeToggle.setAttribute('title', 'Switch to Dark Mode');
        }
    }

    // Inicializar estado
    changeLanguage(currentLang);
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.classList.remove('light-mode-icon');
            themeToggle.classList.add('dark-mode-icon');
        }
    }

    // Event listeners para los toggles
    const langToggle = document.getElementById('lang-toggle');
    const themeToggle = document.getElementById('theme-toggle');
    
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const newLang = currentLang === 'es' ? 'en' : 'es';
            changeLanguage(newLang);
        });
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleDarkMode);
    }

    // Efecto de escritura para el texto typing
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const phrases = currentLang === 'es' 
            ? ['Software Engineer', 'Python Developer', 'Web Developer', 'Problem Solver']
            : ['Software Engineer', 'Python Developer', 'Web Developer', 'Problem Solver'];
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
            
            let targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil después de hacer clic
                if (document.getElementById('nav-menu').classList.contains('show')) {
                    document.getElementById('nav-menu').classList.remove('show');
                }
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