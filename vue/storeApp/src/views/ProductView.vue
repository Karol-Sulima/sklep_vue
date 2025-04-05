<template>
    <div class="productView" v-if="product">
        <div class="productTop">
            <div class="productImage">
                <img :src="imageUrl" alt="Product Image" />
            </div>
            <div class="productInfo">
                <h1>{{ product.name }}</h1>
                <Rating :rate="product.rate" :ratesNumber="product.ratesNumber" />
                <p>Price: <strong>{{ product.price }}$</strong></p>
                <p>Category: <strong>{{ product.category }}</strong></p>
            </div>
        </div>
        <div class="productDescription">
            <h2>Description</h2>
            <p>{{ product.description }}</p>
        </div>
    </div>
    <div v-else>
        <p>Loading product details...</p>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Rating from "@/components/Rating.vue";

export default {
    name: "ProductView",
    components: {
        Rating,
    },
    computed: {
        ...mapGetters(["GET_PRODUCT_BY_ID"]),
        product() {
            return this.GET_PRODUCT_BY_ID(this.$route.params.id);
        },
        imageUrl() {
            // Dynamically compute the image URL
            return this.product?.image
                ? `/src/assets/${this.product.image}`
                : "/src/assets/default.jpg"; // Fallback to a default image
        },
    },
};
</script>

<style scoped>
.productView {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 20px;
    margin-top: 70px;
}

.productTop {
    display: flex;
    gap: 20px;
    align-items: flex-start;
}

.productImage img {
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 10px;
}

.productInfo {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
}

.productInfo h1 {
    font-size: 24px;
    margin-bottom: 10px;
}

.productInfo p {
    font-size: 16px;
    margin: 5px 0;
}

.productDescription {
    margin-top: 20px;
}

.productDescription h2 {
    font-size: 20px;
    margin-bottom: 10px;
}

.productDescription p {
    font-size: 16px;
    line-height: 1.5;
}
</style>