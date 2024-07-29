// Import Plugins
import Inputmask from 'inputmask';

// Import Scripts
import './includes/map.js';
import './includes/popup.js';
import './includes/slider.js';

// Check and update isDesktop variable
const checkIsDesktop = () => {
    return $(window).width() >= 1280;
};

// Initial check
checkIsDesktop();

// Inputmask for phone number
Inputmask({
    mask: '+7 (999) 999-99-99',
    showMaskOnHover: false,
    showMaskOnFocus: false,

    onBeforePaste: (pastedValue, opts) => {
        return pastedValue.replace(/^8/, '');
    }
}).mask('[phone-number]');

// Inputmask for numbers
Inputmask({
    regex: '^[0-9]*$',
    allowMinus: false,
    showMaskOnHover: false,
    showMaskOnFocus: false,
    placeholder: ''
}).mask('[number-only]');

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
    } else {
        $header.removeClass('mobile-menu-active');
        $mobileMenu.fadeOut(200);
    }
});

// Mobile-menu submenu
const mobileSubmenu = () => {
    const $mobileMenu = $('#mobile-menu');
    const $categoryItems = $mobileMenu.find('.header__category-item > a');
    const $menuItems = $mobileMenu.find('.header__menu-item.has-child > a');

    $categoryItems.off('click').on('click', (e) => {
        e.preventDefault();
        toggleSubMenu($(e.currentTarget).parent(), '.header__category-item');
    });

    $menuItems.off('click').on('click', (e) => {
        e.preventDefault();
        toggleSubMenu($(e.currentTarget).parent(), '.header__menu-item');
    });

    function toggleSubMenu($item, itemSelector) {
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

    // Check on resize
    $(window)
        .off('resize.mobileSubmenu')
        .on('resize.mobileSubmenu', () => {
            if (!checkIsDesktop()) {
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
        !checkIsDesktop() &&
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

// Для кнопок "-" и "+"
$('.qty-input .qty').on('click', (e) => {
    if (
        $(e.currentTarget).hasClass('qty-minus') &&
        $(e.currentTarget).parent().find('input').val() > 1
    ) {
        $(e.currentTarget)
            .parent()
            .find('input')
            .val(Number($(e.currentTarget).parent().find('input').val()) - 1);

        $(e.currentTarget).parent().find('input').val() <
        Number($(e.currentTarget).parent().find('input').attr('max-number'))
            ? $(e.currentTarget).parent().find('.qty-plus').removeAttr('disabled')
            : null;
    }
    if (
        $(e.currentTarget).hasClass('qty-plus') &&
        $(e.currentTarget).parent().find('input').val() <
            Number($(e.currentTarget).parent().find('input').attr('max-number'))
    ) {
        $(e.currentTarget)
            .parent()
            .find('input')
            .val(Number($(e.target).parent().find('input').val()) + 1);

        $(e.currentTarget).parent().find('input').val() ==
        $(e.currentTarget).parent().find('input').attr('max-number')
            ? $(e.currentTarget).attr('disabled', true)
            : null;
    }
});

$('.qty-input input').on('input', (e) => {
    Number($(e.currentTarget).val()) < Number($(e.currentTarget).attr('max-number'))
        ? $(e.currentTarget).parent().find('.qty-plus').removeAttr('disabled')
        : $(e.currentTarget).parent().find('.qty-plus').attr('disabled', true);
});
