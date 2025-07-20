// Smooth scrolling for navigation links with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function () {
    const animateElements = document.querySelectorAll('.project-card, .timeline-item, .skill-item');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;

        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! I\'ll get back to you soon.');
        this.reset();
    });
}

// Typewriter effect for hero title
function typeWriter(element, htmlContent, speed = 80) {
    let i = 0;
    let currentText = '';
    let isInsideTag = false;
    let tagBuffer = '';

    element.innerHTML = '';

    function type() {
        if (i < htmlContent.length) {
            const char = htmlContent.charAt(i);

            if (char === '<') {
                isInsideTag = true;
                tagBuffer = char;
            } else if (char === '>' && isInsideTag) {
                isInsideTag = false;
                tagBuffer += char;
                currentText += tagBuffer;
                element.innerHTML = currentText;
                tagBuffer = '';
            } else if (isInsideTag) {
                tagBuffer += char;
            } else {
                currentText += char;
                element.innerHTML = currentText;
            }

            i++;

            // Only delay for visible characters, not HTML tags
            if (!isInsideTag && char !== '>') {
                setTimeout(type, speed);
            } else {
                type();
            }
        } else {
            // Add blinking cursor effect at the end
            element.innerHTML = currentText + '<span class="typing-cursor">|</span>';
            setTimeout(() => {
                const cursor = element.querySelector('.typing-cursor');
                if (cursor) cursor.remove();
            }, 2000);
        }
    }

    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', function () {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalHTML = 'Hi, I\'m <span class="highlight">Zohratul Zannat</span>';
        heroTitle.innerHTML = '';

        setTimeout(() => {
            typeWriter(heroTitle, originalHTML, 100);
        }, 800);
    }
});

// Fun Background Game - Floating Bubbles
class BubbleGame {
    constructor() {
        this.bubbles = [];
        this.maxBubbles = 8;
        this.score = 0;
        this.init();
    }

    init() {
        this.createBubbleContainer();
        this.startBubbleGeneration();
        this.showScore();
    }

    createBubbleContainer() {
        const container = document.createElement('div');
        container.id = 'bubble-container';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        `;
        document.body.appendChild(container);
    }

    createBubble() {
        if (this.bubbles.length >= this.maxBubbles) return;

        const bubble = document.createElement('div');
        const size = Math.random() * 40 + 20; // 20-60px
        const startX = Math.random() * (window.innerWidth - size);
        const speed = Math.random() * 2 + 1; // 1-3s
        const hue = Math.random() * 60 + 280; // Purple range

        bubble.className = 'floating-bubble';
        bubble.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(135deg, 
                hsla(${hue}, 40%, 80%, 0.3), 
                hsla(${hue + 20}, 50%, 70%, 0.2));
            border: 2px solid hsla(${hue}, 50%, 60%, 0.4);
            border-radius: 50%;
            left: ${startX}px;
            bottom: -${size}px;
            pointer-events: auto;
            cursor: pointer;
            backdrop-filter: blur(2px);
            transition: transform 0.2s ease;
            animation: floatUp ${speed + 8}s linear infinite;
        `;

        // Click to pop bubble
        bubble.addEventListener('click', (e) => {
            e.preventDefault();
            this.popBubble(bubble);
        });

        // Hover effect
        bubble.addEventListener('mouseenter', () => {
            bubble.style.transform = 'scale(1.1)';
        });

        bubble.addEventListener('mouseleave', () => {
            bubble.style.transform = 'scale(1)';
        });

        document.getElementById('bubble-container').appendChild(bubble);
        this.bubbles.push(bubble);

        // Remove bubble when animation ends
        setTimeout(() => {
            this.removeBubble(bubble);
        }, (speed + 8) * 1000);
    }

    popBubble(bubble) {
        this.score++;
        this.updateScore();

        // Play pop sound
        this.playPopSound();

        // Pop animation
        bubble.style.animation = 'bubblePop 0.3s ease-out forwards';

        setTimeout(() => {
            this.removeBubble(bubble);
        }, 300);
    }

    playPopSound() {
        // Create audio context for web audio API
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        // Piano notes in Hz (C major pentatonic scale for pleasant sounds)
        const pianoNotes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25]; // C4, D4, E4, G4, A4, C5
        const randomNote = pianoNotes[Math.floor(Math.random() * pianoNotes.length)];

