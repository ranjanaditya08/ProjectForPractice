const slides = document.querySelectorAll(".slide");

let counter = 0;

slides.forEach((slide, index) => {
    slide.style.left = `${index * 100}%`;
});

const goNext = () => {
    if (counter < slides.length - 1) {
        counter++;
    } else {
        counter = 0; 
    }
    slideImage();
};

const goPrev = () => {
    if (counter > 0) {
        counter--;
    } else {
        counter = slides.length - 1; 
    }
    slideImage();
};

const slideImage = () => {
    slides.forEach((slide) => {
        slide.style.transform = `translateX(-${counter * 100}%)`;
    });
};


setInterval(goNext, 3000);


// Slider2

const sliderWrapper = document.querySelector('.slider-wrapper');
const sliderWrapperWidth = sliderWrapper.clientWidth;
const slides1 = document.querySelectorAll('.sm-slide');
const slideWidth = slides1[0].clientWidth;
let numVisibleSlides = Math.floor(sliderWrapperWidth/slideWidth);
const totalSlides = slides1.length;
let currentSlide = 0;

function updateSlider() {
    const offset = currentSlide * slideWidth;
    sliderWrapper.style.transform = `translateX(-${offset}px)`;
}

function nextSlide() {
    if ((currentSlide) <= totalSlides - numVisibleSlides) {
        currentSlide++;
        updateSlider();
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlider();
    }
}


updateSlider();


// Slider 3


const sliderWrapper1 = document.querySelector('.slider1-wrapper');
const sliderWrapperWidth1 = sliderWrapper1.clientWidth;
console.log(sliderWrapperWidth1,"sliderWrapperWidth1");

const slides2 = document.querySelectorAll('.md-slide');
const slideWidth1 = slides2[0].clientWidth;
console.log(slideWidth1,"slideWidth1");

let numVisibleSlides1 = Math.floor(sliderWrapperWidth1/slideWidth1);
const totalSlides1 = slides2.length;
let currentSlide1 = 0;


function updateSlider1() {
    const offset = currentSlide1 * slideWidth1;
    sliderWrapper1.style.transform = `translateX(-${offset}px)`;
}

function nextSlide1() {
    if ((currentSlide1) < totalSlides1 - numVisibleSlides1) {
        currentSlide1++;
        updateSlider1();
    }
}

function prevSlide1() {
    if (currentSlide1 > 0) {
        currentSlide1--;
        updateSlider1();
    }
}

updateSlider1();
