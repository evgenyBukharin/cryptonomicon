<template>
    <h1 class="mb-4">Последние новости финансового рынка</h1>
    <div class="row row-cols-1 g-4">
        <div class="col" v-for="(n, i) in news" :key="i">
            <div class="card">
                <svg
                    class="card-img-top"
                    width="100%"
                    height="25"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                >
                    <rect width="100%" height="100%" fill="#0d6efd"></rect>
                </svg>
                <div class="card-body d-flex justify-content-between">
                    <div class="mw-90">
                        <h3 class="card-title">
                            {{ n.title }}
                        </h3>
                        <h5 class="card-title">
                            {{ "Источник: " + n.source_info.name }}
                        </h5>
                        <h5 class="card-title">
                            {{
                                "Опубликованно " +
                                new Date(n.published_on * 1000).toLocaleString()
                            }}
                        </h5>
                        <p class="card-text">
                            <span class="d-inline-block"
                                >{{ n.body }}
                                <a class="d-inline" :href="n.url"
                                    >Читать дальше...</a
                                ></span
                            >
                        </p>
                    </div>
                    <img
                        style="width: 120px; height: 120px"
                        class="my-auto"
                        v-bind:src="n.source_info.img"
                        :alt="'news image'"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            news: [],
            intervalId: null,
        };
    },
    methods: {
        async getNews() {
            const func = await fetch(
                `https://min-api.cryptocompare.com/data/v2/news/`
            );
            const data = await func.json();
            this.news = data.Data;
        },
        updateNews() {
            this.intervalId = setInterval(async () => {
                const func = await fetch(
                    `https://min-api.cryptocompare.com/data/v2/news/`
                );
                const data = await func.json();
                this.news = data.Data;
            }, 20000);
        },
    },
    created() {
        this.getNews();
        this.updateNews();
    },
};
</script>
<style lang="scss">
.mw-90 {
    max-width: 90%;
}
</style>
