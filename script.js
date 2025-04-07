// LUNEXA Interactive Elements
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Mobile Menu
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.md\\:flex');
    const menuIcon = document.querySelector('.mobile-menu-button i');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            menuIcon.classList.toggle('fa-bars');
            menuIcon.classList.toggle('fa-times');
        });
    }

    // Enhanced Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Add active state to clicked nav item
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('text-indigo-800', 'font-bold');
                });
                this.classList.add('text-indigo-800', 'font-bold');
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            }
        });
    });

    // Accessibility - Add aria-live regions
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);

    // Enhanced Form Validation with Accessibility
    const contactForm = document.querySelector('#contact form');
    contactForm.setAttribute('aria-label', 'Contact form');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.checkValidity()) {
                    this.classList.remove('border-red-500');
                    this.classList.add('border-green-500');
                } else {
                    this.classList.remove('border-green-500');
                    this.classList.add('border-red-500');
                }
            });
        });

        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    input.classList.add('border-red-500');
                    isValid = false;
                }
            });

            if (!isValid) {
                e.preventDefault();
                const errorElement = document.createElement('div');
                errorElement.className = 'bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4';
                errorElement.textContent = 'Error: Please fill in all required fields correctly.';
                liveRegion.textContent = 'Form submission failed. Please check your inputs.';
                contactForm.prepend(errorElement);
                
                // Auto-remove error message after 5 seconds
                setTimeout(() => {
                    errorElement.remove();
                }, 5000);
            }
        });
    }

    // Enhanced Scroll Animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card-hover, .fade-in, .program-card');
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight * 0.75) && 
                            (rect.bottom >= window.innerHeight * 0.25);
            
            if (isVisible) {
                el.classList.add('animate');
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize animations
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Program card hover effects
    document.querySelectorAll('.program-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('i').style.transform = 'scale(1.2)';
        });
        card.addEventListener('mouseleave', () => {
            card.querySelector('i').style.transform = 'scale(1)';
        });
    });
});