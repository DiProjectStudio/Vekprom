export function initializeFilter() {
    // Filter catalog
    const toggleClass = (selector, className, action) => {
        $(selector)[action](className);
    };

    const handleFilterToggle = (e, action) => {
        toggleClass('.catalog__aside', 'show', action);
        toggleClass('.brands', 'show', action);
        toggleClass('body', 'overflow-hidden', action);
    };

    $('.js-filter-btn').on('click', (e) => {
        handleFilterToggle(e, 'addClass');
    });

    $('.js-filter-close').on('click', (e) => {
        handleFilterToggle(e, 'removeClass');
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

            $minValue.attr('value', minValue);
            $maxValue.attr('value', maxValue);
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

    // фильтр брендов по алфавиту

    const $letters = $('.letter');
    const $brandsInner = $('.brands__inner');

    $letters.on('click', function () {
        $letters.removeClass('active');
        $(this).toggleClass('active');
        updateBrandsInnerClass();
    });

    function updateBrandsInnerClass() {
        const hasActiveLetter = $letters.hasClass('active');
        if (hasActiveLetter) {
            $brandsInner.addClass('active');
        } else {
            $brandsInner.removeClass('active');
        }
    }

    $('.brands__inner-clear').on('click', function () {
        $letters.removeClass('active');
        updateBrandsInnerClass();
    });
}
