<template>
    <h1 class="mb-4">Топ 10 - лист валют за последние 24 часа</h1>
    <div class="row row-cols-2 g-4">
        <div class="col" v-for="(wallet, i) in walletsList" :key="i">
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
                                +i +
                                1 +
                                " " +
                                wallet.CoinInfo.FullName +
                                " " +
                                wallet.DISPLAY.USD.FROMSYMBOL
                            }}
                        </h5>
                        <p class="card-text">
                            <span class="d-block"
                                >Дата создания валюты:
                                {{ wallet.CoinInfo.AssetLaunchDate }}</span
                            >
                            <span class="d-block"
                                >Цена колеблется около:
                                {{ wallet.DISPLAY.USD.PRICE }}</span
                            >
                            <span class="d-block"
                                >Изменение цены за ДЕНЬ:
                                {{ wallet.RAW.USD.CHANGEDAY }}</span
                            >
                            <span class="d-block"
                                >Изменение цены за последний ЧАС:
                                {{ wallet.DISPLAY.USD.CHANGEHOUR }}</span
                            >
                            <span class="d-block"
                                >Наибольшая стоимость за сегодня:
                                {{ wallet.DISPLAY.USD.HIGHDAY }}</span
                            >
                            <span class="d-block"
                                >Наимнеьшая стоимость за сегодня:
                                {{ wallet.DISPLAY.USD.LOWDAY }}</span
                            >
                        </p>
                    </div>
                    <img
                        style="width: 150px; height: 150px"
                        v-bind:src="
                            'https://www.cryptocompare.com' +
                            wallet.CoinInfo.ImageUrl
                        "
                        :alt="wallet.CoinInfo.FullName + ' image'"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            walletsList: [],
        };
    },
    methods: {
        async getData() {
            const func = await fetch(
                `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&`
            );
            const data = await func.json();
            if (data.Message == "Success") {
                this.walletsList = data.Data;
            } else if (data.Response == "Error") {
                console.log("Ошибочка да то есть");
            }
        },
    },
    created() {
        this.getData();
    },
};
</script>
<style lang="scss">
.mw-75 {
    max-width: 75%;
}
</style>
