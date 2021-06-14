const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductItem {
    constructor({
        product_name = 'Новый товар',
        price = 0,
        img = 'https://via.placeholder.com/200x150'
    }) {
      this.product_name = product_name;
      this.price = price;
      this.img = img;
    }
    render() {
        return `<div class="product-item">
                    <img src="${this.img}">
                    <h3>${this.product_name}</h3>
                    <p>${this.price}</p>
                    <button class="buy-btn">Купить</button>
                </div>`
    }
}

class ProductList {
    constructor() {
      this.products = [];
      this._getProducts()
            .then(data => {
                this.products = [...data];
                this.render()
            });
    }
    _getProducts(){
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => console.log(error));
    }
    //задание 2
    countTotalPrice() {
        const totalPrice = this.products.length !== 0 
            ? this.products.reduce((sum, product) => sum + product.price, 0)
            : ''
        return `Сумма товаров: ${totalPrice}`
    }
    render() {
      let productListMarkup = '';
      this.products.map(product => {
        const productItem = new ProductItem(product);
        productListMarkup += productItem.render();
      });
      document.querySelector('.products').innerHTML = productListMarkup;
      document.querySelector('.total-price').innerHTML = this.countTotalPrice();
    }
}
class CartItem {
    constructor() {
      
    }
    changeQuantity() {

    }
    render() {

    }
}

class Cart {
    constructor() {
      
    }
    addCartItem() {

    }
    removeCartItem() {

    }
    countTotalPrice() {

    }
    render() {
        const cartElem = document.createElement('div');
        cartElem.classList.add('cart');
        
        document.querySelector('header').append(cartElem);
    }
}

const productList = new ProductList();
productList.render();

const cart = new Cart();
cart.render();

const cartButton = document.querySelector('.btn-cart');
cartButton.addEventListener('click', (e) => {
    document.querySelector('.cart').classList.toggle('active');
})
