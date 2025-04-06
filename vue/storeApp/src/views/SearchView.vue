<template>
    <div class="search">
        <form @submit.prevent="onSubmit">
            <input v-model="name" placeholder="Search by name" />
            <select v-model="category">
                <option value="">All Categories</option>
                <option v-for="(cat, index) in categoriesList" :key="index" :value="cat">
                    {{ cat }}
                </option>
            </select>
            <select v-model="sort">
                <option v-for="option in sortOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                </option>
            </select>
            <button type="submit">Search</button>
        </form>
        <div>
            <ProductTile v-for="(product, index) in productsList" :key="index" :product="product" />
        </div>
    </div>
</template>

<script>
import ProductTile from '../components/ProductTile.vue';

export default {
    name: "SearchView",
    components: {
        ProductTile,
    },
    data() {
        return {
            name: "",
            category: "",
            sort: "name_asc", // Default sort option
            sortOptions: [
                { label: "Name asc", value: "name_asc" },
                { label: "Name desc", value: "name_desc" },
                { label: "Price asc", value: "price_asc" },
                { label: "Price desc", value: "price_desc" },
            ],
        };
    },
    created() {
        // Fetch products and categories when the component is created
        this.$store.dispatch("FETCH_PRODUCTS");
        this.$store.dispatch("FETCH_CATEGORIES");
    },
    computed: {
        productsList() {
            return this.$store.getters.GET_PRODUCTS_LIST;
        },
        categoriesList() {
            return this.$store.getters.GET_CATEGORIES_LIST;
        },
    },
    methods: {
        onSubmit() {
            console.log("Search submitted with:", {
                name: this.name,
                category: this.category,
                sort: this.sort,
            });
            // Add filtering and sorting logic here if needed
        },
    },
};
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