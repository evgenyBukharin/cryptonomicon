<template>
    <Add-ticker @add-ticker="add" />
    <div class="d-flex align-items-center mt-3">
        <h5 class="mb-0 me-2">Фильтр:</h5>
        <input
            v-model.trim="filter"
            @input="
                this.filter = filter.toUpperCase();
                this.page = 1;
            "
            type="text"
            class="form-control form-control-md w-15"
            placeholder="Название валюты"
        />
    </div>
    <hr class="mb-3 mt-3" />
    <div v-if="this.tickers.length > 0" class="mb-3">
        <button
            class="btn btn-success me-2"
            @click="this.page--"
            :disabled="this.page == 1"
        >
            Назад
        </button>
        <button
            class="btn btn-success"
            @click="this.page++"
            :disabled="!this.hasNextPage"
        >
            Вперед
        </button>
    </div>

    <div class="container">
        <div class="row row-cols-4 g-3">
            <div class="col" v-for="(t, i) in filteredTickers()" :key="i">
                <div
                    class="card border-4"
                    :class="{
                        'border-primary': selectedTicker == t,
                    }"
                    @click="selectTicker(t)"
                >
                    <div class="card-body d-flex flex-column">
                        <h3 class="card-title text-center">
                            {{ t.name }} - {{ t.dependence }}
                        </h3>
                        <h4 class="card-title text-center">{{ t.price }}</h4>
                        <button
                            @click.stop="deleteTicker(t)"
                            class="btn"
                            :class="{
                                'btn-primary': selectedTicker == t,
                                'btn-secondary': selectedTicker !== t,
                            }"
                        >
                            Удалить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Wallet-graph
        :selectedTicker="this.selectedTicker"
        :graphValues="this.graphData"
        :btnVisible="true"
        :graphSelWidth="'20px'"
        @clearSelectedTicker="this.selectedTicker = null"
        :title="false"
    />
</template>
<script>
import AddTicker from "../components/AddTicker.vue";
import WalletGraph from "../components/WalletGraph.vue";
export default {
    name: "App",
    components: { AddTicker, WalletGraph },
    data() {
        return {
            tickers: [],
            selectedTicker: null,
            graphData: [],
            page: 1,
            filter: "",
            hasNextPage: false,
        };
    },
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
            this.tickers = [...this.tickers, currentTicker];
            this.subscribeOnUpdates(currentTicker);
            localStorage.setItem("tickers", JSON.stringify(this.tickers));
            this.ticker = "";
            this.filter = "";
        },
        deleteTicker(tickerToDelete) {
            this.tickers.splice(this.tickers.indexOf(tickerToDelete), 1);
            if (
                tickerToDelete.name == this.selectedTicker?.name &&
                tickerToDelete.dependence == this.selectedTicker?.dependence
            ) {
                this.selectedTicker = null;
                this.graphData = [];
            }
            clearInterval(tickerToDelete.intId);
            let storagedTickers = JSON.parse(localStorage.getItem("tickers"));
            storagedTickers.splice(
                storagedTickers.findIndex((ticker) => {
                    tickerToDelete.name == ticker.name &&
                        tickerToDelete.dependence == ticker.name;
                }),
                1
            );
            localStorage.setItem("tickers", JSON.stringify(storagedTickers));
        },
        alreadyExists(ticker, dependence) {
            let v = false;
            this.tickers.forEach((t) => {
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
                    this.tickers.splice(this.tickers.indexOf(ticker), 1);
                    let storagedTickers = JSON.parse(
                        localStorage.getItem("tickers")
                    );
                    storagedTickers.splice(
                        storagedTickers.findIndex((t) => {
                            ticker.name == t.name &&
                                ticker.dependence == t.name;
                        }),
                        1
                    );
                    localStorage.setItem(
                        "tickers",
                        JSON.stringify(storagedTickers)
                    );
                }
                this.tickers.find(
                    (t) =>
                        t.name === ticker.name &&
                        t.dependence == ticker.dependence
                ).price =
                    data[ticker.dependence] > 1
                        ? data[ticker.dependence].toFixed(2)
                        : data[ticker.dependence].toPrecision(2);
                if (
                    ticker.name == this.selectedTicker?.name &&
                    ticker.dependence == this.selectedTicker?.dependence
                ) {
                    this.graphData.push(data[ticker.dependence]);
                }
                this.tickers.find(
                    (t) =>
                        ticker.name == t.name &&
                        ticker.dependence == t.dependence
                ).intId = intervalId;
            }, 2000);
            return intervalId;
        },
        selectTicker(tickerToSelect) {
            if (this.selectedTicker !== tickerToSelect) {
                this.graphData = [];
                this.selectedTicker = tickerToSelect;
            }
        },
        filteredTickers() {
            const filteredTickers = this.tickers.filter((ticker) =>
                ticker.name.includes(this.filter)
            );
            this.hasNextPage = filteredTickers.length > this.end;
            return filteredTickers.slice(this.start, this.end);
        },
    },
    computed: {
        start() {
            return (this.page - 1) * 8;
        },
        end() {
            return this.page * 8;
        },
    },
    created() {
        let savedTickers = JSON.parse(localStorage.getItem("tickers"));
        if (savedTickers?.length > 0) {
            savedTickers.forEach((ticker) => {
                this.tickers.push(ticker);
            });
        }
        this.tickers.forEach((t) => {
            this.subscribeOnUpdates(t);
        });
    },
    watch: {
        $route() {
            this.tickers.forEach((ticker) => {
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

.w {
    &-15 {
        width: 15%;
    }
    &-20 {
        width: 20%;
    }
    &-30 {
        width: 30%;
    }
    &-40 {
        width: 40%;
    }
}
.p {
    &-10 {
        padding: 10px;
    }
}
</style>
