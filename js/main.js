document.addEventListener('DOMContentLoaded', () => {
    // Navigation Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('is-active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('is-active');
        });
    });

    // Automatic Carousels (supports manual arrows for the boat carousel)
    const carousels = document.querySelectorAll('.tour-carousel, .boat-carousel');

    carousels.forEach(carousel => {
        const inner = carousel.querySelector('.carousel-inner');
        if (!inner) return;

        const images = inner.querySelectorAll('img');
        const interval = parseInt(carousel.getAttribute('data-autoplay')) || 3000;

        // Find the currently active image index (defaults to 0)
        let currentIndex = 0;
        for (let i = 0; i < images.length; i++) {
            if (images[i].classList.contains('active')) {
                currentIndex = i;
                break;
            }
        }

        const setActive = (nextIndex) => {
            images[currentIndex].classList.remove('active');
            currentIndex = nextIndex;
            images[currentIndex].classList.add('active');
        };

        if (images.length > 1) {
            setInterval(() => {
                const nextIndex = (currentIndex + 1) % images.length;
                setActive(nextIndex);
            }, interval);
        }

        // Manual controls (only present on the boat carousel)
        const prevBtn = carousel.querySelector('.boat-carousel-btn.prev');
        const nextBtn = carousel.querySelector('.boat-carousel-btn.next');

        if (prevBtn && nextBtn && images.length > 1) {
            prevBtn.addEventListener('click', () => {
                const nextIndex = (currentIndex - 1 + images.length) % images.length;
                setActive(nextIndex);
            });

            nextBtn.addEventListener('click', () => {
                const nextIndex = (currentIndex + 1) % images.length;
                setActive(nextIndex);
            });
        }
    });

    // Simple reveal on scroll
    const reveal = () => {
        const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    };

    window.addEventListener('scroll', reveal);
    reveal(); // run once on load
});
