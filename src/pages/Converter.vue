<template>
    <div>
        <h1 class="mb-3">Конвертер валют</h1>
        <div class="col-8 d-flex justify-content-between">
            <div class="d-flex flex-wrap">
                <div class="d-flex align-items-center">
                    <h4 class="me-2">У меня есть</h4>
                    <select class="form-select converter__select" v-model="firstWallet" @change="changeWalletsChoise">
                        <option value="USD" selected>USD</option>
                        <option v-for="(wallet, i) in walletList" :key="i" :value="wallet">
                            {{ wallet }}
                        </option>
                    </select>
                    <Add-dependence @addDependence="addNewDependence" />
                </div>
                <div
                    class="w-100 mt-2 border border-1 border-primary p-3 converter__count_block rounded-3 d-flex flex-column justify-content-between"
                >
                    <input
                        @input="(event) => handleWalletCount(event)"
                        @change="changeFirstMylptiplyer"
                        type="text"
                        class="w-100 h-80 border-0 outline-0 fs-1 text-center converter__values"
                        v-model="firstMultiplyed"
                    />
                    <h5 class="m-0">1 {{ firstWallet }} = {{ secondWalletCourse }} {{ secondWallet }}</h5>
                </div>
            </div>
            <div class="converter__transfer col-2 mx-4 mt-4"></div>
            <div class="d-flex flex-wrap">
                <div class="d-flex align-items-center">
                    <h4 class="me-2">Хочу купить</h4>
                    <select class="form-select converter__select" v-model="secondWallet" @change="changeWalletsChoise">
                        <option value="BTC" selected>BTC</option>
                        <option v-for="(wallet, i) in walletList" :key="i" :value="wallet">
                            {{ wallet }}
                        </option>
                    </select>
                    <Add-dependence @addDependence="addNewDependence" />
                </div>
                <div
                    class="w-100 mt-2 border border-1 border-primary p-3 converter__count_block rounded-3 d-flex flex-column justify-content-between"
                >
                    <input
                        @input="(event) => handleWalletCount(event)"
                        @change="changeSecondMylptiplyer"
                        type="text"
                        class="w-100 h-80 border-0 outline-0 fs-1 text-center converter__values"
                        v-model="secondMultiplyed"
                    />
                    <h5 class="m-0">1 {{ secondWallet }} = {{ firstWalletCourse }} {{ firstWallet }}</h5>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AddDependence from "../components/AddDependence.vue";
export default {
    data() {
        return {
            walletList: ["RUB", "EUR"],
            firstWallet: "USD",
            secondWallet: "BTC",
            firstWalletCourse: null,
            secondWalletCourse: null,
            firstMultiplyed: null,
            secondMultiplyed: null,
        };
    },
    components: { AddDependence },
    methods: {
        addNewDependence(newDependence) {
            this.walletList.push(newDependence);
        },
        handleWalletCount(e) {
            e.target.value = e.target.value.replace(/[^.\d]+/g, "");
            if (e.data == "." && e.target.value.split("").filter((elem) => elem == ".").length > 1) {
                e.target.value = e.target.value.split("").slice(0, e.target.value.split("").lastIndexOf(".")).join("");
            }
        },
        async changeWalletsChoise() {
            const func = await fetch(
                `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${this.secondWallet},${this.firstWallet}&tsyms=${this.firstWallet},${this.secondWallet}`
            );
            const data = await func.json();
            this.secondWalletCourse = data[this.firstWallet][this.secondWallet];
            this.firstWalletCourse = data[this.secondWallet][this.firstWallet];
            this.secondMultiplyed = data[this.secondWallet][this.secondWallet];
            this.firstMultiplyed = data[this.secondWallet][this.firstWallet];
        },
        async changeSecondMylptiplyer() {
            this.firstMultiplyed = this.firstWalletCourse * this.secondMultiplyed;
        },
        async changeFirstMylptiplyer() {
            this.secondMultiplyed = this.secondWalletCourse * this.firstMultiplyed;
        },
    },
    async created() {
        const func = await fetch(
            `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${this.secondWallet},${this.firstWallet}&tsyms=${this.firstWallet},${this.secondWallet}`
        );
        const data = await func.json();
        this.secondWalletCourse = data[this.firstWallet][this.secondWallet];
        this.firstWalletCourse = data[this.secondWallet][this.firstWallet];
        this.secondMultiplyed = data[this.secondWallet][this.secondWallet];
        this.firstMultiplyed = data[this.secondWallet][this.firstWallet];
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
</style>
