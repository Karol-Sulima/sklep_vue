<template>
  <div class="Header">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/:pathMatch(.*)*">Brak</RouterLink>
      <RouterLink to="/register">Register</RouterLink>
      <RouterLink to="/search">Search</RouterLink>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style lang="scss" scoped></style>