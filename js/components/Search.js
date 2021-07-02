const Search = {
    data() {
        return { userSearch: '' }
    },
    template: `
        <form action="#" class="search-form">
            <span class="icon-search"><i class="fas fa-search"></i></span>
            <input type="text" class="search-field" v-model="userSearch" @input="filter()">
        </form>
    `,
    methods: {
        filter() {
            const regexp = new RegExp(this.userSearch, 'i');
            this.$root.filtered = this.$root.products.filter(product => regexp.test(product.product_name));
        }
    }
}
