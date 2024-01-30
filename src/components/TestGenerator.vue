
<template>
    <v-dialog width="50%" v-model="dialog">
        <v-card>
            <v-card-title>
                <span class="text-h5">{{ t('test') }}</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="4" sm="4">
                            <v-text-field :label="t('bu_id')" v-model="buId"></v-text-field>
                        </v-col>
                        <v-col cols="4" sm="4">
                            <v-text-field :label="t('nbRows')" v-model="nbRows"
                            type="number"  step="any" min="0"></v-text-field>
                        </v-col>
                        <v-col cols="4" sm="4">
                            <v-text-field :label="t('percentageFilled')" v-model="missingPercentage" type="number"  step="0.05" min="0" max="1"></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn  density="compact" @click="close">
                    {{ t('actions.close') }}
                </v-btn>
                <v-btn  density="compact" @click="generate">
                    {{ t('create') }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { TestManager } from '@/utils/testCreator'

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
const buId = ref("")
const nbRows = ref(0)
const missingPercentage = ref(1)

const emit = defineEmits<{
    (e: 'closeTest'): void
}>()

function close() {
    console.log("closeTest")
    emit('closeTest')
}

function generate() {
    const testManager = new TestManager()
    testManager.allInOne(buId.value, nbRows.value, parseFloat(missingPercentage.value))
}


onMounted(() => {
    dialog.value = true
})

</script>
  
<style lang="scss" scoped></style>
  

