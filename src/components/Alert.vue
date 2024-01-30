<template>
    <v-alert type="message.type || ''" title="Alert title" v-for="message in messages"
        text="message.text"></v-alert>
</template>

<script setup lang="ts">
import {Message} from "@/stores/message"

const props = defineProps<{
  messages: Message[]
}>()

</script>