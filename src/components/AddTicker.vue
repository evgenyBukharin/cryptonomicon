<template lang="">
    <h1>Добавить тикет</h1>
    <div class="d-flex w-75">
        <add-button @click="add" type="button" />
        <input
            v-model="ticker"
            @keydown.enter="add"
            type="text"
            class="form-control form-control-md w-40"
            placeholder="Введите название валюты..."
        />
        <select
            class="form-select form-select-lg w-15 ms-2"
            v-model="tickerDepence"
        >
            <option value="USD" selected>USD</option>
            <option v-for="(wallet, i) in walletList" :key="i" :value="wallet">
                {{ wallet }}
            </option>
        </select>
        <div
            class="p-10 cursor-pointer"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-plus-square"
                viewBox="0 0 16 16"
            >
                <path
                    d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                />
                <path
                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                />
            </svg>
        </div>
    </div>
</template>
<script>
import AddButton from "./AddButton.vue";
export default {
    components: { AddButton },

    props: {
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
    },

    emits: {
        "add-ticker": (value) => typeof value === "string",
    },
    data() {
        return {
            ticker: "",
            tickerDepence: "USD",
            walletList: ["RUB", "EUR", "ETH"],
        };
    },
    methods: {
        add() {
            if (this.ticker.length === 0) {
                return;
            }
            this.$emit("add-ticker", this.ticker, this.tickerDepence);
            this.ticker = "";
        },
    },
};
</script>
<style lang=""></style>
