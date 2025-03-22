// DOM Elements
const typewriter = document.querySelector('.typewriter');
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');
const filterBtns = document.querySelectorAll('.filter-btn');
const courseCards = document.querySelectorAll('.course-card');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');

// Constants
const WORDS = ['Innovation', 'Excellence', 'Success', 'Knowledge'];
const PARTICLES_COUNT = 100;

// Typewriter Effect
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = WORDS[wordIndex % WORDS.length];
    typewriter.textContent = currentWord.substring(0, charIndex);
    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

    if (!isDeleting && charIndex === currentWord.length + 1) {
        isDeleting = true;
        setTimeout(type, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex++;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 100 : 150);
    }
}

// Particle Animation
const particles = Array.from({ length: PARTICLES_COUNT }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 3 + 1,
    speedX: Math.random() * 1 - 0.5,
    speedY: Math.random() * 1 - 0.5
}));

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fill();
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    });
    requestAnimationFrame(animateParticles);
}

// Smooth Scrolling
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Course Filter Functionality
function handleFilterClick(event) {
    const filter = event.target.dataset.filter;
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    courseCards.forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.category === filter) ? 'block' : 'none';
    });
}

// Enroll Course Functionality
function enrollCourse(courseName) {
    alert(`You have enrolled in ${courseName}! (This is a demo)`);
}

// Contact Form Submission
function handleContactForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simulate form submission (replace with actual API call)
    alert(`Thank you, ${name}! Your message has been sent.`);
    event.target.reset();
}

// Back to Top Button
function handleScroll() {
    backToTop.style.display = window.scrollY > 200 ? 'block' : 'none';
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Resize Canvas
function handleResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    type();
    animateParticles();
});

window.addEventListener('resize', handleResize);

filterBtns.forEach(btn => btn.addEventListener('click', handleFilterClick));

backToTop.addEventListener('click', scrollToTop);
window.addEventListener('scroll', handleScroll);

if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
}
// Toggle Modal
function toggleModal(modalId = 'loginModal') {
    const modal = document.getElementById(modalId);
    modal.classList.toggle('active');
}

// Handle Login Form Submission
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simulate login (replace with actual API call)
    if (email && password) {
        alert('Login successful!');
        toggleModal();
    } else {
        alert('Please fill in all fields.');
    }
}

// Handle Signup Form Submission
function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simulate signup (replace with actual API call)
    if (name && email && password) {
        alert('Signup successful!');
        toggleModal('signupModal');
    } else {
        alert('Please fill in all fields.');
    }
}

// Close Modal on Outside Click
window.addEventListener('click', (event) => {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.classList.remove('active');
        }
    });
});