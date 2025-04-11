<template>
    <div class="loginView">
        <!-- Loader -->
        <Apploader :visible="loading" />

        <form @submit.prevent="onSubmit">
            <h3>Login Form</h3>
            <div v-if="error" class="error">{{ error }}</div>
            <input v-model="email" placeholder="Enter your email" />
            <input type="password" v-model="password" placeholder="Enter your password" />
            <button type="submit" :disabled="disabled">Login</button>
        </form>
    </div>
</template>

<script>
import Apploader from "@/components/Apploader.vue";

export default {
    name: "LoginView",
    components: {
        Apploader,
    },
    data() {
        return {
            email: "",
            password: "",
            error: "",
            logged: false,
            loading: false, // Loader visibility state
        };
    },
    computed: {
        disabled() {
            return this.email.length < 3 || this.password.length < 3; // Minimum validation
        },
    },
    methods: {
        async onSubmit() {
            this.error = ""; // Reset error message
            this.loading = true; // Show loader
            try {
                // Dispatch login action to Vuex store
                await this.$store.dispatch("loginUser", { email: this.email, password: this.password });

                // Check if the user is logged in
                const userEmail = this.$store.getters.getUserEmail;
                if (userEmail) {
                    this.logged = true;
                    this.$router.push("/"); // Redirect to home page
                } else {
                    this.logged = false;
                }
            } catch (err) {
                console.error("Login failed:", err);
                this.error = "Invalid login credentials. Please try again.";
                this.logged = false;
            } finally {
                this.loading = false; // Hide loader
            }
        },
    },
};
</script>

<style scoped>
.loginView {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: rgb(176, 239, 239);
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

form>input {
    width: 250px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
}

form>button {
    background-color: blue;
    color: white;
    padding: 10px;
    border-radius: 5px;
    border: none;
    outline: none;
    font-size: 16px;
    cursor: pointer;
    transition: transform 0.3s ease, background-color 0.3s ease;
}

form>button:hover {
    transform: scale(1.1);
    background-color: darkblue;
}

form>button:disabled {
    background-color: gray;
    cursor: not-allowed;
}

.error {
    color: red;
    font-size: 14px;
    text-align: center;
}

h3 {
    text-align: center;
}
</style>