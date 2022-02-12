<template>
    <h1>Общая информация о валюте {{ $route.params.walletName }}</h1>
    <div class="d-flex align-items-center">
        <h4 class="me-3">Показать изменение курса валюты за последние:</h4>
        <input
            v-model="graphDays"
            type="text"
            class="form-control form-control-md w-20 me-2"
            placeholder="Введите количество дней"
        />
        <div class="btn btn-success" @click="updateGraphData(this.graphDays)">
            Показать
        </div>
    </div>
    <Wallet-graph
        :selectedTicker="{ name: this.walletName, dependence: 'USD' }"
        :graphValues="this.graphData"
        @clearSelectedTicker="this.selectedTicker = null"
        :btnVisible="false"
        :graphSelWidth="'40px'"
        :title="this.currentLimit"
    />
</template>
<script>
import WalletGraph from "../components/WalletGraph.vue";
export default {
    data() {
        return {
            walletName: this.$route.params.walletName,
            graphData: [],
            graphDays: null,
            currentLimit: 30,
        };
    },
    components: { WalletGraph },
    methods: {
        async getGraphData(limit) {
            const f = await fetch(
                `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${this.walletName}&tsym=USD&limit=${limit}`
            );
            const data = await f.json();
            data.Data.Data.forEach((coinData) => {
                this.graphData.push(coinData.high);
            });
        },
        updateGraphData(limit) {
            this.getGraphData(limit);
            this.currentLimit = limit;
        },
    },
    created() {
        this.getGraphData(this.currentLimit);
    },
};
</script>
<style lang="scss"></style>
