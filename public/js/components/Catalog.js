const Product = {
    props: ['item', 'img'],
    template: `
       <div class="product-item">
           <img :src="img" alt="Some img">
           <div class="desc">
               <h3>{{item.product_name}}</h3>
               <p>{{item.price}}&#8381;</p>
               <button class="buy-btn" @click="$root.$refs.cart.handleCartItem(item, 'add')">Купить</button>
           </div>
       </div>
   `
}

const Products = {
    data() {
        return {
            products: [],
            filtered: [],
        }
    },
    props: ['img'],
    components: { Product },
    template: `
        <div class="products">
            <p v-if="!filtered.length">Нет данных</p>
            <Product 
                v-for="item of filtered" 
                :key="item.id_product" 
                :img="img"
                :item="item"
            ></Product>
        </div>
    `,
    mounted(){
        this.$root.getJson(`${API}/catalogData.json`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    }
};
