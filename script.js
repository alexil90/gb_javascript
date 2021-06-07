const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

const goodsListContainer = document.querySelector('.goods-list');

const renderGoodsItem = ({title = "Новый товар", price = 0}) => {
    const goodsItem = document.createElement('div');
    goodsItem.classList.add('goods-item-container');
    goodsItem.innerHTML = `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
    return goodsItem;
};

const renderGoodsList = (list) => {
    list.map(item => goodsListContainer.append(renderGoodsItem(item)));
}

renderGoodsList(goods);
