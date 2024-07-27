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
// $('#burger').on('click', (e) => {
//     $('#header').append('<div id="mobile-menu" class="mobile-menu"></div>');
//     $('#mobile-menu').append('');
// });

// Mobile-menu submenu
const mobieSubmenu = () => {
    if (!checkIsDesktop()) {
        $('#mobile-menu .header__category-item > a').on('click', (e) => {
            e.preventDefault();

            if ($(e.currentTarget).parent().hasClass('active')) {
                $(e.currentTarget).closest('#mobile-menu').removeClass('expanded');
                $(e.currentTarget).parent().removeClass('active');
                $('#mobile-menu .header__category-item').show();
                $('#mobile-menu .header__search').show();
                $('#mobile-menu .header__nav').show();
                $('#mobile-menu .header__selection').show();
            } else {
                $(e.currentTarget).closest('#mobile-menu').addClass('expanded');
                $(e.currentTarget).parent().addClass('active');
                $('#mobile-menu .header__category-item:not(.active)').hide();
                $('#mobile-menu .header__search').hide();
                $('#mobile-menu .header__nav').hide();
                $('#mobile-menu .header__selection').hide();
            }
        });

        $('#mobile-menu .header__menu-item.has-child > a').on('click', (e) => {
            e.preventDefault();

            if ($(e.currentTarget).parent().hasClass('active')) {
                $(e.currentTarget).closest('#mobile-menu').removeClass('expanded');
                $(e.currentTarget).parent().removeClass('active');
                $('#mobile-menu .header__menu-item').show();
                $('#mobile-menu .header__category').show();
                $('#mobile-menu .header__search').show();
                $('#mobile-menu .header__bar').show();
                $('#mobile-menu .header__selection').show();
            } else {
                $(e.currentTarget).closest('#mobile-menu').addClass('expanded');
                $(e.currentTarget).parent().addClass('active');
                $('#mobile-menu .header__menu-item:not(.active)').hide();
                $('#mobile-menu .header__category').hide();
                $('#mobile-menu .header__search').hide();
                $('#mobile-menu .header__bar').hide();
                $('#mobile-menu .header__selection').hide();
            }
        });
    }
};

mobieSubmenu();

$(window).on('resize', (e) => {
    mobieSubmenu();
});

// Quantity buttons
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
