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
    if (document.querySelector('.swiper-pagination-bullet-active .progress-bar')) {
        setTimeout(() => {
            const activeBullet = document.querySelector(
                '.swiper-pagination-bullet-active .progress-bar'
            );
            activeBullet.style.width = '100%';
            activeBullet.style.transition = `width ${heroSliderAttr / 1000}s linear`;
        }, 1);
    }

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
            return null;
        }
    };

    let projectsSlider = initSwiper();

    const initSlider = () => {
        if (window.innerWidth < 1280) {
            const sliderItem = document.querySelectorAll('.slider');
            const sliders = [];

            sliderItem.forEach((slider) => {
                const swiperElement = slider.querySelector('.main-swiper');
                if (swiperElement) {
                    // Инициализируем слайдер для каждого найденного элемента .main-swiper
                    sliders.push(
                        new Swiper(swiperElement, {
                            modules: [FreeMode],
                            slidesPerView: 'auto',
                            spaceBetween: 10,
                            freeMode: true,
                            slidesOffsetBefore: 10,
                            slidesOffsetAfter: 10,

                            breakpoints: {
                                768: {
                                    slidesOffsetBefore: 16,
                                    slidesOffsetAfter: 16
                                }
                            }
                        })
                    );
                }
            });

            return sliders;
        } else {
            return [];
        }
    };

    let sliders = initSlider();

    const destroySliders = () => {
        if (projectsSlider) {
            projectsSlider.destroy(true, true);
            projectsSlider = null;
        }

        if (sliders.length > 0) {
            sliders.forEach((swiperInstance) => {
                if (swiperInstance && swiperInstance.destroy) {
                    swiperInstance.destroy(true, true);
                }
            });
            sliders = [];
        }
    };

    const handleResize = () => {
        if (window.innerWidth >= 1280 && (projectsSlider || sliders.length > 0)) {
            destroySliders();
        } else if (window.innerWidth < 1280 && (!projectsSlider || sliders.length === 0)) {
            projectsSlider = initSwiper();
            sliders = initSlider();
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

    // Слайдер благодарственных писем
    const thanksLetter = new Swiper('.content-thanks-letter .swiper', {
        modules: [Navigation, FreeMode],
        slidesPerView: 1.1,
        spaceBetween: 8,
        freeMode: true,
        slidesOffsetAfter: 8,

        navigation: {
            nextEl: '.content-thanks-letter .swiper-button-next',
            prevEl: '.content-thanks-letter .swiper-button-prev'
        },

        breakpoints: {
            768: {
                slidesPerView: 2.1,
                spaceBetween: 20
            },

            1280: {
                slidesPerView: 2.4,
                spaceBetween: 20
            },

            1440: {
                slidesPerView: 2.7
            }
        }
    });

    // Слайдер изображений на странице новости
    const newsSlider = new Swiper('.section-news-slider .swiper', {
        modules: [Navigation, Pagination],
        slidesPerView: 1,
        spaceBetween: 5,
        freeMode: true,

        pagination: {
            el: '.section-news-slider .swiper-pagination',
            clickable: true
        },

        navigation: {
            nextEl: '.section-news-slider .swiper-button-next',
            prevEl: '.section-news-slider .swiper-button-prev'
        }
    });

    // Категории на странице "Сравнение"
    const compareCategories = new Swiper('.compare-categories .swiper', {
        modules: [FreeMode],
        slidesPerView: 'auto',
        spaceBetween: 10,
        freeMode: true
    });

    // Слайдер на странице "Сравнение"
    const compareItems = document.querySelectorAll('.compare-item');
    const compareContainer = document.querySelector('.compare');

    const compareItemsSlider = new Swiper('.compare-item .swiper', {
        modules: [Navigation],
        slidesPerView: 1,
        spaceBetween: 5,
        allowTouchMove: false,
        loop: true,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },

        breakpoints: {
            1280: {
                slidesPerView: 4,
                spaceBetween: 0,
                allowTouchMove: true,
                loop: false
            }
        },

        on: {
            slideChange: function () {
                const currentIndex = this.realIndex + 1;
                const totalSlides = this.slides.length;
                document.querySelector(
                    `.compare-item:first-child .slide-counter`
                ).textContent = `${currentIndex} из ${totalSlides}`;
            }
        }
    });

    const handleMobileResize = () => {
        const isMobile = window.innerWidth < 1280; // Установите ширину для мобильных устройств

        // Удаляем все клонированные элементы
        const clonedItems = compareContainer.querySelectorAll('.compare-item.clone');
        clonedItems.forEach((item) => item.remove());

        if (isMobile) {
            // Проверяем, есть ли уже клон
            const existingClone = compareContainer.querySelector('.compare-item.clone');
            if (!existingClone) {
                compareItems.forEach((item) => {
                    const clone = item.cloneNode(true);
                    clone.classList.add('clone'); // Добавляем класс для идентификации клона

                    compareContainer.appendChild(clone);

                    // Инициализируем Swiper для клонированного элемента
                    const swiper = clone.querySelector('.swiper');
                    new Swiper(swiper, {
                        modules: [Navigation],
                        slidesPerView: 1,
                        spaceBetween: 5,
                        allowTouchMove: false,
                        loop: true,
                        initialSlide: 1, // Начальный слайд для клона

                        navigation: {
                            nextEl: '.compare-item.clone .swiper-button-next',
                            prevEl: '.compare-item.clone .swiper-button-prev'
                        },

                        on: {
                            slideChange: function () {
                                const currentIndex = this.realIndex + 1;
                                const totalSlides = this.slides.length;
                                document.querySelector(
                                    '.compare-item.clone .slide-counter'
                                ).textContent = `${currentIndex} из ${totalSlides}`;
                            }
                        }
                    });
                });
            }
        }
    };

    // Инициализация при загрузке
    handleMobileResize();

    // Добавляем обработчик события изменения размера окна
    window.addEventListener('resize', handleMobileResize);
}
