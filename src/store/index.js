import { createStore } from "vuex";

export default createStore({
    state: {
        ticker: "",
        filter: "",
        newDependence: "",
        tickers: [],
        selectedTicker: null,
        tickersPerPage: 8,
        page: 1,
        hasNextPage: false,
        graph: [],
        graphData: [],
        walletMatches: [],
        allWallets: [],
        walletList: ["RUB", "EUR"],
        tickerDependence: "USD",

        //converter
        firstWallet: "USD",
        secondWallet: "BTC",
        firstWalletCourse: null,
        secondWalletCourse: null,
        firstMultiplyed: null,
        secondMultiplyed: null,
        swapPlaces: false,
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
            console.log(state.selectedTicker);
        },
        handleDeleteTicker(state, tickerToDelete) {
            state.tickers.splice(state.tickers.indexOf(tickerToDelete), 1);
            if (tickerToDelete.name == state.selectedTicker?.name && tickerToDelete.dependence == state.selectedTicker?.dependence) {
                state.selectedTicker = null;
                state.graphData = [];
            }
        },
        updateAllWallets(state, wallet) {
            state.allWallets.push(wallet);
        },
        hasNextPageUpdate(state, length, end) {
            state.hasNextPage = length > end;
        },
        formatWalletPrice(state, data, tickerName, tickerDependence) {
            console.log(data, tickerName, tickerDependence);
            // state.tickers.find((t) => t.name == ticker.name && t.dependence == ticker.dependence).price =
            //     data[ticker.dependence] > 1 ? data[ticker.dependence].toFixed(2) : data[ticker.dependence].toPrecision(2);
        },
        addTickerIntervalId(state, intervalId, ticker) {
            state.tickers.find((t) => ticker.name == t.name && ticker.dependence == t.dependence).intId = intervalId;
        },
        noMatchesHandle(state) {
            state.walletMatches.length = 0;
        },
        clearMatchesArray(state) {
            state.walletMatches.length = 0;
        },
        updateWalletMatches(state) {
            for (let i = 0; i < state.allWallets.length; i++) {
                let foundIndex = state.allWallets[i].indexOf(state.ticker);
                if (foundIndex !== -1) {
                    state.walletMatches.push(state.allWallets[i]);
                }
            }
        },
        shuffleWalletMatches(state) {
            state.walletMatches.sort(() => Math.random() - 0.5);
        },
        reduceWalletMatchesLength(state) {
            if (state.walletMatches.length > 8) {
                state.walletMatches.length = 8;
            }
        },
        closeGraph(state) {
            state.graph = [];
            state.selectedTicker = null;
        },
        addNewGraphData(state, data, ticker) {
            if (ticker.name == state.selectedTicker?.name && ticker.dependence == state.selectedTicker?.dependence) {
                state.graphData.push(data[ticker.dependence]);
            }
        },
        setGraphData(state) {
            state.graph = state.graphData;
        },

        setConverterData(state, data) {
            state.secondWalletCourse = data[state.firstWallet][state.secondWallet];
            state.firstWalletCourse = data[state.secondWallet][state.firstWallet];
            state.secondMultiplyed = data[state.secondWallet][state.secondWallet];
            state.firstMultiplyed = data[state.secondWallet][state.firstWallet];
        },
    },
    actions: {
        async setConverterData({ commit }) {
            const func = await fetch(
                `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${this.secondWallet},${this.firstWallet}&tsyms=${this.firstWallet},${this.secondWallet}`
            );
            const data = await func.json();
            commit("setConverterData", data);
        },
    },
    getters: {},
    modules: {},
});
