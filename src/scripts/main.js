// Import Plugins
import Inputmask from 'inputmask';

// Import Scripts
import { getBrowserName } from './includes/checkbrowser.js';
import { initializeMap } from './includes/map.js';
import { initializePopup } from './includes/popup.js';
import { initializeSlider } from './includes/slider.js';
import { initializeFilter } from './includes/filter.js';
import { initializePersonal } from './includes/personal.js';

document.addEventListener('DOMContentLoaded', (event) => {
    getBrowserName();
    initializeMap();
    initializePopup();
    initializeSlider();
    initializeFilter();
    initializePersonal();
});

// Если браузер определен, добавляем соответствующий класс к тегу html
const browser = getBrowserName();
if (browser) {
    document.documentElement.classList.add('browser-' + browser);
}

// Функция для проверки переменной isDesktop
const checkIsDesktop = () => {
    return $(window).width() >= 1280;
};

// Переменная для проверки десктопной версии
let isDesktop = checkIsDesktop();

// Inputmask for phone number
Inputmask({
    mask: '+7 (999) 999-99-99',
    showMaskOnHover: false,
    showMaskOnFocus: false,

    onBeforePaste: (pastedValue, opts) => {
        return pastedValue.replace(/^8/, '');
    }
}).mask('[data-phone-number]');

// Inputmask for numbers
Inputmask({
    regex: '^[0-9]*$',
    allowMinus: false,
    showMaskOnHover: false,
    showMaskOnFocus: false,
    placeholder: ''
}).mask('[data-number-only]');

Inputmask({
    alias: 'numeric',
    groupSeparator: ' ',
    autoGroup: true,
    digits: 0,
    rightAlign: false
}).mask('[data-financial]');

// Burger menu
$('#burger').on('click', (e) => {
    // Check if the mobile menu already exists
    if ($('#mobile-menu').length === 0) {
        const $mobileMenu = $('<div id="mobile-menu" class="mobile-menu"></div>');
        $('#header').append($mobileMenu);

        $mobileMenu.append($('.header__search').clone(true));
        $mobileMenu.append($('.header__category').clone(true));
        $mobileMenu.append($('.header__nav').clone(true));
        $mobileMenu.append($('.header__selection').clone(true));

        mobileSubmenu();
    }

    const $header = $('#header');
    const $mobileMenu = $('#mobile-menu');

    if (!$header.hasClass('mobile-menu-active')) {
        $header.addClass('mobile-menu-active');
        $mobileMenu.fadeIn(200);
        $('body').addClass('overflow-hidden');
    } else {
        $header.removeClass('mobile-menu-active');
        $mobileMenu.fadeOut(200);
        $('body').removeClass('overflow-hidden');
    }
});

// Mobile-menu submenu
const mobileSubmenu = () => {
    const $mobileMenu = $('#mobile-menu');
    const $categoryItems = $mobileMenu.find('.header__category-item > a');
    const $menuItems = $mobileMenu.find('.header__menu-item.has-child > a');

    $categoryItems.off('click').on('click', (e) => {
        e.preventDefault();
        toggleCategorySubMenu($(e.currentTarget).parent(), '.header__category-item');
    });

    $menuItems.off('click').on('click', (e) => {
        e.preventDefault();
        toggleSubMenu($(e.currentTarget).parent(), '.header__menu-item');
    });

    function toggleCategorySubMenu($item, itemSelector) {
        if (!$item.hasClass('active')) {
            $mobileMenu.addClass('expanded');
            $item.addClass('active');
            $mobileMenu.find(`${itemSelector}:not(.active)`).hide();
            $mobileMenu.find('.header__search, .header__nav, .header__selection').hide();
        } else {
            $mobileMenu.removeClass('expanded');
            $item.removeClass('active');
            $mobileMenu.find(`${itemSelector}`).show();
            $mobileMenu.find('.header__search, .header__nav, .header__selection').show();
        }
    }

    function toggleSubMenu($item, itemSelector) {
        if (!$item.hasClass('active')) {
            $mobileMenu.addClass('expanded');
            $item.addClass('active');
            $mobileMenu.find(`${itemSelector}:not(.active)`).hide();
            $mobileMenu
                .find('.header__search, .header__category, .header__bar, .header__selection')
                .hide();
        } else {
            $mobileMenu.removeClass('expanded');
            $item.removeClass('active');
            $mobileMenu.find(`${itemSelector}`).show();
            $mobileMenu
                .find('.header__search, .header__category, .header__bar, .header__selection')
                .show();
        }
    }

    // Check on resize
    $(window)
        .off('resize.mobileSubmenu')
        .on('resize.mobileSubmenu', () => {
            if (!isDesktop) {
                mobileSubmenu();
            }
        });
};

