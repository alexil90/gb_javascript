const CartItem = {
    props: ['img', 'item'],
    template: `
        <div class="cart-item">
            <div class="product-bio">
                <img :src="img" alt="Some img">
                <div class="product-desc">
                    <p class="product-title">{{item.product_name}}</p>
                    <p class="product-quantity">Количество: {{item.quantity}}</p>
                    <p class="product-single-price">{{item.price}}&#8381; за 1 ед.</p>
                </div>
            </div>
            <div class="right-block">
                <p class="product-price">{{item.quantity*item.price}}&#8381;</p>
                <button class="del-btn" @click="$parent.handleCartItem(item, 'remove')">&times;</button>
            </div>
        </div>
    `
}

const CartTotal = {
    template: `
        <div class="cart-total">
            <b>Сумма товаров в корзине:</b>&nbsp;
            <span class="cart-sum">{{$parent.cartTotal}}&#8381;</span>
        </div>
    `
}

const Cart = {
    data() {
        return {
            showCart: false,
            cartItems: [],
            cartTotal: 0
        }
    },
    props: ['img'],
    components: { CartItem, CartTotal },
    template: `
        <div class="cart">
            <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
            <div class="cart-block" v-show="showCart">
                <p v-if="!cartItems.length">Корзина пуста</p>
                <div class="cart-items">
                    <CartItem 
                        v-for="item of cartItems"
                        :key="item.id_product"
                        :img="img"
                        :item="item"
                    ></CartItem>
                </div>
                <CartTotal></CartTotal>
            </div>
        </div>
    `,
    methods: {
        handleCartItem(item, action) {
            this.$root.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1){
                        switch (action) {
                            case "add" :
                                let find = this.cartItems.find(el => el.id_product === item.id_product);
                                if(find) {
                                    find.quantity++;
                                } else {
                                    const newItem = Object.assign({quantity: 1}, item);
                                    this.cartItems.push(newItem)
                                }
                                break;
                            case "remove":
                                if(item.quantity > 1) {
                                    item.quantity--;
                                } else {
                                    this.cartItems.splice(this.cartItems.indexOf(item), 1);
                                }
                                break;
                        }
                    }
                })
        }
    },
    watch: {
        cartItems: { 
            deep: true,
            handler() {
                this.cartTotal = this.cartItems.reduce((accum, item) => accum += item.price * item.quantity, 0)
            } 
        }
    }   
}
