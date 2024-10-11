let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');
let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .listThumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');
thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;
nextDom.onclick = function(){
    showSlider('next');    
}
prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .listThumbnail .item');

    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);
    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}

document.addEventListener("DOMContentLoaded", () => {
    // Pilih semua elemen kartu
    const cards = document.querySelectorAll('.card');

    // Tambahkan event listener pada setiap kartu
    cards.forEach((card) => {
        card.addEventListener('click', () => {
            // Hapus kelas "selected" dari semua kartu
            cards.forEach((c) => c.classList.remove('selected'));

            // Tambahkan kelas "selected" ke kartu yang diklik
            card.classList.add('selected');
        });
    });
});


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
