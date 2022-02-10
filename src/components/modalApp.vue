<template>
    <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="exampleModalLabel">
                        Добавить валюту в список
                    </h4>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Закрыть"
                    ></button>
                </div>
                <div class="modal-body">
                    <input
                        type="text"
                        class="form-control"
                        id="recipient-name"
                        placeholder="Введите название валюты..."
                        v-model="newDependencyWallet"
                    />
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                    >
                        Закрыть
                    </button>
                    <button
                        type="button"
                        class="btn btn-primary"
                        @click="addWalletDependency()"
                        data-bs-dismiss="modal"
                    >
                        Добавить
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            newDependencyWallet: "",
        };
    },
    emits: {
        addDependencyWallet: (newDependencyWallet) => {
            if (newDependencyWallet.lenght !== 0) {
                return true;
            } else {
                console.warn("Пустую строку нельзя добавить");
                return false;
            }
        },
    },
    methods: {
        addWalletDependency() {
            this.$emit("addDependencyWallet", this.newDependencyWallet);
        },
    },
};
</script>
<style lang=""></style>
