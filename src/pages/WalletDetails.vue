<template>
    <div class="page container">
        <div class="d-flex align-items-center mb-2">
            <h1 class="wallet-details__title mb-0">
                Данные о {{ this.$route.params.walletName }}
                <img
                    v-if="this.$store.state.walletData.ImageUrl !== undefined"
                    class="wallet-details__image"
                    style="width: 40px; height: 40px"
                    v-bind:src="'https://www.cryptocompare.com' + this.$store.state.walletData.ImageUrl"
                />
                относительно
                <select class="form-select form-select-lg w-15 ms-2" v-model="$store.state.walletDetailsDependence">
                    <option v-for="(wallet, i) in $store.state.walletList" :key="i" :value="wallet">
                        {{ wallet }}
                    </option></select
                ><Add-dependence />
            </h1>
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
            <h4 class="converter__subtitle me-2">Изменить промежуток на последние</h4>
            <input
                @input="(event) => validateCurrentLimit(event)"
                v-model.number="this.$store.state.currentLimit"
                type="text"
                class="form-control form-control-md me-2 input__days"
                @keydown.enter="updateGraphData()"
            />
            <h4 class="input-text me-2">дней.</h4>

            <button class="btn btn-success" @click="updateGraphData()">Показать</button>
        </div>
        <Wallet-graph :btnVisible="false" :graphSelWidth="'40px'" :title="true" />
    </div>
</template>
<script>
import WalletGraph from "../components/WalletGraph.vue";
import AddDependence from "../components/AddDependence.vue";
export default {
    components: { WalletGraph, AddDependence },
    methods: {
        updateGraphData() {
            if (this.$store.state.currentLimit > 2000) {
                return;
            }
            this.$store.dispatch("getGraphData");
        },
        validateCurrentLimit(e) {
            e.target.value = e.target.value.replace(/\D/g, "");
        },
    },
    created() {
        this.$store.dispatch("getGraphData");
        this.$store.dispatch("getWalletData");
        this.$store.commit("fakeSelectedTicker");
    },
};
</script>
<style lang="scss">
.converter {
    &__subtitle {
        margin-bottom: 0;
    }
}

.input {
    &__days {
        width: 65px;
    }
    &-text {
        margin-bottom: 0;
    }
}

.wallet-details {
    &__title {
        display: flex;
        align-items: center;
        width: 100%;
    }
    &__image {
        margin-left: 6px;
        margin-right: 6px;
    }
}
</style>
