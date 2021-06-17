const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const getImage = (res, url = 'http://via.placeholder.com/') => {
    return url + res
}

class List {
    constructor(url, container, list = itemLists){
        this.container = container;
        this.list = list;
        this.url = url;
        this.goods = [];
        this.allProducts = [];
        this._init();
    }
    getJson(url){
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => console.log(error));
    }
    handleData(data){
        if (data) {
            this.goods = [...data];
            this.render();
        }
    }
    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price * item.quantity, 0);
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const listItem = new this.list[this.constructor.name](product);
            this.allProducts.push(listItem);
            block.append(listItem.render());
        }
    }
}

class ProductsList extends List{
    constructor(cart, container = '.products', url = "/catalogData.json"){
        super(url, container);
        this.cart = cart;
        this.getJson()
            .then(data => this.handleData(data));
    }
    _init(){
        document.querySelector(this.container).addEventListener('click', e => {
            if(e.target.classList.contains('buy-btn')){
                this.cart.addProduct(e.target);
            }
        });
        
    }
}

class Cart extends List{
    constructor(container = ".cart-items", url = "/getBasket.json"){
        super(url, container);
        this.getJson()
            .then(data => {
                this.handleData(data.contents);
                this._updateSum()
            });
    }
    addProduct(element){
        this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if(data.result === 1){
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if(find) {
                        find.quantity++;
                        this._updateCart(find);
                    } else {
                        let product = {
                            id_product: productId,
                            price: +element.dataset['price'],
                            product_name: element.dataset['name'],
                            quantity: 1
                        };
                        this.goods = [product];
                        this.render();
                        
                    }
                    this._updateSum();
                } else {
                    alert('Error');
                }
            })
    }
    removeProduct(element){
        this.getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
                if(data.result === 1){
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if(find.quantity > 1){
                        find.quantity--;
                        this._updateCart(find);
                    } else {
                        this.allProducts.splice(this.allProducts.indexOf(find), 1);
                        document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
                        
                    }
                    this._updateSum();
                } else {
                    alert('Error');
                }
            })
    }
    _updateCart(product){
       let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
       block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
       block.querySelector('.product-price').textContent = `$${product.quantity*product.price}`;
    }
    _updateSum() {
        let sumElem = document.querySelector(`.cart-sum`);
        sumElem.innerHTML = '$' + this.calcSum();
    }
    _init(){
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector('.cart-block').classList.toggle('invisible');
        });
        document.querySelector(this.container).addEventListener('click', e => {
           if(e.target.classList.contains('del-btn')){
               this.removeProduct(e.target);
           }
        })
    }
}

class ProductItem {
    constructor(
        {
            product_name = `Новый товар`,
            price = 0,
            id_product = 0
        }, 
        img = getImage('200x150')
    ){
        this.product_name = product_name;
        this.price = price;
        this.id_product = id_product;
        this.img = img;
    }
    _createItemElem(itemClass, itemContent) {
        const item = document.createElement('div');
        item.classList.add(itemClass);
        item.setAttribute('data-id', this.id_product);
        item.innerHTML = itemContent;
        return item;
    }
    render() {
        const itemContent = `<img src="${this.img}" alt="Some img">
                            <div class="desc">
                                <h3>${this.product_name}</h3>
                                <p>${this.price} $</p>
                                <button class="buy-btn"
                                    data-id="${this.id_product}"
                                    data-name="${this.product_name}"
                                    data-price="${this.price}"
                                >Купить</button>
                            </div>`;
        return this._createItemElem('product-item', itemContent);
    }
}

class CartItem extends ProductItem {
    constructor(el, img = getImage('50x100')){
        super(el, img);
        this.quantity = el.quantity;
    }
    render(){
        const itemContent = `<div class="product-bio">
                                <img src="${this.img}" alt="Some image">
                                <div class="product-desc">
                                    <p class="product-title">${this.product_name}</p>
                                    <p class="product-quantity">Количество: ${this.quantity}</p>
                                    <p class="product-single-price">$${this.price} за 1 ед.</p>
                                </div>
                            </div>
                            <div class="right-block">
                                <p class="product-price">$${this.quantity*this.price}</p>
                                <button class="del-btn" data-id="${this.id_product}">&times;</button>
                            </div>`
        return this._createItemElem('cart-item', itemContent);
    }
}

const itemLists = {
    ProductsList: ProductItem,
    Cart: CartItem
};

let cart = new Cart();
let products = new ProductsList(cart);
