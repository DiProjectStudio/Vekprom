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

const saleSlider = new Swiper('.sale .swiper', {
    modules: [Navigation, Pagination],
    slidesPerView: 'auto',
    spaceBetween: 10
});
