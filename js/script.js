document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize Icons Safely
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

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
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }
    }

    window.goBack = function() {
        document.querySelectorAll('.service-page').forEach(page => {
            page.classList.add('hidden');
            page.classList.remove('active');
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // 3. Dynamic Scarcity & Promotional Popup Logic
    const popupOverlay = document.getElementById('promo-overlay');
    const popupCloseBtn = document.getElementById('popup-close-btn');
    const popupClaimBtn = document.getElementById('popup-claim-btn');

    function updateScarcity() {
        let spots = localStorage.getItem('hamza_beast_spots');
        if (!spots || parseInt(spots) <= 2) {
            spots = Math.floor(Math.random() * 3) + 7; 
        } else {
            const decrease = Math.floor(Math.random() * 2) + 1;
            spots = Math.max(2, parseInt(spots) - decrease);
        }
        
        localStorage.setItem('hamza_beast_spots', spots);
        
        const spotsElement = document.getElementById('spots-remaining');
        const progressElement = document.getElementById('spots-progress');
        
        if (spotsElement && progressElement) {
            spotsElement.textContent = spots;
            const widthPercent = (spots / 10) * 100;
            progressElement.style.width = `${widthPercent}%`;
        }
    }

    const popupClosed = localStorage.getItem('promoPopupClosed');
    if (!popupClosed && popupOverlay) {
        updateScarcity();
        setTimeout(() => {
            popupOverlay.classList.add('active');
        }, 2000);
    }

    function closePopup() {
        if(popupOverlay) popupOverlay.classList.remove('active');
        localStorage.setItem('promoPopupClosed', 'true');
    }

    if (popupCloseBtn) popupCloseBtn.addEventListener('click', closePopup);
    if (popupClaimBtn) {
        popupClaimBtn.addEventListener('click', () => {
            window.open('https://wa.me/923125956779?text=Hi%20Coach%20Hamza,%20I%20want%20to%20claim%20the%2050%25%20discount%20offer.', '_blank');
            closePopup();
        });
    }

    // 4. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            mobileMenu.classList.toggle('hidden', !isMenuOpen);
            mobileMenuBtn.innerHTML = isMenuOpen 
                ? '<i data-lucide="x" class="w-6 h-6"></i>' 
                : '<i data-lucide="menu" class="w-6 h-6"></i>';
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
                if (typeof lucide !== 'undefined') lucide.createIcons();
            });
        });
    }

    // 5. Scroll Reveal Animation
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on initial load

    // 6. Navbar Background on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-lg', 'border-white/10');
            } else {
                navbar.classList.remove('shadow-lg', 'border-white/10');
            }
        }
    });

    // 7. Dynamic Currency Switcher
    const exchangeRates = {
        PKR: { rate: 1, symbol: '₨' },
        USD: { rate: 0.0036, symbol: '$' }, 
        GBP: { rate: 0.0028, symbol: '£' }, 
        EUR: { rate: 0.0033, symbol: '€' }  
    };

    function formatPrice(basePrice, currency) {
        const converted = Math.round(basePrice * exchangeRates[currency].rate);
        return exchangeRates[currency].symbol + converted.toLocaleString();
    }

    function updateAllPrices(currency) {
        document.querySelectorAll('.price-display').forEach(el => {
            const basePrice = parseInt(el.getAttribute('data-base'), 10);
            if (!isNaN(basePrice)) {
                el.textContent = formatPrice(basePrice, currency);
            }
        });

        document.querySelectorAll('.currency-switcher').forEach(select => {
            select.value = currency;
        });

        localStorage.setItem('hamza_preferred_currency', currency);
    }

    const savedCurrency = localStorage.getItem('hamza_preferred_currency') || 'PKR';
    updateAllPrices(savedCurrency);

    document.querySelectorAll('.currency-switcher').forEach(switcher => {
        switcher.addEventListener('change', (e) => {
            updateAllPrices(e.target.value);
        });
    });
    
});
