export function initializeFilter() {
    // Filter catalog
    $('.js-filter-btn').on('click', (e) => {
        $('.catalog__aside').addClass('show');
        $('body').addClass('overflow-hidden');
    });

    $('.js-filter-close').on('click', (e) => {
        $('.catalog__aside').removeClass('show');
        $('body').removeClass('overflow-hidden');
    });

    $('.range').each(function () {
        const $container = $(this);
        const $min = $container.find('.range-min');
        const $max = $container.find('.range-max');
        const $minValue = $container.find('.min-value');
        const $maxValue = $container.find('.max-value');
        const $highlight = $container.find('.range-highlight');

        function updateValues() {
            let minValue = parseInt($min.val());
            let maxValue = parseInt($max.val());

            const minPercent = (minValue / $min.attr('max')) * 100;
            const maxPercent = (maxValue / $max.attr('max')) * 100;

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

            $minValue.val(minValue);
            $maxValue.val(maxValue);
        }

        $min.on('input', updateValues);
        $max.on('input', updateValues);

        updateValues();
    });

    $('.js-sorting').on('click', (e) => {
        if (!$(e.currentTarget).closest('.sorting').hasClass('dropdown')) {
            $(e.currentTarget).closest('.sorting').addClass('dropdown');

            $(document).on('click', (i) => {
                if (
                    !$(i.target).closest('.js-sorting').length &&
                    $('.sorting').hasClass('dropdown')
                ) {
                    $('.sorting').removeClass('dropdown');
                }
            });
        } else {
            $(e.currentTarget).closest('.sorting').removeClass('dropdown');
        }
    });

    $('.js-view').on('click', (e) => {
        $('.js-view').removeClass('active');

        if (!$(e.currentTarget).hasClass('active')) {
            $(e.currentTarget).addClass('active');
        }

        if ($(e.currentTarget).hasClass('js-table-list')) {
            $('.catalog__wrap').addClass('table-list');
        } else {
            $('.catalog__wrap').removeClass('table-list');
        }
    });
}
