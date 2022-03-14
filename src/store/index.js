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
        // graphData: [], есть и в home и в walletGraph component, для эмита или пропа нужно было
    },
    mutations: {},
    actions: {},
    getters: {},
    modules: {}
})