<template>
    <div class="page container">
        <div class="d-flex align-items-center justify-content-center">
            <div class="text-center">
                <h1 class="display-1 fw-bold">404</h1>
                <p class="fs-3"><span class="text-danger">Упсс!</span> Страница не найдена.</p>
                <p class="lead">Страница на которой вы находитесь не существует.</p>
                <router-link class="btn btn-primary" aria-current="page" to="/">На главную</router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        this.$store.commit("updateUserId", localStorage.getItem("userId"));
    },
};
</script>
<style lang="scss"></style>