        // Create piano-like sound using multiple oscillators
        this.createPianoNote(randomNote);
    }

    createPianoNote(frequency) {
        const now = this.audioContext.currentTime;
        const duration = 0.8;

        // Create multiple oscillators for richer piano-like sound
        const fundamental = this.audioContext.createOscillator();
        const harmonic2 = this.audioContext.createOscillator();
        const harmonic3 = this.audioContext.createOscillator();

        // Create gain nodes for each oscillator
        const fundamentalGain = this.audioContext.createGain();
        const harmonic2Gain = this.audioContext.createGain();
        const harmonic3Gain = this.audioContext.createGain();
        const masterGain = this.audioContext.createGain();

        // Connect the audio graph
        fundamental.connect(fundamentalGain);
        harmonic2.connect(harmonic2Gain);
        harmonic3.connect(harmonic3Gain);

        fundamentalGain.connect(masterGain);
        harmonic2Gain.connect(masterGain);
        harmonic3Gain.connect(masterGain);
        masterGain.connect(this.audioContext.destination);

        // Configure oscillators for piano-like timbre
        fundamental.type = 'triangle';
        harmonic2.type = 'sine';
        harmonic3.type = 'sine';

        // Set frequencies (fundamental + harmonics)
        fundamental.frequency.setValueAtTime(frequency, now);
        harmonic2.frequency.setValueAtTime(frequency * 2, now);
        harmonic3.frequency.setValueAtTime(frequency * 3, now);

        // Set relative volumes for realistic piano sound
        fundamentalGain.gain.setValueAtTime(0.4, now);
        harmonic2Gain.gain.setValueAtTime(0.2, now);
        harmonic3Gain.gain.setValueAtTime(0.1, now);

        // Piano-like envelope (quick attack, gradual decay)
        masterGain.gain.setValueAtTime(0, now);
        masterGain.gain.linearRampToValueAtTime(0.3, now + 0.02); // Quick attack
        masterGain.gain.exponentialRampToValueAtTime(0.1, now + 0.2); // Initial decay
        masterGain.gain.exponentialRampToValueAtTime(0.01, now + duration); // Sustain and release

        // Start and stop all oscillators
        [fundamental, harmonic2, harmonic3].forEach(osc => {
            osc.start(now);
            osc.stop(now + duration);
        });
    }

    removeBubble(bubble) {
        const index = this.bubbles.indexOf(bubble);
        if (index > -1) {
            this.bubbles.splice(index, 1);
            if (bubble.parentNode) {
                bubble.parentNode.removeChild(bubble);
            }
        }
    }

    showScore() {
        const scoreElement = document.createElement('div');
        scoreElement.id = 'bubble-score';
        scoreElement.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(107, 91, 115, 0.9);
            color: #F5F5F0;
            padding: 8px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
            z-index: 1001;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(212, 196, 221, 0.3);
            transition: all 0.3s ease;
            opacity: 0;
        `;
        scoreElement.innerHTML = '🫧 Bubbles: 0';
        document.body.appendChild(scoreElement);

        // Show score after a delay
        setTimeout(() => {
            scoreElement.style.opacity = '1';
        }, 2000);
    }

    updateScore() {
        const scoreElement = document.getElementById('bubble-score');
        if (scoreElement) {
            scoreElement.innerHTML = `🫧 Bubbles: ${this.score}`;
            scoreElement.style.transform = 'scale(1.1)';
            setTimeout(() => {
                scoreElement.style.transform = 'scale(1)';
            }, 200);
        }
    }

    startBubbleGeneration() {
        // Create bubbles at random intervals
        setInterval(() => {
            if (Math.random() < 0.3) { // 30% chance every interval
                this.createBubble();
            }
        }, 2000);

        // Create initial bubble
        setTimeout(() => {
            this.createBubble();
        }, 3000);
    }
}

// Initialize bubble game when page loads
window.addEventListener('load', function () {
    setTimeout(() => {
        new BubbleGame();
    }, 2000);
});

// Skills animation on hover
document.querySelectorAll('.skill-item').forEach(skill => {
    skill.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });

    skill.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Project cards hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});