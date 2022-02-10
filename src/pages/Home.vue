<template>
    <add-ticker @add-ticker="add" />
    <hr class="mb-3 mt-3" />
    <div class="container">
        <div class="row row-cols-4 g-3">
            <div class="col" v-for="(t, i) in tickers" :key="i">
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
    <div
        v-if="selectedTicker !== null"
        class="graph position-relative mt-4 w-100 border border-2 border-primary border-top-0 border-end-0 d-flex align-items-end"
    >
        <span
            v-for="(graphSel, i) in normalizeGraph()"
            :key="i"
            class="graph-elem bg-primary graphSel-width"
            :style="{ height: graphSel + '%' }"
            :value="this.graphData[i]"
            @mouseover="
                createHover(this.graphData[i], this.selectedTicker.dependence)
            "
            @mousemove="(event) => holdHover(event)"
            @mouseleave="(event) => deleteHover(event)"
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
</template>
<script>
import AddTicker from "../components/AddTicker.vue";
export default {
    name: "App",
    components: { AddTicker },
    data() {
        return {
            tickers: [],
            selectedTicker: null,
            graph: [],
            graphData: [],
        };
    },
    methods: {
        add(ticker, tickerDependence) {
            // Проверка на существование тикера
            if (this.alreadyExists(ticker)) {
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
        },
        deleteTicker(tickerToDelete) {
            this.tickers.splice(this.tickers.indexOf(tickerToDelete), 1);
            if (tickerToDelete.name == this.selectedTicker?.name) {
                this.closeGraph();
            } else {
                this.selectedTicker == null;
            }
            clearInterval(tickerToDelete.intId);
            let storagedTickers = JSON.parse(localStorage.getItem("tickers"));
            storagedTickers.splice(storagedTickers.indexOf(tickerToDelete, 1));
            localStorage.setItem("tickers", JSON.stringify(storagedTickers));
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
            this.graphData = this.graph;
            return this.graph.map((value) => {
                return (
                    ((value - this.minValue) * 95) /
                        (this.maxValue - this.minValue) +
                    5
                );
            });
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
                    `https://min-api.cryptocompare.com/data/price?fsym=${ticker.name}&tsyms=${ticker.dependence}&api_key=d2ac9f63650167356ed7273d10fa3866a960fae32f9190637808fc0b8da7db48} `
                );
                const data = await func.json();
                if (data.Response == "Error") {
                    clearInterval(intervalId);
                    this.tickers.splice(this.tickers.indexOf(ticker), 1);
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
                    this.graph.push(data[ticker.dependence]);
                }
                this.tickers.find(
                    (t) =>
                        ticker.name == t.name &&
                        ticker.dependence == t.dependence
                ).intId = intervalId;
            }, 2000);
            return intervalId;
        },
        createHover(value, dep) {
            const hover = document.createElement("div");
            hover.classList.add(
                "position-absolute",
                "bg-primary",
                "text-white",
                "rounded-2",
                "py-2",
                "px-3",
                "border",
                "border-4",
                "border-white"
            );
            hover.innerHTML = value + " " + dep;
            hover.id = "hover";
            document.body.appendChild(hover);
        },
        holdHover(event) {
            const hover = document.getElementById("hover");
            hover.style.left = event.pageX + 20 + "px";
            hover.style.top = event.pageY - 40 + "px";
            console.log(event.pageX, event.pageY);
            event.target.classList.add(
                "border",
                "border-3",
                "border-white",
                "border-top-0",
                "border-bot-0"
            );
        },
        deleteHover(event) {
            document.body.removeChild(document.querySelector("#hover"));
            event.target.classList.remove(
                "border",
                "border-3",
                "border-white",
                "border-top-0",
                "border-bot-0"
            );
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
};
</script>
<style lang="scss">
@import "bootstrap";
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
