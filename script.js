/* ===== LUMEN FRAME — GSAP Animations ===== */

gsap.registerPlugin(ScrollTrigger);

// ===== LOADING SCREEN =====
const loaderTl = gsap.timeline();
loaderTl
    .to('#loader-fill', {
        width: '100%',
        duration: 1.5,
        ease: 'power2.inOut'
    })
    .to('#loader', {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut',
        delay: 0.2,
        onComplete: () => {
            document.getElementById('loader').style.display = 'none';
            animateHero();
        }
    });

// ===== VIDEO MODAL =====
const modal = document.getElementById('video-modal');
const modalVideo = document.getElementById('modal-video');
const closeBtn = document.getElementById('video-modal-close');
const playBtn = document.getElementById('play-reel-btn');

function openVideoModal() {
    modal.classList.add('active');
    modalVideo.style.display = 'block';
    modalVideo.currentTime = 0;
    modalVideo.muted = false;
    modalVideo.play();
    document.body.style.overflow = 'hidden';
    gsap.from(modalVideo, { scale: 0.85, opacity: 0, duration: 0.5, ease: 'power3.out' });
}

function closeVideoModal() {
    gsap.to(modalVideo, {
        scale: 0.85, opacity: 0, duration: 0.3, ease: 'power2.in',
        onComplete: () => {
            modal.classList.remove('active');
            modalVideo.pause();
            modalVideo.style.display = 'none';
            modalVideo.style.opacity = 1;
            modalVideo.style.transform = '';
            document.body.style.overflow = '';
        }
    });
}

if (playBtn) playBtn.addEventListener('click', openVideoModal);
if (closeBtn) closeBtn.addEventListener('click', closeVideoModal);

// Close on background click
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeVideoModal();
    });
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeVideoModal();
});

// ===== NAVBAR HIDE/SHOW ON SCROLL =====
let lastScrollY = 0;
const navbar = document.getElementById('navbar');

ScrollTrigger.create({
    onUpdate: (self) => {
        const currentScroll = window.pageYOffset;
        const direction = self.direction; // 1 = down, -1 = up

        if (currentScroll > 120) {
            if (direction === 1) {
                // Scrolling DOWN → hide
                navbar.classList.add('hidden-nav');
            } else {
                // Scrolling UP → show
                navbar.classList.remove('hidden-nav');
            }
        } else {
            // At top → always show
            navbar.classList.remove('hidden-nav');
        }

        // Solid bg when scrolled
        if (currentScroll > 100) {
            navbar.style.backgroundColor = 'rgba(16, 22, 34, 0.95)';
        } else {
            navbar.style.backgroundColor = 'rgba(16, 22, 34, 0.8)';
        }

        lastScrollY = currentScroll;
    }
});

// ===== HERO ANIMATION =====
function animateHero() {
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Split text for dynamic animation
    const heroTitle = new SplitType('#hero h2', { types: 'chars, words' });

    heroTl
        .from('#navbar', {
            y: -80,
            opacity: 0,
            duration: 0.8,
        })
        .from('#hero span:first-child', {
            y: 30,
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
        }, '-=0.3')
        .from(heroTitle.chars, {
            y: 80,
            opacity: 0,
            stagger: 0.02,
            duration: 0.8,
            ease: "back.out(1.5)"
        }, '-=0.4')
        .from('#hero p', {
            y: 40,
            opacity: 0,
            duration: 0.7,
        }, '-=0.5')
        .from('#hero .flex a, #hero .flex button', {
            y: 30,
            opacity: 0,
            stagger: 0.15,
            duration: 0.6,
        }, '-=0.3')
        .from('.animate-bounce', {
            opacity: 0,
            y: -20,
            duration: 0.5,
        }, '-=0.2')
        // Ken Burns slow zoom on video
        .to('.hero-video', {
            scale: 1.05,
            duration: 15,
            ease: 'none',
            repeat: -1,
            yoyo: true
        }, 0);
}

// ===== HERO PARALLAX ON SCROLL =====
gsap.to('.hero-video', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
    }
});

gsap.to('#hero .relative.z-20', {
    y: -80,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
        trigger: '#hero',
        start: '60% top',
        end: 'bottom top',
        scrub: true,
    }
});

// ===== ABOUT SECTION =====
gsap.from('#sobre h3', {
    x: -60,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: { trigger: '#sobre', start: 'top 75%' }
});

gsap.from('#sobre h2', {
    y: 60,
    opacity: 0,
    duration: 1,
    scrollTrigger: { trigger: '#sobre', start: 'top 70%' }
});

gsap.from('#sobre .space-y-6 p', {
    y: 40,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    scrollTrigger: { trigger: '#sobre .space-y-6', start: 'top 80%' }
});

gsap.from('#sobre .mt-10 > div', {
    y: 30,
    opacity: 0,
    stagger: 0.2,
    duration: 0.7,
    scrollTrigger: { trigger: '#sobre .mt-10', start: 'top 85%' }
});

