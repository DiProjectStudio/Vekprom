import { Fancybox } from '@fancyapps/ui';

export function initializePopup() {
    // Присваиваем Fancybox глобальной переменной
    window.Fancybox = Fancybox;

    const fancyboxOptions = {
        dragToClose: false,
        autoFocus: false,
        l10n: {
            CLOSE: 'Закрыть',
            NEXT: 'Следующий',
            PREV: 'Предыдущий',
            MODAL: 'Вы можете закрыть это модальное окно, нажав клавишу ESC'
        },

        on: {
            init: (fancybox) => {
                document.body.classList.add('popup-active');

                if (fancybox.userSlides[0].src === '#popup-remove') {
                    document.body.classList.add('popup-active-remove');
                }
            },

            destroy: (fancybox) => {
                document.body.classList.remove('popup-active');
                document.body.classList.remove('popup-active-remove');
            }
        }
    };

    Fancybox.bind('[data-fancybox]', fancyboxOptions);

    // Попап успеха
    const popupSuccess = () => {
        const template = `
            <div id="popup-callback" class="popup popup-success">
                <div class="popup__title">Спасибо</div>
                <div class="popup__subtitle">Заявка успешно отправлена</div>
                <div class="btn btn--primary" onclick="Fancybox.close();">Закрыть окно</div>
            </div>
        `;
        Fancybox.show([{ src: template, type: 'html' }], fancyboxOptions);
    };

    window.popupSuccess = popupSuccess;

    // Попап формы заявки
    const popup = (id) => {
        Fancybox.show([{ src: id, type: 'inline' }], fancyboxOptions);
    };

    window.popup = popup;

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
