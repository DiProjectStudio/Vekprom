// Import Plugins
import Inputmask from 'inputmask';
import '../../node_modules/jquery-pincode-autotab/dist/js/jquery-pincode-autotab.js';

// Import Scripts
import { getBrowserName } from './includes/checkbrowser.js';
import { initializeMap } from './includes/map.js';
import { initializePopup } from './includes/popup.js';
import { initializeSlider } from './includes/slider.js';
import { initializeFilter } from './includes/filter.js';
import { initializePersonal } from './includes/personal.js';
import { initializeCompare } from './includes/compare.js';

document.addEventListener('DOMContentLoaded', (event) => {
    getBrowserName();
    initializeMap();
    initializePopup();
    initializeSlider();
    initializeFilter();
    initializePersonal();
    initializeCompare();
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

    if ($(e.currentTarget).hasClass('qty-minus')) {
        if (currentValue > 1) {
            $input.val(currentValue - 1);
        }

        // Добавляем атрибут disabled, если значение равно 1
        if (currentValue <= 2) {
            $(e.currentTarget).attr('disabled', true);
        }

        // Убираем disabled у кнопки плюс, если значение меньше максимального
        if (currentValue - 1 < maxValue) {
            $(e.currentTarget).parent().find('.qty-plus').removeAttr('disabled');
        }
    }

    if ($(e.currentTarget).hasClass('qty-plus')) {
        if (currentValue < maxValue) {
            $input.val(currentValue + 1);
        }

        // Убираем disabled у кнопки минус, если значение больше 1
        if (currentValue > 0) {
            $(e.currentTarget).parent().find('.qty-minus').removeAttr('disabled');
        }

        // Добавляем disabled, если значение достигло максимума
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

    if (currentValue > 1) {
        $input.parent().find('.qty-minus').removeAttr('disabled');
    } else {
        $input.parent().find('.qty-minus').attr('disabled', true);
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

// скролл к якорным ссылкам
const $sidebarRow = $('.section-sidebar-info .info-row');
const offset = 30;

$sidebarRow.on('click', function () {
    $sidebarRow.removeClass('active');
    $(this).addClass('active');
    const targetId = $(this).find('a').attr('href');
    $('html, body').animate(
        {
            scrollTop: $(targetId).offset().top - offset
        },
        800
    );
});

// Первая буква имени у пользователя в отзывах
$('.review').each(function () {
    let userName = $(this).find('.review__user-name').text().trim();
    let firstLetter = userName.charAt(0);
    $(this).find('.review__user-photo').text(firstLetter);
});

// объединение новостей в 1 обертку на ПК версиях

function groupSmallNewsItems() {
    const $newsList = $('.news-list__items');
    const $bigNewsItems = $newsList.find('.news-item.news-item--big');
    const $smallNewsItems = $newsList.find('.news-item.news-item--small');

    // очищаем новостной список
    $newsList.empty();

    let smallNewsIndex = 0;

    function createSmallNewsWrapper() {
        const $wrapper = $('<div>', { class: 'small-news-wrapper' });
        for (let i = 0; i < 4 && smallNewsIndex < $smallNewsItems.length; i++, smallNewsIndex++) {
            $wrapper.append($smallNewsItems.eq(smallNewsIndex));
        }

        if ($wrapper.children('.news-item.news-item--small').length > 2) {
            $wrapper
                .children('.news-item.news-item--small')
                .eq(1)
                .after($('<div>', { class: 'devider' }));
        }

        return $wrapper;
    }

    // первая новость с изображением
    if ($bigNewsItems.length > 0) {
        $newsList.append($bigNewsItems.eq(0));
    }

    // добавляем обертки для маленьких новостных блоков
    for (let i = 0; i < 2; i++) {
        if (smallNewsIndex < $smallNewsItems.length) {
            $newsList.append(createSmallNewsWrapper());
        }
    }

    // добавляем 2 новости с изображениями
    for (let i = 1; i < 3 && i < $bigNewsItems.length; i++) {
        $newsList.append($bigNewsItems.eq(i));
    }

    // добавляем оставшиеся обертки для маленьких новостных блоков
    while (smallNewsIndex < $smallNewsItems.length) {
        $newsList.append(createSmallNewsWrapper());
    }
}

function handleResize() {
    if ($(window).width() >= 1280) {
        groupSmallNewsItems();
    } else {
        // убираем обертки
        const $newsList = $('.news-list__items');
        const $smallNewsWrappers = $newsList.find('.small-news-wrapper');

        $smallNewsWrappers.each(function () {
            $(this).children().unwrap();
        });

        const $allNewsItems = $newsList.find('.news-item');
        $allNewsItems.sort((a, b) => $(a).index() - $(b).index());
        $newsList.append($allNewsItems);
    }
}

$(window).on('resize', handleResize);
handleResize();

// Категории в сравнении
$('.compare-category').on('click', (e) => {
    const $currentCategory = $(e.currentTarget); // Текущий элемент
    const $parent = $currentCategory.parent(); // Родительский элемент

    if (!$currentCategory.hasClass('active')) {
        $parent.find('.compare-category').removeClass('active');
        $currentCategory.addClass('active');
    }
});

// Иконка отображения пароля
$('.pass-eye').on('click', (e) => {
    if ($(e.currentTarget).prev('input').attr('type') != 'text') {
        $(e.currentTarget).prev('input').attr('type', 'text');
        $(e.currentTarget)
            .find('svg')
            .html(
                '<path d="M13.6 13L3.59998 3M6.79998 6.96105C6.55103 7.2355 6.39998 7.59602 6.39998 7.99087C6.39998 8.85073 7.11632 9.54778 7.99998 9.54778C8.4074 9.54778 8.77926 9.39959 9.06174 9.15559M13.6258 9.54778C14.1767 8.72322 14.4 8.05075 14.4 8.05075C14.4 8.05075 12.9436 3.4 7.99998 3.4C7.72244 3.4 7.45589 3.41466 7.19998 3.44233M11.6 11.5663C10.6817 12.1521 9.49953 12.5663 7.99998 12.5418C3.11792 12.462 1.59998 8.05075 1.59998 8.05075C1.59998 8.05075 2.30521 5.79872 4.39998 4.42888" stroke="#283142" stroke-width="1.33333" stroke-linecap="round"/>'
            );
    } else {
        $(e.currentTarget).prev('input').attr('type', 'password');
        $(e.currentTarget)
            .find('svg')
            .html(
                '<path fill-rule="evenodd" clip-rule="evenodd" d="M2.3143 8.06873C2.3586 8.16974 2.42095 8.30296 2.50322 8.45908C2.70287 8.83795 3.01608 9.34455 3.46735 9.85192C4.36255 10.8584 5.7965 11.8677 8.01088 11.9039C10.2109 11.9399 11.6354 10.9386 12.5287 9.91621C12.9794 9.4004 13.2928 8.88005 13.493 8.48871C13.5785 8.3215 13.6427 8.17933 13.6874 8.07317C13.6439 7.96456 13.581 7.81845 13.4966 7.6462C13.3006 7.24647 12.9922 6.71417 12.5445 6.18418C11.6571 5.13358 10.2308 4.0953 7.99998 4.0953C5.76919 4.0953 4.34281 5.13358 3.45543 6.18418C3.00778 6.71417 2.69936 7.24647 2.50337 7.6462C2.42006 7.81611 2.35778 7.96059 2.3143 8.06873ZM14.4 8.07938C15.0362 7.88015 15.0361 7.87983 15.036 7.8795L15.0357 7.87873L15.0351 7.87688L15.0336 7.87191L15.0287 7.85695C15.0247 7.84479 15.0191 7.82828 15.0119 7.80771C14.9976 7.76659 14.9768 7.70918 14.949 7.63781C14.8935 7.49519 14.8099 7.29606 14.6938 7.05921C14.4622 6.58692 14.0975 5.95652 13.5631 5.32383C12.4864 4.04905 10.7128 2.76196 7.99998 2.76196C5.28717 2.76196 3.51355 4.04905 2.43683 5.32383C1.90242 5.95652 1.53777 6.58692 1.3062 7.05921C1.19007 7.29606 1.10641 7.49519 1.05092 7.63781C1.02315 7.70918 1.00236 7.76659 0.988023 7.80771C0.980855 7.82828 0.975294 7.84479 0.971276 7.85695L0.966395 7.87191L0.964805 7.87688L0.964221 7.87873L0.96398 7.8795C0.963875 7.87983 0.963775 7.88015 1.59998 8.07938L0.963775 7.88015L0.898315 8.08918L0.969588 8.2963L1.59998 8.07938C0.969588 8.2963 0.969698 8.29663 0.969814 8.29696L0.970077 8.29772L0.970711 8.29955L0.972415 8.3044L0.977593 8.31888C0.981837 8.33061 0.987682 8.34647 0.995186 8.36617C1.01019 8.40558 1.03185 8.46045 1.06066 8.5286C1.11822 8.6648 1.20457 8.85472 1.32365 9.08069C1.56118 9.53142 1.93259 10.1326 2.47107 10.738C3.55535 11.9571 5.3214 13.1934 7.98907 13.237C10.6711 13.2809 12.4466 12.0366 13.5328 10.7935C14.0718 10.1766 14.443 9.55918 14.68 9.09597C14.7989 8.86367 14.885 8.66811 14.9423 8.52795C14.971 8.4578 14.9925 8.40135 15.0074 8.36088C15.0148 8.34064 15.0206 8.32439 15.0248 8.3124L15.0299 8.29764L15.0316 8.29273L15.0322 8.2909L15.0324 8.29014C15.0326 8.28981 15.0327 8.28949 14.4 8.07938ZM14.4 8.07938L15.0327 8.28949L15.1004 8.08539L15.0362 7.88015L14.4 8.07938ZM2.23568 8.28019C2.2356 8.28043 2.23561 8.28041 2.23571 8.28011L2.23568 8.28019ZM7.99998 7.12926C7.46723 7.12926 7.06664 7.54488 7.06664 8.0195C7.06664 8.49412 7.46723 8.90974 7.99998 8.90974C8.53272 8.90974 8.93331 8.49412 8.93331 8.0195C8.93331 7.54488 8.53272 7.12926 7.99998 7.12926ZM5.73331 8.0195C5.73331 6.77442 6.76541 5.79593 7.99998 5.79593C9.23454 5.79593 10.2666 6.77442 10.2666 8.0195C10.2666 9.26459 9.23454 10.2431 7.99998 10.2431C6.76541 10.2431 5.73331 9.26459 5.73331 8.0195Z" fill="#283142"/>'
            );
    }
});

// Код из СМС
const inputElements = $('.input-code input');

// Добавляем кастомный псевдоселектор :focusable для jQuery
jQuery.extend(jQuery.expr[':'], {
    focusable: function (el) {
        var nodeName = el.nodeName.toLowerCase(),
            tabIndex = $(el).attr('tabindex');
        if (tabIndex) {
            return tabIndex >= 0;
        }
        if (nodeName === 'input' || nodeName === 'select' || nodeName === 'textarea') {
            return !el.disabled;
        }
        if (nodeName === 'a') {
            return el.href || tabIndex >= 0;
        }
        return false;
    }
});

if (inputElements.length) {
    inputElements.jqueryPincodeAutotab();
}

// Функция для проверки, заполнены ли все поля
const checkSmsCode = () => {
    let smsCodeArray = inputElements
        .map(function () {
            return $(this).val();
        })
        .get();

    if (smsCodeArray.join('').length === inputElements.length) {
        $('#form-submit').trigger('click');
        inputElements.val('');
    }
};

inputElements.on('keyup', function () {
    checkSmsCode();
});

// Обработчик для кнопки отправки формы
$('#form-submit').on('click', function () {
    alert('successful');
});

// Вставка из буфера обмена
inputElements.first().on('paste', function () {
    $('#form-submit').trigger('click');
});

// Фокус на первый input при касании
inputElements.first().on('touchstart', function () {
    $(this).focus();
});

// Таймер обратного отсчёта
let totalSeconds;
let countdown;

function startCountdown() {
    if (countdown) {
        clearInterval(countdown);
    }

    totalSeconds = 179;

    countdown = setInterval(function () {
        const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');

        $('#countdown').text(`Новый код можно запросить через ${minutes} : ${seconds}`);

        totalSeconds--;

        if (totalSeconds < 0) {
            clearInterval(countdown);
            $('.popup__count').hide();
            $('.popup__send').show();
        }
    }, 1000);
}

startCountdown();

// Обработчик клика на кнопку #send-code
$('#send-code').on('click', function () {
    $('#countdown').show();
    $('#send-code').hide();

    startCountdown();
});

// Загрузка файла в форме заявки
$('.input-file').on('change', (e) => {
    $(e.currentTarget).find('p').text($(e.currentTarget).find('input')[0].files[0].name);
});

// Поиск городов
$('#city-input').on('keyup', function () {
    const input = $(this).val().toLowerCase();
    $('#city-list li').each(function () {
        const city = $(this).text().toLowerCase();
        if (city.includes(input)) {
            $(this).show(); // Показываем элемент, если он соответствует
        } else {
            $(this).hide(); // Скрываем элемент, если он не соответствует
        }
    });
});
