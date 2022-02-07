<template lang="">
    <add-ticker @add-ticker="add" />
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
                <button @click.stop="deleteTicker(t)" class="btn btn-secondary">
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
            src="../assets/cancel.png"
            class="position-absolute top-0 end-0 cursor-pointer"
            alt="close graph btn"
            style="width: 18px; margin-right: -22px"
            @click="closeGraph"
        />
    </div>
    <Modal-app
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
    </Modal-app>
</template>
<script>
import AddTicker from "../components/AddTicker.vue";
import ModalApp from "../components/ModalApp.vue";
import "bootstrap";
export default {
    name: "App",
    components: { AddTicker, ModalApp },
    data() {
        return {
            tickers: [],
            selectedTicker: null,
            graph: [],
            newDependencyWallet: "",
        };
    },
    methods: {
        add(ticker, tickerDepence) {
            const currentTicker = {
                name: ticker,
                price: "-",
                dependence: tickerDepence,
            };
            this.tickers = [...this.tickers, currentTicker];
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
            return this.graph.map((value) => {
                return (
                    ((value - this.minValue) * 95) /
                        (this.maxValue - this.minValue) +
                    5
                );
            });
        },
        addWalletDependency() {
            this.walletList.push(this.newDependencyWallet);
        },
    },
    computed: {
        minValue() {
            return Math.min(...this.graph);
        },
        maxValue() {
            return Math.max(...this.graph);
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
.w {
    &-15 {
        width: 15%;
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
