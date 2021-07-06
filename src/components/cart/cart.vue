<template>
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
</template>
<style lang="scss" >
    // TODO
</style>
<script>
    import CartItem from './cart-item.vue'
    import CartTotal from './cart-total.vue'

    export default {
        name: 'Cart',
        data() {
            return {
                showCart: false,
                cartItems: [],
                cartTotal: 0
            }
        },
        components: { CartItem, CartTotal },
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
</script>
