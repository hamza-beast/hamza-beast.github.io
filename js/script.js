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

    // 3. Promotional Popup & Dynamic Scarcity Logic
    const popupOverlay = document.getElementById('promo-overlay');
    const popupCloseBtn = document.getElementById('popup-close-btn');
    const popupDeclineBtn = document.getElementById('popup-decline-btn');
    const popupClaimBtn = document.getElementById('popup-claim-btn');

    // --- Dynamic Scarcity Logic ---
    function updateScarcity() {
        // Look for existing spots in local storage
        let spots = localStorage.getItem('hamza_beast_spots');
        
        if (!spots || parseInt(spots) <= 2) {
            // If new visitor, or spots ran out, randomly start them between 7 and 9
            spots = Math.floor(Math.random() * 3) + 7; 
        } else {
            // If returning visitor, randomly subtract 1 or 2 spots to simulate sales
            const decrease = Math.floor(Math.random() * 2) + 1;
            spots = Math.max(2, parseInt(spots) - decrease);
        }
        
        // Save the new number back to storage
        localStorage.setItem('hamza_beast_spots', spots);
        
        // Update the HTML
        const spotsElement = document.getElementById('spots-remaining');
        const progressElement = document.getElementById('spots-progress');
        
        if (spotsElement && progressElement) {
            spotsElement.textContent = spots;
            // Assuming 10 is the max spots, calculate the width percentage
            const widthPercent = (spots / 10) * 100;
            progressElement.style.width = `${widthPercent}%`;
        }
    }

    // --- Popup Display Logic ---
    const popupClosed = localStorage.getItem('promoPopupClosed');

    if (!popupClosed && popupOverlay) {
        // Run the scarcity update right before showing
        updateScarcity();
        
        // Show popup after 2 seconds
        setTimeout(() => {
            popupOverlay.classList.add('active');
        }, 2000);
    }

    function closePopup() {
        popupOverlay.classList.remove('active');
        // Prevent popup from showing again for this user
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

    // 8. Dynamic Currency Switcher
    // Fixed approximate exchange rates (Base: PKR)
    const exchangeRates = {
        PKR: { rate: 1, symbol: '₨' },
        USD: { rate: 0.0036, symbol: '$' }, // Approx 1 USD = 278 PKR
        GBP: { rate: 0.0028, symbol: '£' }, // Approx 1 GBP = 353 PKR
        EUR: { rate: 0.0033, symbol: '€' }  // Approx 1 EUR = 300 PKR
    };

    function formatPrice(basePrice, currency) {
        // Calculate and round the price
        const converted = Math.round(basePrice * exchangeRates[currency].rate);
        // Add commas and the correct symbol
        return exchangeRates[currency].symbol + converted.toLocaleString();
    }

    function updateAllPrices(currency) {
        // 1. Update all numbers on the page
        document.querySelectorAll('.price-display').forEach(el => {
            const basePrice = parseInt(el.getAttribute('data-base'), 10);
            if (!isNaN(basePrice)) {
                el.textContent = formatPrice(basePrice, currency);
            }
        });

        // 2. Sync both desktop and mobile dropdowns
        document.querySelectorAll('.currency-switcher').forEach(select => {
            select.value = currency;
        });

        // 3. Save to browser storage so it remembers their choice on refresh
        localStorage.setItem('hamza_preferred_currency', currency);
    }

    // Initialize currency on load
    const savedCurrency = localStorage.getItem('hamza_preferred_currency') || 'PKR';
    updateAllPrices(savedCurrency);

    // Listen for dropdown changes
    document.querySelectorAll('.currency-switcher').forEach(switcher => {
        switcher.addEventListener('change', (e) => {
            updateAllPrices(e.target.value);
        });
    });
});
