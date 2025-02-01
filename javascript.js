// Navegación suave
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.header-nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Optimización de rendimiento
    // Delegación de eventos optimizada
    const handleClick = (selector, callback) => {
        document.addEventListener('click', e => {
            const element = e.target.closest(selector);
            if (element) callback(e, element);
        });
    };

    // Lazy loading de imágenes
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('fade-in');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Throttle para eventos de scroll
    const throttle = (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    };

    // Eventos optimizados
    window.addEventListener('scroll', throttle(() => {
        // Lógica de scroll
    }, 100));

    // ...rest of existing code with optimizations...
});

// Control de scroll y navegación activa
window.addEventListener('scroll', throttle(() => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.header-nav a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}, 200));

// Botón de bienvenida
document.addEventListener('DOMContentLoaded', () => {
    const welcomeBtn = document.getElementById('welcomeBtn');
    if (welcomeBtn) {
        welcomeBtn.addEventListener('click', () => {
            alert('¡Bienvenido a FOODEATING! Estamos encantados de tenerte aquí.');
        });
    }
});

// Validación del formulario de contacto
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const successMessage = document.querySelector('.success-message');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (validateForm()) {
                const formData = new FormData(form);
                const userName = formData.get('nombre');
                const userEmail = formData.get('email');
                
                document.getElementById('successName').textContent = userName;
                document.getElementById('successEmail').textContent = userEmail;
                document.getElementById('submissionDate').textContent = new Date().toLocaleDateString('es-CO', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                
                form.style.opacity = '0';
                form.style.transform = 'translateY(20px)';
                form.style.display = 'none';
                successMessage.hidden = false;
                
                setTimeout(() => {
                    form.reset();
                    form.style.display = 'block';
                    form.style.opacity = '1';
                    form.style.transform = 'translateY(0)';
                    successMessage.hidden = true;
                }, 60000);
            }
        });
    }

    function validateForm() {
        let isValid = true;
        const fields = form.querySelectorAll('input, textarea');

        fields.forEach(field => {
            const error = field.parentElement.querySelector('.error-message');
            if (!field.checkValidity()) {
                showError(field, error);
                isValid = false;
            } else {
                clearError(error);
            }
        });

        const emailField = document.getElementById('email');
        if (!isValidEmail(emailField.value)) {
            showError(emailField, emailField.parentElement.querySelector('.error-message'),
                     'Por favor ingresa un correo electrónico válido');
            isValid = false;
        }

        return isValid;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(field, errorElement, message = null) {
        errorElement.textContent = message || field.validationMessage;
        field.setAttribute('aria-invalid', 'true');
        field.parentElement.classList.add('error');
    }

    function clearError(errorElement) {
        errorElement.textContent = '';
        errorElement.previousElementSibling.setAttribute('aria-invalid', 'false');
        errorElement.parentElement.classList.remove('error');
    }
});

// Actualización automática del año en el footer
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});

// Menú móvil
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');

    function toggleMenu() {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        
        const isExpanded = hamburger.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isExpanded);
    }

    hamburger.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            toggleMenu();

            if (targetSection) {
                setTimeout(() => {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300);
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (mobileNav.classList.contains('active') && 
            !mobileNav.contains(e.target) && 
            !hamburger.contains(e.target)) {
            toggleMenu();
        }
    });
});

// Service Worker para PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js');
    });
}

