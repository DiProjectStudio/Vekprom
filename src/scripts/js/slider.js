import Swiper from 'swiper';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';

const heroSlider = new Swiper('.hero .swiper', {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,

    pagination: {
        el: '.hero .swiper-pagination',
        clickable: true
    },

    navigation: {
        nextEl: '.hero .swiper-btn-next',
        prevEl: '.hero .swiper-btn-prev'
    }
});
