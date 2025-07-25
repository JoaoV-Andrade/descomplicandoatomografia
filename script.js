// JavaScript para funcionalidades interativas do site

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling para links internos
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animação de entrada para elementos quando entram na viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const animateElements = document.querySelectorAll('.about-text, .team-text, .instructor-text, .module-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Animação de hover nos cards dos módulos
    const moduleCards = document.querySelectorAll('.module-card');
    moduleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // REMOVIDO: Contador animado para o preço
    // O valor R$ 299 agora aparece estático no HTML

    // Adicionar efeito de loading aos botões
    const buttons = document.querySelectorAll('.btn-primary, .btn-cta, .btn-price, .btn-about-cta');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Adicionar efeito de ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Lazy loading para imagens
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Scroll suave para o topo quando clicar no logo
    const logos = document.querySelectorAll('.logo img, .footer-logo');
    logos.forEach(logo => {
        logo.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // Efeito de fade-in na imagem do título
    const titleImage = document.querySelector('.hero-title-image img');
    if (titleImage) {
        titleImage.style.opacity = '0';
        titleImage.style.transform = 'translateY(20px)';
        titleImage.style.transition = 'all 1s ease-out';
        
        setTimeout(() => {
            titleImage.style.opacity = '1';
            titleImage.style.transform = 'translateY(0)';
        }, 500);
    }

});

// CSS adicional para animações (será injetado via JavaScript)
const additionalCSS = `
    .animate-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .module-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    img {
        transition: opacity 0.3s ease;
        opacity: 0;
    }

    img.loaded {
        opacity: 1;
    }

    .logo img, .footer-logo {
        cursor: pointer;
        transition: transform 0.3s ease;
    }

    .logo img:hover {
        transform: scale(1.05);
    }

    .hero-title-image img {
        transition: all 0.3s ease;
    }

    .hero-title-image img:hover {
        transform: scale(1.02);
        filter: drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.4));
    }
`;

// Injetar CSS adicional
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);
