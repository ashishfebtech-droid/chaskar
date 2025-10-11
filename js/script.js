// Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.querySelector(".navbar");

menuToggle.addEventListener("click", () => {
  navbar.style.display = navbar.style.display === "block" ? "none" : "block";
});




// Active menu highlight automatically
let currentPage = window.location.pathname.split("/").pop();

// Agar root ("/") ya blank ho to default page = index.html
if (currentPage === "" || currentPage === "/") {
  currentPage = "index.html";
}

const menuItems = document.querySelectorAll(".navbar ul li a");

menuItems.forEach(link => {
  const linkPage = link.getAttribute("href");

  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});


// Hero Slider - Better Preloading
const hero = document.querySelector('.hero');
const images = [
  'image/1.jpg',
  'image/2.jpg',
  'image/3.jpg',
  'image/4.jpg',
  'image/5.jpg',
];

let current = 0;
let imagesLoaded = 0;

// Better preload with counter
images.forEach(src => {
  const img = new Image();
  img.onload = () => {
    imagesLoaded++;
    // Jab saari images load ho jaye tab slider start karo
    if (imagesLoaded === images.length) {
      startHeroSlider();
    }
  };
  img.src = src;
});

// Slider function
function startHeroSlider() {
  hero.style.transition = 'background-image 1s ease-in-out';
  
  setInterval(() => {
    current = (current + 1) % images.length;
    hero.style.backgroundImage = `url('${images[current]}')`;
  }, 5000);
}
























/// Sample images array - apne images ka path yahan dalo
const rightCarouselImages = [
  'image/1.jpg',
  'image/2.jpg',
  'image/3.jpg',
  'image/4.jpg',
  'image/5.jpg',
];

const rightTrack = document.getElementById('right-carousel-track');
const rightDotsContainer = document.getElementById('right-carousel-dots');

let rightCurrentIndex = 0;
const rightTotalImages = rightCarouselImages.length;
let rightAutoSlideInterval;

// Clone images for infinite effect (first 3 + all + last 3)
const rightClonedStart = rightCarouselImages.slice(-3);
const rightClonedEnd = rightCarouselImages.slice(0, 3);
const rightAllImages = [...rightClonedStart, ...rightCarouselImages, ...rightClonedEnd];

// Add images to carousel
rightAllImages.forEach(src => {
  const img = document.createElement('img');
  img.src = src;
  img.alt = 'Carousel Image';
  rightTrack.appendChild(img);
});

// Create dots (only for original images)
rightCarouselImages.forEach((_, i) => {
  const dot = document.createElement('span');
  dot.addEventListener('click', () => goToRightSlide(i));
  rightDotsContainer.appendChild(dot);
});

// Set initial position (start from first real image after clones)
rightCurrentIndex = 3;
updateRightCarousel(false);

// Update carousel position
function updateRightCarousel(animate = true) {
  if (!animate) {
    rightTrack.classList.add('no-transition');
  } else {
    rightTrack.classList.remove('no-transition');
  }
  
  const imageWidth = rightTrack.querySelector('img').offsetWidth;
  
  // Mobile check - agar mobile hai to gap 0, warna 10
  const isMobile = window.innerWidth <= 768;
  const gap = isMobile ? 15 : 10; // CSS gap value
  
  const offset = -(rightCurrentIndex * (imageWidth + gap));
  rightTrack.style.transform = `translateX(${offset}px)`;
  
  // Update dots
  const realIndex = ((rightCurrentIndex - 3) % rightTotalImages + rightTotalImages) % rightTotalImages;
  updateRightDots(realIndex);
  
  if (!animate) {
    setTimeout(() => rightTrack.classList.remove('no-transition'), 50);
  }
}

// Update active dot
function updateRightDots(index) {
  const dots = rightDotsContainer.querySelectorAll('span');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

// Go to specific slide
function goToRightSlide(index) {
  rightCurrentIndex = index + 3; // +3 because of cloned images at start
  updateRightCarousel();
  resetRightAutoSlide();
}

// Next slide
function nextRightSlide() {
  rightCurrentIndex++;
  updateRightCarousel();
  
  // Check if we're at the end clone
  if (rightCurrentIndex >= rightAllImages.length - 3) {
    setTimeout(() => {
      rightCurrentIndex = 3; // Jump back to first real image
      updateRightCarousel(false);
    }, 800); // Match transition duration
  }
}

// Previous slide
function prevRightSlide() {
  rightCurrentIndex--;
  updateRightCarousel();
  
  // Check if we're at the start clone
  if (rightCurrentIndex < 3) {
    setTimeout(() => {
      rightCurrentIndex = rightTotalImages + 2; // Jump to last real image
      updateRightCarousel(false);
    }, 800); // Match transition duration
  }
}

// Auto slide
function startRightAutoSlide() {
  rightAutoSlideInterval = setInterval(nextRightSlide, 5000); // 5 seconds
}

function resetRightAutoSlide() {
  clearInterval(rightAutoSlideInterval);
  startRightAutoSlide();
}

// Start auto sliding
startRightAutoSlide();

// Optional: Pause on hover
rightTrack.addEventListener('mouseenter', () => clearInterval(rightAutoSlideInterval));
rightTrack.addEventListener('mouseleave', startRightAutoSlide);

// Handle window resize
window.addEventListener('resize', () => updateRightCarousel(false));









// about us section
const counters = document.querySelectorAll('.counter');
    const speed = 200;

    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + inc);
          setTimeout(updateCount, 1);
        } else {
          counter.innerText = target;
        }
      };

      updateCount();
    });

    // Intersection Observer for animation on scroll
    const aboutSection = document.querySelector('.about-section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          counters.forEach(counter => {
            counter.innerText = '0';
            const updateCount = () => {
              const target = +counter.getAttribute('data-target');
              const count = +counter.innerText;
              const inc = target / speed;

              if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
              } else {
                counter.innerText = target;
              }
            };
            updateCount();
          });
        }
      });
    }, { threshold: 0.5 });

    observer.observe(aboutSection);

















    
