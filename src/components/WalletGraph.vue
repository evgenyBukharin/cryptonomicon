<template>
    <div v-if="$store.state.selectedTicker !== null" class="mt-3 mb-3 w-100">
        <div class="graph position-relative d-flex align-items-end border border-2 border-primary border-top-0 border-end-0">
            <div v-if="$store.state.graph.length > 1" class="position-absolute top-0 start-0 graph-scale_text">
                {{ maxValue }}
            </div>
            <span
                v-if="$store.state.graph.length > 1"
                class="position-absolute top-0 start-0 graph-scale"
                style="height: 3px; width: 20px; background-color: black"
            ></span>

            <div v-if="$store.state.graph.length > 1" class="position-absolute top-45 start-0 graph-scale_text">
                {{ middleValue }}
            </div>
            <span
                v-if="$store.state.graph.length > 1"
                class="position-absolute top-45 start-0 graph-scale"
                style="height: 3px; width: 20px; background-color: black"
            ></span>

            <div v-if="$store.state.graph.length > 1" class="position-absolute top-95 start-0 graph-scale_text">
                {{ minValue }}
            </div>
            <span
                v-if="$store.state.graph.length > 1"
                class="position-absolute top-95 start-0 graph-scale"
                style="height: 3px; width: 20px; background-color: black"
            ></span>

            <span
                v-for="(graphSel, i) in normalizeGraph()"
                :key="i"
                class="bg-primary"
                :style="{ height: graphSel + '%', width: this.graphSelWidth }"
                :value="$store.state.graphData[i]"
                @mouseover="createHover($store.state.graphData[i], $store.state.selectedTicker.dependence)"
                @mousemove="(event) => holdHover(event)"
                @mouseleave="(event) => deleteHover(event)"
            ></span>
            <span v-show="$store.state.graph.length < 10" style="height: 100%; width: 1px"></span>
            <img
                v-if="btnVisible"
                src="../assets/cancel.png"
                class="position-absolute top-0 end-0 cursor-pointer"
                alt="close graph btn"
                style="width: 18px; margin-right: -22px"
                @click="closeGraph"
            />
        </div>
        <h5 v-if="title" class="mt-2">
            На графике отображены данные за последние {{ title }} дней (максимально допустимое количество дней - 2000)
        </h5>
    </div>
</template>
<script>
export default {
    props: ["btnVisible", "graphSelWidth", "title"],
    methods: {
        closeGraph() {
            this.$store.state.graph = [];
            this.$store.state.selectedTicker = null;
        },
        normalizeGraph() {
            this.$store.state.graph = this.$store.state.grapData;
            return this.$store.state.graph.map((value) => {
                return ((value - this.minValue) * 95) / (this.maxValue - this.minValue) + 5;
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
            event.target.classList.add("border", "border-1", "border-white", "border-top-0", "border-bottom-0");
        },
        deleteHover(event) {
            document.body.removeChild(document.querySelector("#hover"));
            event.target.classList.remove("border", "border-1", "border-white", "border-top-0", "border-bottom-0");
        },
    },
    computed: {
        minValue() {
            return Math.min(...this.$store.state.graph);
        },
        maxValue() {
            return Math.max(...this.$store.state.graph);
        },
        middleValue() {
            return ((this.maxValue - this.minValue) / 2 + this.minValue).toFixed(2);
        },
    },
};
</script>
<style lang="scss">
.graph {
    height: 500px;
}
.graph-scale_text {
    margin-left: -85px;
    transform: translateY(-50%);
}
.graph-scale {
    margin-left: -10px;
}
</style>
