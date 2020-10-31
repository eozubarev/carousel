// Находим все элементы из HTML
let sliderContainer = document.querySelector('.carousel-container')
let slides = document.querySelectorAll('.carousel-slide')
let prevButton = document.querySelector('.button.previous')
let nextButton = document.querySelector('.button.next')
let slideIndexes = document.querySelectorAll('.carousel-slide__index')

// Находим кнопки и вешаем на них слушатель событий и отслеживаем событие клика
prevButton.addEventListener('click', onPrevClick);
nextButton.addEventListener('click', onNextClick);

// Текущий номер элементов массива слайдов (slides)
// инициализируем 0 так как первый элемент по факту 0
let index = 0;

/* 
Обработчик события "клик" для кнопки назад
*/
function onPrevClick() {
    // Проверяем, если index(массива) больше нуля, 
    // то мы можем уменьшить текущий номер (index) на 1 
    // (так как минимальное значение для index - это 0, то есть значения -1 -2 и тд НЕДОПУСТИМЫ)
    if (index > 0) {
        let prevousIndex = index;
        index = index - 1;
        switchSlide(prevousIndex, index);
    } 
}

function onNextClick() {
    // Проверяем, если index(массива) -1 меньше кол-ва элементов массива (slides.length), 
    // то мы можем увеличить текущий номер (index) на 1 
    // (так как максимальное значение для index - это кол-во элементов массива - 1, 
    // то есть значения slides.length, slides.length+1 и тд НЕДОПУСТИМЫ - так как элементов с таким индексом не существует)
    if ((index+1) < slides.length) {
        let prevousIndex = index;
        index = index + 1;
        switchSlide(prevousIndex, index);
    }
}

function switchSlide(previousIndex, newIndex) {
    // switch active slide
    slides[previousIndex].classList.remove('active')
    slides[newIndex].classList.add('active')

    // move new slide into viewport
    translateValue = newIndex * slides[newIndex].clientHeight * -1
    sliderContainer.style.transform = "translateY(" + translateValue + "px)"

    slideIndexes[newIndex].innerHTML = "<span>" + (newIndex+1) + "</span>";

    checkAvailability()
}

function checkAvailability() {
    if (index == 0) {
        prevButton.classList.add('--disabled')
    } else {
        prevButton.classList.remove('--disabled')
    }
    if (index == slides.length - 1) {
        nextButton.classList.add('--disabled')
    } else {
        nextButton.classList.remove('--disabled')
    }
} 