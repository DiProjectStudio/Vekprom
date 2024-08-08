import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, FreeMode, Thumbs } from 'swiper/modules';

export function initializeSlider() {
    // Получаем значение 'data-autoplay'
    const sliderAutoplay = document.querySelector('.hero-slider')
        ? document.querySelector('.hero-slider')
        : null;
    const heroSliderAttr = sliderAutoplay ? sliderAutoplay.getAttribute('data-autoplay') : null;

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
        const activeBullet = document.querySelector(
            '.swiper-pagination-bullet-active .progress-bar'
        );
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
            },

            1440: {
                slidesPerView: 3,
                spaceBetween: 20,
                freeMode: false,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0
            }
        }
    });

    const initSwiper = () => {
        if (window.innerWidth < 1280) {
            // Инициализируем слайдер, если ширина экрана меньше 1280px
            return new Swiper('.projects', {
                modules: [FreeMode],
                slidesPerView: 'auto',
                spaceBetween: 10,
                freeMode: true,
                slidesOffsetBefore: 10,
                slidesOffsetAfter: 10,

                breakpoints: {
                    768: {
                        spaceBetween: 16,
                        slidesOffsetBefore: 16,
                        slidesOffsetAfter: 16
                    }
                }
            });
        } else {
            // Возвращаем null, если ширина экрана 1280px и больше
            return null;
        }
    };

    let projectsSlider = initSwiper();

    // Обработчик изменения размера окна
    const handleResize = () => {
        if (window.innerWidth >= 1280 && projectsSlider !== null) {
            projectsSlider.destroy(true, true); // Уничтожаем слайдер
            projectsSlider = null;
        } else if (window.innerWidth < 1280 && projectsSlider === null) {
            projectsSlider = initSwiper(); // Инициализируем слайдер
        }
    };

    // Слушаем изменения размера окна
    window.addEventListener('resize', handleResize);

    // Миниатюрная пагинация слайдера для карточки товара
    const productThumbs = new Swiper('.product__thumbs .swiper', {
        slidesPerView: 'auto',
        spaceBetween: 10,
        watchSlidesProgress: true,
        direction: 'horizontal'
    });

    // Слайдер карточки товара
    const product = new Swiper('.product__main .swiper', {
        modules: [Pagination, Thumbs],
        slidesPerView: 1,
        spaceBetween: 30,

        thumbs: {
            swiper: productThumbs
        },

        pagination: {
            el: '.product__main .swiper-pagination',
            clickable: true
        }
    });

    console.log('slider.js initialized');
}
