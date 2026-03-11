/* ===== LUMEN FRAME — GSAP Animations ===== */

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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

    // Set buttons and indicator hidden initially
    gsap.set('#hero .flex a, #hero .flex button', { y: 30, opacity: 0 });
    gsap.set('.animate-bounce', { opacity: 0, y: -20 });

    heroTl
        .from('#navbar', {
            y: -80,
            opacity: 0,
            duration: 0.8,
        })
        .from('#hero div.relative.z-20 > span.inline-block', {
            y: 30,
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
        }, '-=0.3')
        .add(() => {
            // 1. Type Title
            new Typed('#typed-title', {
                strings: ['Capturando a <span class="text-primary italic">essência</span> do seu momento.'],
                typeSpeed: 45,
                showCursor: true,
                cursorChar: '|',
                onComplete: (self) => {
                    self.cursor.style.display = 'none'; // hide cursor when done

                    // 2. Type Description
                    new Typed('#typed-desc', {
                        strings: ['Vídeos que conectam, emocionam e transformam memórias em legados visuais inesquecíveis.'],
                        typeSpeed: 25,
                        showCursor: true,
                        cursorChar: '|',
                        onComplete: (descSelf) => {
                            descSelf.cursor.style.display = 'none';
                        }
                    });

                    // 3. Show Buttons as description starts typing
                    gsap.to('#hero .flex a, #hero .flex button', {
                        y: 0,
                        opacity: 1,
                        stagger: 0.15,
                        duration: 0.6,
                        ease: 'power3.out'
                    });
                    gsap.to('.animate-bounce', {
                        opacity: 0.5,
                        y: 0,
                        duration: 0.5,
                        onComplete: () => {
                            // restore opacity class logic for bounce
                            document.querySelector('.animate-bounce').style.opacity = "";
                        }
                    });
                }
            });
        }, '-=0.2')
        // Fade in Spline Viewer
        .from('spline-viewer', {
            opacity: 0,
            duration: 1.5,
            ease: 'power2.inOut'
        }, 0);

}

