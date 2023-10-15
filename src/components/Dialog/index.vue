<template>
    <dialog ref="dialog">
        <slot></slot>
    </dialog>
</template>

<script>
import dialogPolyfill from 'dialog-polyfill'

export default {
    props: {
        visible: Boolean,
    },
    watch: {
        visible(val) {
            if (val) {
                this.$refs.dialog.show()
            } else {
                this.$refs.dialog.close()
            }
        }
    },
    mounted() {
        dialogPolyfill.registerDialog(this.$refs.dialog)
    }
}
</script>

<style scoped>
dialog {
  position: fixed;
  top: 50%;
  transform: translate(0, -50%);
}
</style>