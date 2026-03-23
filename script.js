// ======================================================
// EmailJS Configuration
// ======================================================
(function () {
    emailjs.init("qZXRFIy3WhS0Boo_M");
})();

// Contact Form Submission via EmailJS
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const statusDiv = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            statusDiv.textContent = '';
            statusDiv.className = 'form-status';

            emailjs.sendForm(
                'service_3c543he',
                'template_60umkxv',
                form
            ).then(function () {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                statusDiv.textContent = '✅ Message sent successfully! I will get back to you soon.';
                statusDiv.className = 'form-status success';
                form.reset();
            }, function (error) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                statusDiv.textContent = '❌ Failed to send message. Please try again or email me directly.';
                statusDiv.className = 'form-status error';
                console.error('EmailJS Error:', error);
            });
        });
    }
});

// ======================================================
// NAVIGATION & SCROLL
// ======================================================
document.addEventListener('DOMContentLoaded', function () {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const sections = document.querySelectorAll('section[id]');

    // Smooth scroll for sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Active sidebar link on scroll
    function updateActiveLink() {
        let current = 'home';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();

    // ======================================================
    // SCROLL REVEAL ANIMATIONS
    // ======================================================
    const animateSections = document.querySelectorAll('.section-animate');
    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

    animateSections.forEach(section => revealObserver.observe(section));

    // ======================================================
    // SKILL BAR ANIMATION
    // ======================================================
    const skillBars = document.querySelectorAll('.skill-progress-fill');

    const skillObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = targetWidth + '%';
                }, 200);
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // ======================================================
    // STAGGER ANIMATIONS
    // ======================================================
    const staggerContainers = document.querySelectorAll('.stagger');
    const staggerObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const children = entry.target.querySelectorAll('.glass-card, .cert-item, .education-card, .project-card');
                children.forEach((child, i) => {
                    child.style.opacity = '0';
                    child.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        child.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, i * 100);
                });
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    staggerContainers.forEach(c => staggerObserver.observe(c));
});

// ======================================================
// MOBILE MENU
// ======================================================
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('open');
}

function closeMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.remove('open');
}

// Remove old toggleMenu if any
function toggleMenu() {
    toggleMobileMenu();
}


