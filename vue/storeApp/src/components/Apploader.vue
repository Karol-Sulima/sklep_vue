<template>
    <div class="loader" v-if="visible">
        <div class="spinner"></div>
    </div>
</template>

<script>
export default {
    name: "Apploader",
    props: {
        visible: {
            type: Boolean,
            required: true, // Determines if the loader should be visible
        },
    },
};
</script>

<style scoped>
.loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100% !important;
    /* Ensure it covers the full width of the viewport */
    height: 100vh;
    /* Ensure it covers the full height of the viewport */
    background-color: rgba(0, 0, 0, 0.5);
    /* Semi-transparent background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    /* Ensure it appears above other elements */
}

.spinner {
    width: 50px;
    height: 50px;
    border: 5px solid rgba(255, 255, 255, 0.3);
    border-top: 5px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>