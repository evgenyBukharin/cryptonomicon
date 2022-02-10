<template>
    <h1>Добавить тикет</h1>
    <div class="d-flex w-75">
        <add-button @click="add" type="button" />
        <input
            v-model="ticker"
            @input="findMatches()"
            @keydown.enter="add"
            type="text"
            class="form-control form-control-md w-40"
            placeholder="Введите название валюты..."
        />
        <select
            class="form-select form-select-lg w-15 ms-2"
            v-model="tickerDependence"
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
    <div class="d-flex mt-3 w-40">
        <div class="me-3" v-for="(match, i) in walletMatches" :key="i">
            <button
                class="btn btn-secondary text-white rounded-3 text-uppercase"
                @click="addTicker(match)"
            >
                {{ match }}
            </button>
        </div>
    </div>
    <Modal-app
        ><template v-slot:modal__content>
            <input
                type="text"
                class="form-control"
                id="recipient-name"
                placeholder="Введите название валюты..."
                v-model="newDependencyWallet"
            />
        </template>
        ><template v-slot:modal__actionBtc>
            <button
                type="button"
                class="btn btn-primary"
                @click="addWalletDependency()"
                data-bs-dismiss="modal"
            >
                Добавить
            </button>
        </template>
    </Modal-app>
</template>
<script>
import AddButton from "./AddButton.vue";
import ModalApp from "../components/ModalApp.vue";
export default {
    components: { AddButton, ModalApp },

    emits: {
        "add-ticker": (value) => typeof value === "string",
    },
    data() {
        return {
            ticker: "",
            tickerDependence: "USD",
            walletList: ["RUB", "EUR", "ETH"],
            walletMatches: [],
            allWallets: [],
        };
    },
    methods: {
        add() {
            if (this.ticker.length === 0) {
                return;
            }
            this.$emit("add-ticker", this.ticker, this.tickerDependence);
            this.ticker = "";
        },
        addTicker(match) {
            this.$emit("add-ticker", match, this.tickerDependence);
            this.ticker = "";
        },
        async getAllWallets() {
            const func = await fetch(
                `https://min-api.cryptocompare.com/data/all/coinlist?summary=true`
            );
            const data = await func.json();
            for (const coin in data.Data) {
                if (Object.hasOwnProperty.call(data.Data, coin)) {
                    this.allWallets.push(data.Data[coin].Symbol);
                }
            }
        },
        findMatches() {
            if (this.ticker.length == 0) {
                this.walletMatches.length = 0;
                return;
            }
            this.ticker = this.ticker.toUpperCase();
            this.walletMatches.length = 0;
            for (let i = 0; i < this.allWallets.length; i++) {
                let foundIndex = this.allWallets[i].indexOf(this.ticker);
                if (foundIndex !== -1) {
                    this.walletMatches.push(this.allWallets[i]);
                }
                if (this.walletMatches.length == 4) {
                    break;
                }
            }
        },
        addWalletDependency() {
            this.walletList.push(this.newDependencyWallet);
        },
    },
    created() {
        this.getAllWallets();
    },
};
</script>
<style lang="scss"></style>
