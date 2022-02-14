<template>
    <h1 class="mb-4">Топ - лист валют за последние 24 часа</h1>
    <div class="row row-cols-2 g-4">
        <div class="col" v-for="(wallet, i) in paginatedWalletsList()" :key="i">
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
                            #{{
                                i + 1 + (this.page - 1) * this.newsPerPage + " "
                            }}
                            <router-link
                                class=""
                                aria-current="page"
                                :to="'/wallet/' + wallet.CoinInfo?.Internal"
                                >{{ wallet.CoinInfo?.FullName }}</router-link
                            >
                            {{ " " + wallet.DISPLAY?.USD.FROMSYMBOL }}
                        </h5>
                        <p class="card-text">
                            <span class="d-block"
                                >Дата создания валюты:
                                {{ wallet.CoinInfo?.AssetLaunchDate }}</span
                            >
                            <span class="d-block"
                                >Цена колеблется около:
                                {{ wallet.DISPLAY?.USD.PRICE }}</span
                            >
                            <span class="d-block"
                                >Изменение цены за ДЕНЬ:
                                {{ wallet.RAW?.USD.CHANGEDAY }}</span
                            >
                            <span class="d-block"
                                >Изменение цены за последний ЧАС:
                                {{ wallet.DISPLAY?.USD.CHANGEHOUR }}</span
                            >
                            <span class="d-block"
                                >Наибольшая стоимость за сегодня:
                                {{ wallet.DISPLAY?.USD.HIGHDAY }}</span
                            >
                            <span class="d-block"
                                >Наимнеьшая стоимость за сегодня:
                                {{ wallet.DISPLAY?.USD.LOWDAY }}</span
                            >
                        </p>
                    </div>
                    <img
                        style="width: 150px; height: 150px"
                        v-bind:src="
                            'https://www.cryptocompare.com' +
                            wallet.CoinInfo?.ImageUrl
                        "
                        :alt="wallet.CoinInfo?.FullName + ' image'"
                    />
                </div>
            </div>
        </div>
    </div>
    <div class="pages-container d-flex justify-content-center mt-3">
        <button
            v-for="(page, i) in pages"
            :key="i"
            class="btn btn-outline-primary me-2"
            @click="this.page = page"
        >
            {{ page }}
        </button>
    </div>
    <div class="d-flex justify-content-center my-3">
        <button
            class="btn btn-primary w-auto"
            @click="this.getData((this.walletsLimit += this.newsPerPage))"
            :disabled="moreDataDisabled"
        >
            Загрузить еще
        </button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            walletsList: [],
            walletsLimit: 6,
            pages: [],
            moreDataDisabled: false,
            newsPerPage: 6,
            maxTopListLenght: 100,
            page: 1,
        };
    },
    methods: {
        async getData() {
            if (this.walletsLimit > this.maxTopListLenght) {
                this.walletsLimit = this.maxTopListLenght;
                this.moreDataDisabled = true;
            }
            this.pages = [];
            const func = await fetch(
                `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=${this.walletsLimit}&tsym=USD`
            );
            const data = await func.json();
            if (data.Message == "Success") {
                this.walletsList = data.Data;
            } else if (data.Response == "Error") {
                console.log("Ошибочка да то есть");
            }
            let pagesCount = Math.ceil(
                this.walletsList.length / this.newsPerPage
            );
            while (this.pages.length < pagesCount) {
                this.pages.push(this.pages.length + 1);
            }
        },
        paginatedWalletsList() {
            return this.walletsList.slice(this.start, this.end);
        },
    },
    created() {
        this.getData();
    },
    computed: {
        start() {
            return this.page == this.lastPage
                ? this.walletsLimit - this.extraWalletCount
                : (this.page - 1) * this.newsPerPage;
        },
        end() {
            return this.page == this.lastPage
                ? this.walletsLimit
                : this.page * this.newsPerPage;
        },
        extraWalletCount() {
            return this.walletsList.length % this.newsPerPage;
        },
        lastPage() {
            return Math.ceil(this.maxTopListLenght / this.newsPerPage);
        },
    },
};
</script>
<style lang="scss">
.mw-75 {
    max-width: 75%;
}
</style>
