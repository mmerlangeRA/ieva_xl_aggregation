<template>

<p class="message-item message-user" ref="content">
    {{props.message.content}}
    <v-icon @click="copyToClipBoard" class="icon" size="x-small">mdi-content-copy</v-icon>
</p>

</template>
  
<script setup lang="ts">
import { IUserMessage } from './interfaces';

const props = defineProps<{
    message: IUserMessage
}>()

const content = ref(null)
onMounted(() => {

})
function copyToClipBoard() {
    navigator.clipboard.writeText(props.message.content);
}


</script>
  
<style lang="scss" scoped>
.message-item {
    position: relative;
    border: 1px solid #CDD0D6;
    padding: 10px;
    margin: 5px 0;
}

.message-user {
    background-color: #a0cfff;
}

.icon{
    position: absolute;
    right: 2px;
    bottom: 2px;
}
</style>
  