import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, FreeMode } from 'swiper/modules';

// Получаем значение 'data-autoplay'
const sliderAutoplay = document.querySelector('.hero-slider');
const heroSliderAttr = sliderAutoplay.getAttribute('data-autoplay');

const heroSlider = new Swiper('.hero-slider .swiper', {
    modules: [Navigation, Pagination, Autoplay, FreeMode],
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: heroSliderAttr,
        disableOnInteraction: false
    },

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            return `<div class="${className}"><div class="progress-bar"></div></div>`;
        }
    },
    on: {
        slideChangeTransitionStart: function () {
            document.querySelectorAll('.progress-bar').forEach((bar) => {
                bar.style.width = '0';
                bar.style.transition = 'none';
            });
        },
        slideChangeTransitionEnd: function () {
            const activeBullet = document.querySelector(
                '.swiper-pagination-bullet-active .progress-bar'
            );
            setTimeout(() => {
                activeBullet.style.width = '100%';
                activeBullet.style.transition = `width ${heroSliderAttr / 1000}s linear`;
            }, 10); // небольшая задержка для корректной анимации
        }
    }
});

// Начальная анимация для первого слайда
document.addEventListener('DOMContentLoaded', function () {
    const activeBullet = document.querySelector('.swiper-pagination-bullet-active .progress-bar');
    activeBullet.style.width = '100%';
    activeBullet.style.transition = `width ${heroSliderAttr / 1000}s linear`;
});

const heroTape = new Swiper('.hero-tape', {
    modules: [FreeMode],
    slidesPerView: 'auto',
    freeMode: true
});

const cardItem = document.querySelectorAll('.card-item');

cardItem.forEach((slider, index) => {
    // Находим элемент пагинации внутри текущего слайдера
    const paginationElement = slider.querySelector('.nested-pagination');

    // Устанавливаем уникальный атрибут data-slider для элемента пагинации
    if (paginationElement) {
        paginationElement.setAttribute('data-slide', index + 1);
    }

    const swiper = slider.querySelector('.swiper');

    // Инициализируем новый Swiper с уникальным селектором пагинации
    new Swiper(swiper, {
        modules: [Pagination],
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
            el: `.nested-pagination[data-slide="${index + 1}"]`,
            clickable: true
        }
    });
});

const saleSlider = new Swiper('.sale .main-swiper', {
    modules: [Navigation, Pagination, FreeMode],
    slidesPerView: 'auto',
    spaceBetween: 10,
    freeMode: true,
    slidesOffsetBefore: 10,
    slidesOffsetAfter: 10,

    pagination: {
        el: '.main-pagination',
        clickable: true
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },

    breakpoints: {
        768: {
            spaceBetween: 16,
            slidesOffsetBefore: 16,
            slidesOffsetAfter: 16
        },

        1280: {
            slidesPerView: 3,
            spaceBetween: 16,
            freeMode: false,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0
        }
    }
});
