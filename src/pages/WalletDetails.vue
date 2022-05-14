<template>
    <div class="page container">
        <div class="d-flex align-items-center mb-2">
            <h1 class="mb-0">Данные о {{ this.$route.params.walletName }}</h1>
            <img
                v-if="this.$store.state.walletData.ImageUrl !== undefined"
                class="ms-2"
                style="width: 40px; height: 40px"
                v-bind:src="'https://www.cryptocompare.com' + this.$store.state.walletData.ImageUrl"
            />
        </div>
        <p class="card-text">
            <span v-if="this.$store.state.walletData.AssetLaunchDate" class="d-block"
                >Дата создания валюты: {{ this.$store.state.walletData.AssetLaunchDate }}</span
            >
            <span v-if="this.$store.state.walletData.Algorithm" class="d-block"
                >Валюта хэшируется с помощью алгоритма {{ this.$store.state.walletData.Algorithm }}</span
            >
            <span v-if="this.$store.state.walletData.TotalCoinsMined" class="d-block"
                >Всего добыто {{ this.$store.state.walletData.TotalCoinsMined }} единиц валюты</span
            >
            <span v-if="this.$store.state.walletData.Rating" class="d-block"
                >Оценка адаптивности к различным алгоритмам: {{ this.$store.state.walletData.Rating.Weiss.TechnologyAdoptionRating }}</span
            >
        </p>
        <div class="d-flex align-items-center">
            <h4 class="me-3">Показать изменение курса валюты за последние:</h4>
            <input
                @input="(event) => validateGraphDays(event)"
                v-model.number="this.$store.state.graphDays"
                type="text"
                class="form-control form-control-md w-20 me-2"
                placeholder="Введите количество дней"
                @keydown.enter="updateGraphData()"
            />
            <div class="btn btn-success" @click="updateGraphData()">Показать</div>
        </div>
        <Wallet-graph :btnVisible="false" :graphSelWidth="'40px'" :title="true" />
    </div>
</template>
<script>
import WalletGraph from "../components/WalletGraph.vue";
export default {
    data() {
        return {
            currentLimit: 30,
        };
    },
    components: { WalletGraph },
    methods: {
        updateGraphData() {
            if (this.$store.state.graphDays > 2000) {
                return;
            }
            this.$store.dispatch("getGraphData", this.currentLimit);
            // this.currentLimit = limit;
            // this.graphDays = null;
        },
        validateGraphDays(e) {
            e.target.value = e.target.value.replace(/\D/g, "");
        },
    },
    created() {
        this.$store.dispatch("getGraphData", this.currentLimit);
        this.$store.dispatch("getWalletData");
        this.$store.commit("fakeSelectedTicker");
    },
};
</script>
<style lang="scss"></style>
