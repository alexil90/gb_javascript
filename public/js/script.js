const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        errorState: false
    },
    components: { Products, Cart, Search, ErrorMsg },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => this.errorState = true);
        },
        getImage (res, url = 'http://via.placeholder.com/') {
            return url + res
        },
    }
})
