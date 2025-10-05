 const filterButtons = document.querySelectorAll(".portfolio-filter-btn");
      const portfolioItems = document.querySelectorAll(".portfolio-item");

      filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const filterValue = button.getAttribute("data-filter");

          // Remove active class from all buttons
          filterButtons.forEach((btn) => btn.classList.remove("active"));

          // Add active class to clicked button
          button.classList.add("active");

          // Filter portfolio items
          portfolioItems.forEach((item) => {
            const category = item.getAttribute("data-category");

            if (filterValue === "all" || category === filterValue) {
              item.classList.remove("hide");
              item.style.display = "block";
            } else {
              item.classList.add("hide");
              setTimeout(() => {
                item.style.display = "none";
              }, 300);
            }
          });
        });
      });

      // ============= LIGHTBOX FUNCTIONALITY =============
      const lightbox = document.getElementById("lightbox");
      const lightboxImg = document.getElementById("lightbox-img");
      const lightboxCaption = document.getElementById("lightbox-caption");

      // All images data
      const allImages = [
        {
          src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920",
          caption: "Cinematic Wedding - Wedding Photography",
        },
        {
          src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1920",
          caption: "Traditional Ceremony - Wedding Photography",
        },
        {
          src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1920",
          caption: "Candid Moments - Wedding Photography",
        },
        {
          src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1920",
          caption: "Love Story - Pre-Wedding Photography",
        },
        {
          src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1920",
          caption: "Romantic Moments - Pre-Wedding Photography",
        },
        {
          src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=1920",
          caption: "Professional Portrait - Portrait Photography",
        },
        {
          src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920",
          caption: "Executive Portrait - Portrait Photography",
        },
        {
          src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1920",
          caption: "Beautiful Journey - Maternity Photography",
        },
        {
          src: "https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?w=1920",
          caption: "Playful Moments - Kids Photography",
        },
        {
          src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920",
          caption: "High Fashion - Fashion Photography",
        },
        {
          src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920",
          caption: "Editorial Shoot - Fashion Photography",
        },
        {
          src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1920",
          caption: "Product Showcase - Product Photography",
        },
        {
          src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920",
          caption: "Corporate Event - Event Photography",
        },
      ];

      let currentImageIndex = 0;

      // Open lightbox - GLOBAL function
      window.openLightbox = function (index) {
        currentImageIndex = index;
        lightboxImg.src = allImages[index].src;
        lightboxCaption.textContent = allImages[index].caption;
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
      };

      // Close lightbox - GLOBAL function
      window.closeLightbox = function () {
        lightbox.classList.remove("active");
        document.body.style.overflow = "auto";
      };

      // Change lightbox image - GLOBAL function
      window.changeLightboxImage = function (direction) {
        currentImageIndex += direction;

        // Loop around
        if (currentImageIndex < 0) {
          currentImageIndex = allImages.length - 1;
        } else if (currentImageIndex >= allImages.length) {
          currentImageIndex = 0;
        }

        lightboxImg.src = allImages[currentImageIndex].src;
        lightboxCaption.textContent = allImages[currentImageIndex].caption;
      };

      // Keyboard navigation
      document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("active")) return;

        if (e.key === "Escape") {
          window.closeLightbox();
        } else if (e.key === "ArrowLeft") {
          window.changeLightboxImage(-1);
        } else if (e.key === "ArrowRight") {
          window.changeLightboxImage(1);
        }
      });

      // Close lightbox on background click
      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
          window.closeLightbox();
        }
      });