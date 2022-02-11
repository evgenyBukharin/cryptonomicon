<template>
    <h1>Страница {{ walletName }}</h1>
</template>
<script>
export default {
    data() {
        return {
            walletName: this.$route.params.walletName,
            lastMonthGraph: [],
        };
    },
    methods: {
        async getData() {
            const f = await fetch(
                "https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=30"
            );
            const data = await f.json();
            data.Data.Data.forEach((coinData) => {
                this.lastMonthGraph.push(coinData.high);
            });
        },
    },
    created() {
        this.getData();
    },
};
</script>
<style lang="scss"></style>
