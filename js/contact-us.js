//настройки полей ввода
const INPUT_OPTIONS = {
    name: {
        type: 'Имя',
        placeholder: "Введите ваше имя",
        rxp: /^[a-zа-яё]+$/i,
        error: false,
        errorText: 'Имя может содержать только буквы'
    },
    email: {
        type: 'Электронная почта',
        placeholder: "user@mail.com",
        rxp: /^([\w\.-]+)@(\w+)\.([a-z\.]{2,6})$/,
        error: false,
        errorText: 'Неверный формат почты'
    },
    tel: {
        type: 'Телефон',
        placeholder: "+7(000)000-0000",
        rxp: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
        error: false,
        errorText: 'Неверный формат телефона'
    },
    msg: {
        type: 'Сообщение',
        placeholder: "Введите текст сообщения"
    },
}

class ValidationForm {
    constructor(inputs, container = '.form'){
        this.container = container;
        this.inputs = inputs;
        this.errorState = false;
        this._renderInputGroup();
        this._init();
    }
    //функция проверки правильности ввода
    _checkValidity() {
        //проверка значения каждого поля
        document.querySelectorAll('input').forEach(input => {
            if (!this.inputs[input.name].rxp.test(input.value)) {
                document.querySelector('.input-group').innerHTML = '';
                this.inputs[input.name].error = true;
                this._renderInputGroup();
                this.errorState = true;
            } 
        })
        //если все поля без ошибок, то проверка успешна
        if (this.errorState === false) {
            this._renderCheck();
        }
    }
    //обработчик функции проверки ввода
    _init() {
        document.querySelector(this.container).addEventListener('submit', e => {
            e.preventDefault();
            this._checkValidity();
        })
    }
    //функция сброса ошибки при новом вводе данных
    _resetErrors(input) {
        this.errorState = false;
        document.querySelector('.input-group').innerHTML = '';
        this.inputs[input.name].error = false;
        this._renderInputGroup();
    }
    //отрисовывает галочку
    _renderCheck() {
        const checkContainer = document.createElement('div');
        checkContainer.classList.add('check-img');
        checkContainer.innerHTML = `<img src="./check.png"/>`
        document.querySelector(this.container).append(checkContainer);
    }
    //отрисовка поля ввода
    _renderInput(inputName) {
        const {type, placeholder, error, errorText} = this.inputs[inputName];
        const input = document.createElement('p');
        input.setAttribute('type', `${type}:`);
        input.innerHTML = inputName === 'msg'
            ? `<textarea 
                    name="${inputName}" 
                    placeholder="${error ? errorText : placeholder}"
                    ${error ? 'class="is-error"' : ''}
                ></textarea>`
            : `<input 
                    name="${inputName}" 
                    placeholder="${error ? errorText : placeholder}"
                    ${error ? 'class="is-error"' : ''}
                />`
        return input;
    }
    //отрисовка всех полей ввода
    _renderInputGroup() {
        Object.keys(this.inputs).forEach((key) => {
            const input = this._renderInput(key);
            document.querySelector('.input-group').append(input);
        })
        //клик по полю с ошибкой инициирует сброс состояния ошибки у поля
        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('focus', (e) => {
                this.inputs[e.target.name].error ? this._resetErrors(e.target) : null
            })
        }) 
    }
}

const form = new ValidationForm(INPUT_OPTIONS);
