document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // 2. Service Pages Navigation
    window.showService = function(pageId) {
        document.querySelectorAll('.service-page').forEach(page => {
            page.classList.add('hidden');
            page.classList.remove('active');
        });
        
        const selectedPage = document.getElementById(pageId);
        if (selectedPage) {
            selectedPage.classList.remove('hidden');
            selectedPage.classList.add('active');
            window.scrollTo(0, 0);
            lucide.createIcons();
        }
    }

    window.goBack = function() {
        document.querySelectorAll('.service-page').forEach(page => {
            page.classList.add('hidden');
            page.classList.remove('active');
        });
        window.scrollTo(0, 0);
    }

    // 3. Promotional Popup Logic
    const popupOverlay = document.getElementById('promo-overlay');
    const popupCloseBtn = document.getElementById('popup-close-btn');
    const popupDeclineBtn = document.getElementById('popup-decline-btn');
    const popupClaimBtn = document.getElementById('popup-claim-btn');

    const popupClosed = localStorage.getItem('promoPopupClosed');

    if (!popupClosed && popupOverlay) {
        setTimeout(() => {
            popupOverlay.classList.add('active');
        }, 2000);
    }

    function closePopup() {
        popupOverlay.classList.remove('active');
        localStorage.setItem('promoPopupClosed', 'true');
    }

    if(popupCloseBtn) popupCloseBtn.addEventListener('click', closePopup);
    if(popupDeclineBtn) popupDeclineBtn.addEventListener('click', closePopup);

    if(popupClaimBtn) {
        popupClaimBtn.addEventListener('click', () => {
            window.open('https://wa.me/923125956779?text=Hi%20Coach%20Hamza,%20I%20want%20to%20claim%20the%2050%25%20discount%20offer.', '_blank');
            closePopup();
        });
    }

    // 4. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;

    if(mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            mobileMenu.classList.toggle('hidden', !isMenuOpen);
            mobileMenuBtn.innerHTML = isMenuOpen 
                ? '<i data-lucide="x" class="w-6 h-6"></i>' 
                : '<i data-lucide="menu" class="w-6 h-6"></i>';
            lucide.createIcons();
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
                lucide.createIcons();
            });
        });
    }

    // 5. Scroll Reveal Animation
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - 150) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // 6. Navbar Background on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('shadow-lg');
        }
    });

    // 7. Contact Form Handling (Redirect to WhatsApp)
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop standard form submission
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const goal = document.getElementById('goal').value;
            const message = document.getElementById('message').value;

            // Format message for WhatsApp
            const whatsappText = `*New Inquiry via Website*\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}\n*Goal:* ${goal}\n\n*Message:*\n${message}`;
            
            // The phone number
            const whatsappNumber = '923125956779';
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

            // Show temporary success message
            const formMessage = document.getElementById('form-message');
            formMessage.textContent = 'Redirecting to WhatsApp...';
            formMessage.className = 'text-center py-3 rounded-xl bg-green-500/20 text-green-400 mt-4';
            formMessage.classList.remove('hidden');

            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');
            
            // Reset form
            setTimeout(() => {
                contactForm.reset();
                formMessage.classList.add('hidden');
            }, 3000);
        });
    }
});