// Initial call
mobileSubmenu();

// Search button (mobile)
$('.header__main .search-icon').on('click', (e) => {
    const $headerSearch = $(e.currentTarget).closest('.header__search');
    const $inputSearch = $headerSearch.find('.input-search');

    if (
        !isDesktop &&
        $(e.currentTarget).closest('.header__main').length &&
        !$headerSearch.hasClass('active')
    ) {
        e.preventDefault();
        $headerSearch.addClass('active');
        $inputSearch.addClass('focus');
        $inputSearch.find('input').focus();

        // Обработчик клика по кнопке очистки поля ввода
        $('.input-search__clear').one('click', () => {
            $inputSearch.removeClass('focus');
            $headerSearch.removeClass('active');
        });

        // Обработчик клика по документу для закрытия поиска при клике вне его области
        $(document).one('click', (e) => {
            if (
                !$(e.target).closest('.input-search').length &&
                !$(e.target).closest('.search-icon').length
            ) {
                $inputSearch.removeClass('focus');
                $headerSearch.removeClass('active');
            }
        });
    }
});

// Search focus action
const searchFocus = () => {
    const $headerSearch = $('.header__search');
    const $inputSearch = $headerSearch.find('.input-search');
    const $inputField = $inputSearch.find('input');
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (isDesktop) {
        $inputField.on('focus', () => {
            console.log('Input field focused');
            $('body').addClass('bg-overlay overflow-hidden');
            $('body').css('padding-right', `${scrollBarWidth}px`);
            $inputSearch.addClass('focus');
            $headerSearch.addClass('active');
        });

        $inputField.on('blur', () => {
            $('body').removeClass('bg-overlay overflow-hidden');
            $('body').css('padding-right', '0');
            $inputSearch.removeClass('focus');
            $headerSearch.removeClass('active');
        });
    }
};

searchFocus();

// Header category focus
const categoryFocus = () => {
    if (isDesktop) {
        const $categoryItems = $('.header__category-item');

        $categoryItems.off('mouseenter mouseleave');

        $categoryItems
            .on('mouseenter', () => {
                $('body').addClass('bg-overlay');
                $('.header__main').addClass('focus');
            })
            .on('mouseleave', () => {
                $('body').removeClass('bg-overlay');
                $('.header__main').removeClass('focus');
            });
    }
};

categoryFocus();

// Header catalog btn
const $catalogBtn = $('#header-catalog-btn');
const $catalog = $('#header-catalog');
const $body = $('body');

// Функция для закрытия каталога
function closeCatalog() {
    $body.removeClass('bg-overlay');
    $catalog.removeClass('active');
    $catalogBtn.removeClass('active');
}

// Обработчик клика на кнопку каталога
$catalogBtn.on('click', (e) => {
    $catalogBtn.toggleClass('active');
    $catalog.toggleClass('active');
    $body.toggleClass('bg-overlay');
});

// Закрытие каталога при клике вне его области
$(document).on('click', (e) => {
    if (
        !$(e.target).closest('#header-catalog, #header-catalog-btn, #header_search').length &&
        $catalog.hasClass('active')
    ) {
        closeCatalog();
    }
});

