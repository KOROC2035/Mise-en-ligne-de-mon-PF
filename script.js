// Créer des particules animées
        function createParticles() {
            const container = document.getElementById('particles');
            const colors = ['#00ffff', '#ff8c00', '#8a2be2', '#00ff7f'];
            const particleCount = window.innerWidth < 768 ? 15 : 30;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                const size = window.innerWidth < 768 ? 
                    Math.random() * 60 + 30 : 
                    Math.random() * 100 + 50;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                particle.style.animationDelay = Math.random() * 10 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
                container.appendChild(particle);
            }
        }

        createParticles();

        // Recréer les particules lors du redimensionnement
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const container = document.getElementById('particles');
                container.innerHTML = '';
                createParticles();
            }, 250);
        });

        // Menu mobile
        const menuBtn = document.getElementById('menuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const menuIcon = document.getElementById('menuIcon');
        const closeIcon = document.getElementById('closeIcon');

        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            menuIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        });

        // Fermer le menu mobile lors du clic sur un lien
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            });
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Fermer le menu mobile si on clique en dehors
        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            }
        });

        // Animation au scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animation des compteurs
                    if (entry.target.querySelector('.stats-counter')) {
                        animateCounters(entry.target);
                    }
                    
                    // Animation des barres de compétences
                    if (entry.target.querySelector('.skill-progress')) {
                        animateSkillBars(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observer toutes les sections
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });

        // Animation des compteurs
        function animateCounters(section) {
            const counters = section.querySelectorAll('.stats-counter');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const suffix = counter.textContent.includes('%') ? '%' : '+';
                let current = 0;
                const increment = target / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current) + (suffix === '%' ? '%' : suffix);
                }, 40);
            });
        }

        // Animation des barres de compétences
        function animateSkillBars(section) {
            const skillBars = section.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            });
        }

        // Navigation active au scroll
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('nav-active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('nav-active');
                }
            });

            // Effet sur la navigation
            const nav = document.getElementById('mainNav');
            if (window.scrollY > 100) {
                nav.classList.add('nav-scrolled');
            } else {
                nav.classList.remove('nav-scrolled');
            }
        });

        // Filtrage des projets
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectItems = document.querySelectorAll('.project-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Mettre à jour les boutons actifs
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filtrer les projets
                projectItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Animation de la section hero au chargement
        window.addEventListener('load', () => {
            const heroElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
            heroElements.forEach(el => {
                el.style.animationPlayState = 'running';
            });
        });

        // Données des projets
        const projectsData = {
            1: {
                title: "Assistant juridique IA Langchain",
                category: "IA",
                description: "Assistant intelligent développé avec Langchain, capable de répondre aux questions en lien avec le droit civil. Cette application utilise des modèles de langage avancés pour comprendre et traiter les requêtes juridiques complexes.",
                features: [
                    "Compréhension contextuelle des questions juridiques",
                    "Réponses précises basées sur le droit civil",
                    "Interface utilisateur intuitive",
                    "Traitement en temps réel des requêtes"
                ],
                challenges: "Le principal défi était de garantir la précision des réponses juridiques tout en maintenant une interface accessible pour les non-experts. J'ai dû mettre en place un système de validation des réponses et optimiser les performances pour un temps de réponse rapide.",
                technologies: ["Langchain", "Python", "FastAPI", "Streamlit"],
                github: "#",
                demo: "#",
                image: "Projet_1.jpeg"
            },
            2: {
                title: "Site web d'une imprimerie SMART VISUEL",
                category: "Web",
                description: "Site web conçu sur mesure pour la présentation de l'entreprise, la mise en valeur de son expertise et de ses services. Design moderne et responsive optimisé pour le référencement et l'expérience utilisateur.",
                features: [
                    "Design responsive et moderne",
                    "Présentation des services d'impression",
                    "Formulaire de contact intégré",
                    "Optimisation SEO avancée"
                ],
                challenges: "Créer une identité visuelle forte qui reflète le professionnalisme de l'entreprise tout en garantissant une expérience utilisateur fluide sur tous les appareils. J'ai particulièrement travaillé l'optimisation des images pour le secteur de l'impression.",
                technologies: ["HTML/CSS", "TailwindCSS", "JavaScript", "PHP"],
                github: "#",
                demo: "#",
                image: "Projet_2.png"
            },
            3: {
                title: "Assistant IA qui résume des documents PDFs",
                category: "IA",
                description: "Assistant intelligent créé pour faire le résumé de documents PDFs développé avec Langchain et Streamlit. L'application permet de traiter des documents longs et d'en extraire les points essentiels automatiquement.",
                features: [
                    "Extraction automatique du contenu des PDF",
                    "Génération de résumés structurés",
                    "Interface drag-and-drop pour l'upload",
                    "Support de documents en plusieurs langues"
                ],
                challenges: "La gestion des documents PDF de différentes structures et tailles représentait un défi technique. J'ai dû développer un système de parsing robuste et mettre en place des algorithmes de summarization adaptatifs.",
                technologies: ["Python", "Langchain", "Streamlit", "PyPDF2"],
                github: "#",
                demo: "#",
                image: "Projet_3.jpeg"
            }
        };

        // Gestion des modales
        const modal = document.getElementById('projectModal');
        const closeModalBtn = document.getElementById('closeModal');
        const viewDetailsBtns = document.querySelectorAll('.view-details-btn');

        // Ouvrir la modal
        viewDetailsBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const projectId = this.getAttribute('data-project');
                openModal(projectId);
            });
        });

        // Fermer la modal
        closeModalBtn.addEventListener('click', closeModal);

        // Fermer la modal en cliquant en dehors
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Fermer la modal avec la touche Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });

        function openModal(projectId) {
            const project = projectsData[projectId];
            if (!project) return;

            // Remplir les données de la modal
            document.getElementById('modalTitle').textContent = project.title;
            document.getElementById('modalCategory').textContent = project.category;
            document.getElementById('modalCategory').className = `inline-block px-3 py-1 mt-2 text-xs rounded-full ${
                project.category === 'IA' ? 'bg-cyan-500 bg-opacity-20 text-cyan-300' : 
                'bg-orange-500 bg-opacity-20 text-orange-300'
            }`;
            
            document.getElementById('modalDescription').textContent = project.description;
            document.getElementById('modalChallenges').textContent = project.challenges;

            // Remplir les fonctionnalités
            const featuresList = document.getElementById('modalFeatures');
            featuresList.innerHTML = '';
            project.features.forEach(feature => {
                const li = document.createElement('li');
                li.className = 'flex items-center';
                li.innerHTML = `<i class="fas fa-check text-green-400 mr-2 text-xs"></i>${feature}`;
                featuresList.appendChild(li);
            });

            // Remplir les technologies
            const technologiesContainer = document.getElementById('modalTechnologies');
            technologiesContainer.innerHTML = '';
            project.technologies.forEach(tech => {
                const span = document.createElement('span');
                span.className = 'px-3 py-1 bg-cyan-500 bg-opacity-20 text-cyan-300 rounded-full border border-cyan-500 border-opacity-30 text-xs';
                span.textContent = tech;
                technologiesContainer.appendChild(span);
            });

            // Mettre à jour les liens
            document.getElementById('modalGithub').href = project.github;
            document.getElementById('modalDemo').href = project.demo;

            // Mettre à jour l'image
            const modalImage = document.getElementById('modalImage');
            modalImage.innerHTML = `<img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover rounded-xl">`;

            // Afficher la modal
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden';

            // Animation d'entrée
            setTimeout(() => {
                modal.classList.add('show');
            }, 50);
        }

        function closeModal() {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
                document.body.style.overflow = 'auto';
            }, 300);
        }

        // Initialisation d'EmailJS
    // Remplacez 'YOUR_PUBLIC_KEY' par votre clé publique EmailJS
    emailjs.init("A0KO2STDTtYimeTfI");

    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Afficher le statut d'envoi
        showFormStatus('Envoi en cours...', 'info');
        
        // Désactiver le bouton pendant l'envoi
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Envoi en cours...';
        
        // Envoyer l'email via EmailJS
        emailjs.sendForm('service_4oosfsw', 'template_sjfs3w5', this)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showFormStatus('Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.', 'success');
                contactForm.reset();
            }, function(error) {
                console.log('FAILED...', error);
                showFormStatus('Une erreur est survenue. Veuillez réessayer ou me contacter directement par email.', 'error');
            })
            .finally(function() {
                // Réactiver le bouton
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Envoyer le message';
            });
    });

    function showFormStatus(message, type) {
        formStatus.className = `p-4 rounded-lg text-center ${
            type === 'success' ? 'bg-green-500 bg-opacity-20 text-green-400 border border-green-500' :
            type === 'error' ? 'bg-red-500 bg-opacity-20 text-red-400 border border-red-500' :
            'bg-blue-500 bg-opacity-20 text-blue-400 border border-blue-500'
        }`;
        formStatus.innerHTML = message;
        formStatus.classList.remove('hidden');
        
        // Masquer le message après 5 secondes pour les succès
        if (type === 'success') {
            setTimeout(() => {
                formStatus.classList.add('hidden');
            }, 5000);
        }
    }