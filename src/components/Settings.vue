
<template>
    <v-dialog width="50%" v-model="dialog">
        <v-card>
            <v-card-title>
                <span class="text-h5">{{ t('settings.title') }}</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="12">
                            <v-textarea :label="t('settings.prompt')" v-model="input"></v-textarea>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn  density="compact" @click="close">
                    {{ t('actions.close') }}
                </v-btn>
                <v-btn  density="compact" @click="savePrompt">
                    {{ t('actions.save') }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()


const props = defineProps<{
    show: boolean
}>()

const dialog = ref(true)

watch([dialog], () => {
    if (!dialog.value) {
        close()
    }
})
const input = ref("")

const emit = defineEmits<{
    (e: 'closeSettings'): void
}>()

function close() {
    console.log("closeSettings")
    emit('closeSettings')
}

function savePrompt() {
    setPrompt(input.value)
    close()
}

onMounted(() => {
    dialog.value = true
    input.value = getPrompt()
})

</script>
  
<style lang="scss" scoped></style>
  

