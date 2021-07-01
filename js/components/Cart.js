Vue.component('cart', {
    props: ['cartItems', 'img', 'showCart'],
    template: `
        <div class="cart-block" v-show="showCart">
            <p v-if="!cartItems.length">Корзина пуста</p>
            <div class="cart-items">
                <cart-item 
                    v-for="item of cartItems"
                    :key="item.id_product"
                    :img="img"
                    :item="item"
                ></cart-item>
            </div>
            <cart-total></cart-total>
        </div>
    `
});

Vue.component('cart-item', {
    props: ['img', 'item'],
    template: `
        <div class="cart-item">
            <div class="product-bio">
                <img :src="img" alt="Some img">
                <div class="product-desc">
                    <p class="product-title">{{item.product_name}}</p>
                    <p class="product-quantity">Количество: {{item.quantity}}</p>
                    <p class="product-single-price">\${{item.price}} за 1 ед.</p>
                </div>
            </div>
            <div class="right-block">
                <p class="product-price">\${{item.quantity*item.price}}</p>
                <button class="del-btn" @click="$root.handleCartItem(item, 'remove')">&times;</button>
            </div>
        </div>
    `
});

Vue.component('cart-total', {
    template: `
        <div class="cart-total">
            <b>Сумма товаров в корзине:</b>&nbsp;
            <span class="cart-sum">\${{$root.cartTotal}}</span>
        </div>
    `
});
