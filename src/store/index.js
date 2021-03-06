import { createStore } from "vuex";
import router from "../router/index";

export default createStore({
    state: {
        ticker: "",
        filter: "",
        newDependence: "",
        tickers: [],
        selectedTicker: null,
        tickersPerPage: 6,
        page: 1,
        hasNextPage: false,
        graph: [],
        graphData: [],
        walletMatches: [],
        allWallets: [],
        walletList: ["USD", "RUB", "EUR", "BTC"],
        tickerDependence: "USD",

        //converter
        firstWallet: "USD",
        secondWallet: "BTC",
        firstWalletCourse: null,
        secondWalletCourse: null,
        firstMultiplyed: null,
        secondMultiplyed: null,

        //wallet details page
        walletData: [],
        currentLimit: 30,
        graphDays: 30,
        walletDetailsDependence: "USD",

        // userAuth
        login: "",
        password: "",
        userId: null,

        //regUser
        regLogin: "",
        regPassword: "",
        passwordConf: "",
        name: "",
        surname: "",
        email: "",
        rules: false,

        // topList
        topWalletsList: [],
        topWalletsPages: [],
        topWalletsPage: 1,
        topWalletsLimit: 6,
        walletsPerPage: 6,
        topWalletsListLength: 100,
        moreDataDisabled: false,

        // modal
        showModal: false,
        modalText: "Текст уведомления",

        // cabinet
        loginConf: "",
        newPassword: "",
        disableChangeBtn: false,
    },
    mutations: {
        addNewDependence(state) {
            state.walletList.push(state.newDependence);
        },
        filterInputHandle(state) {
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
            state.tickers.splice(
                state.tickers.findIndex((ticker) => ticker.name == tickerToDelete.name && ticker.dependence == tickerToDelete.dependence),
                1
            );
            if (tickerToDelete.name == state.selectedTicker?.name && tickerToDelete.dependence == state.selectedTicker?.dependence) {
                state.selectedTicker = null;
                state.graphData = [];
            }
        },
        updateAllWallets(state, wallet) {
            state.allWallets.push(wallet);
        },
        hasNextPageUpdate(state, value) {
            state.hasNextPage = value;
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
        setGraphData(state) {
            state.graph = state.graphData;
        },
        setConverterData(state, data) {
            state.secondWalletCourse = data[state.firstWallet][state.secondWallet];
            state.firstWalletCourse = data[state.secondWallet][state.firstWallet];
            state.secondMultiplyed = data[state.secondWallet][state.secondWallet];
            state.firstMultiplyed = data[state.secondWallet][state.firstWallet];
        },
        subscribeOnUpdates(state, ticker) {
            let intervalId = setInterval(async () => {
                const func = await fetch(
                    `https://min-api.cryptocompare.com/data/price?fsym=${ticker.name}&tsyms=${ticker.dependence}&api_key=12b3b18cc96834a9aeed3f00da3ad8f961ce337a5023711a8bcc1796b8d19adc`
                );
                const data = await func.json();
                if (data.Response == "Error") {
                    clearInterval(intervalId);
                    state.graph = [];
                    state.selectedTicker = null;
                    state.walletMatches = [];
                    state.tickers.splice(state.tickers.indexOf(state.ticker), 1);
                    let storagedTickers = JSON.parse(localStorage.getItem("tickers" + this.$store.state.userId));
                    storagedTickers.splice(
                        storagedTickers.findIndex((t) => {
                            ticker.name == t.name && ticker.dependence == t.name;
                        }),
                        1
                    );
                    localStorage.setItem("tickers" + this.$store.state.userId, JSON.stringify(storagedTickers));
                }
                state.tickers.find((t) => t.name == ticker.name && t.dependence == ticker.dependence).price =
                    data[ticker.dependence] > 1 ? data[ticker.dependence].toFixed(2) : data[ticker.dependence].toPrecision(2);
                if (ticker.name == state.selectedTicker?.name && ticker.dependence == state.selectedTicker?.dependence) {
                    state.graphData.push(data[ticker.dependence]);
                }
                state.tickers.find((t) => ticker.name == t.name && ticker.dependence == t.dependence).intId = intervalId;
            }, 2000);
        },
        changeFirstMylptiplyer(state) {
            state.secondMultiplyed = state.secondWalletCourse * state.firstMultiplyed;
        },
        changeSecondMylptiplyer(state) {
            state.firstMultiplyed = state.firstWalletCourse * state.secondMultiplyed;
        },
        swapData(state) {
            let buffer = state.firstWallet;
            state.firstWallet = state.secondWallet;
            state.secondWallet = buffer;

            buffer = state.firstWalletCourse;
            state.firstWalletCourse = state.secondWalletCourse;
            state.secondWalletCourse = buffer;

            buffer = state.firstMultiplyed;
            state.firstMultiplyed = state.secondMultiplyed;
            state.secondMultiplyed = buffer;
        },
        getGraphData(state, data) {
            state.graphData = [];
            data.Data.Data.forEach((coinData) => {
                state.graphData.push(coinData.high);
            });
            state.graphDays = state.currentLimit;
        },
        getWalletData(state, data) {
            if (data.Response == "Error") {
                this.$router.push("/404");
            } else {
                state.walletData = data.Data[router.currentRoute.value.params.walletName];
            }
            console.log(state.walletData == undefined);
        },
        fakeSelectedTicker(state) {
            state.selectedTicker = "fake";
        },
        getTopListData(state, data) {
            state.topWalletsPages = [];
            if (data.Message == "Success") {
                state.topWalletsList = data.Data;
            }
            let pagesCount = Math.ceil(state.topWalletsList.length / state.walletsPerPage);
            while (state.topWalletsPages.length < pagesCount) {
                state.topWalletsPages.push(state.topWalletsPages.length + 1);
            }
        },
        updateUserId(state, id) {
            state.userId = id;
        },
        handleLogout(state) {
            state.userId = null;
        },
        updateTickersAfterAuth(state, tickers) {
            state.tickers = tickers;
        },
        closeModal(state) {
            state.showModal = false;
        },
        showModal(state, text) {
            state.modalText = text;
            state.showModal = true;
        },
        clearTickers(state) {
            state.tickers = [];
        },
        clearAuthForm(state) {
            state.login = "";
            state.password = "";
        },
        clearNewDependence(state) {
            state.newDependence = "";
        },
        disableChangeBtn(state) {
            state.disableChangeBtn = true;
        },
    },
    actions: {
        async setConverterData({ commit, state }) {
            const func = await fetch(
                `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${state.secondWallet},${state.firstWallet}&tsyms=${state.firstWallet},${state.secondWallet}`
            );
            const data = await func.json();
            commit("setConverterData", data);
        },
        async getGraphData({ commit, state }) {
            const f = await fetch(
                `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${router.currentRoute.value.params.walletName}&tsym=${state.walletDetailsDependence}&limit=${state.currentLimit}`
            );
            const data = await f.json();
            commit("getGraphData", data);
        },
        async getWalletData({ commit }) {
            const f = await fetch(
                `https://min-api.cryptocompare.com/data/all/coinlist?fsym=${router.currentRoute.value.params.walletName}`
            );
            const data = await f.json();
            commit("getWalletData", data);
        },
        async getTopListData({ commit, state }) {
            if (state.topWalletsLimit > 100) {
                state.topWalletsLimit = 100;
                state.moreDataDisabled = true;
            }
            const func = await fetch(`https://min-api.cryptocompare.com/data/top/totalvolfull?limit=${state.topWalletsLimit}&tsym=USD`);
            const data = await func.json();
            commit("getTopListData", data);
        },
    },
    getters: {},
    modules: {},
});
