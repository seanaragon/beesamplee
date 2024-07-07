document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav a');
    const homeLink = document.querySelector('.home-link');
    
    const observerOptions = {
        root: null,
        threshold: 0.5 // Adjust threshold for better snapping
    };

    function handleIntersect(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                updateNav(entry.target.id);
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    function updateNav(id) {
        navLinks.forEach(link => {
            if (link.getAttribute('href').substring(1) === id) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Custom smooth scrolling function
    function smoothScrollTo(element, duration) {
        const startY = window.pageYOffset;
        const endY = element.getBoundingClientRect().top + startY;
        const distance = endY - startY;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startY, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            smoothScrollTo(targetElement, 1000); // Adjust duration for slower effect

            updateNav(targetId);
        });
    });

    homeLink.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        smoothScrollTo(targetElement, 1000); // Adjust duration for slower effect

        updateNav(targetId);
    });
});
