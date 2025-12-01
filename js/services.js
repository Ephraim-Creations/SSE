// Services page specific functionality
function initServicesPage() {
    // Service item animations on scroll
    const serviceItems = document.querySelectorAll('.service-item');
    
    if (serviceItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        serviceItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(item);
        });
    }

    // Form handling for service inquiries
    const serviceForms = document.querySelectorAll('.service-cta .btn');
    
    serviceForms.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.href.includes('#contact')) {
                e.preventDefault();
                
                // Get the service name from the button text or parent service
                const serviceItem = this.closest('.service-item');
                const serviceTitle = serviceItem ? serviceItem.querySelector('.service-title').textContent : 'Service Inquiry';
                
                // Scroll to lead capture form
                const leadForm = document.querySelector('.lead-capture');
                if (leadForm) {
                    // Set the service type in the form
                    const serviceSelect = leadForm.querySelector('select');
                    if (serviceSelect) {
                        // Map service titles to option values
                        const serviceMap = {
                            'Corporate Conferences': 'conference',
                            'Team Building': 'teambuilding',
                            'Product Launches': 'product-launch',
                            'Trade Shows': 'trade-show',
                            'Award Ceremonies': 'awards',
                            'Event Technology': 'technology'
                        };
                        
                        const serviceValue = serviceMap[serviceTitle] || 'other';
                        serviceSelect.value = serviceValue;
                    }
                    
                    // Smooth scroll to form
                    leadForm.scrollIntoView({ behavior: 'smooth' });
                    
                    // Add highlight effect
                    leadForm.style.animation = 'highlight 2s ease';
                    setTimeout(() => {
                        leadForm.style.animation = '';
                    }, 2000);
                }
            }
        });
    });
}

// Add highlight animation
const highlightStyle = document.createElement('style');
highlightStyle.textContent = `
    @keyframes highlight {
        0% { background-color: transparent; }
        50% { background-color: rgba(233, 30, 99, 0.05); }
        100% { background-color: transparent; }
    }
`;
document.head.appendChild(highlightStyle);

// Add to your existing initialization
document.addEventListener('DOMContentLoaded', function() {
    // ... existing initialization calls ...
    initServicesPage();
});