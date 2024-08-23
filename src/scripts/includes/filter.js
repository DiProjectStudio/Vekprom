export function initializeFilter() {
    // Filter catalog
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
}
