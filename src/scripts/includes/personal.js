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

        editBtn.style.display = 'flex';
        parent.classList.remove('active');
    };

    window.personalEdit = personalEdit;
    window.editCancel = editCancel;
}
