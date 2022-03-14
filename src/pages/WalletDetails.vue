<template>
    <div class="d-flex align-items-center mb-2">
        <h1 class="mb-0">Данные о {{ walletName }}</h1>
        <img
            v-if="walletData.imageUrl !== undefined"
            class="ms-2"
            style="width: 40px; height: 40px"
            v-bind:src="'https://www.cryptocompare.com' + walletData.ImageUrl"
        />
    </div>
    <p class="card-text">
        <span v-if="walletData.AssetLaunchDate" class="d-block">Дата создания валюты: {{ walletData.AssetLaunchDate }}</span>
        <span v-if="walletData.Algorithm" class="d-block">Валюта хэшируется с помощью алгоритма {{ walletData.Algorithm }}</span>
        <span v-if="walletData.TotalCoinsMined" class="d-block">Всего добыто {{ walletData.TotalCoinsMined }} единиц валюты</span>
        <span v-if="walletData.Rating" class="d-block"
            >Оценка адаптивности к различным алгоритмам: {{ walletData.Rating.Weiss.TechnologyAdoptionRating }}</span
        >
    </p>
    <div class="d-flex align-items-center">
        <h4 class="me-3">Показать изменение курса валюты за последние:</h4>
        <input
            @input="(event) => validateGraphDays(event)"
            v-model.number="graphDays"
            type="text"
            class="form-control form-control-md w-20 me-2"
            placeholder="Введите количество дней"
            @keydown.enter="updateGraphData(this.graphDays)"
        />
        <div class="btn btn-success" @click="updateGraphData(this.graphDays)">Показать</div>
    </div>
    <!-- Строка ниже была в пропсах графика до vuex -->
    <!-- :selectedTicker="{ name: this.walletName, dependence: 'USD' }" -->
    <Wallet-graph
        :graphValues="this.graphData"
        @clearSelectedTicker="this.selectedTicker = null"
        :btnVisible="false"
        :graphSelWidth="'40px'"
        :title="this.currentLimit"
    />
</template>
<script>
import WalletGraph from "../components/WalletGraph.vue";
export default {
    data() {
        return {
            walletName: this.$route.params.walletName,
            walletData: [],
            graphData: [],
            graphDays: null,
            currentLimit: 30,
        };
    },
    components: { WalletGraph },
    methods: {
        async getGraphData(limit) {
            const f = await fetch(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=${this.walletName}&tsym=USD&limit=${limit}`);
            const data = await f.json();
            this.graphData = [];
            data.Data.Data.forEach((coinData) => {
                this.graphData.push(coinData.high);
            });
        },
        async getWalletData() {
            const f = await fetch(`https://min-api.cryptocompare.com/data/all/coinlist?fsym=${this.walletName}`);
            const data = await f.json();
            this.walletData = data.Data[this.walletName];
            console.log(this.walletData);
        },
        updateGraphData(limit) {
            if (this.graphDays > 2000) {
                return;
            }
            this.getGraphData(limit);
            this.currentLimit = limit;
            this.graphDays = null;
        },
        validateGraphDays(e) {
            e.target.value = e.target.value.replace(/\D/g, "");
        },
    },
    created() {
        this.getGraphData(this.currentLimit);
        this.getWalletData();
    },
};
</script>
<style lang="scss"></style>
