const app = new Vue({
    el: '#app',
    data: {
        errorState: false
    },
    components: { Products, Cart, Search, Errormsg },
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
        },
        getImage (res, url = 'http://via.placeholder.com/') {
            return url + res
        },
    }
})
