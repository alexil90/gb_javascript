class ValidationForm {
    constructor(container = '.form'){
        this.container = container;
        this.rxps = {
            name: /^[a-zа-яё]+$/i,
            email: /^([\w\.-]+)@(\w+)\.([a-z\.]{2,6})$/,
            tel: /^\+7\(\d{3}\)\d{3}-\d{4}$/
        }
        this._init();
    }
    _checkValidity() {
        document.querySelectorAll('input').forEach(input => {
            console.log(this.rxps[input.name].test(input.value));
        })
    }
    _init() {
        document.querySelector(this.container).addEventListener('submit', e => {
            e.preventDefault();
            this._checkValidity();
        })
    }
    _renderInput() {
        
    }
}

const form = new ValidationForm();
