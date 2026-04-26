// ══════════════════════════════════════════════════════════════
// DevWithPiyush — Site JavaScript
// Scroll animations, navbar effects, skill bar animations
// ══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    // ── Navbar scroll effect ────────────────────────────────────
    const navbar = document.getElementById('mainNav');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // ── Scroll Reveal (IntersectionObserver) ────────────────────
    const revealElements = document.querySelectorAll('.scroll-reveal');
    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const delay = entry.target.style.animationDelay || '0s';
                    const delayMs = parseFloat(delay) * 1000;
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, delayMs);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        revealElements.forEach(el => observer.observe(el));
    }

    // ── Skill Bar Animation ─────────────────────────────────────
    const skillFills = document.querySelectorAll('.skill-fill');
    if (skillFills.length > 0) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = width + '%';
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        skillFills.forEach(el => skillObserver.observe(el));
    }

    // ── Smooth scroll for anchor links ──────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ── Auto-dismiss notifications ──────────────────────────────
    const toasts = document.querySelectorAll('.notification-toast');
    toasts.forEach(toast => {
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(50px)';
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    });
});