// Закрытие каталога при нажатии клавиши Escape
$(document).on('keyup', (e) => {
    if (e.key === 'Escape' && $catalog.hasClass('active')) {
        closeCatalog();
    }
});

// Header catalog categories
$('.header__catalog-item').hover((e) => {
    $('.header__catalog-item').removeClass('active');
    $('.header__subcatalog').removeClass('active');
    $(`.header__subcatalog[data-active=${$(e.currentTarget).attr('data-catalog')}]`).addClass(
        'active'
    );
    $(e.currentTarget).addClass('active');
});

// Для кнопок "-" и "+"
$('.qty-input .qty').on('click', (e) => {
    let $input = $(e.currentTarget).parent().find('input');
    let currentValue = Number($input.val());
    let maxValue = Number($input.attr('max-number'));

    if ($(e.currentTarget).hasClass('qty-minus') && currentValue > 1) {
        $input.val(currentValue - 1);

        if (currentValue - 1 < maxValue) {
            $(e.currentTarget).parent().find('.qty-plus').removeAttr('disabled');
        }
    }

    if ($(e.currentTarget).hasClass('qty-plus') && currentValue < maxValue) {
        $input.val(currentValue + 1);

        if (currentValue + 1 === maxValue) {
            $(e.currentTarget).attr('disabled', true);
        }
    }
});

$('.qty-input input').on('input', (e) => {
    let $input = $(e.currentTarget);
    let currentValue = Number($input.val());
    let maxValue = Number($input.attr('max-number'));

    if (currentValue < maxValue) {
        $input.parent().find('.qty-plus').removeAttr('disabled');
    } else {
        $input.parent().find('.qty-plus').attr('disabled', true);
    }

    // Дополнительная проверка на минимальное значение
    if (currentValue < 1 || isNaN(currentValue)) {
        $input.val(1);
    }
});

// Для выбора модели (карточка товара)
$('.product__type-item').on('click', (e) => {
    if (!$(e.currentTarget).hasClass('selected')) {
        $(e.currentTarget).parent().find('.product__type-item').removeClass('selected');
        $(e.currentTarget).addClass('selected');
    }
});

// Копируем значение в буфер обмена
$('#copy-article, #copy-link').on('click', (e) => {
    // Удаляем уже существующие временные элементы, если они есть
    $('#copy-temp').remove();
    $(e.currentTarget).find('.tooltip').remove();

    // Создаем временное поле input
    var $tempInput = $('<input id="copy-temp">');
    $('body').append($tempInput); // Добавляем input в body

    let textToCopy = '';

    if ($(e.currentTarget).attr('id') === 'copy-article') {
        // Если нажата кнопка для копирования текста артикула
        textToCopy = $('#article').text();
    } else if ($(e.currentTarget).attr('id') === 'copy-link') {
        // Если нажата кнопка для копирования ссылки
        textToCopy = window.location.href;
    }

    // Копируем выбранный текст
    $tempInput.val(textToCopy).select();
    document.execCommand('copy');

    // Удаляем временное поле
    $tempInput.remove();

    // Создаем тултип
    if ($(e.currentTarget).attr('id') === 'copy-article') {
        var $tooltip = $(
            '<div class="tooltip"><div class="tooltip__content"><div class="tooltip__title">Скопировано в буфер обмена</div></div></div>'
        );
    } else if ($(e.currentTarget).attr('id') === 'copy-link') {
        var $tooltip = $(
            '<div class="tooltip"><div class="tooltip__content"><div class="tooltip__title">Ссылка скопирована в буфер обмена</div></div></div>'
        );
    }

    $(e.currentTarget).append($tooltip);
    $tooltip.addClass('tooltip-show');

    // Убираем тултип через определенное кол-во секунды (указываем в мс)
    setTimeout(() => {
        $tooltip.remove();
    }, 2000);
});

