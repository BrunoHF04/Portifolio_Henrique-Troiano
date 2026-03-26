// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// Intersection Observer for Reveal Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Optional: if we only want to reveal once
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
});

// Custom Cursor Implementation
const cursorDot = document.querySelector('.cursor-dot');
const cursorGlow = document.querySelector('.cursor-glow');
const links = document.querySelectorAll('a, button, .glass-card');

document.addEventListener('mousemove', (e) => {
    // We add a tiny offset to exactly match cursor tip
    cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    
    // Slight delay for the glow for a fluid feel
    setTimeout(() => {
        cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }, 50);
});

// Hover effects for cursor
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        document.body.classList.add('hovering');
    });
    link.addEventListener('mouseleave', () => {
        document.body.classList.remove('hovering');
    });
});

// Hide cursor if it leaves document viewport
document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
    cursorGlow.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '1';
    cursorGlow.style.opacity = '1';
});

// Mobile Navigation
const menuToggle = document.querySelector('.menu-toggle');
const closeMenu = document.querySelector('.close-menu');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openNav() {
    mobileMenu.classList.add('active');
    // disable lenis scrolling while menu open if preferred
    lenis.stop();
}

function closeNav() {
    mobileMenu.classList.remove('active');
    lenis.start();
}

if(menuToggle && closeMenu) {
    menuToggle.addEventListener('click', openNav);
    closeMenu.addEventListener('click', closeNav);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeNav);
    });
}

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if(window.scrollY > 50) {
        navbar.style.background = 'rgba(16, 16, 22, 0.8)';
        navbar.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(20, 20, 28, 0.4)';
        navbar.style.borderBottom = 'none';
        navbar.style.boxShadow = 'none';
    }
});
