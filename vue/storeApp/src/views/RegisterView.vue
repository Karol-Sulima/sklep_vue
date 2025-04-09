<template>
    <div class="registerView">
        <form @submit="onSubmit" v-show="!exists">
            <h3>Register Form</h3>
            <div v-show="error">{{ error }} </div>
            <input v-model="email" placeholder="Enter your mail" />
            <input type="password" v-model="password" placeholder="Enter your password" />

            <button type="submit" :disabled="disabled">register</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "RegisterView"
}
</script>

<style>
.registerView {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

form {
    display: flex;
    flex-direction: column;
    gap: 30px;
    background-color: rgb(176, 239, 239);
    padding: 50px;
    border-radius: 25px;
}

form>button {
    background-color: blue;
    color: white;
    padding: 5px;
    border-radius: 5px;
    border: none;
    outline: none;
    transition: transform 0.3s ease;
}

form>input {
    width: 200px;
    padding: 3px;
    border-radius: 5px;
    border: none;
}

form>button:hover {
    transform: scale(1.2);
}

h3 {
    text-align: center;
}
</style>