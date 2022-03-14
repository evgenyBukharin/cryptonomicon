<template>
    <Add-ticker @add-ticker="add" />
    <div class="d-flex align-items-center mt-3">
        <h5 class="mb-0 me-2">Фильтр:</h5>
        <input
            v-model.trim="$store.state.filter"
            @input="
                $store.state.filter = $tore.filter.toUpperCase();
                $store.state.page = 1;
            "
            type="text"
            class="form-control form-control-md w-15"
            placeholder="Название валюты"
        />
    </div>

    <hr class="mb-3 mt-3" />

    <div v-if="this.$store.state.tickers.length > 0" class="mb-3">
        <button class="btn btn-success me-2" @click="$store.state.page--" :disabled="$store.state.page == 1">Назад</button>
        <button class="btn btn-success" @click="$store.state.page++" :disabled="!$store.state.hasNextPage">Вперед</button>
    </div>

    <div class="container">
        <div class="row row-cols-4 g-3">
            <div class="col" v-for="(t, i) in filteredTickers()" :key="i">
                <div
                    class="card border-4"
                    :class="{
                        'border-primary': $store.state.selectedTicker == t,
                    }"
                    @click="selectTicker(t)"
                >
                    <div class="card-body d-flex flex-column">
                        <h3 class="card-title text-center">
                            <router-link :to="/wallet/ + t.name"> {{ t.name }} </router-link> - {{ t.dependence }}
                        </h3>
                        <h4 class="card-title text-center">{{ t.price }}</h4>
                        <button
                            @click.stop="deleteTicker(t)"
                            class="btn"
                            :class="{
                                'btn-primary': $store.state.selectedTicker == t,
                                'btn-secondary': $store.state.selectedTicker !== t,
                            }"
                        >
                            Удалить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Wallet-graph :btnVisible="true" :graphSelWidth="'20px'" :title="false" />
</template>
<script>
import AddTicker from "../components/AddTicker.vue";
import WalletGraph from "../components/WalletGraph.vue";
export default {
    name: "App",
    components: { AddTicker, WalletGraph },
    props: ["userId"],
    methods: {
        add(ticker, tickerDependence) {
            // Проверка на существование тикера
            if (this.alreadyExists(ticker, tickerDependence)) {
                return;
            }
            const currentTicker = {
                name: ticker,
                price: "-",
                dependence: tickerDependence,
            };
            this.$store.state.tickers.push(currentTicker);
            this.subscribeOnUpdates(currentTicker);
            localStorage.setItem("tickers" + String(localStorage.getItem("userId")), JSON.stringify(this.$store.state.tickers));
            this.$store.state.ticker = "";
            this.$store.state.filter = "";
        },
        deleteTicker(tickerToDelete) {
            this.$store.state.tickers.splice(this.$store.state.tickers.indexOf(tickerToDelete), 1);
            if (
                tickerToDelete.name == this.$store.state.selectedTicker?.name &&
                tickerToDelete.dependence == this.$store.state.selectedTicker?.dependence
            ) {
                this.$store.state.selectedTicker = null;
                this.$store.state.graphData = [];
            }
            clearInterval(tickerToDelete.intId);
            let storagedTickers = JSON.parse(localStorage.getItem("tickers" + String(localStorage.getItem("userId"))));
            storagedTickers.splice(
                storagedTickers.findIndex((ticker) => {
                    tickerToDelete.name == ticker.name && tickerToDelete.dependence == ticker.name;
                }),
                1
            );
            localStorage.setItem("tickers" + String(localStorage.getItem("userId")), JSON.stringify(storagedTickers));
        },
        alreadyExists(ticker, dependence) {
            let v = false;
            this.$store.state.tickers.forEach((t) => {
                if (t.name == ticker && t.dependence == dependence) {
                    v = true;
                }
            });
            return v;
        },
        subscribeOnUpdates(ticker) {
            let intervalId = setInterval(async () => {
                const func = await fetch(
                    `https://min-api.cryptocompare.com/data/price?fsym=${ticker.name}&tsyms=${ticker.dependence}&api_key=12b3b18cc96834a9aeed3f00da3ad8f961ce337a5023711a8bcc1796b8d19adc`
                );
                const data = await func.json();
                if (data.Response == "Error") {
                    clearInterval(intervalId);
                    this.$store.state.tickers.splice(this.$store.state.tickers.indexOf(ticker), 1);
                    let storagedTickers = JSON.parse(localStorage.getItem("tickers" + String(localStorage.getItem("userId"))));
                    storagedTickers.splice(
                        storagedTickers.findIndex((t) => {
                            ticker.name == t.name && ticker.dependence == t.name;
                        }),
                        1
                    );
                    localStorage.setItem("tickers" + String(localStorage.getItem("userId")), JSON.stringify(storagedTickers));
                }
                this.$store.state.tickers.find((t) => t.name === ticker.name && t.dependence == ticker.dependence).price =
                    data[ticker.dependence] > 1 ? data[ticker.dependence].toFixed(2) : data[ticker.dependence].toPrecision(2);
                if (
                    ticker.name == this.$store.state.selectedTicker?.name &&
                    ticker.dependence == this.$store.state.selectedTicker?.dependence
                ) {
                    this.$store.state.graphData.push(data[ticker.dependence]);
                }
                this.$store.state.tickers.find((t) => ticker.name == t.name && ticker.dependence == t.dependence).intId = intervalId;
            }, 2000);
            return intervalId;
        },
        selectTicker(tickerToSelect) {
            if (this.$store.state.selectedTicker !== tickerToSelect) {
                this.$store.state.selectedTicker = tickerToSelect;
                this.$store.state.graphData = [];
            }
        },
        filteredTickers() {
            const filteredTickers = this.$store.state.tickers.filter((ticker) => ticker.name.includes(this.$store.state.filter));
            this.$store.state.hasNextPage = filteredTickers.length > this.end;
            return filteredTickers.slice(this.start, this.end);
        },
    },
    computed: {
        start() {
            return (this.$store.state.page - 1) * this.$store.state.tickersPerPage;
        },
        end() {
            return this.$store.state.page * this.$store.state.tickersPerPage;
        },
    },
    created() {
        let savedTickers = JSON.parse(localStorage.getItem("tickers" + String(localStorage.getItem("userId"))));
        if (savedTickers?.length > 0) {
            savedTickers.forEach((ticker) => {
                this.$store.state.tickers.push(ticker);
            });
        }
        this.$store.state.tickers.forEach((t) => {
            this.subscribeOnUpdates(t);
        });
    },
    watch: {
        $route() {
            this.$store.state.tickers.forEach((ticker) => {
                clearInterval(ticker.intId);
            });
        },
    },
};
</script>
<style lang="scss">
.cursor-pointer {
    cursor: pointer;
}
.p {
    &-10 {
        padding: 10px;
    }
}
</style>
