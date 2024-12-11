<template>
    <div>
        <div :style="contStyle" class="banner">
            <div class="shadowBox">
                <h1>{{ this.promotionObject.header }}</h1>
                <h2>{{ this.promotionObject.description }}</h2>
            </div>
        </div>
        <div class="content">
            <p>{{ this.promotionObject.longDescription }}</p>

            <div class="durationBox">
                <h3>Duration: {{ formattedFinishCondition }}</h3>
            </div>
            <div class="items">
                <div v-for="item in promotionObject.items" :key="item.id" class="item">
                    {{ item.id }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        this.$store.dispatch("FETCH_PROMOTION", this.$route.params.id);
    },
    computed: {
        promotionObject() {
            return this.$store.getters.GET_PROMOTION_OBJECT;
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
                margintop: '50px',
                width: '100%',
                height: '300px',
                background: `url(${imageUrl}) no-repeat center center`,
                backgroundSize: 'cover',
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
        }
    }
}
</script>

<style lang="css" scoped>
.banner {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.content {
    margin-left: 50px;
    margin-right: 50px;
}


.shadowBox {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    width: fit-content;
    color: white;
}
</style>