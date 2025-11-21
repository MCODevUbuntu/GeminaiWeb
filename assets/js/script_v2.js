// GeminAi Modern Interactions - v3.2

document.addEventListener('DOMContentLoaded', () => {
    console.log('GeminAi v3.2 initialized');

    // --- Text Cycler Animation ---
    const cyclerElement = document.getElementById('text-cycler');
    if (cyclerElement) {
        const words = ["Airport", "Airline", "ATM"];
        let currentIndex = 0;

        setInterval(() => {
            cyclerElement.style.opacity = '0';
            cyclerElement.style.transform = 'translateY(10px)';

            setTimeout(() => {
                currentIndex = (currentIndex + 1) % words.length;
                cyclerElement.textContent = words[currentIndex];
                cyclerElement.style.opacity = '1';
                cyclerElement.style.transform = 'translateY(0)';
            }, 500);
        }, 3000);
    }

    // --- Chaos Text Fading Animation ---
    const chaosRows = document.querySelectorAll('.scroll-text-row');
    if (chaosRows.length > 0) {
        let chaosIndex = 0;

        // Initialize first one
        chaosRows[0].classList.add('active-row');

        setInterval(() => {
            // Fade out current
            chaosRows[chaosIndex].classList.remove('active-row');

            // Move to next
            chaosIndex = (chaosIndex + 1) % chaosRows.length;

            // Fade in next
            chaosRows[chaosIndex].classList.add('active-row');
        }, 3000); // Change every 3 seconds
    }

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Intersection Observer for Fade-in ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.4 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // --- Transformation Carousel ---
    const cards = document.querySelectorAll('.transform-card');
    if (cards.length > 0) {
        let currentCardIndex = 0;

        // Initialize first card
        cards[0].classList.add('active-card');

        const calculateDuration = (element) => {
            const text = element.innerText || element.textContent;
            const wordCount = text.trim().split(/\s+/).length;
            const baseTime = 2000; // Minimum time in ms (animation buffer)
            const timePerWord = 300; // Reading time per word in ms
            return baseTime + (wordCount * timePerWord);
        };

        const cycleCards = () => {
            const currentCard = cards[currentCardIndex];
            const duration = calculateDuration(currentCard);

            setTimeout(() => {
                // Animate OUT current card
                currentCard.classList.remove('active-card');

                // Move to next index (looping)
                currentCardIndex = (currentCardIndex + 1) % cards.length;
                const nextCard = cards[currentCardIndex];

                // Animate IN next card
                nextCard.classList.add('active-card');

                // Recursively call for the next cycle
                cycleCards();

            }, duration);
        };

        // Start the dynamic cycle
        cycleCards();
    }
    // --- Section Focus Animation (Center Viewport) ---
    const brandAnchor = document.getElementById('brand-anchor');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('focused');

                // Handle Brand Anchor Visibility
                if (brandAnchor) {
                    if (entry.target.classList.contains('section-hook') || entry.target.classList.contains('section-cta')) {
                        brandAnchor.style.opacity = '1';
                        brandAnchor.style.pointerEvents = 'auto';
                    } else {
                        brandAnchor.style.opacity = '0';
                        brandAnchor.style.pointerEvents = 'none';
                    }
                }
            } else {
                entry.target.classList.remove('focused');
            }
        });
    }, {
        root: null,
        rootMargin: '-45% 0px -45% 0px', // Trigger only when element is in the middle 10% of viewport
        threshold: 0
    });

    // --- Auto-Snap Scrolling (Smart Assist) ---
    document.querySelectorAll('.narrative-section').forEach(section => {
        sectionObserver.observe(section);
    });

    const wrappers = document.querySelectorAll('.narrative-wrapper');
    let isAutoScrolling = false;
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollTimeout;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Ignore scroll events if we are currently auto-scrolling
        if (isAutoScrolling) {
            lastScrollTop = scrollTop;
            return;
        }

        const direction = scrollTop > lastScrollTop ? 'down' : 'up';
        lastScrollTop = scrollTop;
        const windowHeight = window.innerHeight;

        wrappers.forEach((wrapper, index) => {
            const rect = wrapper.getBoundingClientRect();

            // Logic for DOWN Scrolling
            if (direction === 'down') {
                // Check if this is the NEXT wrapper entering from the bottom
                // We check if its top is within the "trigger zone" (e.g., bottom 15% of screen)
                // rect.top is the distance from the viewport top to the wrapper's top
                if (rect.top > 0 && rect.top < windowHeight * 0.85) {
                    // Ensure we aren't already snapped to it (approximate check)
                    if (rect.top > 5) {
                        scrollToWrapper(wrapper);
                    }
                }
            }

            // Logic for UP Scrolling
            if (direction === 'up') {
                // Check if this is the PREVIOUS wrapper entering from the top
                // If we are scrolling up, the wrapper's top is negative and increasing towards 0
                // Trigger if the top is close enough to 0 (e.g., within 85% of viewport height from top)
                if (rect.top < 0 && rect.top > -windowHeight * 0.85) {
                    if (rect.top < -5) {
                        scrollToWrapper(wrapper);
                    }
                }
            }
        });
    });

    function scrollToWrapper(wrapper) {
        isAutoScrolling = true;

        // Calculate target position (absolute)
        const targetTop = wrapper.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
        });

        // Release the lock after the scroll animation (approximate duration)
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isAutoScrolling = false;
        }, 800); // Lock for 800ms to prevent fighting
    }

    // --- Metric Counter Animation ---
    const metrics = document.querySelectorAll('.metric-value');
    const metricObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // 2 seconds animation
                const increment = target / (duration / 16); // 60fps

                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };

                updateCounter();
                observer.unobserve(counter); // Run only once
            }
        });
    }, { threshold: 0.5 });

    metrics.forEach(metric => {
        metricObserver.observe(metric);
    });
});
