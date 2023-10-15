<template>
    <details class="box position-relative">
        <summary class="px-2 py-1"  ref="summaryElem">
            <slot name="summary"></slot>
        </summary>
        <div :class="{[placement + '-0']: true }" class="position-absolute top-100 mt-1 border text-start detail">
            <slot></slot>
        </div>
    </details>
</template>

<script>
import { ref } from '@vue/composition-api'

export default {
    props: {
        placement: {
            type: String,
            default: 'end'
        }
    },
    setup() {
        const summaryElem = ref(null)
        function onCloseSummary() {
            summaryElem.value.click()
        }

        return {
            summaryElem,
            onCloseSummary
        }
    }
}
</script>

<style scoped>
.detail {
    display: none;
}

.box[open] .detail {
    display: block;
}
</style>