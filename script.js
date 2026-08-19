document.addEventListener('DOMContentLoaded', () => {

    // Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = item.querySelector('.accordion-content');

            // Close all other accordions
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            // Toggle current accordion
            item.classList.toggle('active');

            if (item.classList.contains('active')) {
                // Set max-height to scrollHeight for smooth transition
                content.style.maxHeight = content.scrollHeight + 40 + 'px'; // +40 for padding
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // Set initial max-height for the active accordion
    const activeAccordion = document.querySelector('.accordion-item.active .accordion-content');
    if (activeAccordion) {
        activeAccordion.style.maxHeight = activeAccordion.scrollHeight + 40 + 'px';
    }

    // EmailJS Form Submission for multiple forms
    const forms = [
        document.getElementById('contact-form'),
        document.getElementById('bottom-contact-form')
    ];
    
    const popup = document.getElementById('thank-you-popup');

    forms.forEach(form => {
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn.innerText;

                btn.innerText = 'Sending...';
                btn.style.opacity = '0.8';
                btn.disabled = true;

                // service_id, template_id, form_element
                emailjs.sendForm('service_5ukbpwr', 'template_glg1bna', form)
                    .then(() => {
                        // Show Popup
                        popup.classList.add('active');
                        form.reset();
                        btn.innerText = originalText;
                        btn.style.opacity = '1';
                        btn.disabled = false;

                        // Hide popup after 3 seconds
                        setTimeout(() => {
                            popup.classList.remove('active');
                        }, 3000);
                    }, (error) => {
                        console.error('FAILED...', error);
                        alert('Something went wrong. Please try again later.');
                        btn.innerText = originalText;
                        btn.style.opacity = '1';
                        btn.disabled = false;
                    });
            });
        }
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonials Swiper
    if (document.querySelector('.testimonials-slider')) {
        new Swiper('.testimonials-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3, /* Use 3 for desktop to loop smoothly */
                }
            }
        });
    }
});
