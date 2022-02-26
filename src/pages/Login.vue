<template>
    <form class="w-30" @submit.prevent="sendLoginData()">
        <h1 class="h3 mb-3 fw-normal">Пожалуйста, войдите</h1>
        <div class="form-floating">
            <input type="text" class="form-control mb-2" id="floatingInput" placeholder="login" v-model="login" />
            <label for="floatingInput">Введите ваш логин</label>
        </div>
        <div class="form-floating">
            <input type="password" class="form-control mb-2" id="floatingPassword" placeholder="Password" v-model="password" />
            <label for="floatingPassword">Введите пароль</label>
        </div>
        <button class="w-100 btn btn-lg btn-primary" type="submit">Войти</button>
    </form>
    <h4>
        <router-link class="nav-link" to="/register">Еще не зарегистированы? Зарегистрироваться</router-link>
    </h4>
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
        sendLoginData() {
            axios
                .post("../php/login.php", {
                    login: this.login,
                    password: this.password,
                })
                .then((response) => this.handleSuccess(response.data));
        },
        handleSuccess(data) {
            if (data[0] == "Авторизация прошла успешно") {
                if (data[1]) {
                    localStorage.setItem("userId", data[1]);
                    if (localStorage.getItem("tickers" + String(data[1])) == null) {
                        localStorage.setItem("tickers" + localStorage.getItem("userId"), []);
                    }
                    location.href = "/";
                }
            } else {
                console.log(data[0]);
            }
        },
    },
};
</script>
<style></style>