// ===== HERO PARALLAX ON SCROLL =====
gsap.to('spline-viewer', {
    y: 100,
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

// ===== ABOUT SECTION - Removido (agora está na função initCinematicAnimations otimizada) =====

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

// ===== PORTFOLIO 3D WITH THREE.JS AND GSAP =====
(function initPortfolio3D() {
    const scrollContainer = document.getElementById('portfolio-scroll-container');
    const progressBar = document.getElementById('portfolio-scroll-progress');
    const cards = document.querySelectorAll('.portfolio-horizontal-card');
    const canvas = document.getElementById('portfolio-3d-background');
    const section = document.getElementById('portfolio-cards');

    if (!scrollContainer || !cards.length || !canvas || !section) return;

    // ===== THREE.JS BACKGROUND SCENE =====
    let scene, camera, renderer, particles, particleSystem;
    let mouseX = 0, mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    function initThreeJS() {
        // Scene
        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x0a0e1a, 100, 800);

        // Camera
        camera = new THREE.PerspectiveCamera(
            75,
            canvas.clientWidth / canvas.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 200;

        // Renderer
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create audiovisual particles (otimizado - menos partículas)
        const particleCount = 80;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        const color = new THREE.Color();

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Position
            positions[i3] = (Math.random() - 0.5) * 1000;
            positions[i3 + 1] = (Math.random() - 0.5) * 600;
            positions[i3 + 2] = (Math.random() - 0.5) * 500;

            // Color (blue/cyan theme for audiovisual)
            const hue = 0.55 + Math.random() * 0.1; // Blue to cyan
            color.setHSL(hue, 0.8, 0.5 + Math.random() * 0.3);
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            // Size
            sizes[i] = Math.random() * 3 + 1;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                pixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
            },
            vertexShader: `
                attribute float size;
                attribute vec3 color;
                varying vec3 vColor;
                uniform float time;
                
                void main() {
                    vColor = color;
                    vec3 pos = position;
                    pos.y += sin(time * 0.5 + position.x * 0.01) * 10.0;
                    pos.x += cos(time * 0.3 + position.y * 0.01) * 5.0;
                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                
                void main() {
                    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
                    float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
                    gl_FragColor = vec4(vColor, alpha * 0.8);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthTest: false
        });

        particleSystem = new THREE.Points(geometry, material);
        scene.add(particleSystem);

        // Add light rays (representing camera/light effects)
        const lightGeometry = new THREE.PlaneGeometry(200, 600);
        const lightMaterial = new THREE.MeshBasicMaterial({
            color: 0x0b50da,
            transparent: true,
            opacity: 0.1,
            side: THREE.DoubleSide
        });

        for (let i = 0; i < 5; i++) {
            const light = new THREE.Mesh(lightGeometry, lightMaterial);
            light.position.set(
                (Math.random() - 0.5) * 800,
                (Math.random() - 0.5) * 400,
                -100 + i * 50
            );
            light.rotation.z = Math.random() * Math.PI * 2;
            scene.add(light);
        }

        // Mouse movement
        document.addEventListener('mousemove', onMouseMove);

        animate();
    }

    function onMouseMove(event) {
        mouseX = (event.clientX - windowHalfX) * 0.01;
        mouseY = (event.clientY - windowHalfY) * 0.01;
    }

    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        if (canvas && camera && renderer) {
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        }
    }

    // Initial resize
    window.addEventListener('resize', onWindowResize);

    function animate() {
        requestAnimationFrame(animate);

        if (particleSystem) {
            particleSystem.rotation.y += 0.0005; // Mais lento para melhor performance
            particleSystem.material.uniforms.time.value += 0.008;

            // Camera follows mouse slightly (reduzido)
            camera.position.x += (mouseX - camera.position.x) * 0.03;
            camera.position.y += (-mouseY - camera.position.y) * 0.03;
        }

        renderer.render(scene, camera);
    }

    // Initialize Three.js
    initThreeJS();

    // ===== GSAP 3D CARD ANIMATIONS =====
    let isDown = false;
    let startX;
    let scrollLeft;
    let isDragging = false;
    let currentScroll = 0;

    // Update progress bar
    function updateProgress() {
        const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        const scrolled = scrollContainer.scrollLeft;
        const progress = scrollWidth > 0 ? (scrolled / scrollWidth) * 100 : 0;

        if (progressBar) {
            gsap.to(progressBar, {
                width: `${progress}%`,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    }

    // Update card 3D positions based on scroll - Fila empilhada
    function updateCard3DPositions() {
        const containerRect = scrollContainer.getBoundingClientRect();
        const containerCenterX = containerRect.left + containerRect.width / 2;
        const cardWidth = 320;
        const overlap = 60;

        cards.forEach((card, index) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const distanceFromCenter = cardCenterX - containerCenterX;
            const normalizedDistance = distanceFromCenter / (cardWidth / 2);

            // Cards à esquerda do centro (já passaram) - saem da tela
            // Cards à direita do centro (ainda não chegaram) - entram
            // Card no centro - está ativo

            let rotateY = 0;
            let translateZ = 0;
            let scale = 1;
            let opacity = 1;
            let translateX = 0;

            if (normalizedDistance < -1.2) {
                // Card muito à esquerda - sai da tela completamente
                translateX = -200;
                opacity = 0;
                scale = 0.7;
                rotateY = -30;
                translateZ = 50;
            } else if (normalizedDistance < -0.6) {
                // Card à esquerda - saindo da tela
                translateX = normalizedDistance * 50;
                opacity = 0.4 + (normalizedDistance + 1.2) * 0.5;
                scale = 0.75 + (normalizedDistance + 1.2) * 0.15;
                rotateY = normalizedDistance * 12;
                translateZ = 30;
            } else if (normalizedDistance < 0.4) {
                // Card no centro - ativo e em destaque
                translateX = 0;
                opacity = 1;
                scale = 1;
                rotateY = 0;
                translateZ = 0;
            } else if (normalizedDistance < 1.2) {
                // Card à direita - entrando na tela
                translateX = normalizedDistance * 15;
                opacity = 0.6 + (1.2 - normalizedDistance) * 0.4;
                scale = 0.85 + (1.2 - normalizedDistance) * 0.15;
                rotateY = normalizedDistance * 6;
                translateZ = -15;
            } else {
                // Card muito à direita - ainda não totalmente visível
                translateX = 30;
                opacity = 0.4;
                scale = 0.8;
                rotateY = 12;
                translateZ = -30;
            }

            // Apply 3D transforms with GSAP
            gsap.to(card, {
                x: translateX,
                rotationY: rotateY,
                z: translateZ,
                scale: scale,
                opacity: opacity,
                duration: 0.8,
                ease: 'power3.out'
            });

            // Parallax effect on image
            const img = card.querySelector('[data-card-img]');
            if (img) {
                gsap.to(img, {
                    x: normalizedDistance * 15,
                    scale: 1 + Math.abs(normalizedDistance) * 0.05,
                    duration: 0.8,
                    ease: 'power3.out'
                });
            }
        });
    }

    // Mouse events for drag
    scrollContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        isDragging = false;
        scrollContainer.classList.add('dragging');
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
        scrollContainer.style.cursor = 'grabbing';
    });

    scrollContainer.addEventListener('mouseleave', () => {
        isDown = false;
        scrollContainer.classList.remove('dragging');
        scrollContainer.style.cursor = 'grab';
    });

    scrollContainer.addEventListener('mouseup', () => {
        isDown = false;
        isDragging = false;
        scrollContainer.classList.remove('dragging');
        scrollContainer.style.cursor = 'grab';
        // Atualiza posições após soltar
        setTimeout(() => {
            updateCard3DPositions();
        }, 50);
    });

    scrollContainer.addEventListener('mousemove', (e) => {
        if (!isDown) {
            isDragging = false;
            return;
        }
        e.preventDefault();
        isDragging = true;
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 2;
        scrollContainer.scrollLeft = scrollLeft - walk;
        updateProgress();

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            updateCard3DPositions();
        }, 10);
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchScrollLeft = 0;

    scrollContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].pageX - scrollContainer.offsetLeft;
        touchScrollLeft = scrollContainer.scrollLeft;
        scrollContainer.classList.add('dragging');
    });

    scrollContainer.addEventListener('touchmove', (e) => {
        if (!touchStartX) return;
        const x = e.touches[0].pageX - scrollContainer.offsetLeft;
        const walk = (x - touchStartX) * 2;
        scrollContainer.scrollLeft = touchScrollLeft - walk;
        updateProgress();

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            updateCard3DPositions();
        }, 10);
    });

    scrollContainer.addEventListener('touchend', () => {
        touchStartX = 0;
        scrollContainer.classList.remove('dragging');
    });

    // Prevent click when dragging
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (isDragging) {
                e.preventDefault();
                e.stopPropagation();
                isDragging = false;
                return false;
            }
        });

        // 3D hover effect - apenas no card central (não bloqueia scroll)
        let hoverTimeout;
        card.addEventListener('mouseenter', () => {
            if (!isDown && !isDragging) {
                clearTimeout(hoverTimeout);
                const cardRect = card.getBoundingClientRect();
                const containerRect = scrollContainer.getBoundingClientRect();
                const cardCenterX = cardRect.left + cardRect.width / 2;
                const containerCenterX = containerRect.left + containerRect.width / 2;
                const distance = Math.abs(cardCenterX - containerCenterX);

                // Só aplica hover se o card estiver próximo do centro
                if (distance < 200) {
                    gsap.to(card, {
                        z: 20,
                        scale: 1.02,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            }
        });

        card.addEventListener('mouseleave', () => {
            if (!isDown && !isDragging) {
                clearTimeout(hoverTimeout);
                hoverTimeout = setTimeout(() => {
                    updateCard3DPositions();
                }, 100);
            }
        });

        // Button click handler
        const btn = card.querySelector('.portfolio-horizontal-card-btn');
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const cardTitle = card.querySelector('.portfolio-horizontal-card-title').textContent;
                console.log(`Assistir projeto: ${cardTitle}`);
            });
        }
    });

    // Update on scroll with throttling for performance
    let scrollTimeout;
    scrollContainer.addEventListener('scroll', () => {
        updateProgress();

        // Throttle updates for better performance
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            updateCard3DPositions();
        }, 10);
    }, { passive: true });

    // Smooth scroll on wheel - não bloqueia se não estiver sobre o container
    scrollContainer.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0 && !isDown) {
            e.preventDefault();
            scrollContainer.scrollLeft += e.deltaY * 0.5;
            updateProgress();

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                updateCard3DPositions();
            }, 10);
        }
    }, { passive: false });

    // Navigation buttons
    const prevBtn = document.getElementById('portfolio-prev-btn');
    const nextBtn = document.getElementById('portfolio-next-btn');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const cardWidth = 320;
            const scrollAmount = cardWidth - 60; // Account for overlap
            scrollContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });

            // Update positions after scroll
            setTimeout(() => {
                updateProgress();
                updateCard3DPositions();
            }, 100);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const cardWidth = 320;
            const scrollAmount = cardWidth - 60; // Account for overlap
            scrollContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });

            // Update positions after scroll
            setTimeout(() => {
                updateProgress();
                updateCard3DPositions();
            }, 100);
        });
    }

    // Initialize
    updateProgress();

    // Initial animation delay to ensure layout is ready
    setTimeout(() => {
        updateCard3DPositions();
    }, 100);

    // Animate cards in with 3D effect
    gsap.from(cards, {
        opacity: 0,
        x: 100,
        rotationY: 20,
        z: -80,
        duration: 1.2,
        stagger: {
            each: 0.1,
            from: 'start'
        },
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '#portfolio-cards',
            start: 'top 80%',
            once: true
        },
        onComplete: () => {
            updateCard3DPositions();
        }
    });

    // GSAP ScrollTrigger for parallax effect on camera
    gsap.to(camera.position, {
        z: 250,
        duration: 1,
        scrollTrigger: {
            trigger: '#portfolio-cards',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
})();

// ===== CINEMATIC SECTION ANIMATIONS =====
(function initCinematicAnimations() {
    // ===== SOBRE SECTION - Animações otimizadas =====
    const sobreSection = document.querySelector('#sobre');
    if (sobreSection) {
        // Animar texto primeiro
        gsap.from('#sobre h3, #sobre h2', {
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '#sobre',
                start: 'top 80%',
                once: true
            }
        });

        // Animar parágrafos
        gsap.from('#sobre .space-y-6 p', {
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '#sobre .space-y-6',
                start: 'top 85%',
                once: true
            }
        });

        // Animar imagens de forma mais suave
        const sobreImages = document.querySelectorAll('#sobre .rounded-2xl');
        if (sobreImages.length > 0) {
            gsap.from(sobreImages, {
                opacity: 0,
                y: 50,
                scale: 0.95,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '#sobre .grid.grid-cols-2',
                    start: 'top 80%',
                    once: true
                }
            });
        }
    }

    // ===== APRESENTAÇÃO VIDEO - Timeline de edição =====
    const videoSection = document.querySelector('#apresentacao-video');
    if (videoSection) {
        // Criar timeline visual
        const timelineBar = document.createElement('div');
        timelineBar.className = 'video-timeline-bar';
        timelineBar.innerHTML = '<div class="video-timeline-progress"></div>';
        videoSection.appendChild(timelineBar);

        // Animar elementos da seção
        gsap.from('#apresentacao-video h2, #apresentacao-video h3, #apresentacao-video p', {
            opacity: 0,
            x: -100,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#apresentacao-video',
                start: 'top 75%',
                once: true
            }
        });

        // Animar frame do vídeo (otimizado)
        const videoFrame = document.querySelector('#apresentacao-video .relative.flex-shrink-0');
        if (videoFrame) {
            gsap.from(videoFrame, {
                opacity: 0,
                scale: 0.9,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: videoFrame,
                    start: 'top 80%',
                    once: true
                }
            });
        }

        // Timeline progress animation (otimizado)
        gsap.to('.video-timeline-progress', {
            width: '100%',
            ease: 'none',
            scrollTrigger: {
                trigger: '#apresentacao-video',
                start: 'top 70%',
                end: 'bottom 30%',
                scrub: 1
            }
        });
    }

    // ===== SERVIÇOS SECTION - Cards aparecendo (otimizado) =====
    const serviceCards = document.querySelectorAll('#servicos .group.relative');
    if (serviceCards.length > 0) {
        // Animar cards entrando (sem rotação 3D pesada)
        gsap.from(serviceCards, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '#servicos .grid',
                start: 'top 85%',
                once: true
            }
        });

        // Hover simplificado (apenas CSS transition)
        serviceCards.forEach(card => {
            card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
    }

    // Título da seção servicos
    gsap.from('#servicos h2, #servicos h3, #servicos p', {
        opacity: 0,
        x: -50,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '#servicos',
            start: 'top 80%',
            once: true
        }
    });

    // ===== CTA SECTION - Animações otimizadas =====
    const ctaSection = document.querySelector('#cta');
    if (ctaSection) {
        // Animar elementos do CTA
        gsap.from('#cta h2, #cta p', {
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '#cta',
                start: 'top 80%',
                once: true
            }
        });

        // Animar botões
        const ctaButtons = document.querySelectorAll('#cta a');
        gsap.from(ctaButtons, {
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '#cta',
                start: 'top 80%',
                once: true
            }
        });
    }

    // ===== FOOTER - Aparecendo de baixo =====
    const footerElements = document.querySelectorAll('#contato .grid > div');
    if (footerElements.length > 0) {
        gsap.from(footerElements, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '#contato',
                start: 'top 85%',
                once: true
            }
        });
    }

    // ===== EFEITOS VISUAIS OTIMIZADOS (apenas onde necessário) =====
    // Adicionar scan lines apenas na seção de portfolio (mais importante)
    const portfolioSection = document.querySelector('#portfolio-cards');
    if (portfolioSection) {
        const scanLines = document.createElement('div');
        scanLines.className = 'video-scan-lines';
        portfolioSection.appendChild(scanLines);
    }

    // ===== INTERSECTION OBSERVER PARA ADICIONAR CLASSE IN-VIEW =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });

    // ===== PARALLAX OTIMIZADO (apenas imagens principais) =====
    // Parallax suave apenas nas imagens da seção sobre
    const sobreMainImages = document.querySelectorAll('#sobre .grid.grid-cols-2 .rounded-2xl img');
    if (sobreMainImages.length > 0) {
        sobreMainImages.forEach((img, index) => {
            gsap.to(img, {
                y: index % 2 === 0 ? -20 : 20,
                ease: 'none',
                scrollTrigger: {
                    trigger: img.parentElement,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        });
    }
    // ===== PORTFOLIO BUTTONS VIDEO MODAL CONNECTION =====
    const portfolioBtns = document.querySelectorAll('.portfolio-horizontal-card-btn');
    if (portfolioBtns.length > 0) {
        portfolioBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); // Maintian smooth drag

                // Set the modal source if needed using data attributes in future
                if (typeof openVideoModal === 'function') {
                    openVideoModal();
                }
            });
        });
    }

    // ===== PORTAL & PORTFOLIO LOGIC =====
    const portfolioData = {
        corporativo: [
            { title: "Vídeo Institucional", desc: "A essência da sua marca em alta definição.", img: "img/service2.jpg" },
            { title: "Congresso Nacional", desc: "Cobertura multi-câmera com transmissão ao vivo.", img: "img/service3.jpg" },
            { title: "Treinamento Interno", desc: "Comunicação clara e eficiente para sua equipe.", img: "img/about4.jpg" }
        ],
        eventos: [
            { title: "Casamento Premium", desc: "O dia mais especial da sua vida com olhar de cinema.", img: "img/service1.jpg" },
            { title: "Aniversário 15 Anos", desc: "Energia, luzes e memórias inesquecíveis.", img: "img/about1.jpg" },
            { title: "Festa de Gala", desc: "Cobertura completa com drone e equipe especializada.", img: "img/about3.Png" }
        ]
    };

    window.openPortal = function (type) {
        const display = document.getElementById('portfolio-display');
        const container = document.getElementById('portfolio-scroll-container');
        const title = document.getElementById('portfolio-title');

        title.innerText = type === 'corporativo' ? "PORTFÓLIO CORPORATIVO" : "PORTFÓLIO SOCIAL";
        container.innerHTML = '';

        portfolioData[type].forEach(item => {
            container.innerHTML += `
                <div class="portfolio-horizontal-card" style="opacity: 0; transform: scale(0.9)">
                    <div class="portfolio-horizontal-card-image">
                        <img src="${item.img}" alt="${item.title}">
                        <div class="portfolio-horizontal-card-overlay"></div>
                    </div>
                    <div class="portfolio-horizontal-card-content">
                        <h3 class="portfolio-horizontal-card-title">${item.title}</h3>
                        <p class="portfolio-horizontal-card-desc">${item.desc}</p>
                        <button class="portfolio-horizontal-card-btn" onclick="openVideoModal()">
                            <span class="material-symbols-outlined">play_circle</span> ASSISTIR
                        </button>
                    </div>
                </div>
            `;
        });

        display.classList.remove('hidden');
        gsap.from('#portfolio-display', { opacity: 0, y: 50, duration: 0.8 });
        gsap.to(window, { scrollTo: { y: "#portfolio-display", offsetY: 50 }, duration: 1 });

        gsap.to('.portfolio-horizontal-card', {
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "back.out(1.4)"
        });
    };

    window.closePortal = function () {
        gsap.to('#portfolio-display', {
            opacity: 0,
            y: 50,
            duration: 0.5,
            onComplete: () => {
                document.getElementById('portfolio-display').classList.add('hidden');
            }
        });
    };

    // ===== BRIEFING FORM MULTI-STEP =====
    window.nextStep = function (current, next) {
        if (current < next) {
            // Validação simples p/ exemplo
            const input = document.querySelector(`#step-${current} input`);
            if (input && !input.value) {
                gsap.to(`#step-${current}`, { x: [-10, 10, -10, 10, 0], duration: 0.4 });
                return;
            }
        }

        gsap.to(`#step-${current}`, {
            opacity: 0, x: -20, duration: 0.3, onComplete: () => {
                document.getElementById(`step-${current}`).classList.remove('active');
                document.getElementById(`step-${next}`).classList.add('active');
                gsap.fromTo(`#step-${next}`, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.4 });

                // Update dots
                document.querySelectorAll('.step-indicator').forEach((dot, i) => {
                    dot.classList.toggle('active', i < next);
                });
            }
        });
    };

    window.selectStyle = function (style) {
        window.selectedBriefingStyle = style;
        const cards = document.querySelectorAll('#step-2 .cursor-pointer');
        cards.forEach(c => c.style.borderColor = '');
        event.currentTarget.style.borderColor = '#0b50da';
    };

    window.submitBriefing = function () {
        const nome = document.getElementById('b-nome').value;
        const whats = document.getElementById('b-whatsapp').value;
        const local = document.getElementById('b-local').value;
        const data = document.getElementById('b-data').value;
        const obs = document.getElementById('b-obs').value;
        const estilo = window.selectedBriefingStyle || "Não definido";

        const text = `🚀 *NOVO BRIEFING - LUMEN FRAME*\n\n` +
            `👤 *Cliente:* ${nome}\n` +
            `📱 *WhatsApp:* ${whats}\n` +
            `🎬 *Estilo:* ${estilo}\n` +
            `📍 *Local:* ${local}\n` +
            `📅 *Data:* ${data}\n` +
            `📝 *Prioridades:* ${obs}`;

        const encoded = encodeURIComponent(text);
        window.open(`https://wa.me/558892542320?text=${encoded}`, '_blank');
    };

    // ===== UX DESIGN PRO MAX: 3D PARTICLES & VIDEO PARALLAX =====
    (function initPremiumHero() {
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0x0b50da, 2, 50);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        // Background Particles (Floating Bokeh)
        const particlesCount = 150;
        const pPositions = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i++) {
            pPositions[i] = (Math.random() - 0.5) * 20;
        }
        const pGeom = new THREE.BufferGeometry();
        pGeom.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
        const pMat = new THREE.PointsMaterial({ size: 0.05, color: 0x0b50da, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending });
        const particles = new THREE.Points(pGeom, pMat);
        scene.add(particles);

        camera.position.z = 8;

        // Interaction
        let mouseX = 0, mouseY = 0;
        const videoCard = document.querySelector('.video-3d-card');
        const mainVideo = document.getElementById('hero-main-video');

        // Ensure video is playing
        if (mainVideo) {
            mainVideo.play().catch(e => console.log("Autoplay blocked or video missing"));
        }

        window.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

            // 3D CSS Card Parallax
            if (videoCard) {
                gsap.to(videoCard, {
                    rotateY: mouseX * 15,
                    rotateX: -mouseY * 15,
                    x: mouseX * 10,
                    y: mouseY * 10,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            }
        });

        function animate() {
            requestAnimationFrame(animate);
            particles.rotation.y += 0.001;
            particles.rotation.z += 0.0005;

            // Gentle camera movement
            camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
            camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        }

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        animate();
    })();


    // 3D Model handled by Spline Viewer in HTML (Placeholder logic preserved)



})();