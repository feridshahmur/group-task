// ./src/script/fat.js
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");

  menuBtn.addEventListener("click", () => {
    
    if (navLinks.style.display === "flex") {
      navLinks.style.display = "none";
    } else {
      navLinks.style.display = "flex";
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const carouselTrack = document.querySelector(".carousel-track");
  const items = document.querySelectorAll(".carousel-item");
  const dotsContainer = document.querySelector(".carousel-dots");

  let currentIndex = 0;
  let itemWidth = items[0].getBoundingClientRect().width;
  let visibleItemsCount = Math.floor(
    carouselTrack.getBoundingClientRect().width / itemWidth
  ); // Görünen öğe sayısı
  const totalItems = items.length;

  // Set initial positions dynamically
  function setItemPositions() {
    itemWidth = items[0].getBoundingClientRect().width;
    visibleItemsCount = Math.floor(
      carouselTrack.getBoundingClientRect().width / itemWidth
    );
    items.forEach((item, index) => {
      item.style.left = `${index * (itemWidth + 20)}px`; // Include margin
    });
    createDots();
    updateCarousel();
  }

  // Create dots dynamically based on visible items count
  function createDots() {
    dotsContainer.innerHTML = ""; // Clear existing dots
    const totalDots = Math.ceil(totalItems / visibleItemsCount);
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement("button");
      if (i === 0) dot.classList.add("active");
      dotsContainer.appendChild(dot);

      dot.addEventListener("click", () => {
        currentIndex = i * visibleItemsCount;
        updateCarousel();
      });
    }
  }

  // Update carousel position
  function updateCarousel() {
    const dots = document.querySelectorAll(".carousel-dots button");
    dots.forEach((dot, index) => {
      dot.classList.toggle(
        "active",
        index === Math.floor(currentIndex / visibleItemsCount)
      );
    });

    const moveAmount = -currentIndex * (itemWidth + 20); // Include margin
    carouselTrack.style.transform = `translateX(${moveAmount}px)`;
  }

  // Set positions on load and resize
  setItemPositions();
  window.addEventListener("resize", setItemPositions);

  // Auto-slide every 3 seconds
  setInterval(() => {
    currentIndex =
      (currentIndex + visibleItemsCount) % totalItems; // Move by visible items count
    updateCarousel();
  }, 3000);
});
