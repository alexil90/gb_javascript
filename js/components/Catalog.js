const Product = {
    props: ['item', 'img'],
    template: `
       <div class="product-item">
           <img :src="img" alt="Some img">
           <div class="desc">
               <h3>{{item.product_name}}</h3>
               <p>\${{item.price}}</p>
               <button class="buy-btn" @click="$root.handleCartItem(item, 'add')">Купить</button>
           </div>
       </div>
   `
}

const Products = {
    props: ['products', 'img'],
    components: { Product },
    template: `
        <div class="products">
            <p v-if="!products.length">Нет данных</p>
            <Product 
                v-for="item of products" 
                :key="item.id_product" 
                :img="img"
                :item="item"
            ></Product>
        </div>
    `
};
