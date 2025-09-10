// Global variables to track carousel state
let slideIndices = {};
let slideIntervals = {};

// Function to display the correct slide for a given carousel
function showSlides(n, carouselId) {
    let i;
    let carouselElement = document.getElementById(carouselId);
    if (!carouselElement) return;

    // Use a more generic selector to handle both old and new slide classes
    let slides = carouselElement.querySelectorAll(".carousel-slide, .carousel-slide-item");
    
    // Find the correct dot container based on the carousel ID
    let dotContainer = carouselElement.nextElementSibling;
    if (!dotContainer || !dotContainer.classList.contains('dot-container')) {
        dotContainer = document.querySelector(`#${carouselId} + .dot-container`) || document.querySelector(`#${carouselId}`).parentNode.querySelector('.dot-container');
    }
    if (!dotContainer) return;

    let dots = dotContainer.getElementsByClassName("dot");

    if (!slideIndices[carouselId]) {
        slideIndices[carouselId] = 1;
    }

    if (n > slides.length) {
        slideIndices[carouselId] = 1;
    }
    if (n < 1) {
        slideIndices[carouselId] = slides.length;
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    if (slides.length > 0) {
        slides[slideIndices[carouselId] - 1].style.display = "block";
        if (dots.length > 0) {
            dots[slideIndices[carouselId] - 1].className += " active";
        }
    }
}

// Function to manually change slides
function plusSlides(n, carouselId) {
    slideIndices[carouselId] += n;
    showSlides(slideIndices[carouselId], carouselId);
}

// Function to go to a specific slide via the dots
function currentSlide(n, carouselId) {
    slideIndices[carouselId] = n;
    showSlides(slideIndices[carouselId], carouselId);
}

// Function to start the automatic sliding for a given carousel
function startAutoSlide(carouselId, duration) {
    // Clear any existing interval to prevent multiple timers running
    clearInterval(slideIntervals[carouselId]);

    // Set a new interval to advance slides automatically
    slideIntervals[carouselId] = setInterval(() => {
        // Increment the slide index and show the next slide
        slideIndices[carouselId]++;
        showSlides(slideIndices[carouselId], carouselId);
    }, duration);
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all existing carousels on the home page
    if (document.getElementById('announcements-carousel')) {
        showSlides(1, 'announcements-carousel');
    }
    if (document.getElementById('covid-carousel')) {
        showSlides(1, 'covid-carousel');
    }
    if (document.getElementById('robotics-carousel')) {
        showSlides(1, 'robotics-carousel');
    }
    if (document.getElementById('botb-carousel')) {
        showSlides(1, 'botb-carousel');
        startAutoSlide('botb-carousel', 3000); // Change slide every 3 seconds
    }
    
    // Initialize and start auto-slide for the new preschool gallery carousel
    if (document.getElementById('preschool-gallery-carousel')) {
        showSlides(1, 'preschool-gallery-carousel');
        startAutoSlide('preschool-gallery-carousel', 4000); // Change slide every 4 seconds
    }
    
    // Initialize and start auto-slide for the new 'MINI ME!' carousel
    const miniMeCarousel = document.getElementById('mini-me-carousel');
    if (miniMeCarousel) {
        showSlides(1, 'mini-me-carousel');
        startAutoSlide('mini-me-carousel', 4000); // Change slide every 4 seconds
    }
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
});
