// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('open');
            
            // Animate hamburger menu
            const spans = menuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('open')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Read more/less functionality
    const readMoreBtn = document.getElementById('read-more-btn');
    const readLessBtn = document.getElementById('read-less-btn');
    const companyDescription = document.querySelector('.company-description');
    
    if (readMoreBtn && readLessBtn && companyDescription) {
        const paragraphs = companyDescription.querySelectorAll('p');
        
        // Initially hide paragraphs after the first one
        if (paragraphs.length > 1) {
            for (let i = 1; i < paragraphs.length; i++) {
                paragraphs[i].style.display = 'none';
            }
        }
        
        readMoreBtn.addEventListener('click', function() {
            // Show all paragraphs
            for (let i = 1; i < paragraphs.length; i++) {
                paragraphs[i].style.display = 'block';
            }
            readMoreBtn.style.display = 'none';
            readLessBtn.style.display = 'inline-block';
        });
        
        readLessBtn.addEventListener('click', function() {
            // Hide paragraphs after the first one
            for (let i = 1; i < paragraphs.length; i++) {
                paragraphs[i].style.display = 'none';
            }
            readLessBtn.style.display = 'none';
            readMoreBtn.style.display = 'inline-block';
        });
    }
    
    // Chat modal functionality
    const chatModal = document.getElementById('chat-modal');
    const whatsappFloat = document.querySelector('.whatsapp-float a');
    const closeModal = document.querySelector('.chat-modal .close');
    const chatForm = document.getElementById('chat-form');
    
    // Open chat modal when WhatsApp button is clicked
    if (whatsappFloat && chatModal) {
        whatsappFloat.addEventListener('click', function(e) {
            e.preventDefault();
            chatModal.style.display = 'block';
        });
    }
    
    // Close modal when X is clicked
    if (closeModal && chatModal) {
        closeModal.addEventListener('click', function() {
            chatModal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    if (chatModal) {
        window.addEventListener('click', function(e) {
            if (e.target === chatModal) {
                chatModal.style.display = 'none';
            }
        });
    }
    
    // Form validation
    if (chatForm) {
        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const formGroups = chatForm.querySelectorAll('.form-group');
            
            // Reset previous errors
            formGroups.forEach(group => {
                group.classList.remove('error');
            });
            
            // Validate each field
            const nama = document.getElementById('nama');
            const phone = document.getElementById('phone');
            const email = document.getElementById('email');
            const negara = document.getElementById('negara');
            const perusahaan = document.getElementById('perusahaan');
            const jabatan = document.getElementById('jabatan');
            
            // Name validation
            if (!nama.value.trim()) {
                showError(nama, 'Nama harus diisi');
                isValid = false;
            }
            
            // Phone validation
            if (!phone.value.trim()) {
                showError(phone, 'Nomor Telpon harus diisi');
                isValid = false;
            } else if (!/^\d+$/.test(phone.value.trim())) {
                showError(phone, 'Mohon isi nomor telepon dengan benar');
                isValid = false;
            }
            
            // Email validation
            if (!email.value.trim()) {
                showError(email, 'Email harus diisi');
                isValid = false;
            } else if (!isValidEmail(email.value.trim())) {
                showError(email, 'Mohon isi email dengan benar');
                isValid = false;
            }
            
            // Country validation
            if (!negara.value.trim()) {
                showError(negara, 'Negara harus diisi');
                isValid = false;
            }
            
            // Company validation
            if (!perusahaan.value.trim()) {
                showError(perusahaan, 'Nama Perusahaan harus diisi');
                isValid = false;
            }
            
            // Position validation
            if (!jabatan.value) {
                showError(jabatan, 'Jabatan harus diisi');
                isValid = false;
            }
            
            if (isValid) {
                // Create WhatsApp message
                const message = `Halo, saya ingin bertanya tentang produk sarang walet.

Nama: ${nama.value}
No. HP: +62${phone.value}
Email: ${email.value}
Negara: ${negara.value}
Perusahaan: ${perusahaan.value}
Jabatan: ${jabatan.value}

Terima kasih.`;
                
                const whatsappUrl = `https://wa.me/6281380356909?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
                
                // Close modal and reset form
                chatModal.style.display = 'none';
                chatForm.reset();
            }
        });
    }
    
    // Helper function to show error
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        if (formGroup) {
            formGroup.classList.add('error');
            const errorMessage = formGroup.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.textContent = message;
            }
        }
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Product card hover effects
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Language toggle functionality (placeholder)
    const languageLinks = document.querySelectorAll('.language-toggle a');
    languageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all language links
            languageLinks.forEach(l => l.classList.remove('lang-active'));
            
            // Add active class to clicked link
            this.classList.add('lang-active');
            
            // Here you would implement actual language switching
            console.log('Language switched to:', this.textContent.trim());
        });
    });
    
    // Search functionality (placeholder)
    const searchForm = document.querySelector('.search-box');
    if (searchForm) {
        const searchInput = searchForm.querySelector('input');
        const searchButton = searchForm.querySelector('button');
        
        if (searchButton && searchInput) {
            searchButton.addEventListener('click', function(e) {
                e.preventDefault();
                const searchTerm = searchInput.value.trim();
                if (searchTerm) {
                    // Here you would implement actual search functionality
                    console.log('Searching for:', searchTerm);
                    alert(`Mencari: ${searchTerm}`);
                }
            });
            
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    searchButton.click();
                }
            });
        }
    }
    
    // Lazy loading for images (simple implementation)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Back to top functionality
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #8B0000;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 20px;
        display: none;
        z-index: 999;
        transition: all 0.3s;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    // Back to top functionality
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Form input focus effects
    const formInputs = document.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value.trim()) {
                this.parentElement.classList.add('filled');
            } else {
                this.parentElement.classList.remove('filled');
            }
        });
    });
    
    // Console log for debugging
    console.log('PT. Masafante Indo Walet website loaded successfully!');
    
    // Error handling for any uncaught errors
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
    });
    
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
    });
});

// Additional utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

function formatPhoneNumber(phone) {
    // Simple phone number formatting for Indonesian numbers
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
        return '+62' + cleaned.substring(1);
    } else if (cleaned.startsWith('62')) {
        return '+' + cleaned;
    }
    return '+62' + cleaned;
}

// Export functions for potential use in other scripts
window.MasindoUtils = {
    formatCurrency,
    formatPhoneNumber
};
