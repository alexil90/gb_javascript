<template>
    <div>
        <header>
            <div class="logo">E-shop</div>
            <div class="menu-right"> 
                <!-- <Search></Search> -->
                <Cart ref="cart"></Cart>
            </div>
        </header>
        <main>
            <!-- <Errormsg v-if="errorState"></Errormsg>
            <Products ref="catalog"></Products> -->
        </main>
    </div>
</template>

<style lang="scss" src="./app.scss"></style>
<script>
    import Cart from '../cart/cart.vue'

    export default {
        data() {
            return {
                errorState: false
            }
            
        },
        components: { 
            Cart, 
            //Products, Search, Errormsg 
        },
        methods: {
            handleJson(url, data, method) {
                return method
                        ? fetch(url, {
                            method: method,
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data)
                        })
                            .then(result => result.json())
                            .catch(error => this.errorState = true)
                        :  fetch(url)
                            .then(result => result.json())
                            .catch(error => this.errorState = true)
            }
        }
    }
</script>
