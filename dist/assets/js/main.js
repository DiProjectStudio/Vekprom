import { _ as _default, O as Oe, S as Swiper, N as Navigation, P as Pagination, A as Autoplay, f as freeMode, T as Thumb, a as Scrollbar, I as Inputmask } from "./vendor.min.js";

(function($2) {
    $2.fn.jqueryPincodeAutotab = function(options) {
        var listOfElements = $2(this);
        var settings = $2.extend({
            prevElement: null,
            nextElement: null,
            defaultFlow: true
        }, options);
        return this.each((function(index, value) {
            $2(value).on("keydown", (function(event) {
                var move = 0;
                switch (event.keyCode) {
                  case 48:
                  case 96:
                    $2(this).val("0");
                    move = 1;
                    event.preventDefault();
                    break;

                  case 49:
                  case 97:
                    $2(this).val("1");
                    move = 1;
                    event.preventDefault();
                    break;

                  case 50:
                  case 98:
                    $2(this).val("2");
                    move = 1;
                    event.preventDefault();
                    break;

                  case 51:
                  case 99:
                    $2(this).val("3");
                    move = 1;
                    event.preventDefault();
                    break;

                  case 52:
                  case 100:
                    $2(this).val("4");
                    move = 1;
                    event.preventDefault();
                    break;

                  case 53:
                  case 101:
                    $2(this).val("5");
                    move = 1;
                    event.preventDefault();
                    break;

                  case 54:
                  case 102:
                    $2(this).val("6");
                    move = 1;
                    event.preventDefault();
                    break;

                  case 55:
                  case 103:
                    $2(this).val("7");
                    move = 1;
                    event.preventDefault();
                    break;

                  case 56:
                  case 104:
                    $2(this).val("8");
                    move = 1;
                    event.preventDefault();
                    break;

                  case 57:
                  case 105:
                    $2(this).val("9");
                    move = 1;
                    event.preventDefault();
                    break;

                  case 8:
                  case 46:
                    $2(this).val("");
                    move = -1;
                    event.preventDefault();
                    break;

                  case 9:
                    if (event.shiftKey) move = -1; else move = 1;
                    event.preventDefault();
                    break;

                  case 86:
                    if (!(event.ctrlKey || event.metaKey)) event.preventDefault();
                    break;

                  case 13:
                  case 16:
                  case 17:
                  case 91:
                    break;

                  case 229:
                    var androidKeyCode = $2(this).val();
                    if ($2.isNumeric(androidKeyCode)) move = 1;
                    break;

                  default:
                    event.preventDefault();
                }
                for (var i = 0; i < listOfElements.length; i++) {
                    var prevElement;
                    var nextElement;
                    if (i - 1 >= 0) prevElement = listOfElements[i - 1];
                    if (i + 1 <= listOfElements.length) nextElement = listOfElements[i + 1];
                    if (listOfElements[i] == this) switch (move) {
                      case 1:
                        if (nextElement) {
                            $2(nextElement).select();
                            $2(nextElement).focus();
                        } else if (settings.nextElement) {
                            settings.nextElement.select();
                            settings.nextElement.focus();
                        } else if (settings.defaultFlow) {
                            var focusable = $2(":focusable");
                            for (var j = 0; j < focusable.length; j++) if (focusable[j] == this) {
                                if (focusable[j + 1]) {
                                    $2(focusable[j + 1]).select();
                                    $2(focusable[j + 1]).focus();
                                }
                                break;
                            }
                        }
                        break;

                      case -1:
                        if (prevElement) {
                            $2(prevElement).select();
                            $2(prevElement).focus();
                        } else if (settings.prevElement) {
                            settings.prevElement.select();
                            settings.prevElement.focus();
                        } else if (settings.defaultFlow) {
                            var focusable = $2(":focusable");
                            for (var j = 0; j < focusable.length; j++) if (focusable[j] == this) {
                                if (focusable[j - 1]) {
                                    $2(focusable[j - 1]).select();
                                    $2(focusable[j - 1]).focus();
                                }
                                break;
                            }
                        }
                        break;
                    }
                }
            }));
            $2(value).on("paste", (function(event) {
                event.preventDefault();
                var clipboardData = event.clipboardData || event.originalEvent.clipboardData || window.clipboardData;
                var pastedData = clipboardData.getData("text/plain");
                for (var i = 0; i < listOfElements.length; i++) {
                    var data = function() {
                        return pastedData[i];
                    };
                    $2(listOfElements[i]).val(data);
                }
            }));
        }));
    };
})(jQuery);

function getBrowserName() {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("Firefox")) return "firefox"; else if (userAgent.includes("Chrome")) return "chrome"; else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) return "safari"; else if (userAgent.includes("Edge")) return "edge"; else return null;
}

function initializeMap() {
    document.getElementById("map");
    if ($("#map").length) {
        let init = function() {
            map = new ymaps.Map("map", {
                center: [ 54.072572095894145, 41.55122501864023 ],
                zoom: 5.5,
                controls: []
            });
            $.each(points, (function(index, point) {
                let placemark = new ymaps.Placemark(point.coordinates, {
                    balloonContentBody: `<div class="contacts__inner-location">\n                                  <h3 class="location-title">${point.title}</h3>\n                                  <div class="location-contacts">\n                                    <div class="location-phone">\n                                      <span>${point.phone}</span>\n                                    </div>\n                                    <div class="location-clock">\n                                      <span>${point.clock}</span>\n                                    </div>\n                                    <div class="location-email">\n                                      <span>${point.email}</span>\n                                    </div>\n                                    <div class="location-address">\n                                      <span>${point.address}</span>\n                                    </div>\n                                    </div><a class="location-more" href="contacts-detail.html">\n                                      <span class="link link--mint">Подробнее</span>\n                                      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n        <path d="M14.5 5L21.5 12M21.5 12L14.5 19M21.5 12L3.5 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>\n    </svg></a>\n                                    </div>`
                }, {
                    iconLayout: "default#image",
                    iconImageHref: "/assets/images/Map.svg",
                    iconImageSize: [ 40, 40 ]
                });
                map.geoObjects.add(placemark);
            }));
            _default(map, {
                preventScroll: true,
                preventTouch: true
            });
        };
        let map;
        ymaps.ready(init);
    }
}

