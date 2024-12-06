<template>
  <div class="home">

    <RouterLink v-for="promotion in promotionsList" :to="`/promotion/${promotion.id}`" :key="promotion.id">
      <PromotionTile v-bind:promotion="promotion" />
    </RouterLink>
  </div>
</template>
<script>
import PromotionTile from "@/components/PromotionTile.vue"

export default {
  created() {
    this.$store.dispatch("FETCH_PROMOTIONS");
  },

  computed: {
    promotionsList() {
      return this.$store.getters.GET_PROMOTIONS_LIST;
    }
  },

  components: { PromotionTile }
}


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