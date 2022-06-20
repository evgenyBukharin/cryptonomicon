<template>
    <div class="page container">
        <form class="w-30" @submit.prevent="handlePassChange()">
            <h1 class="h3 mb-3 fw-normal">Форма изменения пароля</h1>
            <div class="form-floating">
                <input type="text" class="form-control mb-2" id="floatingInput" placeholder="Ваш логин" v-model="$store.state.loginConf" />
                <label for="floatingInput">Введите ваш логин</label>
            </div>
            <div class="form-floating">
                <input
                    type="password"
                    class="form-control mb-2"
                    id="floatingPassword"
                    placeholder="Password"
                    v-model="$store.state.newPassword"
                />
                <label for="floatingPassword">Введите новый пароль</label>
            </div>
            <button class="w-100 btn btn-lg btn-primary" type="submit" :disabled="$store.state.disableChangeBtn">Изменить пароль</button>
            <p class="text-center mt-1" v-if="$store.state.disableChangeBtn">Вы уже изменили пароль.</p>
        </form>
    </div>
</template>
<script>
import axios from "axios";
export default {
    methods: {
        handlePassChange() {
            if (this.$store.state.loginConf !== "" && this.$store.state.newPassword !== "") {
                axios
                    .post("../php/updatePassword.php", {
                        userId: this.$store.state.userId,
                        loginConf: this.$store.state.loginConf,
                        newPassword: this.$store.state.newPassword,
                    })
                    .then((response) => {
                        this.$store.commit("showModal", response.data);
                        if (response.data == "Вы успешно изменили пароль.") {
                            this.$store.commit("disableChangeBtn");
                        }
                    });
            } else {
                this.$store.commit("showModal", "Какое-то из полей формы не заполнено");
            }
        },
    },
    mounted() {
        this.$store.commit("updateUserId", localStorage.getItem("userId"));
    },
};
</script>
<style lang="scss"></style>
