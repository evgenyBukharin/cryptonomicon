<template>
    <header
        class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom"
    >
        <a
            href="/"
            class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
        >
            <svg class="bi me-2" width="40" height="32">
                <use xlink:href="#bootstrap"></use>
            </svg>
            <span class="fs-3">Cryptonomicon</span>
        </a>

        <ul class="nav nav-pills">
            <li class="nav-item">
                <router-link class="nav-link active me-2" to="/"
                    >На главную</router-link
                >
            </li>
            <li class="nav-item">
                <router-link class="nav-link active me-2" to="/topList"
                    >Топ-лист</router-link
                >
            </li>
            <li class="nav-item">
                <router-link class="nav-link active" to="/news"
                    >Новости</router-link
                >
            </li>
        </ul>
    </header>
</template>
<script>
export default {};
</script>
<style></style>
