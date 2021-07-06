const Product = {
    props: ['item'],
    template: `
       <div class="product-item">
           <img :src="item.imgProduct" alt="Some img">
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
    components: { Product },
    template: `
        <div class="products">
            <p v-if="!filtered.length">Нет данных</p>
            <Product 
                v-for="item of filtered" 
                :key="item.id_product" 
                :item="item"
            ></Product>
        </div>
    `,
    mounted(){
        this.$root.handleJson(`api/products`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    }
};
