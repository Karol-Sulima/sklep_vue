<template>
    <div class="search">
        <form @submit.prevent="onSubmit" class="searchForm">
            <input v-model="name" placeholder="Search by name" class="searchInput" />
            <select v-model="category" class="searchSelect">
                <option value="">All Categories</option>
                <option v-for="(cat, index) in categoriesList" :key="index" :value="cat">
                    {{ cat }}
                </option>
            </select>
            <select v-model="sort" class="searchSelect">
                <option v-for="option in sortOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                </option>
            </select>
            <button type="submit" class="searchButton">Search</button>
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
        async onSubmit() {
            const params = new URLSearchParams();

            // Add query parameters based on user input
            if (this.name) params.append("name", this.name);
            if (this.category) params.append("category", this.category);

            // Handle sorting
            if (this.sort) {
                const [sortKey, sortOrder] = this.sort.split("_");
                params.append("_sort", sortKey);
                params.append("_order", sortOrder);
            }

            try {
                // Make the API request to the server
                const response = await fetch(`http://localhost:3000/products?${params.toString()}`);
                const products = await response.json();

                // Update the products list in the store or local state
                this.$store.commit("SET_PRODUCTS_LIST", products);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
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

.searchForm {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 100px;
    margin-top: 75px;
}

.searchInput {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 250px;
}

.searchSelect {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 200px;
    background-color: #fff;
}

.searchButton {
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.searchButton:hover {
    background-color: #0056b3;
}

.search>div {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    /* Adjust to fit items */
    justify-content: center;
    /* Center the items horizontally */
    align-items: start;
    /* Align items to the top */
    gap: 20px;
    /* Add spacing between items */
    max-width: 1200px;
    /* Prevent the grid from stretching too wide */
    margin: 0 auto;
    /* Center the grid container itself */
    padding-bottom: 75px;
}
</style>