let lastScroll = 0;
const header = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll) {
    // scrolling down
    header.classList.add('hidden');
  } else {
    // scrolling up
    header.classList.remove('hidden');
  }
  lastScroll = currentScroll;
});































  // Photo data
        const photos = [
            {
                url: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                title: "Portrait Photography"
            },
            {
                url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                title: "Fashion Photography"
            },
            {
                url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                title: "Event Photography"
            },
            {
                url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                title: "Wedding Photography"
            },
            {
                url: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                title: "Commercial Photography"
            }
        ];

        let currentPhotoIndex = 0;
        let photoTimer;

        // Initialize photo gallery
        function setupGallery() {
            const photoContainer = document.getElementById('photoContainer');
            const photoControls = document.getElementById('photoControls');
            
            // Create photo elements
            photos.forEach((photo, index) => {
                const photoElement = document.createElement('div');
                photoElement.className = 'photo-box photo-hidden';
                photoElement.dataset.index = index;
                
                const img = document.createElement('img');
                img.src = photo.url;
                img.alt = photo.title;
                
                photoElement.appendChild(img);
                photoContainer.appendChild(photoElement);
                
                // Create control dots
                const dot = document.createElement('div');
                dot.className = 'control-dot';
                dot.dataset.index = index;
                dot.addEventListener('click', () => showPhoto(index));
                photoControls.appendChild(dot);
            });
            
            // Set initial photo positions
            updatePhotoDisplay();
            
            // Start auto-slide
            startAutoSlide();
        }

        // Update photo positions
        function updatePhotoDisplay() {
            const photoElements = document.querySelectorAll('.photo-box');
            const dots = document.querySelectorAll('.control-dot');
            const totalPhotos = photos.length;
            
            photoElements.forEach((element, index) => {
                // Remove all position classes
                element.classList.remove('photo-left', 'photo-center', 'photo-right', 'photo-hidden');
                
                // Calculate position relative to current photo
                let position = index - currentPhotoIndex;
                
                // Handle looping
                if (position < -2) position += totalPhotos;
                if (position > 2) position -= totalPhotos;
                
                // Set position classes
                if (position === -2 || position === totalPhotos - 2) {
                    element.classList.add('photo-hidden');
                } else if (position === -1 || position === totalPhotos - 1) {
                    element.classList.add('photo-left');
                } else if (position === 0) {
                    element.classList.add('photo-center');
                } else if (position === 1 || position === -totalPhotos + 1) {
                    element.classList.add('photo-right');
                } else if (position === 2 || position === -totalPhotos + 2) {
                    element.classList.add('photo-hidden');
                }
            });
            
            // Update active dot
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentPhotoIndex);
            });
        }

        // Show specific photo
        function showPhoto(index) {
            currentPhotoIndex = index;
            updatePhotoDisplay();
            resetTimer();
        }

        // Next photo
        function goNext() {
            currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
            updatePhotoDisplay();
            resetTimer();
        }

        // Previous photo
        function goPrev() {
            currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
            updatePhotoDisplay();
            resetTimer();
        }

        // Start auto-slide
        function startAutoSlide() {
            photoTimer = setInterval(goNext, 3000);
        }

        // Stop auto-slide
        function stopAutoSlide() {
            clearInterval(photoTimer);
        }

        // Reset timer
        function resetTimer() {
            stopAutoSlide();
            startAutoSlide();
        }

        // Initialize gallery when page loads
        window.addEventListener('load', setupGallery);

        // Pause auto-slide on hover
        document.querySelector('.photo-showcase').addEventListener('mouseenter', stopAutoSlide);
        document.querySelector('.photo-showcase').addEventListener('mouseleave', startAutoSlide);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                goPrev();
            } else if (e.key === 'ArrowRight') {
                goNext();
            }
        });