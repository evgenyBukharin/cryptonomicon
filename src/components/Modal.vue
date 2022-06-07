<template>
    <div class="modal__background">
        <div class="modal__body">
            <h3 class="modal__title">Уведомление</h3>
            <hr class="mt-2" />
            <p class="modal__text">{{ $store.state.modalText }}</p>
            <div class="modal__buttons">
                <button class="btn btn-primary" @click="$store.commit('closeModal')">Закрыть</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {};
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
