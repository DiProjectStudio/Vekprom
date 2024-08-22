export function initializeFilter() {
    const $min = $('#range-min');
    const $max = $('#range-max');
    const $minValue = $('#min-value');
    const $maxValue = $('#max-value');

    function updateValues() {
        const minValue = parseInt($min.val());
        const maxValue = parseInt($max.val());

        if (minValue > maxValue - 5) {
            $min.val(maxValue - 5);
        }
        if (maxValue < minValue + 5) {
            $max.val(minValue + 5);
        }

        $minValue.text($min.val());
        $maxValue.text($max.val());
    }

    $min.on('input', updateValues);
    $max.on('input', updateValues);

    updateValues();
}
