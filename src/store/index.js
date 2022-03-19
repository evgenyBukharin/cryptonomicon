import {
    createStore
} from 'vuex'

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
            state.walletList.push(state.newDependence)
        },
        filterInputHangle(state) {
            state.filter = state.filter.toUpperCase();
            state.page = 1;
        },
        newDepInputHandle(state) {
            state.newDependence = state.newDependence.toUpperCase()
        },
        closeMatchesBlock(state) {
            state.walletMatches = [];
            state.ticker = '';
        },
        addTicker(state, currentTicker) {
            state.tickers.push(currentTicker)
            state.ticker = "";
            state.filter = "";
        },
        addMatchedTicker(state, matchedTicker) {
            state.tickers.push(matchedTicker)
            state.ticker = "";
        },
        minusPage(state) {
            state.page--
        },
        plusPage(state) {
            state.page++
        },
        handleFetchError(state) {
            state.tickers.splice(state.tickers.indexOf(state.ticker), 1)
        },
        setSelectedTicker(state, tickerToSelect) {
            if (state.selectedTicker !== tickerToSelect) {
                state.graphData = [];
                state.selectedTicker = tickerToSelect;
            }
        },
        handleDeleteTicker(state, tickerToDelete) {
            state.tickers.splice(this.$store.state.tickers.indexOf(tickerToDelete), 1);
            if (
                tickerToDelete.name == state.selectedTicker?.name &&
                tickerToDelete.dependence == state.selectedTicker?.dependence
            ) {
                state.selectedTicker = null;
                state.graphData = [];
            }
        }
    },
    actions: {},
    getters: {},
    modules: {}
})