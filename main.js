// ==========================================
// 100% SAFE MAIN.JS (ચિરાગ & કોમલ કંકોત્રી)
// ==========================================

console.log("✅ Main JS Loading Started...");

// ૧. ફેમિલી ટ્રી બદલવા માટેનું ફંક્શન
window.toggleFamily = function(category) {
    const bubbles = document.querySelectorAll('.family-bubble');
    bubbles.forEach(b => b.classList.remove('active'));
    if (window.event) window.event.currentTarget.classList.add('active');

    const sections = document.querySelectorAll('.family-section');
    sections.forEach(sec => {
        sec.classList.add('hidden');
        sec.classList.remove('block');
        sec.style.opacity = '0';
    });

    const activeSection = document.getElementById('content-' + category);
    if (activeSection) {
        activeSection.classList.remove('hidden');
        activeSection.classList.add('block');
        setTimeout(() => { activeSection.style.opacity = '1'; }, 50);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    console.log("✅ HTML Loaded successfully. Attaching events...");
    
    // પિટલ કન્ટેનર બટનને બ્લોક ન કરે તે માટે જબરદસ્તી pointer-events બંધ કર્યા
    const petalContainer = document.getElementById('petal-container');
    if (petalContainer) petalContainer.style.pointerEvents = 'none';

    const openBtn = document.getElementById('open-btn');
    const introOverlay = document.getElementById('intro');
    const mainContent = document.getElementById('main-content');
    const musicToggle = document.getElementById('music-toggle');
    const music = document.getElementById('wedding-music');
    const musicIcon = document.getElementById('music-icon');

    if (!openBtn) {
        console.error("❌ ERROR: 'open-btn' મળ્યું નથી! HTML ચેક કરો.");
        return;
    }

    // ==========================================
    // બટન ક્લિક ઇવેન્ટ (Button Click Logic)
    // ==========================================
    openBtn.addEventListener('click', () => {
        console.log("🎯 પત્રિકા ખોલો બટન ક્લિક થયું!");
        
        // 1. Play Music (Safe Play)
        if (music) {
            let playPromise = music.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("🔇 બ્રાઉઝરે ઓડિયો જાતે શરૂ થતો અટકાવ્યો.");
                });
            }
        }

        // 2. Hide Intro Screen Smoothly
        if (introOverlay) {
            introOverlay.style.transition = 'all 1s ease';
            introOverlay.style.transform = 'scale(1.5)';
            introOverlay.style.opacity = '0';
            setTimeout(() => {
                introOverlay.style.display = 'none';
                document.body.classList.remove('locked');
            }, 1000);
        }
        
        // 3. Show Main Content
        if (mainContent) {
            mainContent.classList.remove('opacity-0');
            mainContent.style.opacity = '1';
        }

        // 4. Show Music Toggle Button
        setTimeout(() => {
            if (musicToggle) {
                musicToggle.classList.remove('opacity-0', 'pointer-events-none', 'hidden');
                musicToggle.style.opacity = '1';
                musicToggle.style.pointerEvents = 'auto';
            }
        }, 1000);

        // 5. Burst Petals (ફૂલોનો બ્લાસ્ટ)
        try {
            createPetalBurst();
        } catch (e) {
            console.error("🌸 Petal Burst Error:", e);
        }
    });

    // ==========================================
    // બાકીના ફંક્શન્સ (Music, Petals, Countdown)
    // ==========================================
    
    // Music Toggle Event
    if (musicToggle && music) {
        musicToggle.addEventListener('click', (e) => {
            e.stopPropagation(); 
            if (music.paused) {
                music.play();
                musicIcon.innerText = "🔊";
            } else {
                music.pause();
                musicIcon.innerText = "🔇";
            }
        });
    }
    
    // પડતા ફૂલો (Falling Petals)
    function spawnPetal() {
        if (!petalContainer) return;
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.innerHTML = '🌸';
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.animationDuration = `${Math.random() * 5 + 7}s`;
        petal.style.opacity = Math.random() * 0.6 + 0.2;
        petal.style.fontSize = `${Math.random() * 15 + 15}px`;

        petalContainer.appendChild(petal);
        petal.addEventListener('animationend', () => {
            petal.remove();
            spawnPetal();
        });
    }

    function initPetals(count = 12) {
        for (let i = 0; i < count; i++) {
            setTimeout(spawnPetal, i * 800); 
        }
    }

    // બટન દબાવવા પર ફૂલો ઉડવા (Petal Burst)
    function createPetalBurst() {
        if (!petalContainer) return;
        for (let i = 0; i < 30; i++) {
            const petal = document.createElement('div');
            petal.className = 'absolute z-[150] pointer-events-none';
            petal.innerHTML = '🌸';
            petal.style.left = '50%';
            petal.style.top = '50%';
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = 100 + Math.random() * 150;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            petal.style.fontSize = `${Math.random() * 15 + 10}px`;
            petal.style.transition = 'all 1.5s cubic-bezier(0.25, 1, 0.5, 1)';
            petal.style.transform = `translate(-50%, -50%) scale(0)`;
            
            petalContainer.appendChild(petal);

            setTimeout(() => {
                petal.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(${Math.random() * 1.5 + 0.5}) rotate(${Math.random() * 360}deg)`;
                petal.style.opacity = '0';
            }, 10);

            setTimeout(() => { petal.remove(); }, 1500);
        }
    }

    // રિસેપ્શન કાઉન્ટડાઉન
    function initCountdown() {
        const destDate = new Date("May 9, 2026 19:00:00").getTime();
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = destDate - now;

            if (distance < 0) {
                clearInterval(timer);
                return; 
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            document.getElementById("days").innerText = days < 10 ? '0' + days : days;
            document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
            document.getElementById("mins").innerText = minutes < 10 ? '0' + minutes : minutes;
        }, 1000);
    }

    // સ્ક્રોલ એનિમેશન
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'journey-section') {
                    entry.target.classList.add('animate-journey');
                }
                const lines = entry.target.querySelectorAll('.cinematic-line');
                if(lines.length > 0) {
                    lines.forEach((line, index) => {
                        setTimeout(() => { line.classList.add('animate-text'); }, index * 600);
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    // બધું શરૂ કરો
    initPetals(15);
    initCountdown();

    const sectionsToObserve = ['journey-section', 'poem-trigger', 'pagla-trigger', 'blessings-trigger', 'header-trigger'];
    sectionsToObserve.forEach(id => {
        const el = document.getElementById(id);
        if (el) scrollObserver.observe(el);
    });

});