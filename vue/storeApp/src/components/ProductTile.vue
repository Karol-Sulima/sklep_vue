<template>
    <div :style="contStyle" class="productTile">
        <img :src="imageUrl" alt="Product Image" />
        <h3>{{ product?.name || "No Name" }}</h3>
        <span>
            <p>Category:</p>
            <h4 class="category">{{ product.category }}</h4>
        </span>
        <span>
            <p>Price:</p>
            <p>{{ product?.price }}$</p>
        </span>
        <!-- Add the Rating component here -->
        <Rating :rate="product.rate" :ratesNumber="product.ratesNumber" />
    </div>
</template>

<script>
import Rating from "./Rating.vue";

export default {
    name: "ProductTile",

    props: {
        product: {
            type: Object,
            required: true,
        },
    },
    components: {
        Rating,
    },
    computed: {
        imageUrl() {
            // Dynamically compute the image URL
            return this.product?.image ? `/src/assets/${this.product.image}` : "/src/assets/default.jpg";
        },
        contStyle() {
            // Optional: Add dynamic styles if needed
            return {
                backgroundColor: "#f9f9f9",
            };
        },
    },
    mounted() {
        console.log("Product in ProductTile:", this.product); // Debugging log
    },
};
</script>

<style scoped>
.productTile {
    width: 200px;
    height: 300px;
    display: flex;
    justify-content: start;
    align-items: center;
    text-decoration: none !important;
    flex-direction: column;
    width: 100%;
    border: 2px solid #dfd9d9;
}

.category {
    font-size: 14px;
    width: 100%;
    color: #555;
    margin-bottom: 5px;
    text-align: right;
}

img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 5px;
    margin-bottom: 10px;
}

span {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin-bottom: 5px;
}
</style>