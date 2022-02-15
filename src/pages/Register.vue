<template>
    <form class="w-30" @submit.prevent="sendRegData">
        <h1 class="h3 mb-3 fw-normal">Пожалуйста, войдите</h1>
        <div class="form-floating">
            <input
                type="text"
                class="form-control mb-2"
                id="floatingInput1"
                placeholder="login"
                v-model="login"
            />
            <label for="floatingInput1">Введите ваш логин</label>
        </div>
        <div class="form-floating">
            <input
                type="password"
                class="form-control mb-2"
                id="floatingPassword2"
                placeholder="Password"
                v-model="password"
            />
            <label for="floatingPassword2">Введите пароль</label>
        </div>
        <div class="form-floating">
            <input
                type="password"
                class="form-control mb-2"
                id="floatingPassword3"
                placeholder="PasswordConf"
                v-model="passwordConf"
            />
            <label for="floatingPassword3">Подтвердите пароль</label>
        </div>
        <div class="form-floating">
            <input
                type="text"
                class="form-control mb-2"
                id="floatingPassword4"
                placeholder="name"
                v-model="name"
            />
            <label for="floatingPassword4">Введите ваше имя</label>
        </div>
        <div class="form-floating">
            <input
                type="text"
                class="form-control mb-2"
                id="floatingPassword5"
                placeholder="surname"
                v-model="surname"
            />
            <label for="floatingPassword5">Введите вашу фамилию</label>
        </div>
        <div class="form-floating">
            <input
                type="email"
                class="form-control mb-2"
                id="floatingPassword6"
                placeholder="surname"
                v-model="email"
            />
            <label for="floatingPassword6">Введите ваш email</label>
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
            passwordConf: "",
            name: "",
            surname: "",
            email: "",
        };
    },
    methods: {
        sendRegData() {
            axios
                .post("../php/reg.php", {
                    login: this.login,
                    password: this.password,
                    name: this.name,
                    surname: this.surname,
                    email: this.email,
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
<style lang="scss"></style>
