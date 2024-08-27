export function initializePersonal() {
    const personalEdit = (e) => {
        e.style.display = 'none';

        var parent = e.parentNode;
        var input = parent.querySelector('input');
        input.removeAttribute('disabled');
        input.focus();

        var actionElement = parent.querySelector('.personal__data-action');
        actionElement.classList.add('active');
    };

    const editCancel = (e) => {
        var parent = e.parentNode;
        var editBtn = parent.closest('.personal__data-item').querySelector('.edit');
        var input = parent.closest('.personal__data-item').querySelector('input');

        editBtn.style.display = 'flex';
        parent.classList.remove('active');
        input.setAttribute('disabled', '');
    };

    window.personalEdit = personalEdit;
    window.editCancel = editCancel;

    $('.order__btn').on('click', (e) => {
        $(e.currentTarget).closest('.order').toggleClass('expanded');
        $(e.currentTarget).closest('.order').find('.order__body').slideToggle();
    });
}
