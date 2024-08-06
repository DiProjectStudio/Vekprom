import { Fancybox } from '@fancyapps/ui';

export function initializePopup() {
    // Присваиваем Fancybox глобальной переменной
    window.Fancybox = Fancybox;

    // FANCYBOX OPTION
    Fancybox.bind('[data-fancybox]', {
        dragToClose: false,
        autoFocus: false,
        hideScrollbar: false,
        l10n: {
            CLOSE: 'Закрыть',
            NEXT: 'Следующий',
            PREV: 'Предыдущий',
            MODAL: 'Вы можете закрыть это модальное окно, нажав клавишу ESC'
        }
    });

    console.log('popup.js initialized');
}
