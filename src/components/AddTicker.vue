<template>
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
    <div class="row row-cols-4 gx-2 mt-3 w-30">
        <!-- v-for в col -->
        <div class="col">
            <button
                class="btn btn-secondary text-white rounded-3 text-uppercase w-100"
            >
                btc
            </button>
        </div>
    </div>
    <!-- <pre>{{ allWallets }}</pre> -->
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
            walletMatches: [],
            allWallets: [],
        };
    },
    methods: {
        add() {
            if (this.ticker.length === 0) {
                return;
            }
            this.$emit(
                "add-ticker",
                this.isRussian ? this.translit(this.ticker) : this.ticker,
                this.tickerDepence
            );
            this.ticker = "";
        },
        translit(word) {
            var answer = "";
            var converter = {
                а: "a",
                б: "b",
                в: "v",
                г: "g",
                д: "d",
                е: "e",
                ё: "e",
                ж: "zh",
                з: "z",
                и: "i",
                й: "y",
                к: "k",
                л: "l",
                м: "m",
                н: "n",
                о: "o",
                п: "p",
                р: "r",
                с: "s",
                т: "t",
                у: "u",
                ф: "f",
                х: "h",
                ц: "c",
                ч: "ch",
                ш: "sh",
                щ: "sch",
                ь: "",
                ы: "y",
                ъ: "",
                э: "e",
                ю: "yu",
                я: "ya",

                А: "A",
                Б: "B",
                В: "V",
                Г: "G",
                Д: "D",
                Е: "E",
                Ё: "E",
                Ж: "Zh",
                З: "Z",
                И: "I",
                Й: "Y",
                К: "K",
                Л: "L",
                М: "M",
                Н: "N",
                О: "O",
                П: "P",
                Р: "R",
                С: "S",
                Т: "T",
                У: "U",
                Ф: "F",
                Х: "H",
                Ц: "C",
                Ч: "Ch",
                Ш: "Sh",
                Щ: "Sch",
                Ь: "",
                Ы: "Y",
                Ъ: "",
                Э: "E",
                Ю: "Yu",
                Я: "Ya",
            };

            for (var i = 0; i < word.length; ++i) {
                if (converter[word[i]] == undefined) {
                    answer += word[i];
                } else {
                    answer += converter[word[i]];
                }
            }

            return answer;
        },
        async getAllWallets() {
            const func = await fetch(
                `https://min-api.cryptocompare.com/data/all/coinlist`
            );
            const data = await func.json();
            this.allWallets = data.Data;
        },
    },
    computed: {
        isRussian() {
            return /[а-я]/i.test(this.ticker);
        },
    },
    created() {
        this.getAllWallets();
    },
};
</script>
<style lang=""></style>
