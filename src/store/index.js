import { createStore } from "vuex";

export default createStore({
    state: {
        // home page
        tickers: [],
        tickersPerPage: 8,
        page: 1,
        hasNextPage: false,
        selectedTicker: null,
        graphData: [],
        filter: "",

        // add ticker component
        ticker: "",
        tickerOverride: "",
        walletMatches: [],
        allWallets: [],
        walletList: ["RUB", "EUR", "ETH"],
        tickerDependence: "USD",

        // walletGraph component
        graph: [],

        // addDependetce component
        newDependence: "",
    },
    mutations: {
        addNewDependence(state) {
            state.walletList.push(state.newDependence);
        },
        filterInputHangle(state) {
            state.filter = state.filter.toUpperCase();
            state.page = 1;
        },
        newDepInputHandle(state) {
            state.newDependence = state.newDependence.toUpperCase();
        },
        closeMatchesBlock(state) {
            state.walletMatches = [];
            state.ticker = "";
        },
        addTicker(state, currentTicker) {
            state.tickers.push(currentTicker);
            state.ticker = "";
            state.filter = "";
        },
        addMatchedTicker(state, matchedTicker) {
            state.tickers.push(matchedTicker);
            state.ticker = "";
        },
        minusPage(state) {
            state.page--;
        },
        plusPage(state) {
            state.page++;
        },
        handleFetchError(state) {
            state.tickers.splice(state.tickers.indexOf(state.ticker), 1);
        },
        setSelectedTicker(state, tickerToSelect) {
            if (state.selectedTicker !== tickerToSelect) {
                state.graphData = [];
                state.selectedTicker = tickerToSelect;
            }
        },
        handleDeleteTicker(state, tickerToDelete) {
            state.tickers.splice(state.tickers.indexOf(tickerToDelete), 1);
            if (tickerToDelete.name == state.selectedTicker?.name && tickerToDelete.dependence == state.selectedTicker?.dependence) {
                state.selectedTicker = null;
                state.graphData = [];
            }
        },
        subscribeOnUpdates(state, ticker) {
            let intervalId = setInterval(async () => {
                const func = await fetch(
                    `https://min-api.cryptocompare.com/data/price?fsym=${ticker.name}&tsyms=${ticker.dependence}&api_key=12b3b18cc96834a9aeed3f00da3ad8f961ce337a5023711a8bcc1796b8d19adc`
                );
                const data = await func.json();
                if (data.Response == "Error") {
                    clearInterval(intervalId);
                    this.$store.commit("handleFetchError");
                    let storagedTickers = JSON.parse(localStorage.getItem("tickers" + String(localStorage.getItem("userId"))));
                    storagedTickers.splice(
                        storagedTickers.findIndex((t) => {
                            ticker.name == t.name && ticker.dependence == t.name;
                        }),
                        1
                    );
                    localStorage.setItem("tickers" + String(localStorage.getItem("userId")), JSON.stringify(storagedTickers));
                }
                state.tickers.find((t) => t.name === ticker.name && t.dependence == ticker.dependence).price =
                    data[ticker.dependence] > 1 ? data[ticker.dependence].toFixed(2) : data[ticker.dependence].toPrecision(2);
                if (ticker.name == state.selectedTicker?.name && ticker.dependence == state.selectedTicker?.dependence) {
                    state.graphData.push(data[ticker.dependence]);
                }
                state.tickers.find((t) => ticker.name == t.name && ticker.dependence == t.dependence).intId = intervalId;
            }, 2000);
            return intervalId;
        },
        updateAllWallets(state, wallet) {
            state.allWallets.push(wallet);
        },
        hasNextPageUpdate(state, length, end) {
            state.hasNextPage = length > end;
        },
    },
    actions: {
        subscribeOnUpdates({ commit }, ticker) {
            commit("subscribeOnUpdates", ticker);
        },
    },
    getters: {},
    modules: {},
});
