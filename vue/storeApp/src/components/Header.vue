<template>
  <div class="Header">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/search">Search</RouterLink>
    </nav>
    <nav class="auth-nav">
      <div v-if="user">
        <span>Welcome, {{ user }}</span>
        <button @click="logout">Logout</button>
      </div>
      <div class="buttonbox" v-else>
        <RouterLink to="/login">
          <button>Login</button>
        </RouterLink>
        <RouterLink to="/register">
          <button>Register</button>
        </RouterLink>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Header",
  computed: {
    // Get the current user from Vuex store
    user() {
      return this.$store.getters.getUserEmail;
    },
  },
  methods: {
    // Logout the user
    logout() {
      this.$store.dispatch("logoutUser")
        .then(() => {
          this.$router.push("/login");
        })
        .catch((error) => {
          console.error("Logout failed:", error);
        });
    },
  },
};
</script>

<style scoped>
.Header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: rgb(26, 38, 38);
  border-bottom: 1px solid #ddd;
}

span {
  color: white;
}

nav {
  display: flex;
  gap: 15px;
}

.buttonbox {
  display: flex;
  gap: 20px;
}

.auth-nav {
  display: flex;
  align-items: center;

  gap: 30px !important;
}

.auth-nav button {
  background-color: blue;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  width: 100px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.auth-nav button:hover {
  background-color: darkblue;
}

.auth-nav span {
  font-weight: bold;
  margin-right: 10px;
}
</style>