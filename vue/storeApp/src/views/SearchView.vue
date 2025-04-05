<template>
    <div class="search">
        <div>
            <ProductTile v-for="(product, index) in productsList" :key="index" :product="product" />
        </div>
    </div>

</template>

<script>

import ProductTile from '../components/ProductTile.vue';
export default {
    created() {
        this.$store.dispatch("FETCH_PRODUCTS").then(() => {
            console.log("Products in SearchView:", this.productsList); // Debugging log
        });
    },
    computed: {
        productsList() {
            return this.$store.getters.GET_PRODUCTS_LIST;
        }
    },
    components: {
        ProductTile
    },
    name: "SearchView"
}
</script>

<style lang="css" scoped>
.search {
    margin-top: 50px;
    width: 80%;
    margin-left: 10%;
}

.search>div {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    justify-content: center;
    align-items: center;
    gap: 50px;
    padding-bottom: 75px;
}
</style>