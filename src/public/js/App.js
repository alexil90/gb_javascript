import Cart from "./Cart"
import Products from "./Products"
import Search from "./Search"
import Errormsg from "./Errormsg"

export default {
    el: '#app',
    data: { errorState: false },
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
        }
    }
}
