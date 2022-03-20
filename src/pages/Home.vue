<template>
    <Add-ticker />
    <div class="d-flex align-items-center mt-3">
        <h5 class="mb-0 me-2">Фильтр:</h5>
        <input
            v-model.trim="$store.state.filter"
            @input="$store.commit('filterInputHandle')"
            type="text"
            class="form-control form-control-md w-15"
            placeholder="Название валюты"
        />
    </div>

    <hr class="mb-3 mt-3" />

    <div v-if="$store.state.tickers.length > 0" class="mb-3">
        <button class="btn btn-success me-2" @click="$store.commit('minusPage')" :disabled="$store.state.page == 1">Назад</button>
        <button class="btn btn-success" @click="$store.commit('plusPage')" :disabled="!$store.state.hasNextPage">Вперед</button>
    </div>

    <div class="container">
        <div class="row row-cols-4 g-3">
            <div class="col" v-for="(t, i) in filteredTickers()" :key="i">
                <div
                    class="card border-4"
                    :class="{
                        'border-primary': $store.state.selectedTicker == t,
                    }"
                    @click="$store.commit('setSelectedTicker', t)"
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
        deleteTicker(tickerToDelete) {
            this.$store.commit("handleDeleteTicker");
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
