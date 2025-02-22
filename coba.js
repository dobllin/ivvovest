      // Apply fade-in effect when the page loads
      window.onload = function() {
          document.body.classList.add('fade-in');
      };

      // Apply fade-out effect when the page is being unloaded (e.g., user navigates away)
      window.onbeforeunload = function() {
          document.body.classList.add('fade-out');
      };

// script.js
const teamCarousel = document.getElementById("teamCarousel");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const teamCards = document.querySelectorAll(".team-card");

let currentIndex = 0;
const cardWidth = teamCards[0].clientWidth + 30; // Lebar kartu + margin

// Update posisi carousel
function updateCarousel() {
    teamCarousel.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === teamCards.length - 1;
}

// Event Listener untuk tombol Next
nextBtn.addEventListener("click", () => {
    if (currentIndex < teamCards.length - 1) {
        currentIndex++;
        updateCarousel();
    }
});

// Event Listener untuk tombol Previous
prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

// Drag Event untuk Desktop
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;

teamCarousel.addEventListener('mousedown', (e) => {
    isDragging = true;
    startPosition = e.pageX;
    teamCarousel.style.cursor = 'grabbing';
});

teamCarousel.addEventListener('mouseup', () => {
    isDragging = false;
    teamCarousel.style.cursor = 'grab';
    handleSwipe();
});

teamCarousel.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const currentPosition = e.pageX;
        currentTranslate = prevTranslate + currentPosition - startPosition;
        teamCarousel.style.transform = `translateX(${currentTranslate}px)`;
    }
});

// Touch Event untuk Mobile
teamCarousel.addEventListener('touchstart', (e) => {
    isDragging = true;
    startPosition = e.touches[0].clientX;
});

teamCarousel.addEventListener('touchend', () => {
    isDragging = false;
    handleSwipe();
});

teamCarousel.addEventListener('touchmove', (e) => {
    if (isDragging) {
        const currentPosition = e.touches[0].clientX;
        currentTranslate = prevTranslate + currentPosition - startPosition;
        teamCarousel.style.transform = `translateX(${currentTranslate}px)`;
    }
});

// Fungsi untuk swipe
function handleSwipe() {
    if (currentTranslate < -currentIndex * cardWidth - cardWidth / 2) {
        if (currentIndex < teamCards.length - 1) currentIndex++;
    } else if (currentTranslate > -currentIndex * cardWidth + cardWidth / 2) {
        if (currentIndex > 0) currentIndex--;
    }
    prevTranslate = -currentIndex * cardWidth;
    updateCarousel();
}

// Set status tombol pada awal load
updateCarousel();

let list = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let dots = document.querySelectorAll('.slider .dots li');
let prev = document.getElementById('prev')
let next = document.getElementById('next');

let active = 0;
let lengthItems = items.length;

next.onclick = function(){
    if(active + 1 > lengthItems){
        active = 0;
    }else{
        active = active + 1;
    }
    reloadSlider();
    
}
prev.onclick = function(){
    if(active - 1 < 0){
        active = lengthItems;
    }else{
        active = active - 1;
    }
    reloadSlider();
}
let refreshSlider = setInterval(()=> {next.click()}, 2000);
function reloadSlider() {
    let checkLeft = items[active].offsetLeft;
    list.style.left = -checkLeft + 'px';

    let lastActiveDot = document.querySelector('.slider .dots li.active');
    lastActiveDot.classList.remove('active');
    dots[active].classList.add('active');
    clearInterval(refreshSlider);
    refreshSlider = setInterval(()=> {next.click()}, 2000);
}
dots.forEach((Li, key) => {
    Li.addEventListener('click', function(){
        active = key;
        reloadSlider();
    })
})
