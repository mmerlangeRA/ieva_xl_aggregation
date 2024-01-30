<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { toRef, watch } from 'vue'

interface Props {
  timeout: number
}

const props = defineProps<Props>()

const emits = defineEmits([
  'close',
])

const isActive = useVModel(props, undefined, emits)
const timeout = toRef(props, 'timeout')
let activeTimeout: number
const startTimeout = () => {
  clearTimeout(activeTimeout)

  if (!isActive.value || timeout.value === -1)
    return

  activeTimeout = setTimeout(() => {
    isActive.value = false
  }, timeout.value)
}
watch([isActive, timeout], startTimeout)
if (isActive.value)
  startTimeout()

function closeThis() {
  emits('close')
}
</script>

<template>
  <VAlert
    v-bind="$attrs"
    class="message-item"
    v-on="$listeners"
  >
    <slot />
    <template #close>
      <VBtn
        icon
        small
        class="v-alert__dismissible"
        @click="closeThis"
      >
        <VIcon>$cancel</VIcon>
      </VBtn>
    </template>
  </VAlert>
</template>

<style scoped lang="scss">
</style>
