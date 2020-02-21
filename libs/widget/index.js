class CallbackWidget {
    constructor(widgetId, widgetFormId, endpoint) {
        this.endpoint = endpoint;
        this._btn = this.setWidgetBtn(widgetId, widgetFormId);
        this._form = this.setWidgetForm(widgetFormId, widgetId);
    }

    setWidgetBtn(id, widgetFormId) {
        const button = document.createElement('button');
        button.id = id;
        button.classList.add('widget-btn');
        button.setAttribute('aria-label', id);
        button.innerHTML = `<div class="phone-icon"></div>`;
        button.addEventListener('click', function() {
           const bg = document.querySelector('.bg');
           const form = document.getElementById(widgetFormId);
           
           bg.style.display = 'block';
           form.style.display = 'flex';
           this.style.display = 'none';
        });
        return button;
    }

    setWidgetForm(id, widgetId) {
        const form = document.createElement('form');
        form.id = id;
        form.classList.add('widget-form');
        form.innerHTML = `
            <div class="widget-form__header">
                <h2>Есть вопрос? Мы на него ответим!</h2>
                <div class="close-icon widget-form__close"></div>
            </div>
            <div class="widget-form__body">
                <div class="widget-form__control">
                    <label for="phone" class="widget-form__label">
                        Введите номер телефона
                    </label>
                    <input type="tel" placeholder="Номер" class="widget-form__input" />
                </div>
            </div>
            <div class="widget-form__control">
                <input type="submit" class="widget-form__btn" value="Позвонить мне">
            </div>
        `;
        form.querySelector('.widget-form__close').addEventListener('click', function() {
            const widget = document.getElementById(widgetId);
            const bg = document.querySelector('.bg');
            
            widget.style.display = 'flex';
            bg.style.display = 'none';
            form.style.display = 'none';
        });
        return form;
    }

    init() {
        document.head.insertAdjacentHTML('beforeend', this._styleLink);
        document.body.insertAdjacentHTML('beforeend', '<div class="bg"></div>');
        document.querySelector('.bg').appendChild(this._form);
        document.body.appendChild(this._btn);
    }
};