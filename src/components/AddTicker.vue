<template>
    <h1>Добавить валюту</h1>
    <div class="d-flex w-75">
        <button @click="add" type="button" class="btn btn-success me-2 h-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square me-2" viewBox="0 0 16 16">
                <path
                    d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                ></path>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
            </svg>
            Добавить
        </button>
        <input
            v-model="$store.state.ticker"
            @input="findMatches()"
            @keydown.enter="add"
            type="text"
            class="form-control form-control-md w-40"
            placeholder="Введите название валюты..."
        />
        <select class="form-select form-select-lg w-15 ms-2" v-model="$store.state.tickerDependence">
            <option v-for="(wallet, i) in $store.state.walletList" :key="i" :value="wallet">
                {{ wallet }}
            </option></select
        ><Add-dependence />
    </div>

    <div v-if="$store.state.walletMatches.length > 0" class="d-flex my-3 w-40">
        <div class="me-3" v-for="(match, i) in $store.state.walletMatches" :key="i">
            <button class="btn btn-secondary text-white rounded-3 text-uppercase" @click="addMatchedTicker(match)" :id="'autocompleteBtn' + (i + 1)">
                {{ match }}
            </button>
        </div>
        <img style="width: 14px; height: 14px" class="cursor-pointer" src="../assets/cancel.png" @click="$store.commit('closeMatchesBlock')" />
    </div>
</template>
<script>
import AddDependence from "./AddDependence.vue";
export default {
    components: { AddDependence },
    methods: {
        add() {
            if (this.$store.state.ticker.length === 0) {
                return;
            }
            if (this.alreadyExists(this.$store.state.ticker)) {
                return;
            }
            const currentTicker = {
                name: this.$store.state.ticker,
                price: "-",
                dependence: this.$store.state.tickerDependence,
            };
            this.$store.commit("addTicker", currentTicker);
            this.$store.commit("subscribeOnUpdates", currentTicker);
            localStorage.setItem("tickers" + this.$store.state.userId, JSON.stringify(this.$store.state.tickers));
        },
        addMatchedTicker(match) {
            if (this.alreadyExists(match)) {
                return;
            }
            const matchedTicker = {
                name: match,
                price: "-",
                dependence: this.$store.state.tickerDependence,
            };
            this.$store.commit("addMatchedTicker", matchedTicker);
            this.$store.commit("subscribeOnUpdates", matchedTicker);
            localStorage.setItem("tickers" + this.$store.state.userId, JSON.stringify(this.$store.state.tickers));
        },
        alreadyExists(tickerName) {
            for (let i = 0; i < this.$store.state.tickers.length; i++) {
                const ticker = this.$store.state.tickers[i];
                if (ticker.name == tickerName && ticker.dependence == this.$store.state.tickerDependence) {
                    return true;
                }
            }
            return false;
        },
        async getAllWallets() {
            const func = await fetch(
                `https://min-api.cryptocompare.com/data/all/coinlist?summary=true&api_key=12b3b18cc96834a9aeed3f00da3ad8f961ce337a5023711a8bcc1796b8d19adc`
            );
            const data = await func.json();
            for (const coin in data.Data) {
                if (Object.hasOwnProperty.call(data.Data, coin)) {
                    this.$store.commit("updateAllWallets", data.Data[coin].Symbol);
                }
            }
        },
        findMatches() {
            if (this.$store.state.ticker.length == 0) {
                this.$store.commit("noMatchesHandle");
                return;
            }
            this.$store.state.ticker = this.$store.state.ticker.toUpperCase();
            this.$store.commit("clearMatchesArray");
            this.$store.commit("updateWalletMatches");
            this.$store.commit("shuffleWalletMatches");
            this.$store.commit("reduceWalletMatchesLength");
        },
    },
    created() {
        this.getAllWallets();
    },
};
</script>
<style lang="scss"></style>
