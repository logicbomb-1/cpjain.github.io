/* ========================================
   TRIBUTE TO C.P. JAIN
   Ultra-Elegant 3D Animations
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Enhanced Scroll Animation Observer with stagger
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Get all siblings for stagger effect
                const parent = entry.target.parentElement;
                const siblings = parent.querySelectorAll('.animate-on-scroll');
                const index = Array.from(siblings).indexOf(entry.target);
                
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 120);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -80px 0px'
    });
    
    animateElements.forEach(el => observer.observe(el));
    
    // Navbar scroll effect with class toggle
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // 3D Tilt effect on cards
    const cards = document.querySelectorAll('.value-card, .impact-card, .family-story');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Enhanced gallery lightbox with zoom effect
    const galleryItems = document.querySelectorAll('.gallery-item img, .photo-item img, .impact-photo img');
    
    galleryItems.forEach(img => {
        img.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.95);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: zoom-out;
                opacity: 0;
                transition: opacity 0.4s ease;
                backdrop-filter: blur(10px);
            `;
            
            const modalImg = document.createElement('img');
            modalImg.src = this.src;
            modalImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 16px;
                box-shadow: 0 30px 80px rgba(0,0,0,0.6);
                transform: scale(0.8);
                transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            `;
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
            
            requestAnimationFrame(() => {
                modal.style.opacity = '1';
                modalImg.style.transform = 'scale(1)';
            });
            
            modal.addEventListener('click', () => {
                modal.style.opacity = '0';
                modalImg.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    document.body.removeChild(modal);
                    document.body.style.overflow = '';
                }, 400);
            });
        });
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        if (hero && window.scrollY < window.innerHeight) {
            const scrolled = window.scrollY;
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / 700);
        }
    });
    
    // Animate numbers in stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateNumber = (el) => {
        const text = el.textContent;
        if (text === '∞') return;
        
        const num = parseInt(text.replace(/\D/g, ''));
        const suffix = text.replace(/[0-9]/g, '');
        let current = 0;
        const increment = num / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= num) {
                el.textContent = text;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current) + suffix;
            }
        }, 30);
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(num => statsObserver.observe(num));
    
    console.log('✨ Tribute website loaded with 3D effects');
});
