<template>
    <div class="modal__background" ref="modalBg">
        <div class="modal__body">
            <h3 class="modal__title">Уведомление</h3>
            <hr class="mt-2" />
            <p class="modal__text" ref="modalText">Элемент для отображения текста</p>
            <div class="modal__buttons">
                <button @click="closeModal" class="btn btn-primary">Закрыть</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        closeModal() {
            this.$refs.modalBg.classList.add("modal__background-hidden");
        },
    },
};
</script>
<style lang="scss">
.modal {
    &__background {
        position: fixed;
        height: 100vh;
        width: 100%;
        background: var(--bs-dark);
        top: 0;
        left: 0;
        z-index: 1000;
        opacity: 0.9;
        visibility: visible;
        transition: all 0.3s ease;
        &-hidden {
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
    }
    &__body {
        background: var(--bs-light);
        padding: 16px;
        border-radius: 8px;
        min-width: 400px;
        max-width: 600px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -100%);
    }
    &__buttons {
        display: flex;
        justify-content: flex-end;
    }
}
</style>