// Tooltip
const $tooltip = $('.tooltip');
const $tooltipIcon = $('.tooltip__icon');

$tooltipIcon.on('click', (e) => {
    if (!$(e.currentTarget).parent().hasClass('active')) {
        $tooltip.removeClass('active');
        $(e.currentTarget).parent().addClass('active');
    } else {
        $(e.currentTarget).parent().removeClass('active');
    }
});

// Закрытие Tooltip при клике вне его области
$(document).on('click', (e) => {
    if (!$(e.target).closest($tooltip).length && $tooltip.hasClass('active')) {
        $tooltip.removeClass('active');
    }
});

if ($('body').hasClass('page-product')) {
    // Создаем контейнер с классом .fixed-bar и добавляем изображение
    let $fixed = $('<div class="fixed-bar"></div>');
    let $firstSlideImg = $('.product__main .swiper-slide:first-child img').clone();
    $fixed.append($firstSlideImg);

    // Добавляем контейнер .fixed в body
    $('body').prepend($fixed);

    // Определяем высоту, при которой блок должен стать фиксированным
    const updateStickyTop = () => {
        return (
            $('.breadcrumbs').innerHeight() +
            $('.product').innerHeight() +
            $('.header').innerHeight()
        );
    };

    let stickyTop = updateStickyTop();

    // Функция для проверки ширины экрана и обработки скроллинга
    const handleScroll = () => {
        let scrollTop = $(window).scrollTop();
        let windowWidth = $(window).width();

        if (windowWidth >= 1280) {
            if (scrollTop >= stickyTop) {
                $('body').addClass('product-fixed-bar');
                $fixed.css({ top: '0%' });
            } else {
                $('body').removeClass('product-fixed-bar');
                $fixed.css({ top: '-10%' });
            }
        } else {
            $('body').removeClass('product-fixed-bar');
            $fixed.css({ top: '-10%' });
        }
    };

    // Обрабатываем скроллинг
    $(window).on('scroll resize', function () {
        stickyTop = updateStickyTop(); // Пересчитываем значение при изменении размера окна
        handleScroll();
    });

    // Начальная проверка при загрузке страницы
    handleScroll();
}

// Кнопка "Развернуть"
$('.expand-btn').on('click', (e) => {
    if (!$(e.currentTarget).hasClass('expanded')) {
        $(e.currentTarget).addClass('expanded');
        $(e.currentTarget).closest('.detail-desc').removeClass('hidden-block');
    } else {
        $(e.currentTarget).removeClass('expanded');
        $(e.currentTarget).closest('.detail-desc').addClass('hidden-block');
    }
});

// Кнопка избранное и сравнение в карточке '.card'
$('.card-action__item').on('click', (e) => {
    if (!$(e.currentTarget).hasClass('active')) {
        $(e.currentTarget).addClass('active');
    } else {
        $(e.currentTarget).removeClass('active');
    }
});

// Кнопка избранное и сравнение в карточке товара '.product'
$('.product__block-btn').on('click', (e) => {
    if (!$(e.currentTarget).hasClass('active')) {
        $(e.currentTarget).addClass('active');
    } else {
        $(e.currentTarget).removeClass('active');
    }
});

// Табы в карточке товара
$('.tab').on('click', (e) => {
    $(e.currentTarget).closest('.tabs').find('.tab').removeClass('active');
    $(e.currentTarget).addClass('active');

    $('.detail').removeClass('active');
    $(`.detail[data-active=${$(e.currentTarget).attr('data-show')}]`).addClass('active');
});

const $propsAnchor = $('#props-anchor');
const $detailsElement = $('.details');

$propsAnchor.on('click', (e) => {
    if ($detailsElement.length) {
        $detailsElement[0].scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'start'
        });

        $('.tab').removeClass('active');
        $('.tab[data-show="2"]').addClass('active');

        $('.detail').removeClass('active');
        $('.detail[data-active="2"]').addClass('active');
    }
});
