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
  'https://picsum.photos/1920/1080?grayscale',
  'https://picsum.photos/1920/1080?blur',
  'https://picsum.photos/1920/1080?random=1'
];

let current = 0;

setInterval(() => {
  current = (current + 1) % images.length;
  hero.style.backgroundImage = `url('${images[current]}')`;
}, 5000); // change every 5 seconds























// Sample images array - apne images ka path yahan dalo
// Sample images array - apne images ka path yahan dalo
const rightCarouselImages = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800',
  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800'
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
  const gap = 10; // CSS gap value
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
  rightAutoSlideInterval = setInterval(nextRightSlide, 5000); // 3 seconds
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