import { Fancybox } from '@fancyapps/ui';

export function initializePopup() {
    // Присваиваем Fancybox глобальной переменной
    window.Fancybox = Fancybox;

    // FANCYBOX OPTION
    Fancybox.bind('[data-fancybox]', {
        dragToClose: false,
        autoFocus: false,
        l10n: {
            CLOSE: 'Закрыть',
            NEXT: 'Следующий',
            PREV: 'Предыдущий',
            MODAL: 'Вы можете закрыть это модальное окно, нажав клавишу ESC'
        }
    });

    // FANCYBOX GALLERY OPTION
    Fancybox.bind('[data-fancybox="gallery"]', {
        dragToClose: false,
        autoFocus: false,
        Toolbar: {
            display: {
                left: [],
                right: ['close']
            }
        },
        closeButton: false,
        Thumbs: {
            type: 'classic'
        },
        l10n: {
            CLOSE: 'Закрыть',
            NEXT: 'Следующий',
            PREV: 'Предыдущий',
            MODAL: 'Вы можете закрыть это модальное окно, нажав клавишу ESC'
        }
    });
}
