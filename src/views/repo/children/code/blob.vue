<template>
    <div>
        <pre>{{ blob }}</pre>
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
    props: {
        blob: String,
        blobSize: Number,
    },
    setup(props) {



    }
})
</script>

<style scoped>

</style>