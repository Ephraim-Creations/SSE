// Initialize AOS - MOVE OUTSIDE DOMContentLoaded
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-in-out'
});

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    // Check if preloader exists before adding event listeners
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                preloader.classList.add('loaded');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 1000);
        });
    }

    // Header Scroll Behavior
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    const scrollThreshold = 100;

    if (header) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add background when scrolled
            if (scrollTop > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Hide/show header on scroll
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                // Scroll down
                header.classList.add('hidden');
            } else {
                // Scroll up
                header.classList.remove('hidden');
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Prevent negative scroll values
            
            // Update back to top progress
            updateBackToTopProgress();
        });
    }

    // Back to Top Button with Progress
    const backToTop = document.querySelector('.back-to-top');
    const progressRing = document.querySelector('.progress-ring-circle');
    
    // Check if backToTop elements exist
    if (backToTop && progressRing) {
        const circumference = 2 * Math.PI * 22;

        // Set the stroke dasharray and dashoffset
        progressRing.style.strokeDasharray = `${circumference}`;
        progressRing.style.strokeDashoffset = `${circumference}`;

        function updateBackToTopProgress() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            
            // Prevent division by zero
            if (docHeight <= 0) return;
            
            const scrollProgress = Math.min(scrollTop / docHeight, 1); // Clamp between 0-1
            
            // Show/hide back to top button
            if (scrollProgress > 0.1) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
            
            // Update progress circle
            const offset = circumference - (scrollProgress * circumference);
            progressRing.style.strokeDashoffset = `${offset}`;
        }

        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileClose = document.querySelector('.mobile-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (hamburger && mobileMenuOverlay) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (mobileClose) {
        mobileClose.addEventListener('click', function() {
            closeMobileMenu();
        });
    }

    if (mobileNavLinks.length > 0) {
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });
    }

    function closeMobileMenu() {
        if (hamburger) hamburger.classList.remove('active');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if href is empty or starts with # but no target
                if (!href) return;
                
                // Handle anchor links
                if (href.startsWith('#')) {
                    e.preventDefault();
                    
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - 80;
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
                // External links or non-anchor links will follow normally
            });
        });
    }

    // Form Submissions
    const quoteForm = document.querySelector('.quote-form');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            console.log('Quote form submitted:', data);
            
            // Show success message
            showNotification('Thank you for your inquiry! We will contact you within 24 hours.', 'success');
            this.reset();
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            if (!emailInput) return;
            
            const email = emailInput.value.trim();
            
            // Basic email validation
            if (!email || !isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate newsletter subscription
            console.log('Newsletter subscription:', email);
            
            // Show success message
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            this.reset();
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Notification System
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        // Determine icon based on type
        let icon = 'info-circle';
        if (type === 'success') icon = 'check-circle';
        if (type === 'error') icon = 'exclamation-circle';
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${icon}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add CSS for notification
        if (!document.querySelector('#notification-styles')) {
            const notificationStyles = document.createElement('style');
            notificationStyles.id = 'notification-styles';
            notificationStyles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 1rem 1.5rem;
                    border-radius: 8px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    z-index: 10000;
                    transform: translateX(400px);
                    transition: transform 0.3s ease;
                    color: white;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }
                .notification-success { background: #4CAF50; }
                .notification-info { background: #2196F3; }
                .notification-error { background: #f44336; }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                .notification-content i {
                    font-size: 1.2rem;
                }
            `;
            document.head.appendChild(notificationStyles);
        }
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    // Service card hover effects
    const servicePreviews = document.querySelectorAll('.service-preview');
    
    if (servicePreviews.length > 0) {
        servicePreviews.forEach(service => {
            service.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            service.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Add loading animation to images
    const images = document.querySelectorAll('img');
    
    if (images.length > 0) {
        images.forEach(img => {
            // Skip if image is already visible
            if (img.complete && img.naturalHeight !== 0) {
                return;
            }
            
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
            
            img.addEventListener('error', function() {
                console.warn('Image failed to load:', this.src);
            });
            
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            // If image is already loaded (cached)
            if (img.complete) {
                img.style.opacity = '1';
            }
        });
    }

    // Intersection Observer for additional animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for custom animations
    const animatedElements = document.querySelectorAll('.about-feature, .service-preview, .process-step');
    
    if (animatedElements.length > 0) {
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Add parallax effect to process section
    window.addEventListener('scroll', function() {
        const processSection = document.querySelector('.process');
        if (processSection) {
            const background = processSection.querySelector('.process-background img');
            if (background) {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                background.style.transform = `translateY(${rate}px)`;
                background.style.transition = 'transform 0.1s ease-out';
            }
        }
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Close mobile menu on ESC
        if (e.key === 'Escape' && mobileMenuOverlay && mobileMenuOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Handle window resize - reset mobile menu
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenuOverlay && mobileMenuOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });
});