function initializePopup() {
    window.Fancybox = Oe;
    const fancyboxOptions = {
        dragToClose: false,
        autoFocus: false,
        l10n: {
            CLOSE: "Закрыть",
            NEXT: "Следующий",
            PREV: "Предыдущий",
            MODAL: "Вы можете закрыть это модальное окно, нажав клавишу ESC"
        },
        on: {
            init: fancybox => {
                document.body.classList.add("popup-active");
                if (fancybox.userSlides[0].src === "#popup-remove") document.body.classList.add("popup-active-remove");
            },
            destroy: fancybox => {
                document.body.classList.remove("popup-active");
                document.body.classList.remove("popup-active-remove");
            }
        }
    };
    Oe.bind("[data-fancybox]", fancyboxOptions);
    const popupSuccess = () => {
        const template = `\n            <div id="popup-callback" class="popup popup-success">\n                <div class="popup__title">Спасибо</div>\n                <div class="popup__subtitle">Заявка успешно отправлена</div>\n                <div class="btn btn--primary" onclick="Fancybox.close();">Закрыть окно</div>\n            </div>\n        `;
        Oe.show([ {
            src: template,
            type: "html"
        } ], fancyboxOptions);
    };
    window.popupSuccess = popupSuccess;
    const popup = id => {
        Oe.show([ {
            src: id,
            type: "inline"
        } ], fancyboxOptions);
    };
    window.popup = popup;
    Oe.bind('[data-fancybox="gallery"]', {
        dragToClose: false,
        autoFocus: false,
        Toolbar: {
            display: {
                left: [],
                right: [ "close" ]
            }
        },
        closeButton: false,
        Thumbs: {
            type: "classic"
        },
        l10n: {
            CLOSE: "Закрыть",
            NEXT: "Следующий",
            PREV: "Предыдущий",
            MODAL: "Вы можете закрыть это модальное окно, нажав клавишу ESC"
        }
    });
}

