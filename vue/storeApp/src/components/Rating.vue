<template>
    <div class="rating">
        <div class="stars">
            <span v-for="star in 5" :key="star" :class="{ filled: star <= Math.round(rate) }">
                ★
            </span>
        </div>
        <p class="ratesNumber">({{ ratesNumber }} ratings)</p>
    </div>
</template>

<script>
export default {
    name: "Rating",
    props: {
        rate: {
            type: Number,
            required: true,
        },
        ratesNumber: {
            type: Number,
            required: true,
        },
    },
};
</script>

<style scoped>
.rating {
    margin-top: 30px;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 14px;
    color: #555;
}

.stars {
    color: gold;
}

.stars span {
    font-size: 16px;
}

.stars span.filled {
    color: gold;
}

.stars span:not(.filled) {
    color: #ccc;
}

.ratesNumber {
    font-size: 12px;
    color: #777;
}
</style>