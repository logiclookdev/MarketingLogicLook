 // ===== VARIABLES GLOBALES =====
        let currentSection = 'dashboard';
        let itemToDelete = null;

        // ===== FUNCIONES DEL MENÚ HAMBURGUESA =====
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

        // ===== CAMBIAR ENTRE SECCIONES =====
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

            // Cerrar sidebar en móvil
            if (window.innerWidth <= 900) {
                closeSidebar();
            }
            
            currentSection = section;
        }

        // ===== FUNCIONES PARA MODALES =====
        function openModal(modalId) {
            document.getElementById(modalId).classList.add('active');
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

        // ===== MODAL PARA BLOG =====
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

        // ===== MODAL PARA PORTAFOLIO =====
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

        // ===== MODAL PARA SERVICIOS =====
        function openServiceModal(accion, id = null) {
            const modalTitle = document.getElementById('serviceModalTitle');
            
            if (accion === 'nuevo') {
                modalTitle.textContent = 'Nuevo Servicio';
                document.getElementById('serviceForm').reset();
                document.getElementById('serviceId').value = '';
            } else {
                modalTitle.textContent = 'Editar Servicio';
                document.getElementById('serviceId').value = id;
                document.getElementById('serviceTitulo').value = 'Marketing digital';
                document.getElementById('serviceDescripcion').value = 'Estrategias data-driven, ads, social media';
                document.getElementById('serviceIcono').value = 'fa-chart-line';
            }
            
            openModal('serviceModal');
        }

        // ===== MODAL PARA TESTIMONIOS =====
        function openTestimonialModal(accion, id = null) {
            const modalTitle = document.getElementById('testimonialModalTitle');
            
            if (accion === 'nuevo') {
                modalTitle.textContent = 'Nuevo Testimonio';
                document.getElementById('testimonialForm').reset();
                document.getElementById('testimonialId').value = '';
            } else {
                modalTitle.textContent = 'Editar Testimonio';
                document.getElementById('testimonialId').value = id;
                document.getElementById('testimonialCliente').value = 'Laura Méndez';
                document.getElementById('testimonialCargo').value = 'CMO de InnovaCorp';
                document.getElementById('testimonialTexto').value = 'Eduardo y su equipo transformaron nuestra presencia digital...';
            }
            
            openModal('testimonialModal');
        }

        // ===== MODAL PARA SOBRE NOSOTROS =====
        function openAboutModal() {
            openModal('aboutModal');
        }

        // ===== MODAL PARA CONTACTO (usa configModal) =====
        function openContactModal() {
            openModal('configModal');
        }

        // ===== MODAL PARA CONFIGURACIÓN =====
        function openConfigModal() {
            openModal('configModal');
        }

        // ===== MODAL PARA ELIMINAR =====
        function openDeleteModal(tipo, id) {
            itemToDelete = { type: tipo, id: id };
            openModal('deleteModal');
        }

        // ===== MODAL INFORMATIVO =====
        function openInfoModal(title, message) {
            document.getElementById('infoModalTitle').textContent = title;
            document.getElementById('infoModalMessage').textContent = message;
            openModal('infoModal');
        }

        // ===== CONFIRMAR ELIMINACIÓN =====
        document.getElementById('confirmDeleteBtn').addEventListener('click', function() {
            if(itemToDelete) {
                closeModal('deleteModal');
                openInfoModal('Eliminado', `El ${itemToDelete.type} #${itemToDelete.id} ha sido eliminado correctamente.`);
                itemToDelete = null;
            }
        });

        // ===== LOGOUT =====
        function logout() {
            showLoader(true);
            setTimeout(() => {
                showLoader(false);
                window.location.href = 'index.html';
            }, 800);
        }

        // ===== PREVENIR ENVÍO DE FORMULARIOS =====
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                closeModal(this.closest('.modal').id);
                openInfoModal('Éxito', 'Cambios guardados correctamente');
            });
        });

        // ===== CERRAR MODALES CON TECLA ESC =====
        document.addEventListener('keydown', (e) => {
            if(e.key === 'Escape') {
                document.querySelectorAll('.modal-overlay.active, .modal.active').forEach(modal => {
                    modal.classList.remove('active');
                });
                closeSidebar();
            }
        });

        // ===== CERRAR SIDEBAR AL HACER RESIZE =====
        window.addEventListener('resize', () => {
            if(window.innerWidth > 900) {
                closeSidebar();
            }
        });

        // ===== INICIALIZAR =====
        switchSection('dashboard');