<template>
    <div class="w-60">
        <h1>Калькулятор валют</h1>
        <div class="d-flex">
            <input type="text" v-model.number="firstWalletCount" class="" />
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            walletList: ["RUB", "EUR"],
        };
    },
    methods: {
        addNewDependence(newDependence) {
            this.walletList.push(newDependence);
        },
    },
};
</script>
<style lang="scss"></style>
