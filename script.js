// ===== LOADER =====
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
        // Trigger initial reveals
        checkReveals();
    }, 2200);
});

document.body.style.overflow = 'hidden';




// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (menuOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }
});

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        menuOpen = false;
        mobileMenu.classList.remove('open');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    });
});

// ===== SCROLL REVEAL =====
function checkReveals() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.88) {
            setTimeout(() => {
                el.classList.add('visible');
            }, i * 80);
        }
    });
}

window.addEventListener('scroll', checkReveals);

// ===== SKILL BARS ANIMATION =====
function animateSkillBars() {
    const bars = document.querySelectorAll('.skill-fill');
    bars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9 && !bar.classList.contains('animated')) {
            bar.classList.add('animated');
        }
    });
}

window.addEventListener('scroll', animateSkillBars);

// ===== HERO TITLE STAGGER =====
const titleLines = document.querySelectorAll('.title-line');
titleLines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(40px)';
    line.style.transition = `opacity 0.8s ease ${0.3 + i * 0.15}s, transform 0.8s ease ${0.3 + i * 0.15}s`;
    setTimeout(() => {
        line.style.opacity = '1';
        line.style.transform = 'translateY(0)';
    }, 2300);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== CONTACT FORM =====
const sendBtn = document.getElementById('sendBtn');
const formNote = document.getElementById('formNote');

sendBtn.addEventListener('click', async () => {
    const name = document.getElementById('fname').value.trim();
    const email = document.getElementById('femail').value.trim();
    const message = document.getElementById('fmessage').value.trim();

    if (!name || !email || !message) {
        formNote.style.color = '#ff6584';
        formNote.textContent = '⚠️ Please fill in all fields.';
        return;
    }

    if (!email.includes('@')) {
        formNote.style.color = '#ff6584';
        formNote.textContent = '⚠️ Please enter a valid email.';
        return;
    }

    sendBtn.textContent = 'Sending...';
    sendBtn.style.opacity = '0.7';

    try {
        const response = await fetch('https://formspree.io/f/mrededry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
        });

        if (response.ok) {
            sendBtn.textContent = '✅ Message Sent!';
            sendBtn.style.opacity = '1';
            formNote.style.color = '#00ff88';
            formNote.textContent = "Thanks! I'll get back to you within 24 hours.";
            document.getElementById('fname').value = '';
            document.getElementById('femail').value = '';
            document.getElementById('fmessage').value = '';

            setTimeout(() => {
                sendBtn.innerHTML = 'Send Message <span>→</span>';
                formNote.textContent = '';
            }, 4000);
        } else {
            throw new Error('Failed');
        }
    } catch (error) {
        sendBtn.innerHTML = 'Send Message <span>→</span>';
        sendBtn.style.opacity = '1';
        formNote.style.color = '#ff6584';
        formNote.textContent = '⚠️ Something went wrong. Please try WhatsApp instead.';
    }
});
// ===== PARALLAX GLOW =====
window.addEventListener('mousemove', (e) => {
    const glow = document.querySelector('.hero-glow');
    if (glow) {
        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;
        glow.style.transform = `translate(${x}px, ${y}px)`;
    }
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (navLink) {
            if (scrollY >= top && scrollY < top + height) {
                document.querySelectorAll('.nav-links a').forEach(l => l.style.color = '');
                navLink.style.color = 'var(--accent)';
            }
        }
    });
});
