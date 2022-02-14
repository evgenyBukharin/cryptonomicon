<template>
    <h1>Добавить тикет</h1>
    <div class="d-flex w-75">
        <Add-button @click="add" type="button" />
        <input
            v-model="ticker"
            @input="findMatches()"
            @keydown.enter="add"
            type="text"
            class="form-control form-control-md w-40"
            placeholder="Введите название валюты..."
        />
        <select
            class="form-select form-select-lg w-15 ms-2"
            v-model="tickerDependence"
        >
            <option value="USD" selected>USD</option>
            <option v-for="(wallet, i) in walletList" :key="i" :value="wallet">
                {{ wallet }}
            </option></select
        ><Add-dependence @addDependence="addNewDependence" />
    </div>
    <div v-if="walletMatches.length > 0" class="d-flex my-3 w-40">
        <div class="me-3" v-for="(match, i) in walletMatches" :key="i">
            <button
                class="btn btn-secondary text-white rounded-3 text-uppercase"
                @click="addTicker(match)"
                :id="'autocompleteBtn' + (i + 1)"
            >
                {{ match }}
            </button>
        </div>
        <img
            style="width: 14px; height: 14px"
            class="cursor-pointer"
            src="../assets/cancel.png"
            @click="
                this.walletMatches = [];
                this.ticker = '';
            "
        />
    </div>
</template>
<script>
import AddButton from "./AddButton.vue";
import AddDependence from "./AddDependence.vue";
export default {
    components: { AddButton, AddDependence },
    emits: {
        "add-ticker": (value) => typeof value === "string",
    },
    data() {
        return {
            ticker: "",
            tickerOverride: "",
            walletMatches: [],
            allWallets: [],
            walletList: ["RUB", "EUR", "ETH"],
            tickerDependence: "USD",
        };
    },
    methods: {
        add() {
            if (this.ticker.length === 0) {
                return;
            }
            this.$emit("add-ticker", this.ticker, this.tickerDependence);
            this.ticker = "";
        },
        addTicker(match) {
            this.$emit("add-ticker", match, this.tickerDependence);
            this.ticker = "";
        },
        async getAllWallets() {
            const func = await fetch(
                `https://min-api.cryptocompare.com/data/all/coinlist?summary=true&api_key=12b3b18cc96834a9aeed3f00da3ad8f961ce337a5023711a8bcc1796b8d19adc`
            );
            const data = await func.json();
            for (const coin in data.Data) {
                if (Object.hasOwnProperty.call(data.Data, coin)) {
                    this.allWallets.push(data.Data[coin].Symbol);
                }
            }
        },
        findMatches() {
            if (this.ticker.length == 0) {
                this.walletMatches.length = 0;
                return;
            }
            this.ticker = this.ticker.toUpperCase();
            this.walletMatches.length = 0;
            for (let i = 0; i < this.allWallets.length; i++) {
                let foundIndex = this.allWallets[i].indexOf(this.ticker);
                if (foundIndex !== -1) {
                    this.walletMatches.push(this.allWallets[i]);
                }
            }
            this.shuffle(this.walletMatches);
            if (this.walletMatches.length > 8) {
                this.walletMatches.length = 8;
            }
        },
        shuffle(array) {
            array.sort(() => Math.random() - 0.5);
        },
        addNewDependence(newDependence) {
            this.walletList.push(newDependence);
        },
    },
    created() {
        this.getAllWallets();
    },
};
</script>
<style lang="scss"></style>
