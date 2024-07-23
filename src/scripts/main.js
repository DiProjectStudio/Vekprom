// Import Plugins
import Inputmask from 'inputmask';

// Import Scripts
import './js/map.js';
import './js/popup.js';
import './js/slider.js';

/* INPUT MASK PHONE NUMBER */
Inputmask({
    mask: '+7 (999) 999-99-99',
    showMaskOnHover: false,
    showMaskOnFocus: false,

    onBeforePaste: (pastedValue, opts) => {
        return pastedValue.replace(/^8/, '');
    }
}).mask('[phone-number]');

// INPUT MASK FOR NUMBERS
Inputmask({
    regex: '^[0-9]*$',
    allowMinus: false,
    showMaskOnHover: false,
    showMaskOnFocus: false,
    placeholder: ''
}).mask('[number-only]');

$('.qty-input .qty').on('click', (e) => {
    if (
        $(e.currentTarget).hasClass('qty-minus') &&
        $(e.currentTarget).parent().find('input').val() > 1
    ) {
        $(e.currentTarget)
            .parent()
            .find('input')
            .val(Number($(e.currentTarget).parent().find('input').val()) - 1);
    }
    if (
        $(e.currentTarget).hasClass('qty-plus') &&
        $(e.currentTarget).parent().find('input').val() < 999
    ) {
        $(e.currentTarget)
            .parent()
            .find('input')
            .val(Number($(e.target).parent().find('input').val()) + 1);
    }
});
