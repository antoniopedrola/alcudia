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

    // Automatic Carousels
    const carousels = document.querySelectorAll('.tour-carousel');
    
    carousels.forEach(carousel => {
        const inner = carousel.querySelector('.carousel-inner');
        const images = inner.querySelectorAll('img');
        const interval = parseInt(carousel.getAttribute('data-autoplay')) || 3000;
        let currentIndex = 0;

        if (images.length > 1) {
            setInterval(() => {
                images[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % images.length;
                images[currentIndex].classList.add('active');
            }, interval);
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
