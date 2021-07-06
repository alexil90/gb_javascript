<template>
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
</template>
<style lang="scss" >
    // TODO
</style>
<script>
    export default {
        name: 'CartItem',
        props: {
            item: Object
        }
    }
</script>
