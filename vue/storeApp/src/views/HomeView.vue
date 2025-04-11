<template>
  <div class="home">
    <!-- Loader -->
    <Apploader :visible="promotionsLoading" />

    <RouterLink v-for="promotion in promotionsList" :to="`/promotion/${promotion.id}`" :key="promotion.id">
      <PromotionTile v-bind:promotion="promotion" />
    </RouterLink>
  </div>
</template>

<script>
import PromotionTile from "@/components/PromotionTile.vue";
import Apploader from "@/components/Apploader.vue";

export default {
  name: "HomeView",
  components: { PromotionTile, Apploader },
  created() {
    this.$store.dispatch("FETCH_PROMOTIONS"); // Wywołanie akcji ładowania promocji
  },
  computed: {
    promotionsList() {
      return this.$store.getters.GET_PROMOTIONS_LIST; // Pobiera listę promocji z Vuex
    },
    promotionsLoading() {
      return this.$store.getters.GET_PROMOTIONS_LOADING; // Pobiera stan ładowania z Vuex
    },
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  height: 100%;
}

a {
  display: block;
  width: 80%;
}
</style>