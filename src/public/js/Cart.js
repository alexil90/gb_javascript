const CartItem = {
    props: ['item'],
    template: `
        <div class="cart-item">
            <div class="product-bio">
                <img :src="item.imgCart" alt="Some img">
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

export default {
    data() {
        return {
            showCart: false,
            cartItems: [],
            cartTotal: 0
        }
    },
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
                        :item="item"
                    ></CartItem>
                </div>
                <CartTotal></CartTotal>
                <button class="buy-btn">Перейти к оплате</button>
            </div>
        </div>
    `,
    methods: {
        handleCartItem(item, action) {
            const CART_URL = `/api/cart/${item.id_product}/${item.product_name}`;
            switch (action) {
                case "add" :
                    let find = this.cartItems.find(el => el.id_product === item.id_product);
                    if(find) {
                        this.$root.handleJson(CART_URL, {quantity: 1}, 'PUT')
                            .then(data => {
                                if (data.result) find.quantity++
                            })
                    } else {
                        const newItem = Object.assign({quantity: 1}, item);
                        this.$root.handleJson(CART_URL, newItem, 'POST')
                            .then(data => {
                                if ( data.result ) this.cartItems.push( newItem )
                            })
                    }
                    break;
                case "remove":
                    if(item.quantity > 1) {
                        this.$root.handleJson(CART_URL, {quantity: -1}, 'PUT')
                            .then(data => {
                                if (data.result) item.quantity--
                            })
                    } else {
                        this.$root.handleJson(CART_URL, item, 'DELETE')
                            .then( data => {
                                if (data.result) {
                                    this.cartItems.splice(this.cartItems.indexOf(item), 1);
                                } else {
                                    console.log( 'error' );
                                }
                            })
                        
                    }
                    break;
            }
        }
    },
    mounted() {
        this.$root.handleJson(`/api/cart`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el)
                }
            })
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
