<template>
  <div class="Header">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/:pathMatch(.*)*">Brak</RouterLink>
      <RouterLink to="/search">Search</RouterLink>
    </nav>
    <nav class="auth-nav">
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/register">Register</RouterLink>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style>
.auth-nav {
  display: flex;
  justify-content: space-between;
  margin-right: 20px;
}

.auth-nav>a {
  background-color: blue;
  padding: 10px;
  width: 100px;
  text-align: center;
  border-radius: 5px;
}
</style>