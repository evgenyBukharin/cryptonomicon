<template>
    <div class="page container">
        <h1 class="mb-4">Панель администратора</h1>
        <div class="row row-cols-2 g-4">
            <div class="col" v-for="(user, i) in users" :key="i">
                <div class="card">
                    <svg
                        class="card-img-top"
                        width="100%"
                        height="25"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        preserveAspectRatio="xMidYMid slice"
                        focusable="false"
                    >
                        <rect width="100%" height="100%" fill="#0d6efd"></rect>
                    </svg>
                    <div class="card-body d-flex justify-content-between">
                        <div class="mw-90">
                            <h3 class="card-title">
                                {{ "#" + user.id + " " + user.name + " " + user.surname }}
                            </h3>
                            <h5 class="card-title">Логин: {{ user.login }}</h5>
                            <h5 class="card-title">Email: {{ user.email }}</h5>
                            <h5 class="card-title">Аккаунт создан: {{ user.regDate }}</h5>
                            <h5 class="card-title">Роль: {{ user.role }}</h5>
                            <button v-if="user.id !== $store.state.userId" class="btn btn-danger text-white" @click="deleteUser(user.id)">
                                Удалить аккаунт
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return {
            users: [],
        };
    },
    methods: {
        async getData() {
            this.users = [];
            axios.get("../php/getUsers.php").then((response) => this.pushUsers(response.data));
        },
        pushUsers(response) {
            response.forEach((user) => {
                this.users.push(user);
            });
        },
        deleteUser(deleteUserId) {
            console.log(this.users, deleteUserId);
            axios
                .post("../php/deleteUser.php", {
                    userId: deleteUserId,
                })
                .then(() => {
                    this.users.splice(
                        this.users.findIndex((user) => user.id == deleteUserId),
                        1
                    );
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    },
    mounted() {
        this.$store.commit("updateUserId", localStorage.getItem("userId"));
        if (this.$store.state.userId == 1) {
            this.getData();
        } else {
            this.$store.commit("showModal", "У вас нет прав администратора для доступа к этой странице.");
            this.$router.push("/");
        }
    },
};
</script>
