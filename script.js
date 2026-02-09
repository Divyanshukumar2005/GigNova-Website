// ===========================
// GIGNOVA - ULTRA OPTIMIZED JAVASCRIPT
// Performance Optimized for Low-End Devices
// ===========================

document.addEventListener('DOMContentLoaded', () => {

            // ===========================
            // DEVICE DETECTION
            // ===========================
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const isLowEnd = navigator.hardwareConcurrency <= 4 || navigator.deviceMemory <= 4;
            const reduceAnimations = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            console.log(`📱 Device: ${isMobile ? 'Mobile' : 'Desktop'} | Low-End: ${isLowEnd}`);

            // ===========================
            // 1. PRELOADER - Fast
            // ===========================
            const loader = document.getElementById('loader');
            setTimeout(() => {
                if (loader) {
                    loader.style.opacity = '0';
                    loader.style.transition = 'opacity 0.3s';
                    setTimeout(() => {
                        loader.style.display = 'none';
                        if (!reduceAnimations) initHeroAnimations();
                    }, 300);
                } else {
                    if (!reduceAnimations) initHeroAnimations();
                }
            }, 300);

            // ===========================
            // 2. MOBILE MENU - Perfect Fix
            // ===========================
            const menuBtn = document.getElementById('menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileLinks = document.querySelectorAll('.mobile-link');
            const openIcon = menuBtn ? menuBtn.querySelector('.menu-open') : null;
            const closeIcon = menuBtn ? menuBtn.querySelector('.menu-close') : null;

            let isMenuOpen = false;

            if (menuBtn && mobileMenu && openIcon && closeIcon) {
                menuBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    isMenuOpen = !isMenuOpen;

                    if (isMenuOpen) {
                        mobileMenu.classList.add('active');
                        openIcon.classList.add('hidden');
                        closeIcon.classList.remove('hidden');
                        document.body.style.overflow = 'hidden';
                    } else {
                        closeMenu();
                    }
                });

                mobileLinks.forEach(link => {
                    link.addEventListener('click', closeMenu);
                });

                function closeMenu() {
                    isMenuOpen = false;
                    if (mobileMenu) mobileMenu.classList.remove('active');
                    if (closeIcon) closeIcon.classList.add('hidden');
                    if (openIcon) openIcon.classList.remove('hidden');
                    document.body.style.overflow = 'auto';
                }

                // Close on outside click
                document.addEventListener('click', (e) => {
                    if (isMenuOpen && mobileMenu && menuBtn) {
                        if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                            closeMenu();
                        }
                    }
                });
            }

            // ===========================
            // 3. NAVBAR SCROLL - Optimized
            // ===========================
            const navbar = document.getElementById('navbar');
            let lastScroll = 0;
            let ticking = false;

            function updateNavbar() {
                const currentScroll = window.pageYOffset;

                if (currentScroll > 50) {
                    navbar.classList.add('nav-glass');
                    navbar.classList.remove('py-6');
                    navbar.classList.add('py-4');
                } else {
                    navbar.classList.remove('nav-glass');
                    navbar.classList.remove('py-4');
                    navbar.classList.add('py-6');
                }

                lastScroll = currentScroll;
                ticking = false;
            }

            window.addEventListener('scroll', () => {
                if (!ticking) {
                    window.requestAnimationFrame(updateNavbar);
                    ticking = true;
                }
            }, { passive: true });

            // ===========================
            // 4. CUSTOM CURSOR - Desktop Only
            // ===========================
            if (!isMobile && window.innerWidth > 768) {
                const cursorDot = document.querySelector('.cursor-dot');
                const cursorOutline = document.querySelector('.cursor-outline');

                if (cursorDot && cursorOutline) {
                    let mouseX = 0;
                    let mouseY = 0;
                    let outlineX = 0;
                    let outlineY = 0;
                    const speed = 0.15;

                    window.addEventListener('mousemove', (e) => {
                        mouseX = e.clientX;
                        mouseY = e.clientY;
                        cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
                    }, { passive: true });

                    function animateCursor() {
                        outlineX += (mouseX - outlineX) * speed;
                        outlineY += (mouseY - outlineY) * speed;
                        cursorOutline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%)`;
                        requestAnimationFrame(animateCursor);
                    }
                    animateCursor();
                }
            }

            // ===========================
            // 5. GSAP ANIMATIONS - Conditional
            // ===========================
            function initHeroAnimations() {

                // 🔒 SAFETY FIX – HERO CANVAS HEIGHT (MOBILE DESKTOP MODE)
                const canvas = document.getElementById("hero-particles");
                const hero = document.getElementById("home");
                if (canvas && hero) {
                    const rect = hero.getBoundingClientRect();
                    canvas.width = rect.width;
                    canvas.height = rect.height;
                }

                if (typeof ScrollTrigger !== 'undefined') {
                    gsap.registerPlugin(ScrollTrigger);
                }

                if (!isLowEnd) {
                    gsap.from(".hero-content > *", {
                        y: 60,
                        opacity: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power3.out",
                        delay: 0.1
                    });

                    gsap.from(".hero-visual", {
                        x: 80,
                        opacity: 0,
                        duration: 1,
                        ease: "power3.out",
                        delay: 0.3
                    });
                } else {
                    document.querySelectorAll('.hero-content > *, .hero-visual').forEach(el => {
                        el.style.opacity = '1';
                        el.style.transform = 'none';
                    });
                }

                if (!isLowEnd) {
                    const counters = document.querySelectorAll('.counter');
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        gsap.to(counter, {
                            innerHTML: target,
                            duration: 2,
                            snap: { innerHTML: 1 },
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: counter,
                                start: "top 85%",
                                once: true
                            }
                        });
                    });
                } else {
                    document.querySelectorAll('.counter').forEach(counter => {
                        const target = counter.getAttribute('data-target');
                        counter.textContent = target;
                    });
                }

                if (!isLowEnd && typeof ScrollTrigger !== 'undefined') {
                    gsap.utils.toArray('section').forEach(section => {
                        gsap.from(section, {
                            opacity: 0,
                            y: 30,
                            duration: 0.6,
                            scrollTrigger: {
                                trigger: section,
                                start: "top 80%",
                                once: true
                            }
                        });
                    });
                }
            }

            // ===========================
            // 6. 3D TILT - Only High-End Devices
            // ===========================
            if (!isMobile && !isLowEnd) {
                const serviceCards = document.querySelectorAll('.service-card');
                serviceCards.forEach(card => {
                    card.addEventListener('mousemove', (e) => {
                        const rect = card.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;
                        const rotateX = ((y - centerY) / centerY) * -5;
                        const rotateY = ((x - centerX) / centerX) * 5;

                        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                    });

                    card.addEventListener('mouseleave', () => {
                        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                    });
                });
            }

            // ===========================
            // 7. PARTICLE SYSTEM - FIXED FOR MOBILE DESKTOP MODE
            // ===========================
            const canvas = document.getElementById("hero-particles");
            if (canvas && !reduceAnimations) {
                const ctx = canvas.getContext("2d", { alpha: true });

                function setCanvasSize() {
                    const hero = document.getElementById('home');
                    if (!hero) return;

                    const rect = hero.getBoundingClientRect();
                    canvas.width = rect.width;
                    canvas.height = hero.offsetHeight; // 🔥 boundingRect nahi

                }

                setCanvasSize();

                let particlesArray = [];
                let mouse = {
                    x: null,
                    y: null,
                    radius: 120
                };

                // Mouse support (desktop)
                window.addEventListener('mousemove', (event) => {
                    mouse.x = event.clientX;
                    mouse.y = event.clientY;
                }, { passive: true });

                // Touch support (mobile + tablet)
                window.addEventListener('touchmove', (event) => {
                    if (event.touches.length > 0) {
                        mouse.x = event.touches[0].clientX;
                        mouse.y = event.touches[0].clientY;
                    }
                }, { passive: true });

                // Touch end reset
                window.addEventListener('touchend', () => {
                    mouse.x = null;
                    mouse.y = null;
                });


                class Particle {
                    constructor(x, y, directionX, directionY, size) {
                        this.x = x;
                        this.y = y;
                        this.directionX = directionX;
                        this.directionY = directionY;
                        this.size = size;
                    }

                    draw() {
                        ctx.beginPath();
                        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                        ctx.fillStyle = '#3B82F6';
                        ctx.fill();
                    }

                    update() {
                        if (this.x > canvas.width || this.x < 0) {
                            this.directionX = -this.directionX;
                        }
                        if (this.y > canvas.height || this.y < 0) {
                            this.directionY = -this.directionY;
                        }

                        if (!isMobile && mouse.x !== null) {
                            let dx = mouse.x - this.x;
                            let dy = mouse.y - this.y;
                            let distance = Math.sqrt(dx * dx + dy * dy);

                            if (distance < mouse.radius + this.size) {
                                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                                    this.x += 2;
                                }
                                if (mouse.x > this.x && this.x > this.size * 10) {
                                    this.x -= 2;
                                }
                                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                                    this.y += 2;
                                }
                                if (mouse.y > this.y && this.y > this.size * 10) {
                                    this.y -= 2;
                                }
                            }
                        }

                        this.x += this.directionX;
                        this.y += this.directionY;
                        this.draw();
                    }
                }

                function initParticles() {
                    particlesArray = [];

                    let numberOfParticles;
                    if (isMobile || isLowEnd) {
                        numberOfParticles = (canvas.height * canvas.width) / 30000;
                    } else {
                        numberOfParticles = (canvas.height * canvas.width) / 15000;
                    }

                    for (let i = 0; i < numberOfParticles; i++) {
                        let size = (Math.random() * 3) + 1.5;
                        let x = Math.random() * canvas.width;
                        let y = Math.random() * canvas.height;
                        let directionX = (Math.random() * 0.4) - 0.2;
                        let directionY = (Math.random() * 0.4) - 0.2;

                        particlesArray.push(new Particle(x, y, directionX, directionY, size));
                    }
                }

                let animationId;

                function animateParticles() {
                    animationId = requestAnimationFrame(animateParticles);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    for (let i = 0; i < particlesArray.length; i++) {
                        particlesArray[i].update();
                    }


                    connectParticles();
                }

                function connectParticles() {
                    let maxDistance = (canvas.width / 7) * (canvas.height / 7);

                    for (let a = 0; a < particlesArray.length; a++) {
                        for (let b = a; b < particlesArray.length; b++) {
                            let distance = ((particlesArray[a].x - particlesArray[b].x) *
                                    (particlesArray[a].x - particlesArray[b].x)) +
                                ((particlesArray[a].y - particlesArray[b].y) *
                                    (particlesArray[a].y - particlesArray[b].y));

                            if (distance < maxDistance) {
                                let opacityValue = 1 - (distance / 20000);
                                ctx.strokeStyle = 'rgba(59, 130, 246,' + opacityValue + ')';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                                ctx.stroke();
                            }
                        }
                    }
                }

                let resizeTimeout;
                window.addEventListener('resize', () => {
                    clearTimeout(resizeTimeout);
                    resizeTimeout = setTimeout(() => {
                        setCanvasSize(); // Use new resize function
                        mouse.radius = 100;
                        cancelAnimationFrame(animationId);
                        initParticles();
                        animateParticles();
                    }, 250);
                });

                initParticles();
                animateParticles();
            }

            // ===========================
            // 8. SMOOTH SCROLL - Optimized
            // ===========================
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href === '#') return;

                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        if (typeof closeMenu === 'function') closeMenu();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // ===========================
            // 9. FAQ ACCORDION
            // ===========================
            const faqItems = document.querySelectorAll('.faq-item');

            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');

                if (question) {
                    question.addEventListener('click', () => {
                        const isActive = item.classList.contains('active');

                        faqItems.forEach(otherItem => {
                            otherItem.classList.remove('active');
                        });

                        if (!isActive) {
                            item.classList.add('active');
                        }
                    });
                }
            });

            // ===========================
            // 10. BACK TO TOP BUTTON
            // ===========================
            const backToTopBtn = document.getElementById('back-to-top');

            if (backToTopBtn) {
                let scrollTimeout;

                window.addEventListener('scroll', () => {
                    clearTimeout(scrollTimeout);
                    scrollTimeout = setTimeout(() => {
                        if (window.scrollY > 500) {
                            backToTopBtn.classList.add('show');
                        } else {
                            backToTopBtn.classList.remove('show');
                        }
                    }, 100);
                }, { passive: true });

                backToTopBtn.addEventListener('click', () => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
            }

            // ===========================
            // 11. FORM SUBMISSION - Enhanced
            // ===========================
            const contactForm = document.getElementById('contact-form');
            const resultDiv = document.getElementById('result');
            const submitBtn = document.getElementById('form-submit-btn');

            if (contactForm) {
                contactForm.addEventListener('submit', async function(e) {
                    e.preventDefault();

                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                    submitBtn.disabled = true;
                    resultDiv.innerHTML = "";

                    try {
                        const formData = new FormData(contactForm);
                        const response = await fetch('https://api.web3forms.com/submit', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify(Object.fromEntries(formData))
                        });

                        const json = await response.json();

                        if (response.status === 200) {
                            resultDiv.innerHTML = `
                        <div class="text-green-400 font-semibold">
                            <i class="fas fa-check-circle"></i> 
                            Message Sent Successfully! 🎉
                            <br><span class="text-sm mt-1 block">We'll reply within 24 hours</span>
                        </div>
                    `;
                            contactForm.reset();
                            resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        } else {
                            throw new Error(json.message || 'Submission failed');
                        }
                    } catch (error) {
                        console.error('Form Error:', error);
                        resultDiv.innerHTML = `
                    <div class="text-red-400 font-semibold">
                        <i class="fas fa-exclamation-circle"></i> 
                        ${error.message || 'Failed to send. Please try again or contact us directly.'}
                    </div>
                `;
                    } finally {
                        submitBtn.innerHTML = 'Send Message';
                        submitBtn.disabled = false;

                        setTimeout(() => {
                            resultDiv.innerHTML = "";
                        }, 7000);
                    }
                });
            }

            // ===========================
            // 12. TESTIMONIALS
            // ===========================
            const SHEET_ID = "1hS1bpkkHudaaXqjqv8TuxTjIdRr3uvrfNP9sBFK1lkM";
            const SHEET_NAME = "Form responses 1";
            const SHEET_URL = `https://opensheet.elk.sh/${SHEET_ID}/${SHEET_NAME}`;

            async function loadTestimonials() {
                const container = document.getElementById("testimonials");
                if (!container) return;

                container.innerHTML = `
            <div class="col-span-full text-center text-gray-400">
                <i class="fas fa-spinner fa-spin text-4xl mb-4"></i>
                <p class="text-sm">Loading testimonials...</p>
            </div>
        `;

                try {
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 10000);

                    const response = await fetch(SHEET_URL, {
                        signal: controller.signal,
                        cache: 'no-cache'
                    });

                    clearTimeout(timeoutId);

                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                    }

                    const data = await response.json();

                    if (!Array.isArray(data) || data.length === 0) {
                        throw new Error('No testimonials found');
                    }

                    renderTestimonials(data);

                } catch (err) {
                    console.error("❌ Testimonials Error:", err.message);

                    let errorMessage = 'Unable to load testimonials';
                    let errorDetails = err.message;

                    if (err.name === 'AbortError') {
                        errorMessage = 'Request Timeout';
                        errorDetails = 'Server took too long to respond';
                    }

                    container.innerHTML = `
                <div class="col-span-full glass-panel p-8 rounded-2xl text-center">
                    <i class="fas fa-exclamation-triangle text-4xl text-yellow-500 mb-4"></i>
                    <h3 class="text-lg font-bold text-gray-300 mb-2">${errorMessage}</h3>
                    <p class="text-sm text-gray-500 mb-4">${errorDetails}</p>
                    <button onclick="location.reload()" class="px-6 py-2 bg-primary rounded-full text-sm font-bold hover:bg-blue-600 transition">
                        <i class="fas fa-sync-alt mr-2"></i> Retry
                    </button>
                </div>
            `;
                }
            }

            loadTestimonials();

            // ===========================
            // 13. RENDER TESTIMONIALS
            // ===========================
            function renderTestimonials(rows) {
                const container = document.getElementById("testimonials");
                if (!container) return;

                container.innerHTML = "";

                const limitedRows = rows.reverse().slice(0, 6);

                limitedRows.forEach(row => {
                            const permission = row["Permission to Display Review"] || "";
                            if (!permission.toLowerCase().includes("allow")) return;

                            const name = row["Your Name"] || "Anonymous";
                            const role = row["Your Role / Business Name / Website Name."] || "Client";
                            const service = row["Service Taken"] || "Service";
                            const review = row["Your Experience / Review"] || "No review provided";
                            const rating = parseInt(row["Overall Rating"]) || 5;
                            const photo = row["Profile Photo"];

                            const isVerified = permission.includes("I allow GigNova to display this review");
                            const avatar = getAvatar(name, photo);

                            let stars = "";
                            for (let i = 0; i < rating; i++) {
                                stars += `<i class="fas fa-star text-yellow-400"></i>`;
                            }

                            container.innerHTML += `
                <div class="glass-panel p-8 rounded-2xl relative">
                    ${isVerified ? `
                        <span class="verified-badge">
    <i class="fas fa-check-circle"></i> Verified
</span>

                    ` : ''}
                    
                    <div class="flex gap-1 mb-3">${stars}</div>
                    
                    <p class="text-gray-300 mb-4 italic">"${review}"</p>
                    
                    <p class="text-xs text-accent mb-5 font-semibold uppercase tracking-wider">
                        Service: ${service}
                    </p>
                    
                    <div class="flex items-center gap-3">
                        ${avatar}
                        <div>
                            <p class="font-bold">${name}</p>
                            <p class="text-sm text-gray-500">${role}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    function getAvatar(name, photoUrl) {
        const imgUrl = convertDriveLink(photoUrl);

        if (imgUrl) {
            return `<img src="${imgUrl}" class="w-12 h-12 rounded-full object-cover border border-white/10" loading="lazy" onerror="this.style.display='none'">`;
        }

        const emojis = ["👨‍💻", "👩‍💻", "🧔‍♂️", "👨‍🦰", "👩‍🦰"];
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];

        return `
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl">
                ${emoji}
            </div>
        `;
    }

    function convertDriveLink(url) {
        if (!url) return null;
        const match = url.match(/(?:id=|\/d\/)([a-zA-Z0-9_-]+)/);
        if (!match) return null;
        return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }

    // ===========================
    // 14. CONSOLE BRANDING
    // ===========================
    console.log(
        '%c🚀 GigNova Digital Reality',
        'color: #3B82F6; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 0px rgba(0,0,0,0.2);'
    );
    console.log(
        '%c✅ Optimized for Performance',
        'color: #10b981; font-size: 14px;'
    );
    console.log(
        '%c📧 Contact: workwithdivyanshukumar@gmail.com',
        'color: #6b7280; font-size: 12px;'
    );

    // ===========================
    // 15. PERFORMANCE MONITORING
    // ===========================
    window.addEventListener('load', () => {
        if (loader) loader.style.display = 'none';
        
        if (window.performance && window.performance.timing) {
            const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
            console.log(`⚡ Page loaded in ${(loadTime / 1000).toFixed(2)}s`);
        }
    });

});