function initializeSlider() {
    const sliderAutoplay = document.querySelector(".hero-slider") ? document.querySelector(".hero-slider") : null;
    const heroSliderAttr = sliderAutoplay ? sliderAutoplay.getAttribute("data-autoplay") : null;
    new Swiper(".hero-slider .swiper", {
        modules: [ Navigation, Pagination, Autoplay, freeMode ],
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: heroSliderAttr,
            disableOnInteraction: false
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            renderBullet: function(index, className) {
                return `<div class="${className}"><div class="progress-bar"></div></div>`;
            }
        },
        on: {
            slideChangeTransitionStart: function() {
                document.querySelectorAll(".progress-bar").forEach((bar => {
                    bar.style.width = "0";
                    bar.style.transition = "none";
                }));
            },
            slideChangeTransitionEnd: function() {
                const activeBullet = document.querySelector(".swiper-pagination-bullet-active .progress-bar");
                setTimeout((() => {
                    activeBullet.style.width = "100%";
                    activeBullet.style.transition = `width ${heroSliderAttr / 1e3}s linear`;
                }), 10);
            }
        }
    });
    if (document.querySelector(".swiper-pagination-bullet-active .progress-bar")) setTimeout((() => {
        const activeBullet = document.querySelector(".swiper-pagination-bullet-active .progress-bar");
        activeBullet.style.width = "100%";
        activeBullet.style.transition = `width ${heroSliderAttr / 1e3}s linear`;
    }), 1);
    new Swiper(".hero-tape", {
        modules: [ freeMode ],
        slidesPerView: "auto",
        freeMode: true
    });
    const cardItem = document.querySelectorAll(".card-item");
    cardItem.forEach(((slider, index) => {
        const paginationElement = slider.querySelector(".nested-pagination");
        if (paginationElement) paginationElement.setAttribute("data-slide", index + 1);
        const swiper = slider.querySelector(".swiper");
        new Swiper(swiper, {
            modules: [ Pagination ],
            slidesPerView: 1,
            spaceBetween: 10,
            pagination: {
                el: `.nested-pagination[data-slide="${index + 1}"]`,
                clickable: true
            }
        });
    }));
    new Swiper(".sale .main-swiper", {
        modules: [ Navigation, Pagination, freeMode ],
        slidesPerView: "auto",
        spaceBetween: 10,
        freeMode: true,
        slidesOffsetBefore: 10,
        slidesOffsetAfter: 10,
        pagination: {
            el: ".main-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
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
        if (window.innerWidth < 1280) return new Swiper(".projects", {
            modules: [ freeMode ],
            slidesPerView: "auto",
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
        }); else return null;
    };
    let projectsSlider = initSwiper();
    const initSlider = () => {
        if (window.innerWidth < 1280) {
            const sliderItem = document.querySelectorAll(".slider");
            const sliders2 = [];
            sliderItem.forEach((slider => {
                const swiperElement = slider.querySelector(".main-swiper");
                if (swiperElement) sliders2.push(new Swiper(swiperElement, {
                    modules: [ freeMode ],
                    slidesPerView: "auto",
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
                }));
            }));
            return sliders2;
        } else return [];
    };
    let sliders = initSlider();
    const destroySliders = () => {
        if (projectsSlider) {
            projectsSlider.destroy(true, true);
            projectsSlider = null;
        }
        if (sliders.length > 0) {
            sliders.forEach((swiperInstance => {
                if (swiperInstance && swiperInstance.destroy) swiperInstance.destroy(true, true);
            }));
            sliders = [];
        }
    };
    const handleResize2 = () => {
        if (window.innerWidth >= 1280 && (projectsSlider || sliders.length > 0)) destroySliders(); else if (window.innerWidth < 1280 && (!projectsSlider || sliders.length === 0)) {
            projectsSlider = initSwiper();
            sliders = initSlider();
        }
    };
    window.addEventListener("resize", handleResize2);
    const productThumbs = new Swiper(".product__thumbs .swiper", {
        slidesPerView: "auto",
        spaceBetween: 10,
        watchSlidesProgress: true,
        direction: "horizontal"
    });
    new Swiper(".product__main .swiper", {
        modules: [ Pagination, Thumb ],
        slidesPerView: 1,
        spaceBetween: 30,
        thumbs: {
            swiper: productThumbs
        },
        pagination: {
            el: ".product__main .swiper-pagination",
            clickable: true
        }
    });
    new Swiper(".content-thanks-letter .swiper", {
        modules: [ Navigation, freeMode ],
        slidesPerView: 1.1,
        spaceBetween: 8,
        freeMode: true,
        slidesOffsetAfter: 8,
        navigation: {
            nextEl: ".content-thanks-letter .swiper-button-next",
            prevEl: ".content-thanks-letter .swiper-button-prev"
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
    new Swiper(".section-news-slider .swiper", {
        modules: [ Navigation, Pagination ],
        slidesPerView: 1,
        spaceBetween: 5,
        freeMode: true,
        pagination: {
            el: ".section-news-slider .swiper-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".section-news-slider .swiper-button-next",
            prevEl: ".section-news-slider .swiper-button-prev"
        }
    });
    new Swiper(".compare-categories .swiper", {
        modules: [ freeMode ],
        slidesPerView: "auto",
        spaceBetween: 10,
        freeMode: true
    });
    const compareItems = document.querySelectorAll(".compare-item");
    const compareContainer = document.querySelector(".compare") ? document.querySelector(".compare") : null;
    const compareListMobile = {
        activeSlideIndexSlider1: 1,
        activeSlideIndexSlider2: 2
    };
    new Swiper(".compare-item .swiper", {
        modules: [ Navigation ],
        slidesPerView: 1,
        spaceBetween: 5,
        allowTouchMove: false,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
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
            slideChange: function() {
                const currentIndex = this.realIndex + 1;
                const totalSlides = this.slides.length;
                document.querySelector(`.compare-item:first-child .slide-counter`).textContent = `${currentIndex} из ${totalSlides}`;
                compareListMobile.compareDesc1 = currentIndex;
                $(`.js-compare-desc p:not([data-item=${compareListMobile.activeSlideIndexSlider2}])`).removeClass("active");
                $(`.js-compare-desc p[data-item=${currentIndex}]`).addClass("active");
            }
        }
    });
    const handleMobileResize = () => {
        const isMobile = window.innerWidth < 1280;
        if (compareContainer) {
            const clonedItems = compareContainer.querySelectorAll(".compare-item.clone");
            clonedItems.forEach((item => item.remove()));
        }
        if (isMobile) {
            const existingClone = compareContainer ? compareContainer.querySelector(".compare-item.clone") : null;
            if (!existingClone) compareItems.forEach((item => {
                const clone = item.cloneNode(true);
                clone.classList.add("clone");
                compareContainer.appendChild(clone);
                const swiper = clone.querySelector(".swiper");
                new Swiper(swiper, {
                    modules: [ Navigation ],
                    slidesPerView: 1,
                    spaceBetween: 5,
                    allowTouchMove: false,
                    loop: true,
                    initialSlide: 1,
                    // Начальный слайд для клона
                    navigation: {
                        nextEl: ".compare-item.clone .swiper-button-next",
                        prevEl: ".compare-item.clone .swiper-button-prev"
                    },
                    on: {
                        slideChange: function() {
                            const currentIndex = this.realIndex + 1;
                            const totalSlides = this.slides.length;
                            document.querySelector(".compare-item.clone .slide-counter").textContent = `${currentIndex} из ${totalSlides}`;
                            compareListMobile.compareDesc2 = currentIndex;
                            $(`.js-compare-desc p:not([data-item=${compareListMobile.activeSlideIndexSlider1}])`).removeClass("active");
                            $(`.js-compare-desc p[data-item=${currentIndex}]`).addClass("active");
                        }
                    }
                });
            }));
        }
    };
    handleMobileResize();
    window.addEventListener("resize", handleMobileResize);
    new Swiper(".history .swiper", {
        modules: [ Scrollbar, freeMode ],
        slidesPerView: "auto",
        freeMode: true,
        grabCursor: true,
        slidesOffsetBefore: 30,
        slidesOffsetAfter: 30,
        scrollbar: {
            el: ".swiper-scrollbar-custom",
            draggable: true,
            dragSize: 72
        }
    });
    const featuresThumbs = new Swiper(".features__thumbs .swiper", {
        slidesPerView: "auto",
        spaceBetween: 10,
        watchSlidesProgress: true,
        direction: "horizontal",
        allowTouchMove: false,
        on: {
            slideChange: function() {
                features.slideTo(this.activeIndex);
            }
        }
    });
    const features = new Swiper(".features__slide .swiper", {
        modules: [ Navigation, Pagination, Thumb ],
        slidesPerView: 1,
        spaceBetween: 30,
        allowTouchMove: false,
        thumbs: {
            swiper: featuresThumbs
        },
        navigation: {
            nextEl: ".features__bar .swiper-button-next",
            prevEl: ".features__bar .swiper-button-prev"
        },
        pagination: {
            el: ".features__bar .swiper-pagination",
            clickable: true
        }
    });
}

function initializeFilter() {
    const toggleClass = (selector, className, action) => {
        $(selector)[action](className);
    };
    const handleFilterToggle = (e, action) => {
        toggleClass(".catalog__aside", "show", action);
        toggleClass(".brands", "show", action);
        toggleClass("body", "overflow-hidden", action);
    };
    $(".js-filter-btn").on("click", (e => {
        handleFilterToggle(e, "addClass");
    }));
    $(".js-filter-close").on("click", (e => {
        handleFilterToggle(e, "removeClass");
    }));
    $(".range").each((function() {
        const $container = $(this);
        const $min = $container.find(".range-min");
        const $max = $container.find(".range-max");
        const $minValue = $container.find(".min-value");
        const $maxValue = $container.find(".max-value");
        const $highlight = $container.find(".range-highlight");
        function updateValues() {
            let minValue = parseInt($min.val());
            let maxValue = parseInt($max.val());
            const minPercent = minValue / $min.attr("max") * 100;
            const maxPercent = maxValue / $max.attr("max") * 100;
            if (minValue > maxValue) {
                $min.val(maxValue);
                minValue = maxValue;
            }
            if (maxValue < minValue) {
                $max.val(minValue);
                maxValue = minValue;
            }
            $highlight.css({
                left: `${minPercent}%`,
                right: `${100 - maxPercent}%`
            });
            $minValue.attr("value", minValue);
            $maxValue.attr("value", maxValue);
            $minValue.val(minValue);
            $maxValue.val(maxValue);
        }
        $min.on("input", updateValues);
        $max.on("input", updateValues);
        updateValues();
    }));
    $(".js-sorting").on("click", (e => {
        if (!$(e.currentTarget).closest(".sorting").hasClass("dropdown")) {
            $(e.currentTarget).closest(".sorting").addClass("dropdown");
            $(document).on("click", (i => {
                if (!$(i.target).closest(".js-sorting").length && $(".sorting").hasClass("dropdown")) $(".sorting").removeClass("dropdown");
            }));
        } else $(e.currentTarget).closest(".sorting").removeClass("dropdown");
    }));
    $(".js-view").on("click", (e => {
        $(".js-view").removeClass("active");
        if (!$(e.currentTarget).hasClass("active")) $(e.currentTarget).addClass("active");
        if ($(e.currentTarget).hasClass("js-table-list")) $(".catalog__wrap").addClass("table-list"); else $(".catalog__wrap").removeClass("table-list");
    }));
    const $letters = $(".letter");
    const $brandsInner = $(".brands__inner");
    $letters.on("click", (function() {
        $letters.removeClass("active");
        $(this).toggleClass("active");
        updateBrandsInnerClass();
    }));
    function updateBrandsInnerClass() {
        const hasActiveLetter = $letters.hasClass("active");
        if (hasActiveLetter) $brandsInner.addClass("active"); else $brandsInner.removeClass("active");
    }
    $(".brands__inner-clear").on("click", (function() {
        $letters.removeClass("active");
        updateBrandsInnerClass();
    }));
}

function initializePersonal() {
    const personalEdit = e => {
        e.style.display = "none";
        var parent = e.parentNode;
        var input = parent.querySelector("input");
        input.removeAttribute("disabled");
        input.focus();
        var actionElement = parent.querySelector(".personal__data-action");
        actionElement.classList.add("active");
    };
    const editCancel = e => {
        var parent = e.parentNode;
        var editBtn = parent.closest(".personal__data-item").querySelector(".edit");
        var input = parent.closest(".personal__data-item").querySelector("input");
        editBtn.style.display = "flex";
        parent.classList.remove("active");
        input.setAttribute("disabled", "");
    };
    window.personalEdit = personalEdit;
    window.editCancel = editCancel;
    $(".order__btn").on("click", (e => {
        $(e.currentTarget).closest(".order").toggleClass("expanded");
        $(e.currentTarget).closest(".order").find(".order__body").slideToggle();
    }));
}

function initializeCompare() {
    if ($("#compare").length) {
        const stickyElement = $("#compare");
        const stickyOffset = stickyElement.offset().top;
        const toggleStickyClass = () => {
            if ($(window).scrollTop() > stickyOffset) stickyElement.addClass("sticky"); else stickyElement.removeClass("sticky");
        };
        toggleStickyClass();
        $(window).scroll(toggleStickyClass);
    }
}

document.addEventListener("DOMContentLoaded", (event => {
    getBrowserName();
    initializeMap();
    initializePopup();
    initializeSlider();
    initializeFilter();
    initializePersonal();
    initializeCompare();
}));

const browser = getBrowserName();

if (browser) document.documentElement.classList.add("browser-" + browser);

const checkIsDesktop = () => $(window).width() >= 1280;

let isDesktop = checkIsDesktop();

Inputmask({
    mask: "+7 (999) 999-99-99",
    showMaskOnHover: false,
    showMaskOnFocus: false,
    onBeforePaste: (pastedValue, opts) => pastedValue.replace(/^8/, "")
}).mask("[data-phone-number]");

Inputmask({
    regex: "^[0-9]*$",
    allowMinus: false,
    showMaskOnHover: false,
    showMaskOnFocus: false,
    placeholder: ""
}).mask("[data-number-only]");

Inputmask({
    alias: "numeric",
    groupSeparator: " ",
    autoGroup: true,
    digits: 0,
    rightAlign: false
}).mask("[data-financial]");

$("#burger").on("click", (e => {
    if ($("#mobile-menu").length === 0) {
        const $mobileMenu2 = $('<div id="mobile-menu" class="mobile-menu"></div>');
        $("#header").append($mobileMenu2);
        $mobileMenu2.append($(".header__search").clone(true));
        $mobileMenu2.append($(".header__category").clone(true));
        $mobileMenu2.append($(".header__nav").clone(true));
        $mobileMenu2.append($(".header__selection").clone(true));
        mobileSubmenu();
    }
    const $header = $("#header");
    const $mobileMenu = $("#mobile-menu");
    if (!$header.hasClass("mobile-menu-active")) {
        $header.addClass("mobile-menu-active");
        $mobileMenu.fadeIn(200);
        $("body").addClass("overflow-hidden");
    } else {
        $header.removeClass("mobile-menu-active");
        $mobileMenu.fadeOut(200);
        $("body").removeClass("overflow-hidden");
    }
}));

const mobileSubmenu = () => {
    const $mobileMenu = $("#mobile-menu");
    const $categoryItems = $mobileMenu.find(".header__category-item > a");
    const $menuItems = $mobileMenu.find(".header__menu-item.has-child > a");
    $categoryItems.off("click").on("click", (e => {
        e.preventDefault();
        toggleCategorySubMenu($(e.currentTarget).parent(), ".header__category-item");
    }));
    $menuItems.off("click").on("click", (e => {
        e.preventDefault();
        toggleSubMenu($(e.currentTarget).parent(), ".header__menu-item");
    }));
    function toggleCategorySubMenu($item, itemSelector) {
        if (!$item.hasClass("active")) {
            $mobileMenu.addClass("expanded");
            $item.addClass("active");
            $mobileMenu.find(`${itemSelector}:not(.active)`).hide();
            $mobileMenu.find(".header__search, .header__nav, .header__selection").hide();
        } else {
            $mobileMenu.removeClass("expanded");
            $item.removeClass("active");
            $mobileMenu.find(`${itemSelector}`).show();
            $mobileMenu.find(".header__search, .header__nav, .header__selection").show();
        }
    }
    function toggleSubMenu($item, itemSelector) {
        if (!$item.hasClass("active")) {
            $mobileMenu.addClass("expanded");
            $item.addClass("active");
            $mobileMenu.find(`${itemSelector}:not(.active)`).hide();
            $mobileMenu.find(".header__search, .header__category, .header__bar, .header__selection").hide();
        } else {
            $mobileMenu.removeClass("expanded");
            $item.removeClass("active");
            $mobileMenu.find(`${itemSelector}`).show();
            $mobileMenu.find(".header__search, .header__category, .header__bar, .header__selection").show();
        }
    }
    $(window).off("resize.mobileSubmenu").on("resize.mobileSubmenu", (() => {
        if (!isDesktop) mobileSubmenu();
    }));
};

mobileSubmenu();

$(".header__main .search-icon").on("click", (e => {
    const $headerSearch = $(e.currentTarget).closest(".header__search");
    const $inputSearch = $headerSearch.find(".input-search");
    if (!isDesktop && $(e.currentTarget).closest(".header__main").length && !$headerSearch.hasClass("active")) {
        e.preventDefault();
        $headerSearch.addClass("active");
        $inputSearch.addClass("focus");
        $inputSearch.find("input").focus();
        $(".input-search__clear").one("click", (() => {
            $inputSearch.removeClass("focus");
            $headerSearch.removeClass("active");
        }));
        $(document).one("click", (e2 => {
            if (!$(e2.target).closest(".input-search").length && !$(e2.target).closest(".search-icon").length) {
                $inputSearch.removeClass("focus");
                $headerSearch.removeClass("active");
            }
        }));
    }
}));

const searchFocus = () => {
    const $headerSearch = $(".header__search");
    const $inputSearch = $headerSearch.find(".input-search");
    const $inputField = $inputSearch.find("input");
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (isDesktop) {
        $inputField.on("focus", (() => {
            $("body").addClass("bg-overlay overflow-hidden");
            $("body").css("padding-right", `${scrollBarWidth}px`);
            $inputSearch.addClass("focus");
            $headerSearch.addClass("active");
        }));
        $inputField.on("blur", (() => {
            $("body").removeClass("bg-overlay overflow-hidden");
            $("body").css("padding-right", "0");
            $inputSearch.removeClass("focus");
            $headerSearch.removeClass("active");
        }));
    }
};

searchFocus();

const categoryFocus = () => {
    if (isDesktop) {
        const $categoryItems = $(".header__category-item");
        $categoryItems.off("mouseenter mouseleave");
        $categoryItems.on("mouseenter", (() => {
            $("body").addClass("bg-overlay");
            $(".header__main").addClass("focus");
        })).on("mouseleave", (() => {
            $("body").removeClass("bg-overlay");
            $(".header__main").removeClass("focus");
        }));
    }
};

categoryFocus();

const $catalogBtn = $("#header-catalog-btn");

const $catalog = $("#header-catalog");

const $body = $("body");

function closeCatalog() {
    $body.removeClass("bg-overlay");
    $catalog.removeClass("active");
    $catalogBtn.removeClass("active");
}

$catalogBtn.on("click", (e => {
    $catalogBtn.toggleClass("active");
    $catalog.toggleClass("active");
    $body.toggleClass("bg-overlay");
}));

$(document).on("click", (e => {
    if (!$(e.target).closest("#header-catalog, #header-catalog-btn, #header_search").length && $catalog.hasClass("active")) closeCatalog();
}));

$(document).on("keyup", (e => {
    if (e.key === "Escape" && $catalog.hasClass("active")) closeCatalog();
}));

$(".header__catalog-item").hover((e => {
    $(".header__catalog-item").removeClass("active");
    $(".header__subcatalog").removeClass("active");
    $(`.header__subcatalog[data-active=${$(e.currentTarget).attr("data-catalog")}]`).addClass("active");
    $(e.currentTarget).addClass("active");
}));

$(".qty-input .qty").on("click", (e => {
    let $input = $(e.currentTarget).parent().find("input");
    let currentValue = Number($input.val());
    let maxValue = Number($input.attr("max-number"));
    if ($(e.currentTarget).hasClass("qty-minus")) {
        if (currentValue > 1) $input.val(currentValue - 1);
        if (currentValue <= 2) $(e.currentTarget).attr("disabled", true);
        if (currentValue - 1 < maxValue) $(e.currentTarget).parent().find(".qty-plus").removeAttr("disabled");
    }
    if ($(e.currentTarget).hasClass("qty-plus")) {
        if (currentValue < maxValue) $input.val(currentValue + 1);
        if (currentValue > 0) $(e.currentTarget).parent().find(".qty-minus").removeAttr("disabled");
        if (currentValue + 1 === maxValue) $(e.currentTarget).attr("disabled", true);
    }
}));

$(".qty-input input").on("input", (e => {
    let $input = $(e.currentTarget);
    let currentValue = Number($input.val());
    let maxValue = Number($input.attr("max-number"));
    if (currentValue < maxValue) $input.parent().find(".qty-plus").removeAttr("disabled"); else $input.parent().find(".qty-plus").attr("disabled", true);
    if (currentValue > 1) $input.parent().find(".qty-minus").removeAttr("disabled"); else $input.parent().find(".qty-minus").attr("disabled", true);
}));

$("#copy-article, #copy-link").on("click", (e => {
    $("#copy-temp").remove();
    $(e.currentTarget).find(".tooltip").remove();
    var $tempInput = $('<input id="copy-temp">');
    $("body").append($tempInput);
    let textToCopy = "";
    if ($(e.currentTarget).attr("id") === "copy-article") textToCopy = $("#article").text(); else if ($(e.currentTarget).attr("id") === "copy-link") textToCopy = window.location.href;
    $tempInput.val(textToCopy).select();
    document.execCommand("copy");
    $tempInput.remove();
    if ($(e.currentTarget).attr("id") === "copy-article") var $tooltip2 = $('<div class="tooltip"><div class="tooltip__content"><div class="tooltip__title">Скопировано в буфер обмена</div></div></div>'); else if ($(e.currentTarget).attr("id") === "copy-link") var $tooltip2 = $('<div class="tooltip"><div class="tooltip__content"><div class="tooltip__title">Ссылка скопирована в буфер обмена</div></div></div>');
    $(e.currentTarget).append($tooltip2);
    $tooltip2.addClass("tooltip-show");
    setTimeout((() => {
        $tooltip2.remove();
    }), 2e3);
}));

const $tooltip = $(".tooltip");

const $tooltipIcon = $(".tooltip__icon");

$tooltipIcon.on("click", (e => {
    if (!$(e.currentTarget).parent().hasClass("active")) {
        $tooltip.removeClass("active");
        $(e.currentTarget).parent().addClass("active");
    } else $(e.currentTarget).parent().removeClass("active");
}));

$(document).on("click", (e => {
    if (!$(e.target).closest($tooltip).length && $tooltip.hasClass("active")) $tooltip.removeClass("active");
}));

if ($("body").hasClass("page-product")) {
    let $fixed = $('<div class="fixed-bar"></div>');
    let $firstSlideImg = $(".product__main .swiper-slide:first-child img").clone();
    $fixed.append($firstSlideImg);
    $("body").prepend($fixed);
    const updateStickyTop = () => $(".breadcrumbs").innerHeight() + $(".product").innerHeight() + $(".header").innerHeight();
    let stickyTop = updateStickyTop();
    const handleScroll = () => {
        let scrollTop = $(window).scrollTop();
        let windowWidth = $(window).width();
        if (windowWidth >= 1280) if (scrollTop >= stickyTop) {
            $("body").addClass("product-fixed-bar");
            $fixed.css({
                top: "0%"
            });
        } else {
            $("body").removeClass("product-fixed-bar");
            $fixed.css({
                top: "-10%"
            });
        } else {
            $("body").removeClass("product-fixed-bar");
            $fixed.css({
                top: "-10%"
            });
        }
    };
    $(window).on("scroll resize", (function() {
        stickyTop = updateStickyTop();
        handleScroll();
    }));
    handleScroll();
}

$(".expand-btn").on("click", (e => {
    if (!$(e.currentTarget).hasClass("expanded")) {
        $(e.currentTarget).addClass("expanded");
        $(e.currentTarget).closest(".detail-desc").removeClass("hidden-block");
    } else {
        $(e.currentTarget).removeClass("expanded");
        $(e.currentTarget).closest(".detail-desc").addClass("hidden-block");
    }
}));

$(".card-action__item").on("click", (e => {
    if (!$(e.currentTarget).hasClass("active")) $(e.currentTarget).addClass("active"); else $(e.currentTarget).removeClass("active");
}));

$(".tab").on("click", (e => {
    $(e.currentTarget).closest(".tabs").find(".tab").removeClass("active");
    $(e.currentTarget).addClass("active");
    $(".detail").removeClass("active");
    $(`.detail[data-active=${$(e.currentTarget).attr("data-show")}]`).addClass("active");
}));

const $propsAnchor = $("#props-anchor");

const $detailsElement = $(".details");

$propsAnchor.on("click", (e => {
    if ($detailsElement.length) {
        $detailsElement[0].scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "start"
        });
        $(".tab").removeClass("active");
        $('.tab[data-show="2"]').addClass("active");
        $(".detail").removeClass("active");
        $('.detail[data-active="2"]').addClass("active");
    }
}));

const $sidebarRow = $(".section-sidebar-info .info-row");

const offset = 30;

$sidebarRow.on("click", (function() {
    $sidebarRow.removeClass("active");
    $(this).addClass("active");
    const targetId = $(this).find("a").attr("href");
    $("html, body").animate({
        scrollTop: $(targetId).offset().top - offset
    }, 800);
}));

$(".review").each((function() {
    let userName = $(this).find(".review__user-name").text().trim();
    let firstLetter = userName.charAt(0);
    $(this).find(".review__user-photo").text(firstLetter);
}));

function groupSmallNewsItems() {
    const $newsList = $(".news-list__items");
    const $bigNewsItems = $newsList.find(".news-item.news-item--big");
    const $smallNewsItems = $newsList.find(".news-item.news-item--small");
    $newsList.empty();
    let smallNewsIndex = 0;
    function createSmallNewsWrapper() {
        const $wrapper = $("<div>", {
            class: "small-news-wrapper"
        });
        for (let i = 0; i < 4 && smallNewsIndex < $smallNewsItems.length; i++, smallNewsIndex++) $wrapper.append($smallNewsItems.eq(smallNewsIndex));
        if ($wrapper.children(".news-item.news-item--small").length > 2) $wrapper.children(".news-item.news-item--small").eq(1).after($("<div>", {
            class: "devider"
        }));
        return $wrapper;
    }
    if ($bigNewsItems.length > 0) $newsList.append($bigNewsItems.eq(0));
    for (let i = 0; i < 2; i++) if (smallNewsIndex < $smallNewsItems.length) $newsList.append(createSmallNewsWrapper());
    for (let i = 1; i < 3 && i < $bigNewsItems.length; i++) $newsList.append($bigNewsItems.eq(i));
    while (smallNewsIndex < $smallNewsItems.length) $newsList.append(createSmallNewsWrapper());
}

function handleResize() {
    if ($(window).width() >= 1280) groupSmallNewsItems(); else {
        const $newsList = $(".news-list__items");
        const $smallNewsWrappers = $newsList.find(".small-news-wrapper");
        $smallNewsWrappers.each((function() {
            $(this).children().unwrap();
        }));
        const $allNewsItems = $newsList.find(".news-item");
        $allNewsItems.sort(((a, b) => $(a).index() - $(b).index()));
        $newsList.append($allNewsItems);
    }
}

$(window).on("resize", handleResize);

handleResize();

$(".compare-category").on("click", (e => {
    const $currentCategory = $(e.currentTarget);
    const $parent = $currentCategory.parent();
    if (!$currentCategory.hasClass("active")) {
        $parent.find(".compare-category").removeClass("active");
        $currentCategory.addClass("active");
    }
}));

$(".pass-eye").on("click", (e => {
    if ($(e.currentTarget).prev("input").attr("type") != "text") {
        $(e.currentTarget).prev("input").attr("type", "text");
        $(e.currentTarget).find("svg").html('<path d="M13.6 13L3.59998 3M6.79998 6.96105C6.55103 7.2355 6.39998 7.59602 6.39998 7.99087C6.39998 8.85073 7.11632 9.54778 7.99998 9.54778C8.4074 9.54778 8.77926 9.39959 9.06174 9.15559M13.6258 9.54778C14.1767 8.72322 14.4 8.05075 14.4 8.05075C14.4 8.05075 12.9436 3.4 7.99998 3.4C7.72244 3.4 7.45589 3.41466 7.19998 3.44233M11.6 11.5663C10.6817 12.1521 9.49953 12.5663 7.99998 12.5418C3.11792 12.462 1.59998 8.05075 1.59998 8.05075C1.59998 8.05075 2.30521 5.79872 4.39998 4.42888" stroke="#283142" stroke-width="1.33333" stroke-linecap="round"/>');
    } else {
        $(e.currentTarget).prev("input").attr("type", "password");
        $(e.currentTarget).find("svg").html('<path fill-rule="evenodd" clip-rule="evenodd" d="M2.3143 8.06873C2.3586 8.16974 2.42095 8.30296 2.50322 8.45908C2.70287 8.83795 3.01608 9.34455 3.46735 9.85192C4.36255 10.8584 5.7965 11.8677 8.01088 11.9039C10.2109 11.9399 11.6354 10.9386 12.5287 9.91621C12.9794 9.4004 13.2928 8.88005 13.493 8.48871C13.5785 8.3215 13.6427 8.17933 13.6874 8.07317C13.6439 7.96456 13.581 7.81845 13.4966 7.6462C13.3006 7.24647 12.9922 6.71417 12.5445 6.18418C11.6571 5.13358 10.2308 4.0953 7.99998 4.0953C5.76919 4.0953 4.34281 5.13358 3.45543 6.18418C3.00778 6.71417 2.69936 7.24647 2.50337 7.6462C2.42006 7.81611 2.35778 7.96059 2.3143 8.06873ZM14.4 8.07938C15.0362 7.88015 15.0361 7.87983 15.036 7.8795L15.0357 7.87873L15.0351 7.87688L15.0336 7.87191L15.0287 7.85695C15.0247 7.84479 15.0191 7.82828 15.0119 7.80771C14.9976 7.76659 14.9768 7.70918 14.949 7.63781C14.8935 7.49519 14.8099 7.29606 14.6938 7.05921C14.4622 6.58692 14.0975 5.95652 13.5631 5.32383C12.4864 4.04905 10.7128 2.76196 7.99998 2.76196C5.28717 2.76196 3.51355 4.04905 2.43683 5.32383C1.90242 5.95652 1.53777 6.58692 1.3062 7.05921C1.19007 7.29606 1.10641 7.49519 1.05092 7.63781C1.02315 7.70918 1.00236 7.76659 0.988023 7.80771C0.980855 7.82828 0.975294 7.84479 0.971276 7.85695L0.966395 7.87191L0.964805 7.87688L0.964221 7.87873L0.96398 7.8795C0.963875 7.87983 0.963775 7.88015 1.59998 8.07938L0.963775 7.88015L0.898315 8.08918L0.969588 8.2963L1.59998 8.07938C0.969588 8.2963 0.969698 8.29663 0.969814 8.29696L0.970077 8.29772L0.970711 8.29955L0.972415 8.3044L0.977593 8.31888C0.981837 8.33061 0.987682 8.34647 0.995186 8.36617C1.01019 8.40558 1.03185 8.46045 1.06066 8.5286C1.11822 8.6648 1.20457 8.85472 1.32365 9.08069C1.56118 9.53142 1.93259 10.1326 2.47107 10.738C3.55535 11.9571 5.3214 13.1934 7.98907 13.237C10.6711 13.2809 12.4466 12.0366 13.5328 10.7935C14.0718 10.1766 14.443 9.55918 14.68 9.09597C14.7989 8.86367 14.885 8.66811 14.9423 8.52795C14.971 8.4578 14.9925 8.40135 15.0074 8.36088C15.0148 8.34064 15.0206 8.32439 15.0248 8.3124L15.0299 8.29764L15.0316 8.29273L15.0322 8.2909L15.0324 8.29014C15.0326 8.28981 15.0327 8.28949 14.4 8.07938ZM14.4 8.07938L15.0327 8.28949L15.1004 8.08539L15.0362 7.88015L14.4 8.07938ZM2.23568 8.28019C2.2356 8.28043 2.23561 8.28041 2.23571 8.28011L2.23568 8.28019ZM7.99998 7.12926C7.46723 7.12926 7.06664 7.54488 7.06664 8.0195C7.06664 8.49412 7.46723 8.90974 7.99998 8.90974C8.53272 8.90974 8.93331 8.49412 8.93331 8.0195C8.93331 7.54488 8.53272 7.12926 7.99998 7.12926ZM5.73331 8.0195C5.73331 6.77442 6.76541 5.79593 7.99998 5.79593C9.23454 5.79593 10.2666 6.77442 10.2666 8.0195C10.2666 9.26459 9.23454 10.2431 7.99998 10.2431C6.76541 10.2431 5.73331 9.26459 5.73331 8.0195Z" fill="#283142"/>');
    }
}));

const inputElements = $(".input-code input");

jQuery.extend(jQuery.expr[":"], {
    focusable: function(el) {
        var nodeName = el.nodeName.toLowerCase(), tabIndex = $(el).attr("tabindex");
        if (tabIndex) return tabIndex >= 0;
        if (nodeName === "input" || nodeName === "select" || nodeName === "textarea") return !el.disabled;
        if (nodeName === "a") return el.href || tabIndex >= 0;
        return false;
    }
});

if (inputElements.length) inputElements.jqueryPincodeAutotab();

const checkSmsCode = () => {
    let smsCodeArray = inputElements.map((function() {
        return $(this).val();
    })).get();
    if (smsCodeArray.join("").length === inputElements.length) {
        $("#form-submit").trigger("click");
        inputElements.val("");
    }
};

inputElements.on("keyup", (function() {
    checkSmsCode();
}));

$("#form-submit").on("click", (function() {
    alert("successful");
}));

inputElements.first().on("paste", (function() {
    $("#form-submit").trigger("click");
}));

inputElements.first().on("touchstart", (function() {
    $(this).focus();
}));

let totalSeconds;

let countdown;

function startCountdown() {
    if (countdown) clearInterval(countdown);
    totalSeconds = 179;
    countdown = setInterval((function() {
        const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
        const seconds = String(totalSeconds % 60).padStart(2, "0");
        $("#countdown").text(`Новый код можно запросить через ${minutes} : ${seconds}`);
        totalSeconds--;
        if (totalSeconds < 0) {
            clearInterval(countdown);
            $(".popup__count").hide();
            $(".popup__send").show();
        }
    }), 1e3);
}

startCountdown();

$("#send-code").on("click", (function() {
    $("#countdown").show();
    $("#send-code").hide();
    startCountdown();
}));

$(".input-file").on("change", (e => {
    $(e.currentTarget).find("p").text($(e.currentTarget).find("input")[0].files[0].name);
}));

$("#city-input").on("keyup", (function() {
    const input = $(this).val().toLowerCase();
    $("#city-list li").each((function() {
        const city = $(this).text().toLowerCase();
        if (city.includes(input)) $(this).show(); else $(this).hide();
    }));
}));

const tabs = document.querySelectorAll("[data-anchor]");

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries => {
    entries.forEach((entry => {
        const id = entry.target.getAttribute("id");
        const correspondingTab = document.querySelector(`[data-anchor="#${id}"]`);
        if (entry.isIntersecting) {
            tabs.forEach((tab => tab.classList.remove("active")));
            correspondingTab ? correspondingTab.classList.add("active") : null;
        }
    }));
}), {
    threshold: .5
});

sections.forEach((section => {
    observer.observe(section);
}));

const anchor = document.querySelectorAll("[data-anchor]");

if (anchor.length > 0) anchor.forEach((el => {
    el.onclick = function(e) {
        e.preventDefault();
        document.querySelector(`#${el.getAttribute("data-anchor").split("#")[1]}`).scrollIntoView({
            block: "center",
            behavior: "smooth"
        });
    };
}));

const fixedTab = () => {
    const scrollTop = $(window).scrollTop();
    const body = $("body");
    const navTab = $(".js-nav-tab");
    const isFixedTab = body.hasClass("fixed-tab");
    if (scrollTop > 350 && !isFixedTab) {
        body.addClass("fixed-tab");
        $("main").prepend(navTab);
    } else if (scrollTop <= 200 && isFixedTab) {
        body.removeClass("fixed-tab");
        $(".intro").append(navTab);
    }
};

$(window).on("scroll", fixedTab);

const iframe = $("#myIframe");

const currentUrl = window.location.href;

const tail = currentUrl.split("?")[1];

if (tail) iframe.attr("src", iframe.attr("src") + "?" + tail);

if (iframe) $("html, body").animate({
    scrollTop: iframe.offset().top - $("header").height()
}, 1e3);
