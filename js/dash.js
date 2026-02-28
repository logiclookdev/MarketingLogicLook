 // Variables
        let currentSection = 'dashboard';
        let itemToDelete = null;

        // Funciones del menú hamburguesa
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebarOverlay');
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        }

        function closeSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebarOverlay');
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        }

        // Cambiar entre secciones
        function switchSection(section) {
            // Ocultar todas las secciones
            document.querySelectorAll('.content-section').forEach(el => {
                el.classList.remove('active');
            });
            
            // Mostrar la sección seleccionada
            document.getElementById(section + 'Section').classList.add('active');
            
            // Actualizar título
            const titles = {
                'dashboard': 'Dashboard',
                'blog': 'Gestión del Blog',
                'portfolio': 'Portafolio',
                'services': 'Servicios',
                'testimonials': 'Testimonios',
                'about': 'Sobre Nosotros',
                'contact': 'Contacto',
                'config': 'Configuración'
            };
            document.getElementById('sectionTitle').textContent = titles[section];
            
            // Actualizar active en sidebar
            document.querySelectorAll('.sidebar-nav ul li a').forEach(link => {
                link.classList.remove('active');
            });
            const activeLink = document.getElementById('nav-' + section);
            if (activeLink) activeLink.classList.add('active');
            
            // Mostrar/ocultar botón flotante
            const fab = document.getElementById('fabDashboard');
            if (section !== 'dashboard') {
                fab.style.display = 'flex';
            } else {
                fab.style.display = 'none';
            }
            
            // Cerrar sidebar en móvil
            if (window.innerWidth <= 900) {
                closeSidebar();
            }
            
            currentSection = section;
        }

        // Funciones para modales
        function openModal(modalId) {
            document.getElementById(modalId).classList.add('active');
            showLoader(false);
        }

        function closeModal(modalId) {
            document.getElementById(modalId).classList.remove('active');
        }

        // Loader
        function showLoader(show = true) {
            const loader = document.getElementById('loader');
            if (show) {
                loader.classList.add('active');
            } else {
                loader.classList.remove('active');
            }
        }

        // Blog Modal
        function openBlogModal(accion, id = null) {
            const modalTitle = document.getElementById('blogModalTitle');
            const form = document.getElementById('blogForm');
            
            if (accion === 'nuevo') {
                modalTitle.textContent = 'Nuevo Post';
                form.reset();
                document.getElementById('blogPostId').value = '';
            } else {
                modalTitle.textContent = 'Editar Post';
                document.getElementById('blogPostId').value = id;
                document.getElementById('blogTitulo').value = 'Tendencias 2025 en video marketing';
                document.getElementById('blogCategoria').value = 'Marketing';
                document.getElementById('blogExtracto').value = 'El poder del contenido efímero y la IA.';
            }
            
            openModal('blogModal');
        }

        // Portfolio Modal
        function openPortfolioModal(accion, id = null) {
            const modalTitle = document.getElementById('portfolioModalTitle');
            
            if (accion === 'nuevo') {
                modalTitle.textContent = 'Nuevo Proyecto';
                document.getElementById('portfolioForm').reset();
                document.getElementById('portfolioId').value = '';
            } else {
                modalTitle.textContent = 'Editar Proyecto';
                document.getElementById('portfolioId').value = id;
                document.getElementById('portfolioTitulo').value = 'Campaña Digital - Nike';
                document.getElementById('portfolioDescripcion').value = 'Campaña integral de marketing digital';
            }
            
            openModal('portfolioModal');
        }

        // Service Modal (simulado)
        function openServiceModal(accion, id = null) {
            showLoader(true);
            setTimeout(() => {
                showLoader(false);
                openInfoModal('Éxito', 'Funcionalidad en desarrollo');
            }, 800);
        }

        // Testimonial Modal (simulado)
        function openTestimonialModal(accion, id = null) {
            showLoader(true);
            setTimeout(() => {
                showLoader(false);
                openInfoModal('Éxito', 'Funcionalidad en desarrollo');
            }, 800);
        }

        // About Modal (simulado)
        function openAboutModal() {
            showLoader(true);
            setTimeout(() => {
                showLoader(false);
                openInfoModal('Éxito', 'Funcionalidad en desarrollo');
            }, 800);
        }

        // Contact Modal (simulado)
        function openContactModal() {
            showLoader(true);
            setTimeout(() => {
                showLoader(false);
                openInfoModal('Éxito', 'Funcionalidad en desarrollo');
            }, 800);
        }

        // Config Modal
        function openConfigModal() {
            openModal('configModal');
        }

        // Delete Modal
        function openDeleteModal(tipo, id) {
            itemToDelete = { type: tipo, id: id };
            openModal('deleteModal');
        }

        // Info Modal
        function openInfoModal(title, message) {
            document.getElementById('infoModalTitle').textContent = title;
            document.getElementById('infoModalMessage').textContent = message;
            openModal('infoModal');
        }

        // Confirmar eliminación
        document.getElementById('confirmDeleteBtn').addEventListener('click', function() {
            if(itemToDelete) {
                closeModal('deleteModal');
                openInfoModal('Eliminado', `El ${itemToDelete.type} #${itemToDelete.id} ha sido eliminado correctamente.`);
                itemToDelete = null;
            }
        });

        // Logout
        function logout() {
            showLoader(true);
            setTimeout(() => {
                showLoader(false);
                window.location.href = 'index.html';
            }, 800);
        }

        // Prevenir envío de formularios
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                closeModal(this.closest('.modal').id);
                openInfoModal('Éxito', 'Cambios guardados correctamente');
            });
        });

        // Cerrar modales con ESC
        document.addEventListener('keydown', (e) => {
            if(e.key === 'Escape') {
                document.querySelectorAll('.modal-overlay.active, .modal.active').forEach(modal => {
                    modal.classList.remove('active');
                });
                closeSidebar();
            }
        });

        // Cerrar sidebar al hacer resize
        window.addEventListener('resize', () => {
            if(window.innerWidth > 900) {
                closeSidebar();
            }
        });

        // Inicializar
        switchSection('dashboard');