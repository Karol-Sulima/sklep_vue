<script setup>
import { RouterView } from 'vue-router';
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import "@/styles/style.css";
import { useStore } from "vuex";
import { onBeforeMount } from "vue";

const store = useStore();

// Fetch the current user before the app is mounted
onBeforeMount(() => {
  store.dispatch("fetchCurrentUser");
});
</script>

<template>
  <div class="app-container">
    <Header />
    <div class="view-container">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.view-container {
  flex: 1;
  overflow: auto;
  justify-content: center;
  align-items: center;
}
</style>