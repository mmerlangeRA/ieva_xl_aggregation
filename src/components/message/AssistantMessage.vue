<template>

<p class="message-item" v-if="props.assistantResponse">
    <p >{{ textResponse }}</p>
    <p v-for="source in sources" v-if="sources.length> 0" class="source">
        Score : {{ Math.round(source.score*100)+"%" }}<br />
        <span class="text">
            {{ source.document.doc_metadata.original_text }}<br />
        </span>
        <span >
            Source:
            <span>{{ source.document.doc_metadata.file_name }}
                <span class="link" @click="annotateDocument(source.document.doc_metadata)">
                    [p{{ source.document.doc_metadata.page_label }}]
                </span>
            </span>
        </span>
    </p>
     <v-icon v-if="textResponse" @click="copyToClipBoard" class="icon" size="x-small">mdi-content-copy</v-icon>
</p>

</template>
  
<script setup lang="ts">
import { IChunkData, IChunkMetaData } from '@/api/query'
import { IAssistantMessage, IMessage } from './interfaces';

const props = defineProps<{
    assistantResponse: IAssistantMessage
}>()

const sources = ref<Array<IChunkData>>([])
const textResponse=ref("")

const emit = defineEmits<{
  (e: 'annotateDocument', document: IChunkMetaData): void
}>()

function annotateDocument(document: IChunkMetaData) {
    emit('annotateDocument', document)
}

function copyToClipBoard() {
    navigator.clipboard.writeText(textResponse.value);
}

onMounted(() => {
    sources.value = props.assistantResponse.sources || []
    textResponse.value = props.assistantResponse.content
})
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


.source {
    font-size: 12px;
}

.link{
    text-decoration: underline;
    font-weight: bold;
    color: blue;
    cursor: pointer;
}
.text{
    
    font-style: italic;
}

.icon{
    position: absolute;
    right: 2px;
    top: 2px;
}
</style>
  