// Datos actualizados de frutas
const fruits = [
    {
        name: 'Guanábana',
        origin: 'América tropical',
        benefits: [
            'Propiedades anticancerígenas',
            'Fortalece el sistema inmune',
            'Mejora el sueño'
        ],
        season: 'Todo el año',
        nutrients: [
            { name: 'Vitamina C', percentage: 92 },
            { name: 'Vitamina B6', percentage: 85 },
            { name: 'Potasio', percentage: 78 }
        ],
        imageUrl: 'https://images.unsplash.com/photo-1596404643764-2a2461483a3b?w=200'
    },
    {
        name: 'Carambola',
        origin: 'Sudeste asiático',
        benefits: [
            'Bajo contenido calórico',
            'Rica en antioxidantes',
            'Beneficiosa para la vista'
        ],
        season: 'Julio - Febrero',
        nutrients: [
            { name: 'Vitamina A', percentage: 88 },
            { name: 'Vitamina C', percentage: 82 },
            { name: 'Fibra', percentage: 75 }
        ],
        imageUrl: 'https://images.unsplash.com/photo-1527325678964-54921661f888?w=200'
    },
    {
        name: 'Rambután',
        origin: 'Malasia e Indonesia',
        benefits: [
            'Fortalece huesos',
            'Mejora la piel',
            'Alto contenido en hierro'
        ],
        season: 'Mayo - Septiembre',
        nutrients: [
            { name: 'Hierro', percentage: 90 },
            { name: 'Vitamina C', percentage: 85 },
            { name: 'Calcio', percentage: 70 }
        ],
        imageUrl: 'https://images.pexels.com/photos/13050159/pexels-photo-13050159.jpeg?w=200'
    },
    {
        name: 'Mangostán',
        origin: 'Islas de la Sonda',
        benefits: [
            'Potente antiinflamatorio',
            'Propiedades antioxidantes',
            'Mejora sistema digestivo'
        ],
        season: 'Junio - Agosto',
        nutrients: [
            { name: 'Xantonas', percentage: 95 },
            { name: 'Vitamina B9', percentage: 82 },
            { name: 'Manganeso', percentage: 78 }
        ],
        imageUrl: 'https://images.pexels.com/photos/6157034/pexels-photo-6157034.jpeg?w=200'
    },
    {
        name: 'Tamarindo',
        origin: 'África tropical',
        benefits: [
            'Mejora la digestión',
            'Propiedades antivirales',
            'Rico en antioxidantes'
        ],
        season: 'Todo el año',
        nutrients: [
            { name: 'Magnesio', percentage: 88 },
            { name: 'Potasio', percentage: 85 },
            { name: 'Hierro', percentage: 80 }
        ],
        imageUrl: 'https://images.pexels.com/photos/7474203/pexels-photo-7474203.jpeg?w=200'
    }
];

// Función mejorada para renderizar la tabla
function renderFruitsTable() {
    const tableBody = document.getElementById('fruitsTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = fruits.map(fruit => `
        <tr class="fruit-row">
            <td class="fruit-name">
                <strong>${fruit.name}</strong>
                <div class="fruit-origin">
                    <span class="origin-label">Origen:</span>
                    <span class="origin-text">${fruit.origin}</span>
                </div>
            </td>
            <td class="fruit-benefits">
                <ul>
                    ${fruit.benefits.map(benefit => `
                        <li>
                            <span class="benefit-icon">🌿</span>
                            ${benefit}
                        </li>
                    `).join('')}
                </ul>
            </td>
            <td class="fruit-season">
                <div class="season-badge">${fruit.season}</div>
            </td>
            <td class="fruit-nutrients">
                ${fruit.nutrients.map(nutrient => `
                    <div class="nutrient-item">
                        <div class="nutrient-header">
                            <span class="nutrient-name">${nutrient.name}</span>
                            <span class="nutrient-percentage">${nutrient.percentage}%</span>
                        </div>
                        <div class="nutrient-bar-container">
                            <div class="nutrient-bar" 
                                 style="width: ${nutrient.percentage}%; 
                                        background: linear-gradient(90deg, 
                                            var(--accent-color), 
                                            var(--secondary-color))">
                            </div>
                        </div>
                    </div>
                `).join('')}
            </td>
            <td class="fruit-image">
                <div class="image-container">
                    <img src="${fruit.imageUrl}" 
                         alt="Imagen de ${fruit.name}" 
                         loading="lazy">
                </div>
            </td>
        </tr>
    `).join('');
}

// Asegurar que el DOM esté cargado antes de renderizar
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado'); // Debug
    renderFruitsTable();
});

// Agregar detección de dispositivo
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustar comportamiento según el dispositivo
document.addEventListener('DOMContentLoaded', () => {
    if (isMobile()) {
        // Ajustes específicos para móvil
        document.querySelectorAll('.fruit-benefits ul').forEach(ul => {
            if (ul.children.length > 3) {
                const showMore = document.createElement('button');
                showMore.textContent = 'Ver más';
                showMore.className = 'btn btn-sm btn-link';
                showMore.onclick = () => ul.classList.toggle('show-all');
                ul.parentNode.appendChild(showMore);
            }
        });
    }

    // Manejar orientación del dispositivo
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            renderFruitsTable();
        }, 100);
    });
});

// ...rest of existing code...
