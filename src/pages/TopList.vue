<template>
    <div class="page container">
        <h1 class="mb-4">Топ - лист валют за последние 24 часа</h1>
        <div class="row row-cols-2 g-4">
            <div class="col" v-for="(wallet, i) in paginatedtopWalletsList()" :key="i">
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
                        <div class="mw-75">
                            <h5 class="card-title">
                                #{{ i + 1 + ($store.state.topWalletsPage - 1) * $store.state.walletsPerPage + " " }}
                                <router-link class="" aria-current="page" :to="'/wallet/' + wallet.CoinInfo?.Internal">{{
                                    wallet.CoinInfo?.FullName
                                }}</router-link>
                                {{ " " + wallet.DISPLAY?.USD.FROMSYMBOL }}
                            </h5>
                            <p class="card-text">
                                <span class="d-block">Дата создания валюты: {{ wallet.CoinInfo?.AssetLaunchDate }}</span>
                                <span class="d-block">Цена колеблется около: {{ wallet.DISPLAY?.USD.PRICE }}</span>
                                <span class="d-block">Изменение цены за ДЕНЬ: {{ wallet.RAW?.USD.CHANGEDAY }}</span>
                                <span class="d-block">Изменение цены за последний ЧАС: {{ wallet.DISPLAY?.USD.CHANGEHOUR }}</span>
                                <span class="d-block">Наибольшая стоимость за сегодня: {{ wallet.DISPLAY?.USD.HIGHDAY }}</span>
                                <span class="d-block">Наимнеьшая стоимость за сегодня: {{ wallet.DISPLAY?.USD.LOWDAY }}</span>
                            </p>
                        </div>
                        <img
                            width="150"
                            height="150"
                            v-bind:src="'https://www.cryptocompare.com' + wallet.CoinInfo?.ImageUrl"
                            :alt="wallet.CoinInfo?.FullName + ' image'"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="pages-container d-flex justify-content-center mt-3">
            <button
                v-for="(page, i) in $store.state.topWalletsPages"
                :key="i"
                class="btn btn-outline-primary me-2"
                @click="$store.state.topWalletsPage = page"
            >
                {{ page }}
            </button>
        </div>
        <div class="d-flex justify-content-center my-3">
            <button
                class="btn btn-primary w-auto"
                @click="$store.dispatch('getTopListData', (this.$store.state.topWalletsLimit += this.$store.state.walletsPerPage))"
                :disabled="$store.state.moreDataDisabled"
            >
                Загрузить еще
            </button>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        paginatedtopWalletsList() {
            return this.$store.state.topWalletsList.slice(this.start, this.end);
        },
    },
    created() {
        if (this.$store.state.topWalletsList.length !== null) {
            this.$store.dispatch("getTopListData");
        }
    },
    computed: {
        start() {
            return this.$store.state.topWalletsPage == this.lastPage
                ? this.$store.state.topWalletsLimit - this.extraWalletCount
                : (this.$store.state.topWalletsPage - 1) * this.$store.state.walletsPerPage;
        },
        end() {
            return this.$store.state.topWalletsPage == this.lastPage
                ? this.$store.state.topWalletsLimit
                : this.$store.state.topWalletsPage * this.$store.state.walletsPerPage;
        },
        extraWalletCount() {
            return this.$store.state.topWalletsList.length % this.$store.state.walletsPerPage;
        },
        lastPage() {
            return Math.ceil(this.$store.state.topWalletsListLength / this.$store.state.walletsPerPage);
        },
    },
};
</script>
<style lang="scss">
.mw-75 {
    max-width: 75%;
}
</style>
