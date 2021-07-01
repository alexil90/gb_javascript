const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        url: {
            catalog: '/catalogData.json',
            cart: '/addToBasket.json',
        },
        products: [],
        filtered: [],
        userSearch: '',
        showCart: false,
        cartItems: [],
        errorState: false
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => this.errorState = true);
        },
        getImage (res, url = 'http://via.placeholder.com/') {
            return url + res
        },
        handleCartItem(item, action) {
            this.getJson(`${API + this.url.cart}`)
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
        },
        filter() {
            const regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
        }
    },
    mounted(){
       this.getJson(`${API + this.url.catalog}`)
           .then(data => {
               for(let el of data){
                   this.products.push(el);
                   this.filtered.push(el);
               }
           });
    }
})
