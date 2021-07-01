Vue.component('search', {
    template: `
        <form action="#" class="search-form">
            <span class="icon-search"><i class="fas fa-search"></i></span>
            <input type="text" class="search-field" v-model="$root.userSearch" @input="$root.filter()">
        </form>
    `
});
