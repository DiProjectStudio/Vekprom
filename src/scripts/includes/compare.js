export function initializeCompare() {
    if ($('#compare').length) {
        const stickyElement = $('#compare');
        const stickyOffset = stickyElement.offset().top;

        const toggleStickyClass = () => {
            if ($(window).scrollTop() > stickyOffset) {
                stickyElement.addClass('sticky');
            } else {
                stickyElement.removeClass('sticky');
            }
        };

        toggleStickyClass();

        $(window).scroll(toggleStickyClass);
    }
}
