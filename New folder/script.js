document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling with offset for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const navbarHeight = document.querySelector('nav').offsetHeight;
                const offset = navbarHeight + 10; // Navbar height + extra margin
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
    const errorModalBody = document.getElementById('errorModalBody');
    const nameInput = document.getElementById('name');

    // Real-time name validation (no numbers)
    nameInput.addEventListener('input', () => {
        const name = nameInput.value.trim();
        const nameError = document.getElementById('nameError');
        if (name && !/^[A-Za-z\s'-]+$/.test(name)) {
            nameInput.classList.add('is-invalid');
            nameError.textContent = 'Name must contain only letters, spaces, hyphens, or apostrophes.';
        } else {
            nameInput.classList.remove('is-invalid');
            nameError.textContent = '';
        }
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        let hasError = false;

        // Clear previous errors
        ['name', 'email', 'subject', 'message'].forEach(field => {
            const input = document.getElementById(field);
            const errorDiv = document.getElementById(`${field}Error`);
            input.classList.remove('is-invalid');
            errorDiv.textContent = '';
        });

        // Validate fields
        if (!name) {
            document.getElementById('name').classList.add('is-invalid');
            document.getElementById('nameError').textContent = 'Name is required.';
            hasError = true;
        } else if (!/^[A-Za-z\s'-]+$/.test(name)) {
            document.getElementById('name').classList.add('is-invalid');
            document.getElementById('nameError').textContent = 'Name must contain only letters, spaces, hyphens, or apostrophes.';
            hasError = true;
        }
        if (!email) {
            document.getElementById('email').classList.add('is-invalid');
            document.getElementById('emailError').textContent = 'Email is required.';
            hasError = true;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            document.getElementById('email').classList.add('is-invalid');
            document.getElementById('emailError').textContent = 'Invalid email format.';
            hasError = true;
        }
        if (!subject) {
            document.getElementById('subject').classList.add('is-invalid');
            document.getElementById('subjectError').textContent = 'Subject is required.';
            hasError = true;
        }
        if (!message) {
            document.getElementById('message').classList.add('is-invalid');
            document.getElementById('messageError').textContent = 'Message is required.';
            hasError = true;
        }

        if (hasError) {
            errorModalBody.textContent = 'Please correct the errors in the form.';
            errorModal.show();
            return;
        }

        try {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Mock API
            successModal.show();
            contactForm.reset();
        } catch (error) {
            errorModalBody.textContent = 'An error occurred. Please try again later.';
            errorModal.show();
        }
    });

    // Animate skill bars on scroll
    const animateSkillBars = () => {
        const skillSection = document.getElementById('skills');
        const skillBars = document.querySelectorAll('.skill-bar');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 100);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(skillSection);
    };

    animateSkillBars();
});