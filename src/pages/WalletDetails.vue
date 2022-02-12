<template>
    <h1>Страница {{ $route.params.walletName }}</h1>
    <Wallet-graph
        :selectedTicker="{ name: this.walletName, dependence: 'USD' }"
        :graphValues="this.lastMonthGraph"
        @clearSelectedTicker="this.selectedTicker = null"
        :btnVisible="false"
    />
</template>
<script>
import WalletGraph from "../components/WalletGraph.vue";
export default {
    data() {
        return {
            walletName: this.$route.params.walletName,
            lastMonthGraph: [],
        };
    },
    components: { WalletGraph },
    methods: {
        async getData() {
            const f = await fetch(
                `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${this.walletName}&tsym=USD&limit=30`
            );
            const data = await f.json();
            data.Data.Data.forEach((coinData) => {
                this.lastMonthGraph.push(coinData.high);
            });
            console.log(this.lastMonthGraph);
        },
    },
    created() {
        this.getData();
    },
};
</script>
<style lang="scss"></style>
