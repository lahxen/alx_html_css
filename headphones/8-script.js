// Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = navMenu.querySelectorAll('a');
    let isMenuOpen = false;

    // Toggle menu function
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        hamburger.classList.toggle('active', isMenuOpen);
        navMenu.classList.toggle('active', isMenuOpen);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        
        // Add accessibility attributes
        hamburger.setAttribute('aria-expanded', isMenuOpen);
        navMenu.setAttribute('aria-hidden', !isMenuOpen);
    }

    // Event listener for hamburger click
    hamburger.addEventListener('click', toggleMenu);

    // Close menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            toggleMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMenu();
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && isMenuOpen) {
            toggleMenu();
        }
    });
});

// Enhanced Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    const submitButton = form.querySelector('.cta-button');
    
    if (!form || !submitButton) return;

    // Form validation
    function validateForm(formData) {
        const errors = {};
        
        // Name validation
        if (!formData.get('name') || formData.get('name').trim().length < 2) {
            errors.name = 'Name must be at least 2 characters long';
        }
        
        // Email validation
        const email = formData.get('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            errors.email = 'Please enter a valid email address';
        }
        
        // Message validation (if exists)
        const message = formData.get('message');
        if (message && message.trim().length < 10) {
            errors.message = 'Message must be at least 10 characters long';
        }
        
        return errors;
    }

    // Show error messages
    function showErrors(errors) {
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(error => {
            error.style.display = 'none';
        });

        // Show new errors
        Object.keys(errors).forEach(field => {
            const input = form.querySelector(`[name="${field}"]`);
            if (input) {
                const formGroup = input.closest('.form-group');
                let errorElement = formGroup.querySelector('.error-message');
                
                if (!errorElement) {
                    errorElement = document.createElement('div');
                    errorElement.className = 'error-message';
                    formGroup.appendChild(errorElement);
                }
                
                errorElement.textContent = errors[field];
                errorElement.style.display = 'block';
                input.style.borderBottomColor = '#ff4757';
            }
        });
    }

    // Clear errors
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(error => {
            error.style.display = 'none';
        });
        
        form.querySelectorAll('input, textarea').forEach(input => {
            input.style.borderBottomColor = '#071629';
        });
    }

    // Show success message
    function showSuccess() {
        let successElement = form.querySelector('.success-message');
        
        if (!successElement) {
            successElement = document.createElement('div');
            successElement.className = 'success-message';
            form.appendChild(successElement);
        }
        
        successElement.textContent = 'Thank you! Your message has been sent successfully.';
        successElement.style.display = 'block';
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successElement.style.display = 'none';
        }, 5000);
    }

    // Loading button state
    function setLoadingState(isLoading) {
        if (isLoading) {
            submitButton.classList.add('loading');
            submitButton.disabled = true;
        } else {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        }
    }

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const errors = validateForm(formData);
        
        clearErrors();
        
        if (Object.keys(errors).length > 0) {
            showErrors(errors);
            return;
        }
        
        // Simulate form submission
        setLoadingState(true);
        
        setTimeout(() => {
            setLoadingState(false);
            showSuccess();
            form.reset();
        }, 2000);
    });

    // Real-time validation
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('blur', function() {
            const formData = new FormData(form);
            const errors = validateForm(formData);
            
            if (errors[input.name]) {
                showErrors({[input.name]: errors[input.name]});
            } else {
                const formGroup = input.closest('.form-group');
                const errorElement = formGroup.querySelector('.error-message');
                if (errorElement) {
                    errorElement.style.display = 'none';
                }
                input.style.borderBottomColor = '#071629';
            }
        });

        input.addEventListener('focus', function() {
            const formGroup = input.closest('.form-group');
            const errorElement = formGroup.querySelector('.error-message');
            if (errorElement) {
                errorElement.style.display = 'none';
            }
            input.style.borderBottomColor = '#FF6565';
        });
    });
});

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Intersection Observer for Animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe service items and result items
    document.querySelectorAll('.service-item, .result-item').forEach(item => {
        item.style.animationPlayState = 'paused';
        observer.observe(item);
    });
});

// Performance optimization: Debounced window resize
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle scroll performance
let ticking = false;

function updateScrollPosition() {
    // Add any scroll-based animations here
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
    }
});

// Preload hero images for better performance
document.addEventListener('DOMContentLoaded', function() {
    const heroImages = [
        'images/headphones_hero_1.jpg',
        'images/headphones_hero_2.jpg'
    ];
    
    heroImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});
