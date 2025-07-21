document.addEventListener('DOMContentLoaded', () => {

    // Initialize Lucide Icons
    lucide.createIcons();

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('-translate-y-full');
            mobileMenu.classList.toggle('opacity-0');
            mobileMenu.classList.toggle('invisible');
            mobileMenu.classList.toggle('opacity-100');
            mobileMenu.classList.toggle('visible');
        });
    }

    // Close mobile menu when a link is clicked
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('-translate-y-full', 'opacity-0', 'invisible');
            mobileMenu.classList.remove('opacity-100', 'visible');
        });
    });

    // Typewriter Effect
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const roles = ["Business Analyst", "Data Storyteller", "Problem Solver", "Tech Enthusiast"];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }

            const typeSpeed = isDeleting ? 100 : 150;
            setTimeout(type, typeSpeed);
        }
        type();
    }
    
    // Active Nav Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function onScroll() {
        let currentSection = 'home'; // Default to 'home'
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Check if the link's href contains the current section id.
            // Handles cases like href="#about" for the "about" section.
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', onScroll);

    // Fade-in animations on scroll observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                entry.target.classList.remove('fade-in-hidden');
            }
        });
    }, { threshold: 0.1 });

    const elementsToFade = document.querySelectorAll('.section-title, .skill-card, .experience-card, .project-card, #about > div > div');
    elementsToFade.forEach(el => {
        el.classList.add('fade-in-hidden');
        observer.observe(el);
    });
    
    // Contact Form Submission (dummy handler)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real application, you would handle form submission here (e.g., via an API)
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

});