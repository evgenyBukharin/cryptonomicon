<template>
    <div class="container">
        <header-app />
        <h1>Добавить тикет</h1>
        <div class="d-flex w-75">
            <button
                type="button"
                class="btn btn-success me-2 h-auto"
                @click="add()"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-plus-square me-2"
                    viewBox="0 0 16 16"
                >
                    <path
                        d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                    ></path>
                    <path
                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                    ></path>
                </svg>
                Добавить
            </button>
            <input
                v-model="ticker"
                @keydown.enter="add()"
                type="text"
                class="form-control form-control-md w-40"
                placeholder="Введите название валюты..."
            />
            <select
                class="form-select form-select-lg w-15 ms-2"
                v-model="tickerDepence"
            >
                <option value="USD" selected>USD</option>
                <option
                    v-for="(wallet, i) in walletList"
                    :key="i"
                    :value="wallet"
                >
                    {{ wallet }}
                </option>
            </select>
            <div
                class="p-10 cursor-pointer"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    class="bi bi-plus-square"
                    viewBox="0 0 16 16"
                >
                    <path
                        d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                    />
                    <path
                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                    />
                </svg>
            </div>
        </div>
        <hr class="mb-3 mt-3" />
        <div class="container d-flex flex-wrap mt-2">
            <div
                v-for="(t, i) in tickers"
                :key="i"
                class="card mt-3 mb-3 w-25 border-4"
                :class="{
                    'border-secondary': selectedTicker == t,
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
                        class="btn btn-secondary"
                    >
                        Удалить
                    </button>
                </div>
            </div>
        </div>
        <div
            v-if="selectedTicker !== null"
            class="graph position-relative mt-2 w-100 border border-2 border-primary border-top-0 border-end-0 d-flex align-items-end"
        >
            <span
                v-for="(graphSel, i) in normalizeGraph()"
                :key="i"
                class="graph-elem bg-primary graphSel-width"
                :style="{ height: graphSel + '%' }"
            ></span>
            <span
                v-show="graph.length < 10"
                style="height: 100%; width: 1px"
            ></span>
            <img
                src="./assets/cancel.png"
                class="position-absolute top-0 end-0 cursor-pointer"
                alt="close graph btn"
                style="width: 18px; margin-right: -22px"
                @click="closeGraph"
            />
        </div>
    </div>
    <!-- <hr class="mt-1" v-show="selectedTicker !== null" /> -->
    <!-- Модальное окно -->
    <modal-app
        ><template v-slot:modal__content>
            <input
                type="text"
                class="form-control"
                id="recipient-name"
                placeholder="Введите название валюты..."
                v-model="newDependencyWallet"
            />
        </template>
        ><template v-slot:modal__actionBtc>
            <button
                type="button"
                class="btn btn-primary"
                @click="addWalletDependency()"
                data-bs-dismiss="modal"
            >
                Добавить
            </button>
        </template>
    </modal-app>
</template>

<script>
import headerApp from "./components/headerApp.vue";
import modalApp from "./components/modalApp.vue";
import "bootstrap";
export default {
    name: "App",
    components: { headerApp, modalApp },
    data() {
        return {
            ticker: "",
            tickers: [],
            selectedTicker: null,
            graph: [],
            tickerDepence: "USD",
            walletList: ["RUB", "EUR", "ETH"],
            newDependencyWallet: "",
        };
    },
    methods: {
        add() {
            const currentTicker = {
                name: this.ticker,
                price: "-",
                dependence: this.tickerDepence,
            };
            this.tickers.push(currentTicker);
            let intervalId = setInterval(async () => {
                const func = await fetch(
                    `https://min-api.cryptocompare.com/data/price?fsym=${currentTicker.name}&tsyms=${currentTicker.dependence}&api_key=d2ac9f63650167356ed7273d10fa3866a960fae32f9190637808fc0b8da7db48} `
                );
                const data = await func.json();
                this.tickers.find(
                    (t) =>
                        t.name === currentTicker.name &&
                        t.dependence === currentTicker.dependence
                ).price =
                    data[currentTicker.dependence] > 1
                        ? data[currentTicker.dependence].toFixed(2)
                        : data[currentTicker.dependence].toPrecision(2);
                if (
                    currentTicker.name == this.selectedTicker?.name &&
                    currentTicker.dependence == this.selectedTicker?.dependence
                ) {
                    this.graph.push(data[currentTicker.dependence]);
                }
            }, 2000);
            this.tickers.find(
                (ticker) => ticker.name == currentTicker.name
            ).intId = intervalId;
            this.ticker = "";
        },
        deleteTicker(tickerToDelete) {
            this.tickers.splice(this.tickers.indexOf(tickerToDelete), 1);
            this.closeGraph();
            clearInterval(tickerToDelete.intId);
        },
        closeGraph() {
            this.graph = [];
            this.selectedTicker = null;
        },
        selectTicker(tickerToSelect) {
            if (this.selectedTicker !== tickerToSelect) {
                this.graph = [];
                this.selectedTicker = tickerToSelect;
            }
        },
        normalizeGraph() {
            const maxValue = Math.max(...this.graph);
            const minValue = Math.min(...this.graph);
            return this.graph.map((value) => {
                return ((value - minValue) * 95) / (maxValue - minValue) + 5;
            });
        },
        addWalletDependency() {
            this.walletList.push(this.newDependencyWallet);
        },
    },
};
</script>

<style lang="scss">
@import "~bootstrap/dist/css/bootstrap.css";

.cursor-pointer {
    cursor: pointer;
}
.graphSel-width {
    width: 20px;
}
.graph {
    height: 500px;
}
.w-15 {
    width: 15%;
}
.w-40 {
    width: 40%;
}
.p-10 {
    padding: 10px;
}
</style>
