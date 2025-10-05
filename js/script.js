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


const hero = document.querySelector('.hero');
const images = [
  'image/1.jpg',
  'image/2.jpg',
  'image/3.jpg',
  'image/4.jpg',
  'image/5.jpg',
];

// Preload images
images.forEach(src => {
  const img = new Image();
  img.src = src;
});

let current = 0;

// Optional: smooth fade
hero.style.transition = 'background-image 1s ease-in-out';

setInterval(() => {
  current = (current + 1) % images.length;
  hero.style.backgroundImage = `url('${images[current]}')`;
}, 5000);
























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































/// ============= PORTFOLIO FILTER FUNCTIONALITY =============
const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filterValue = button.getAttribute('data-filter');
    
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');
    
    // Filter portfolio items
    portfolioItems.forEach(item => {
      const category = item.getAttribute('data-category');
      
      if (filterValue === 'all' || category === filterValue) {
        item.classList.remove('hide');
        item.style.display = 'block';
      } else {
        item.classList.add('hide');
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  });
});

// ============= LIGHTBOX FUNCTIONALITY =============
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

// All images data
const allImages = [
  {
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920',
    caption: 'Cinematic Wedding - Wedding Photography'
  },
  {
    src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1920',
    caption: 'Traditional Ceremony - Wedding Photography'
  },
  {
    src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1920',
    caption: 'Candid Moments - Wedding Photography'
  },
  {
    src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1920',
    caption: 'Love Story - Pre-Wedding Photography'
  },
  {
    src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1920',
    caption: 'Romantic Moments - Pre-Wedding Photography'
  },
  {
    src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=1920',
    caption: 'Professional Portrait - Portrait Photography'
  },
  {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920',
    caption: 'Executive Portrait - Portrait Photography'
  },
  {
    src: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1920',
    caption: 'Beautiful Journey - Maternity Photography'
  },
  {
    src: 'https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?w=1920',
    caption: 'Playful Moments - Kids Photography'
  },
  {
    src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920',
    caption: 'High Fashion - Fashion Photography'
  },
  {
    src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920',
    caption: 'Editorial Shoot - Fashion Photography'
  },
  {
    src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1920',
    caption: 'Product Showcase - Product Photography'
  },
  {
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920',
    caption: 'Corporate Event - Event Photography'
  }
];

let currentImageIndex = 0;

// Open lightbox - GLOBAL function
window.openLightbox = function(index) {
  currentImageIndex = index;
  lightboxImg.src = allImages[index].src;
  lightboxCaption.textContent = allImages[index].caption;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close lightbox - GLOBAL function
window.closeLightbox = function() {
  lightbox.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Change lightbox image - GLOBAL function
window.changeLightboxImage = function(direction) {
  currentImageIndex += direction;
  
  // Loop around
  if (currentImageIndex < 0) {
    currentImageIndex = allImages.length - 1;
  } else if (currentImageIndex >= allImages.length) {
    currentImageIndex = 0;
  }
  
  lightboxImg.src = allImages[currentImageIndex].src;
  lightboxCaption.textContent = allImages[currentImageIndex].caption;
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  
  if (e.key === 'Escape') {
    window.closeLightbox();
  } else if (e.key === 'ArrowLeft') {
    window.changeLightboxImage(-1);
  } else if (e.key === 'ArrowRight') {
    window.changeLightboxImage(1);
  }
});

// Close lightbox on background click
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    window.closeLightbox();
  }
});