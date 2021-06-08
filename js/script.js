const products = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
    {}
];

class ProductItem {
    constructor({
        title = 'Новый товар',
        price = 0,
        img = 'https://via.placeholder.com/200x150'
    }) {
      this.title = title;
      this.price = price;
      this.img = img;
    }
    render() {
        return `<div class="product-item">
                    <img src="${this.img}">
                    <h3>${this.title}</h3>
                    <p>${this.price}</p>
                    <button class="buy-btn">Купить</button>
                </div>`
    }
}

class ProductList {
    constructor(products) {
      this.products = [];
      this._fetchProducts(products);
    }
    _fetchProducts (products) {
        this.products = products;
    }
    render() {
      let productListMarkup = '';
      this.products.map(product => {
        const productItem = new ProductItem(product);
        productListMarkup += productItem.render();
      });
      document.querySelector('.products').innerHTML = productListMarkup;
    }
}

const productList = new ProductList(products);
productList.render();
