<template>
    <div class="not-found">
        <h1>Page not found</h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
            test: "test",
        };
    },
};
</script>

<style>
@media (min-width: 1024px) {
    .not-found {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
}

.not-found h1 {
    font-size: 2rem;
    color: #333;
}
</style>