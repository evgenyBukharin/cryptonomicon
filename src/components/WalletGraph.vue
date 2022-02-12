<template>
    <div v-if="selectedTicker !== null" class="mt-3 mb-3 w-100">
        <div
            class="graph position-relative d-flex align-items-end border border-2 border-primary border-top-0 border-end-0"
        >
            <span
                v-for="(graphSel, i) in normalizeGraph()"
                :key="i"
                class="bg-primary"
                :style="{ height: graphSel + '%', width: this.graphSelWidth }"
                :value="this.graphData[i]"
                @mouseover="
                    createHover(
                        this.graphData[i],
                        this.selectedTicker.dependence
                    )
                "
                @mousemove="(event) => holdHover(event)"
                @mouseleave="(event) => deleteHover(event)"
            ></span>
            <span
                v-show="graph.length < 10"
                style="height: 100%; width: 1px"
            ></span>
            <img
                v-if="btnVisible"
                src="../assets/cancel.png"
                class="position-absolute top-0 end-0 cursor-pointer"
                alt="close graph btn"
                style="width: 18px; margin-right: -22px"
                @click="closeGraph"
            />
        </div>
        <h5 v-if="title" class="mt-2">Данные за последние: {{ title }} дней</h5>
    </div>
</template>
<script>
export default {
    data() {
        return {
            graph: [],
            graphData: [],
        };
    },
    props: [
        "selectedTicker",
        "graphValues",
        "btnVisible",
        "graphSelWidth",
        "title",
    ],
    emits: {
        clearSelectedTicker: null,
    },
    methods: {
        closeGraph() {
            this.graph = [];
            this.$emit("clearSelectedTicker");
        },
        normalizeGraph() {
            this.graphData = this.graphValues;
            this.graph = this.graphValues;
            return this.graph.map((value) => {
                return (
                    ((value - this.minValue) * 95) /
                        (this.maxValue - this.minValue) +
                    5
                );
            });
        },
        createHover(value, dep) {
            const hover = document.createElement("div");
            hover.classList.add(
                "position-absolute",
                "bg-primary",
                "text-white",
                "rounded-2",
                "py-2",
                "px-3",
                "border",
                "border-4",
                "border-white"
            );
            hover.innerHTML = value + " " + dep;
            hover.id = "hover";
            document.body.appendChild(hover);
        },
        holdHover(event) {
            const hover = document.getElementById("hover");
            hover.style.left = event.pageX + 20 + "px";
            hover.style.top = event.pageY - 40 + "px";
            event.target.classList.add(
                "border",
                "border-2",
                "border-white",
                "border-top-0",
                "border-bottom-0"
            );
        },
        deleteHover(event) {
            document.body.removeChild(document.querySelector("#hover"));
            event.target.classList.remove(
                "border",
                "border-2",
                "border-white",
                "border-top-0",
                "border-bottom-0"
            );
        },
    },
    computed: {
        minValue() {
            return Math.min(...this.graph);
        },
        maxValue() {
            return Math.max(...this.graph);
        },
    },
};
</script>
<style lang="scss">
.graph {
    height: 500px;
}
</style>
