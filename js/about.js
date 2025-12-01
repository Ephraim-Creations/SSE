// About page specific functionality
function initAboutPage() {
    // Animated counters for story stats
    const storyCounters = document.querySelectorAll('.story-stat .stat-number');
    
    if (storyCounters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute('data-count');
                    animateCounter(counter, target);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        storyCounters.forEach(counter => {
            observer.observe(counter);
        });
    }
}

// Add this to your existing initialization
document.addEventListener('DOMContentLoaded', function() {
    // ... existing initialization calls ...
    initAboutPage();
});