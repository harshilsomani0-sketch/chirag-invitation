document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Splash Screen Reveal ---
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const openBtn = document.getElementById('open-btn');

    openBtn.addEventListener('click', () => {
        splashScreen.classList.add('slide-up');
        mainContent.classList.remove('hidden');
        window.scrollTo(0, 0); 
    });

    // --- 2. Countdown Timer Logic ---
    const weddingDate = new Date(2026, 4, 15, 10, 0, 0).getTime(); // May 15, 2026

    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.querySelector('.timer-grid').innerHTML = "<h3 style='color: #ffffff;'>લગ્ન સંપન્ન (Just Married)</h3>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days < 10 ? '0' + days : days;
        document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
    }, 1000);

    // --- 3. Save to Google Calendar Logic ---
    const calendarBtn = document.getElementById('calendarBtn');
    if (calendarBtn) {
        calendarBtn.addEventListener('click', () => {
            const eventTitle = "Harshil's Wedding";
            const location = "Nilambag Palace, Bhavnagar, Gujarat";
            const details = "We cordially invite you to join our wedding celebration.";
            const startDate = "20260515T043000Z"; 
            const endDate = "20260515T123000Z";   
            
            const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
            window.open(googleCalUrl, '_blank');
        });
    }

    // --- 4. AJAX RSVP Form Submission ---
    const rsvpForm = document.getElementById('rsvpForm');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop standard HTML form submission

            const formData = new FormData(this);
            const submitBtn = document.getElementById('submitBtn');
            
            // Loading State
            submitBtn.innerText = "મોકલાઈ રહ્યું છે... (Sending...)";
            submitBtn.disabled = true;

            // AJAX Request using Fetch API
            // NOTE: Replace 'process_rsvp.php' with your actual server endpoint
            fetch('process_rsvp.php', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                // For this demo, we simulate a successful response 
                // In production, check response.ok 
                return new Promise(resolve => setTimeout(resolve, 1500)); // Fake 1.5s delay
            })
            .then(() => {
                alert("આપનો આભાર! તમારો RSVP નોંધાઈ ગયો છે.\n(Thank you! Your RSVP has been received.)");
                rsvpForm.reset(); // Clear the form
            })
            .catch(error => {
                console.error('Error:', error);
                alert("કંઈક ભૂલ થઈ છે. કૃપા કરીને ફરી પ્રયાસ કરો.\n(Something went wrong. Please try again.)");
            })
            .finally(() => {
                // Reset Button
                submitBtn.innerText = "મોકલો (Submit)";
                submitBtn.disabled = false;
            });
        });
    }

});
document.addEventListener('DOMContentLoaded', () => {
    
    const kankotriContainer = document.getElementById('kankotri');
    const doors = document.querySelectorAll('.door'); // Selects both left and right doors
    const openBtn = document.getElementById('open-btn');
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');

    // 1. Click either door to open the 3D gatefold
    doors.forEach(door => {
        door.addEventListener('click', () => {
            kankotriContainer.classList.add('open');
        });
    });

    // 2. Click the button inside to fade out splash and show main site
    openBtn.addEventListener('click', () => {
        // Fade out splash screen
        splashScreen.style.opacity = '0';
        
        setTimeout(() => {
            splashScreen.style.display = 'none'; // Remove from DOM visually
            mainContent.style.display = 'block'; // Show main content
            
            setTimeout(() => {
                mainContent.classList.remove('hidden');
            }, 50);

        }, 800); // Matches the 0.8s CSS transition
    });

    // --- (Keep your existing Countdown timer and Flip card JS below here) ---

});
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. GATEFOLD OPENING ANIMATION ---
    const kankotriContainer = document.getElementById('kankotri');
    const doors = document.querySelectorAll('.door'); 
    const openBtn = document.getElementById('open-btn');
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');

    // Click either door to open the 3D gatefold
    doors.forEach(door => {
        door.addEventListener('click', () => {
            kankotriContainer.classList.add('open');
        });
    });

    // Click the button inside to fade out splash and show main site
    openBtn.addEventListener('click', () => {
        splashScreen.style.opacity = '0';
        
        setTimeout(() => {
            splashScreen.style.display = 'none'; 
            mainContent.style.display = 'block'; 
            
            setTimeout(() => {
                mainContent.classList.remove('hidden');
            }, 50);
        }, 800); 
    });

    // --- 2. MOBILE TOUCH FLIP CARDS ---
    // This ensures cards flip when tapped on a smartphone
    const flipCards = document.querySelectorAll('.flip-card-inner');
    flipCards.forEach(card => {
        card.addEventListener('click', function() {
            if (this.style.transform === 'rotateY(180deg)') {
                this.style.transform = ''; // Flip back to front
            } else {
                this.style.transform = 'rotateY(180deg)'; // Flip to back
            }
        });
    });

    // --- 3. RSVP FORM SUBMISSION (Basic Alert) ---
    const rsvpForm = document.getElementById('rsvpForm');
    if(rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('આપનો ખુબ ખુબ આભાર! તમારી હાજરી નોંધાઈ ગઈ છે. (Thank you! Your RSVP is saved.)');
            rsvpForm.reset();
        });
    }
});
