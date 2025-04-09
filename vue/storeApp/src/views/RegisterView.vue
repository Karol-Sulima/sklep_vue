<template>
    <div class="registerView">
        <div v-show="exists" class="info">
            <h1>Info</h1>
            <p>User już istnieje</p>
        </div>
        <form @submit.prevent="onSubmit" v-show="!exists">
            <h3>Register Form</h3>
            <div v-show="error" class="error">{{ error }}</div>
            <input v-model="email" placeholder="Enter your email" />
            <input type="password" v-model="password" placeholder="Enter your password" />
            <button type="submit" :disabled="disabled">Register</button>
        </form>
    </div>
</template>

<script>
import { registerUser } from "@/api/index.js";

export default {
    name: "RegisterView",
    data() {
        return {
            error: "",
            email: "",
            password: "",
            exists: false,
            loading: false,
        };
    },
    computed: {
        disabled() {
            return this.email.length < 3 || this.password.length < 3;
        },
    },
    methods: {
        async onSubmit() {
            this.loading = true;
            this.error = "";
            this.exists = false; // Resetuje flagę przed próbą rejestracji

            try {
                const response = await registerUser({
                    email: this.email,
                    password: this.password,
                });

                if (response.exists) {
                    this.exists = true; // Ustaw flagę, jeśli użytkownik istnieje
                } else {
                    alert("User registered successfully!");
                    this.email = "";
                    this.password = "";
                }
            } catch (err) {
                if (err.status === 409) {
                    // Obsługa błędu 409 (użytkownik już istnieje)
                    this.exists = true;
                } else {
                    console.error(err);
                    this.error = "Failed to register user. Please try again.";
                }
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

<style scoped>
.registerView {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

form,
.info {
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

h3,
h1 {
    text-align: center;
}
</style>