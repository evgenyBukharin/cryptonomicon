<template>
    <div class="page container">
        <h1 class="mb-3">Конвертер валют</h1>
        <div class="col-8 d-flex justify-content-between">
            <div class="d-flex flex-wrap">
                <div class="d-flex align-items-center">
                    <h4 class="me-2">У меня есть</h4>
                    <select class="form-select converter__select" v-model="$store.state.firstWallet" @change="changeWalletsChoise">
                        <option v-for="(wallet, i) in $store.state.walletList" :key="i" :value="wallet">
                            {{ wallet }}
                        </option>
                    </select>
                    <Add-dependence />
                </div>
                <div
                    class="w-100 mt-2 border border-1 border-primary p-3 converter__count_block rounded-3 d-flex flex-column justify-content-between"
                >
                    <input
                        @input="(event) => handleWalletCount(event)"
                        @change="$store.commit('changeFirstMylptiplyer')"
                        type="text"
                        class="w-100 h-80 border-0 outline-0 fs-1 text-center converter__values"
                        v-model="$store.state.firstMultiplyed"
                    />
                    <h5 class="m-0">1 {{ $store.state.firstWallet + " = " + $store.state.secondWalletCourse + " " + $store.state.secondWallet }}</h5>
                </div>
            </div>
            <div class="converter__transfer col-2 mx-4 mt-4 order-2 cursor-pointer" @click="$store.commit('swapData')" style="width: 80px"></div>
            <div class="d-flex flex-wrap order-3">
                <div class="d-flex align-items-center">
                    <h4 class="me-2">Хочу купить</h4>
                    <select class="form-select converter__select" v-model="$store.state.secondWallet" @change="changeWalletsChoise">
                        <option v-for="(wallet, i) in $store.state.walletList" :key="i" :value="wallet">
                            {{ wallet }}
                        </option>
                    </select>
                    <Add-dependence />
                </div>
                <div
                    class="w-100 mt-2 border border-1 border-primary p-3 converter__count_block rounded-3 d-flex flex-column justify-content-between"
                >
                    <input
                        @input="(event) => handleWalletCount(event)"
                        @change="$store.commit('changeSecondMylptiplyer')"
                        type="text"
                        class="w-100 h-80 border-0 outline-0 fs-1 text-center converter__values"
                        v-model="$store.state.secondMultiplyed"
                    />
                    <h5 class="m-0">1 {{ $store.state.secondWallet + " = " + $store.state.firstWalletCourse + " " + $store.state.firstWallet }}</h5>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AddDependence from "../components/AddDependence.vue";
export default {
    components: { AddDependence },
    methods: {
        handleWalletCount(e) {
            e.target.value = e.target.value.replace(/[^.\d]+/g, "");
            if (e.data == "." && e.target.value.split("").filter((elem) => elem == ".").length > 1) {
                e.target.value = e.target.value.split("").slice(0, e.target.value.split("").lastIndexOf(".")).join("");
            }
        },
        changeWalletsChoise() {
            this.$store.dispatch("setConverterData");
        },
    },
    async created() {
        this.$store.dispatch("setConverterData");
    },
};
</script>
<style lang="scss">
.converter__count_block {
    height: 200px;
}
.converter__select {
    width: 90px;
}
.converter__transfer {
    background: url("../assets/transfer.svg") no-repeat center;
}
.outline-0 {
    outline: 0;
}
.converter__values::placeholder {
    font-size: 18px;
}
.order-1 {
    order: 1;
}
.order-2 {
    order: 2;
}
.order-3 {
    order: 3;
}
</style>
