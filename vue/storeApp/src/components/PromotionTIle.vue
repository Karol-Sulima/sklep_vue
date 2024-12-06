<template>
    <div :style="contStyle" class="promotionTIle">
        <div class="shadowbox">
            <h3>{{ this.promotion.header }}</h3>
            <h2>{{ this.promotion.description }}</h2>
        </div>
    </div>
</template>

<script>
export default {
    name: "PromotionTile",
    props: { promotion: Object },
    computed: {
        contStyle() {
            const { image } = this.promotion;
            let imageUrl;

            try {
                imageUrl = `/src/assets/${image}`;
            } catch (e) {
                console.log(e);
            }

            return {
                background: `url(${imageUrl}) no-repeat center center`,
                backgroundSize: 'cover',
            };
        },
    },
};
</script>

<style scoped>
.promotionTIle {
    color: white;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none !important;
    flex-direction: column;
    width: 100%;
}

.shadowbox {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20px;
    border-radius: 10px;
    text-align: center;
}
</style>