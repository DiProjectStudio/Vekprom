// Import Plugins
import Inputmask from 'inputmask';

// Import Scripts
import './includes/map.js';
import './includes/popup.js';
import './includes/slider.js';

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
