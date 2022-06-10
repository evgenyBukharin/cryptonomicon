<template>
    <div class="page container">
        <form class="w-30" @submit.prevent="handleLogin()">
            <h1 class="h3 mb-3 fw-normal">Форма авторизации</h1>
            <div class="form-floating">
                <input type="text" class="form-control mb-2" id="floatingInput" placeholder="Ваш логин" v-model="$store.state.login" />
                <label for="floatingInput">Введите ваш логин</label>
            </div>
            <div class="form-floating">
                <input
                    type="password"
                    class="form-control mb-2"
                    id="floatingPassword"
                    placeholder="Password"
                    v-model="$store.state.password"
                />
                <label for="floatingPassword">Введите пароль</label>
            </div>
            <button class="w-100 btn btn-lg btn-primary" type="submit">Войти</button>
            <h4>
                <router-link class="nav-link" to="/register"
                    >Еще не зарегистированы? <span class="text-decoration-underline">Зарегистрироваться</span></router-link
                >
            </h4>
        </form>
    </div>
</template>
<script>
import axios from "axios";
export default {
    methods: {
        handleLogin() {
            if (this.$store.state.login !== "" && this.$store.state.password !== "") {
                axios
                    .post("../php/login.php", {
                        login: this.$store.state.login,
                        password: this.$store.state.password,
                    })
                    .then((response) => this.handleSuccess(response.data));
            } else {
                this.$store.commit("showModal", "Пожалуйста, заполните все поля.");
            }
        },
        handleSuccess(data) {
            if (data[0] == "Авторизация прошла успешно") {
                if (data[1]) {
                    this.$store.commit("updateUserId", data[1]);
                    this.$store.commit("updateUserRole", data[2]);
                    localStorage.setItem("userId", data[1]);
                    localStorage.setItem("userRole", data[2]);
                    if (localStorage.getItem("tickers" + this.$store.state.userId) == null) {
                        localStorage.setItem("tickers" + this.$store.state.userId, JSON.stringify([]));
                    }
                    this.$store.commit("clearTickers");
                    if (data[2] == "admin") {
                        this.$router.push("/admin");
                    } else {
                        this.$router.push("/");
                    }
                    this.$store.commit("showModal", "Вы успешно авторизированны");
                    this.$store.commit("clearAuthForm");
                }
            } else {
                this.$store.commit("showModal", data[0]);
            }
        },
    },
};
</script>
<style></style>
