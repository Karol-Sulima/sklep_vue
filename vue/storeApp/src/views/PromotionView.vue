<template>
    <div>
        <!-- Loader -->
        <Apploader :visible="promotionLoading" />

        <div v-if="!promotionLoading">
            <div :style="contStyle" class="banner">
                <div class="shadowBox">
                    <h1>{{ promotionObject.header }}</h1>
                    <h2>{{ promotionObject.description }}</h2>
                </div>
            </div>
            <div class="content">
                <p>{{ promotionObject.longDescription }}</p>

                <div class="durationBox">
                    <h3>Duration: {{ formattedFinishCondition }}</h3>
                </div>
                <div class="items">
                    <!-- Use ProductTile for each product in the promotion -->
                    <ProductTile v-for="product in promotionObject.items" :key="product.id" :product="product" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProductTile from "@/components/ProductTile.vue";
import Apploader from "@/components/Apploader.vue";

export default {
    name: "PromotionView",
    components: {
        ProductTile,
        Apploader,
    },
    created() {
        this.$store.dispatch("FETCH_PROMOTION", this.$route.params.id); // Wywołanie akcji ładowania promocji
    },
    computed: {
        promotionObject() {
            return this.$store.getters.GET_PROMOTION_OBJECT; // Pobiera obiekt promocji z Vuex
        },
        promotionLoading() {
            return this.$store.state.promotion.promotionLoading; // Pobiera stan ładowania z Vuex
        },
        contStyle() {
            const { image } = this.promotionObject;
            let imageUrl;

            try {
                imageUrl = `/src/assets/${image}`;
            } catch (e) {
                console.log(e);
            }

            return {
                margintop: "50px",
                width: "100%",
                height: "300px",
                background: `url(${imageUrl}) no-repeat center center`,
                backgroundSize: "cover",
            };
        },
        formattedFinishCondition() {
            const { finishCondition, finishDate } = this.promotionObject;
            if (finishCondition) {
                return finishCondition;
            } else if (finishDate) {
                const date = new Date(finishDate);
                return date.toLocaleDateString();
            }
            return "No finish condition available";
        },
    },
};
</script>

<style lang="css" scoped>
.banner {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.content {
    margin: 50px 20px;
}

.content>p {
    margin: 20px 0;
}

.durationBox {
    background-color: rgba(0, 0, 0, 0.133);
    padding: 10px;
    border-radius: 10px;
    text-align: right;
    width: 100%;
    color: black;
    margin-bottom: 30px;
}

.shadowBox {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    width: fit-content;
    color: white;
}

.items {
    display: grid;
    grid-template-columns: repeat(3, 300px);
    justify-content: space-evenly;
    align-items: start;
    gap: 20px;
    width: 100%;
    margin: 0 auto;
    padding-bottom: 75px;
}
</style>