// About images staggered
gsap.from('#sobre .grid.grid-cols-2.gap-4 .rounded-2xl', {
    y: 80,
    opacity: 0,
    scale: 0.9,
    stagger: { each: 0.15, from: 'start' },
    duration: 0.9,
    ease: 'power2.out',
    scrollTrigger: { trigger: '#sobre .grid.grid-cols-2.gap-4', start: 'top 80%' }
});

// Image parallax
document.querySelectorAll('#sobre .rounded-2xl img').forEach((img, i) => {
    gsap.to(img, {
        y: (i % 2 === 0) ? -30 : 30,
        ease: 'none',
        scrollTrigger: {
            trigger: img.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
        }
    });
});

// ===== INSTAGRAM REEL SECTION =====
gsap.from('#apresentacao-video h3', {
    x: -60, opacity: 0, duration: 0.8,
    scrollTrigger: { trigger: '#apresentacao-video', start: 'top 75%' }
});

gsap.from('#apresentacao-video h2', {
    y: 60, opacity: 0, duration: 1,
    scrollTrigger: { trigger: '#apresentacao-video', start: 'top 70%' }
});

gsap.from('#apresentacao-video p', {
    y: 40, opacity: 0, duration: 0.8,
    scrollTrigger: { trigger: '#apresentacao-video', start: 'top 80%' }
});

gsap.from('#apresentacao-video .relative.flex-shrink-0', {
    y: 80, opacity: 0, scale: 0.9, rotate: -2, duration: 1, ease: 'back.out(1.5)',
    scrollTrigger: { trigger: '#apresentacao-video', start: 'top 75%' }
});

// ===== SERVICES SECTION =====
gsap.from('#servicos h3', {
    x: -40, opacity: 0, duration: 0.6,
    scrollTrigger: { trigger: '#servicos', start: 'top 75%' }
});

gsap.from('#servicos h2', {
    y: 50, opacity: 0, duration: 0.8,
    scrollTrigger: { trigger: '#servicos', start: 'top 70%' }
});

gsap.from('#servicos > div > div:first-child p', {
    y: 30, opacity: 0, duration: 0.7,
    scrollTrigger: { trigger: '#servicos', start: 'top 65%' }
});

// Service cards stagger
const serviceCards = document.querySelectorAll('#portfolio > div');
serviceCards.forEach((card, index) => {
    gsap.from(card, {
        y: 100,
        opacity: 0,
        rotateX: 8,
        scale: 0.95,
        duration: 0.9,
        delay: index * 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#portfolio', start: 'top 80%' }
    });

    const img = card.querySelector('img');
    if (img) {
        gsap.to(img, {
            scale: 1.1,
            ease: 'none',
            scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 2,
            }
        });
    }
});

// ===== CTA SECTION =====
gsap.from('#cta h2', {
    y: 60, opacity: 0, scale: 0.95, duration: 1,
    scrollTrigger: { trigger: '#cta', start: 'top 75%' }
});

gsap.from('#cta p', {
    y: 40, opacity: 0, duration: 0.8, delay: 0.2,
    scrollTrigger: { trigger: '#cta', start: 'top 70%' }
});

gsap.from('#cta .flex a', {
    y: 30, opacity: 0, stagger: 0.15, duration: 0.7,
    scrollTrigger: { trigger: '#cta .flex', start: 'top 85%' }
});

// ===== FOOTER =====
gsap.from('#contato .grid > div', {
    y: 40, opacity: 0, stagger: 0.12, duration: 0.7,
    scrollTrigger: { trigger: '#contato', start: 'top 85%' }
});

// ===== SMOOTH SCROLL NAV =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            gsap.to(window, {
                scrollTo: { y: target, offsetY: 80 },
                duration: 1,
                ease: 'power3.inOut'
            });
        }
    });
});

// ===== VIDEO FALLBACK =====
const video = document.querySelector('.hero-video');
if (video) {
    video.addEventListener('error', () => {
        video.style.display = 'none';
        const fallback = document.getElementById('hero-fallback');
        if (fallback) fallback.classList.remove('hidden');
    });
}

// ===== NEWSLETTER =====
window.handleNewsletter = function (e) {
    e.preventDefault();
    const input = document.getElementById('newsletter-email');
    const btn = e.target.querySelector('button');
    btn.innerHTML = '<span class="material-symbols-outlined">check</span>';
    btn.style.background = '#16a34a';
    input.value = '';
    gsap.from(btn, { scale: 0.5, duration: 0.4, ease: 'back.out(2)' });
    setTimeout(() => {
        btn.innerHTML = '<span class="material-symbols-outlined">send</span>';
        btn.style.background = '';
    }, 3000);
};

// ===== MAGNETIC BUTTONS =====
document.querySelectorAll('.bg-primary.rounded-full, #cta .flex a').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
        gsap.to(btn, { x, y, duration: 0.3, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    });
});

// ===== REFRESH SCROLLTRIGGER ON IMAGES LOAD =====
window.addEventListener('load', () => {
    ScrollTrigger.refresh();
});
