const products = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

const goodsListContainer = document.querySelector('.goods-list');

const renderProduct = ({title = "Новый товар", price = 0, img = 'https://via.placeholder.com/200x150'}) => {
    return `<div class="product-item">
                <img src="${img}">
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};

const renderProductList = (list) => {
    document.querySelector('.products').innerHTML = list.map(item => renderProduct(item)).join('');
}

renderProductList(products);
