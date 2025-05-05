import './main.js';

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme === 'light') {
        body.classList.add('light-theme');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
        
        themeToggle.classList.add('theme-toggle-animate');
        setTimeout(() => {
            themeToggle.classList.remove('theme-toggle-animate');
        }, 700);
    });

    const header = document.querySelector('.header');
    const logo = document.querySelector('.logo-img');
    
    function updateHeaderOnScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            if (logo) logo.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
            if (logo) logo.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateHeaderOnScroll);
    updateHeaderOnScroll();

    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        const menuItems = document.querySelectorAll('.nav-menu a');
        menuItems.forEach((item, index) => {
            if (navMenu.classList.contains('active')) {
                item.style.transitionDelay = `${index * 0.1}s`;
                item.classList.add('menu-item-show');
            } else {
                item.style.transitionDelay = '0s';
                item.classList.remove('menu-item-show');
            }
        });
    });

    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
            
            const menuItems = document.querySelectorAll('.nav-menu a');
            menuItems.forEach((item) => {
                item.classList.remove('menu-item-show');
            });
        });
    });

    const currentLocation = window.location.href;
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        if (currentLocation.includes(linkHref) && linkHref !== '#') {
            link.classList.add('active');
        } else if (currentLocation.endsWith('/') && linkHref === 'index.html') {
            link.classList.add('active');
        }
    });

    initTestimonialSlider();

    initFaqAccordion();

    initAnimationOnScroll();
    
    initButtonEffects();
});

function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            const x = e.clientX - button.getBoundingClientRect().left;
            const y = e.clientY - button.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('btn-ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

function initTestimonialSlider() {
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    const dotsContainer = document.querySelector('.testimonial-dots');
    let currentSlide = 0;

    if (!testimonialSlides.length) return;

    testimonialSlides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('testimonial-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.testimonial-dot');

    testimonialSlides[0].classList.add('active');

    function goToSlide(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialSlides[index].classList.add('active');
        testimonialSlides[index].style.animation = 'none';
        setTimeout(() => {
            testimonialSlides[index].style.animation = 'fadeIn 0.6s forwards';
        }, 10);
        
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let newIndex = currentSlide + 1;
        if (newIndex >= testimonialSlides.length) newIndex = 0;
        goToSlide(newIndex);
    }

    function prevSlide() {
        let newIndex = currentSlide - 1;
        if (newIndex < 0) newIndex = testimonialSlides.length - 1;
        goToSlide(newIndex);
    }

    if (prevButton) prevButton.addEventListener('click', prevSlide);
    if (nextButton) nextButton.addEventListener('click', nextSlide);

    let slideInterval = setInterval(nextSlide, 5000);

    const slider = document.querySelector('.testimonial-slider');
    
    if (slider) {
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
}

function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            
            faqItems.forEach(i => i.classList.remove('active'));
            
            if (!isOpen) {
                item.classList.add('active');
            }
        });
    });
    
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
}

function initAnimationOnScroll() {
    const animatedElements = document.querySelectorAll('.feature-card, .stat-item, .section-header, .cta-content, .plan-card, .hero-content, .hero-image');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });

    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
}); 