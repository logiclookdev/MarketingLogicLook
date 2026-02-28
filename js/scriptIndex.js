(function() {
            // header toggle mobile
            const navToggle = document.getElementById('navToggle');
            const navLinks = document.getElementById('navLinks');
            if (navToggle) {
                navToggle.addEventListener('click', () => {
                    navLinks.classList.toggle('active');
                });
            }
            // cerrar menú al hacer click en un link (mobile)
            navLinks?.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', (e) => {
                    if (window.innerWidth <= 900) navLinks.classList.remove('active');
                });
            });

            // formulario feedback sin recargar
            const form = document.getElementById('contactForm');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const feedback = document.getElementById('formFeedback');
                    feedback.textContent = '¡Gracias! Te contactaremos en breve.';
                    form.reset();
                    setTimeout(() => { feedback.textContent = ''; }, 4000);
                });
            }

            // Lazy loading en video (poster ya está, aseguramos preload)
            document.querySelectorAll('video').forEach(v => v.setAttribute('preload', 'none'));

            // scroll con offset para header fijo
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href === "#" || href === "") return;
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        const offset = 80;
                        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
                    }
                });
            });

            // LIGHTBOX para imágenes del portafolio
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightboxImg');
            const lightboxClose = document.getElementById('lightboxClose');
            
            // Agregar click a todas las imágenes del portafolio
            document.querySelectorAll('.portfolio-item img').forEach(img => {
                img.addEventListener('click', function(e) {
                    e.stopPropagation();
                    lightboxImg.src = this.src;
                    lightbox.classList.add('active');
                });
            });

            // Cerrar lightbox al hacer click en la X o fuera de la imagen
            lightboxClose.addEventListener('click', () => {
                lightbox.classList.remove('active');
            });

            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    lightbox.classList.remove('active');
                }
            });

            // Cerrar con tecla ESC
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                    lightbox.classList.remove('active');
                }
            });
        })();