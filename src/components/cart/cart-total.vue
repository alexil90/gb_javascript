<template>
    <div class="cart-total">
        <b>Сумма товаров в корзине:</b>&nbsp;
        <span class="cart-sum">{{$parent.cartTotal}}&#8381;</span>
    </div>
</template>
<style lang="scss" >
    // TODO
</style>
<script>
    export default {
        name: 'CartTotal'
    }
</script>
