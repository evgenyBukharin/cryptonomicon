<template>
    <div class="page container">
        <form class="w-60" @submit.prevent="sendRegData">
            <h1 class="h3 mb-3 fw-normal">Пожалуйста, зарегистрируйтесь</h1>
            <div class="form-floating">
                <input type="text" class="form-control mb-2 w-50" id="floatingInput1" placeholder="login" v-model="$store.state.regLogin" />
                <label for="floatingInput1">Введите ваш логин</label>
            </div>
            <div class="form-floating">
                <input
                    type="password"
                    class="form-control mb-2 w-50"
                    id="floatingPassword2"
                    placeholder="Password"
                    v-model="$store.state.regPassword"
                />
                <label for="floatingPassword2">Введите пароль</label>
            </div>
            <div class="form-floating">
                <input
                    type="password"
                    class="form-control mb-2 w-50"
                    id="floatingPassword3"
                    placeholder="PasswordConf"
                    v-model="$store.state.passwordConf"
                />
                <label for="floatingPassword3">Подтвердите пароль</label>
            </div>
            <div class="form-floating">
                <input type="text" class="form-control mb-2 w-50" id="floatingPassword4" placeholder="name" v-model="$store.state.name" />
                <label for="floatingPassword4">Введите ваше имя</label>
            </div>
            <div class="form-floating">
                <input
                    type="text"
                    class="form-control mb-2 w-50"
                    id="floatingPassword5"
                    placeholder="surname"
                    v-model="$store.state.surname"
                />
                <label for="floatingPassword5">Введите вашу фамилию</label>
            </div>
            <div class="form-floating">
                <input
                    type="text"
                    class="form-control mb-2 w-50"
                    id="floatingPassword6"
                    placeholder="surname"
                    v-model="$store.state.email"
                />
                <label for="floatingPassword6">Введите ваш email</label>
            </div>
            <div class="form-check mb-2">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="$store.state.rules" />
                <label class="form-check-label" for="flexCheckDefault"
                    >Согласен с <router-link to="/rules">политикой конфиденциальности</router-link></label
                >
            </div>
            <button class="btn btn-lg btn-primary w-50" type="submit">Зарегистрироваться</button>
        </form>
    </div>
</template>
<script>
import axios from "axios";
export default {
    methods: {
        sendRegData() {
            if (/^[\w]{3,}/i.test(this.$store.state.regLogin)) {
                if (/^[A-zА-я0-9,./;'\-=+_|':?><`~*@]{6,}/.test(this.$store.state.regPassword)) {
                    if (this.$store.state.regPassword == this.$store.state.passwordConf) {
                        if (/[А-Яа-яЁё\s-]{2,}/.test(this.$store.state.name)) {
                            if (/[А-Яа-яЁё\s-]{2,}/.test(this.$store.state.surname)) {
                                if (/^([A-z0-9_.-]{2,})@([A-z0-9_-]{2,}).([A-z]{2,})/.test(this.$store.state.email)) {
                                    if (this.$store.state.rules == true) {
                                        axios
                                            .post("../php/reg.php", {
                                                login: this.$store.state.regLogin,
                                                password: this.$store.state.regPassword,
                                                name: this.$store.state.name,
                                                surname: this.$store.state.surname,
                                                email: this.$store.state.email,
                                            })
                                            .then((response) => {
                                                this.handleSuccess(response.data);
                                            })
                                            .catch(function (error) {
                                                console.log(error);
                                            });
                                    } else {
                                        this.$store.commit("showModal", "Согласитесь с правилами регистрации");
                                    }
                                } else {
                                    this.$store.commit(
                                        "showModal",
                                        "Адрес электронной почты должен написан в соответствии с этой маской XXX@XXX.XXX (количество «X» должно быть более двух и только латинские буквы после точки)."
                                    );
                                }
                            } else {
                                this.$store.commit(
                                    "showModal",
                                    "Фамилия должна состоять только из русских букв и быть длиной более одного символа."
                                );
                            }
                        } else {
                            this.$store.commit(
                                "showModal",
                                "Имя должно состоять только из русских букв и быть длиной более одного символа."
                            );
                        }
                    } else {
                        this.$store.commit("showModal", "Введенные пароли не совпадают.");
                    }
                } else {
                    this.$store.commit("showModal", "Пароль должен состоять как минимум из 6 символов.");
                }
            } else {
                this.$store.commit(
                    "showModal",
                    "Логин должен состоять только из английских букв, цифр или знака подчеркивания, длиннее двух символов."
                );
            }
        },
        handleSuccess(message) {
            if (message == "Регистрация прошла успешно. Теперь вы можете авторизироваться в ваш аккаунт.") {
                this.$router.push("/login");
                this.$store.commit("showModal", "Вы успешно зарегистировались. Можете войти в свой аккаунт");
            } else {
                this.$store.commit("showModal", message);
            }
        },
    },
    mounted() {
        this.$store.commit("updateUserId", localStorage.getItem("userId"));
    },
};
</script>
<style lang="scss"></style>
