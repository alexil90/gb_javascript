//задание 3
//данные с вариантами выбора
const OPTIONS = [
    {
        groupName: 'Выберите размер',
        inputType: 'radio',
        inputName: 'size',
        variants: [
            {
                id: 'burgerSizeSmall',
                value: 'small',
                labelText: 'Маленький'
            }, {
                id: 'burgerSizeMedium',
                value: 'medium',
                labelText: 'Средний'
            }
        ]
    }, {
        groupName: 'Выберите начинку',
        inputType: 'radio',
        inputName: 'filling',
        variants: [
            {
                id: 'burgerFillingCheese',
                value: 'cheese',
                labelText: 'Сыр'
            }, {
                id: 'burgerFillingSalad',
                value: 'salad',
                labelText: 'Салат'
            }, {
                id: 'burgerFillingPotato',
                value: 'potato',
                labelText: 'Картофель'
            }
        ]
    }, {
        groupName: 'Выберите дополнительные ингридиенты',
        inputType: 'checkbox',
        inputName: 'topping',
        variants: [
            {
                id: 'burgerToppingSpice',
                value: 'spice',
                labelText: 'Добавить прирпаву'
            }, {
                id: 'burgerToppingMayo',
                value: 'mayo',
                labelText: 'Добавить майонез'
            }
        ]
    }
];
//калории и стоимость каждого варианта
const OUTPUT = {
    small: {
        price: 50,
        calories: 20
    },
    medium: {
        price: 100,
        calories: 40
    },
    cheese: {
        price: 10,
        calories: 20
    },
    salad: {
        price: 20,
        calories: 5
    },
    potato: {
        price: 15,
        calories: 10
    },
    spice: {
        price: 15,
        calories: 0
    },
    mayo: {
        price: 20,
        calories: 5
    }
}

class Hamburger {
    constructor(options, output) {
        this.options = options;
        this.output = output;
        this.size = '';
        this.filling = '';
        this.topping = [];
        this.totalPrice = 0;
        this.totalCalories = 0;
    }
    //назначение обработчиков событий полям ввода
    _assignEventHandlers(inputName) {
        const inputBtns = document.querySelectorAll(`input[name=${inputName}]`);
        inputBtns.forEach((btn) => {
            btn.addEventListener('change', (e) => {
                if (e.target.type === 'radio') {
                    inputName === 'size'
                        ? this.size = e.target.value
                        : this.filling = e.target.value
                } else {
                    const index = this.topping.indexOf(e.target.value);
                    if (index > -1) {
                        this.topping.splice(index, 1);
                    } else {
                        this.topping.push(e.target.value);
                    }
                }
                this._showResult()
            })
        })
    }
    //итоговый расчет стоимости и калорийности бургера
    _calculateOutput () {
        //сброс старых значений
        this.totalPrice = 0;
        this.totalCalories = 0;
        //новый расчет на основе выбранных вариантов
        [this.size, this.filling, ...this.topping].map(key => {
            if (key) {
                this.totalPrice += this.output[key].price;
                this.totalCalories += this.output[key].calories;
            }
        })
    }
    //вывод результатов расчета в соответствующий блок 
    _showResult () {
        this._calculateOutput();
        const resultElem = document.querySelector('.result');
        return resultElem.innerHTML = `
            <p><b>Стоимость:</b> ${this.totalPrice} рублей</p>
            <p><b>Калорийность:</b> ${this.totalCalories} калорий </p>
        `;
    }
    //отрисовка поля ввода
    _renderInput(type, name, {id, value, labelText}) {
        return `<input 
                    type=${type}
                    name=${name}
                    id=${id}
                    value=${value}
                >
                <label for=${id}>${labelText}</label>`
    }
    //отрисовка отдельного блока формы
    _renderInputGroup({
        groupName, 
        inputType, 
        inputName, 
        variants
    }) {
        const inputGroup = variants
            .map(variant => this._renderInput(inputType, inputName, variant))
            .join(" ");

        return `<div class="form-group">
                    <p><b>${groupName}</b></p>
                    ${inputGroup}
                </div>`
    }
    //отрисовка страницы
    render() {
        //создает корневой контейнер
        const container = document.createElement('div');
        container.innerHTML = `<h2>Соберите бургер</h2>`;
        document.body.prepend(container);
        //создает форму и наполняет ее контентом
        const form = document.createElement('form');
        form.innerHTML = this.options
            .map((option) => this._renderInputGroup(option))
            .join("");
        container.append(form);
        //создает блок с результатами расчета
        const result = document.createElement('div');
        result.classList.add('form-group', 'result');
        result.innerHTML = `<p><b>Стоимость:</b></p>
                            <p><b>Калорийность:</b></p>`;
        container.append(result);
        //назначает обработчики полям ввода
        this.options.map(option => this._assignEventHandlers(option.inputName));
    }
}

const hamburger = new Hamburger(OPTIONS, OUTPUT);
hamburger.render();
