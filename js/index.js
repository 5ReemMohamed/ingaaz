
document.addEventListener("DOMContentLoaded", () => {
            const siteHeader = document.getElementById('siteHeader');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                siteHeader.classList.add('scrolled');
            } else {
                siteHeader.classList.remove('scrolled');
            }
        });

 
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        const navigation = document.getElementById('mainNavigation');

        navLinks.forEach(link => {
            link.addEventListener('click', () => {

                navLinks.forEach(item => item.classList.remove('active'));
                link.classList.add('active');

                if (navigation.classList.contains('show')) {
                    bootstrap.Collapse.getOrCreateInstance(navigation).hide();
                }

            });
        });

 
const counters = document.querySelectorAll('.counter-number');

const counterObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;
            const target = Number(counter.dataset.target);
            const duration = 1800;
            const startTime = performance.now();

            function updateCounter(currentTime) {

                const progress = Math.min(
                    (currentTime - startTime) / duration,
                    1
                );

                const easeOut = 1 - Math.pow(1 - progress, 4);

                counter.textContent = Math.floor(easeOut * target);

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }

            }

            requestAnimationFrame(updateCounter);

            observer.unobserve(counter);

        }

    });

}, {
    threshold: 0.5
});

counters.forEach(counter => {
    counterObserver.observe(counter);
});
    const projectItems = [...document.querySelectorAll(".project-item")];
    const lightbox = document.getElementById("projectsLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const counter = document.getElementById("lightboxCounter");
    const closeButton = document.getElementById("lightboxClose");
    const nextButton = document.getElementById("lightboxNext");
    const prevButton = document.getElementById("lightboxPrev");

    let currentIndex = 0;
    let touchStartX = 0;

    const updateImage = (index) => {
        currentIndex = (index + projectItems.length) % projectItems.length;

        const image = projectItems[currentIndex].querySelector("img");

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        counter.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(projectItems.length).padStart(2, "0")}`;
    };

    const openLightbox = (index) => {
        updateImage(index);
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        closeButton.focus();
    };

    const closeLightbox = () => {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    };

    const nextImage = () => updateImage(currentIndex + 1);
    const prevImage = () => updateImage(currentIndex - 1);

    projectItems.forEach((item, index) => {
        item.addEventListener("click", () => openLightbox(index));
    });

    closeButton.addEventListener("click", closeLightbox);
    nextButton.addEventListener("click", nextImage);
    prevButton.addEventListener("click", prevImage);

    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (event) => {
        if (!lightbox.classList.contains("active")) return;

        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowRight") nextImage();
        if (event.key === "ArrowLeft") prevImage();
    });

    lightbox.addEventListener("touchstart", (event) => {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener("touchend", (event) => {
        const touchEndX = event.changedTouches[0].screenX;
        const difference = touchEndX - touchStartX;

        if (Math.abs(difference) < 50) return;

        if (difference > 0) prevImage();
        else nextImage();
    }, { passive: true });
        const contactForm = document.getElementById("contactForm");
    const phoneInput = document.getElementById("contactPhone");
    const phoneError = document.getElementById("phoneError");

    if (!contactForm || !phoneInput) return;

    const validateSaudiPhone = (phone) => {
        const cleanedPhone = phone.replace(/[\s-]/g, "");

        return /^(05[0-9]{8}|\+9665[0-9]{8}|9665[0-9]{8})$/.test(cleanedPhone);
    };

    phoneInput.addEventListener("input", () => {
        phoneInput.classList.remove("invalid");
        phoneError.textContent = "";
    });

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const name = document.getElementById("contactName").value.trim();
        const phone = phoneInput.value.trim();
        const city = document.getElementById("contactCity").value;
        const service = document.getElementById("contactService").value;
        const message = document.getElementById("contactMessage").value.trim();

        if (!validateSaudiPhone(phone)) {
            phoneInput.classList.add("invalid");
            phoneError.textContent = "يرجى إدخال رقم جوال سعودي صحيح، مثال: 05xxxxxxxx";
            phoneInput.focus();
            return;
        }

        const whatsappMessage = `
طلب خدمة جديد - شركة الإنجاز

الاسم: ${name}
رقم الجوال: ${phone}
المدينة: ${city}
الخدمة المطلوبة: ${service}

تفاصيل الطلب:
${message || "لا توجد تفاصيل إضافية"}
        `.trim();

        const whatsappURL = `https://wa.me/966543861520?text=${encodeURIComponent(whatsappMessage)}`;

        const whatsappWindow = window.open(whatsappURL, "_blank");

        if (whatsappWindow) {
            contactForm.reset();
            phoneInput.classList.remove("invalid");
            phoneError.textContent = "";
        } else {
            alert("يرجى السماح بفتح النوافذ المنبثقة لإرسال طلبك عبر واتساب.");
        }
    });
        const footerYear = document.getElementById("footerYear");

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

});
