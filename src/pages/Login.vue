<template>
    <form class="w-30" @submit.prevent="sendRegData">
        <h1 class="h3 mb-3 fw-normal">Пожалуйста, войдите</h1>
        <div class="form-floating">
            <input
                type="text"
                class="form-control mb-2"
                id="floatingInput"
                placeholder="login"
                v-model="login"
            />
            <label for="floatingInput">Введите ваш логин</label>
        </div>
        <div class="form-floating">
            <input
                type="password"
                class="form-control mb-2"
                id="floatingPassword"
                placeholder="Password"
                v-model="password"
            />
            <label for="floatingPassword">Введите пароль</label>
        </div>
        <button class="w-100 btn btn-lg btn-primary" type="submit">
            Войти
        </button>
    </form>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return {
            login: "",
            password: "",
        };
    },
    methods: {
        sendRegData() {
            console.log(this.login, this.password);
            axios
                .post("../php/login.php", {
                    login: this.login,
                    password: this.password,
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    },
};
</script>
<style></style>
