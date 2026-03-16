// Global Variables
const WHATSAPP_NUMBER = "+923356900672";
let currentCurrency = 'USD'; // Default currency

// 1. WhatsApp Redirection Logic
function openWhatsApp(prefilledMessage) {
    const encodedMessage = encodeURIComponent(prefilledMessage);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER.replace(/[+\s-]/g, '')}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// 2. Contact Form to WhatsApp Submitter
function submitFormToWhatsApp(event) {
    event.preventDefault(); // Prevent page reload

    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const service = document.getElementById('contact-service').value;
    const message = document.getElementById('contact-message').value;

    // Construct the WhatsApp message
    const waText = `*New Website Inquiry* 🚀\n\n*Name:* ${name}\n*Email:* ${email}\n*Interested In:* ${service}\n\n*Message:* ${message}`;
    
    // Redirect to WhatsApp
    openWhatsApp(waText);
}

// 3. Currency Switcher Logic
function toggleCurrency() {
    const btn = document.getElementById('currency-btn');
    const priceElements = document.querySelectorAll('.price-val');
    const currencySymbols = document.querySelectorAll('.currency-symbol');

    if (currentCurrency === 'USD') {
        currentCurrency = 'PKR';
        btn.innerText = 'PKR';
        
        // Update all prices and symbols
        priceElements.forEach(el => el.innerText = el.getAttribute('data-pkr').replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        currencySymbols.forEach(sym => sym.innerText = 'Rs ');
    } else {
        currentCurrency = 'USD';
        btn.innerText = 'USD';
        
        // Revert all prices and symbols
        priceElements.forEach(el => el.innerText = el.getAttribute('data-usd'));
        currencySymbols.forEach(sym => sym.innerText = '$');
    }
}

// 4. Navigation (SPA Format)
function navigateTo(page) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    const targetPage = document.getElementById(`page-${page}`);
    if (targetPage) {
        targetPage.classList.add('active');
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === page) link.classList.add('active');
        });
        
        // Close mobile menu if open
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu && mobileMenu.classList.contains('open')) {
            toggleMobileMenu();
        }
        
        // Re-trigger animations
        setTimeout(initScrollAnimations, 100);
    }
}

// 5. Mobile Menu Toggle
function toggleMobileMenu() {
    document.querySelector('.mobile-menu').classList.toggle('open');
    document.querySelector('.mobile-overlay').classList.toggle('open');
}

// 6. Scroll Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-in').forEach(el => {
        el.classList.remove('visible');
        observer.observe(el);
    });
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons(); // Load Icons
    initScrollAnimations(); // Start scrolling observer
});
