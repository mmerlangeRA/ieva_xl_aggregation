<template>
  <v-container>

    <div v-if="currentFile">
      <div>
        <v-progress-linear v-model="progress" color="light-blue" height="25" reactive>
          <strong>{{ progress }} %</strong>
        </v-progress-linear>
      </div>
    </div>

    <v-row no-gutters justify="center" align="center">
      <v-col cols="8">
        <v-file-input ref="fileInput" show-size label="File input" @change="selectFile"></v-file-input>
      </v-col>

      <v-col cols="4" class="pl-2">
        <v-btn color="success" dark small @click="upload">
          Upload
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-btn @click="mergeFiles">Merge Files</v-btn>

      </v-col>
      <v-col cols="6">
        <a :href="mergeFileUrl" download>
          <v-btn :disabled="!isProcessed">Download Merged File</v-btn>
        </a>
      </v-col>

    </v-row>

    <v-card v-if="fileInfos.length > 0" class="mx-auto">
      <v-list>
        <v-subheader>List of Files</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item v-for="(file, index) in fileInfos" :key="index">
            <a :href="file.url">{{ file }}</a>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-container>
</template>
  
<script setup lang="ts">
import { mergeAllFiles, getFiles, deleteFile, IFileData, postNewFile } from '@/api/fileManager';
import { useUserStore, useSocketStore, useMessageStore } from '@/stores'

import { useI18n } from 'vue-i18n'


const { t } = useI18n()

const fileInput = ref(null)
const messageStore = useMessageStore()

const currentFile = ref<File>(null)
const progress = ref(0)

const mergeFileUrl = ref(import.meta.env.VITE_SERVER_URL + "/public/merged_file.xlsx")
console.log(import.meta.env.VITE_SERVER_URL + "/public/merged_file.xlsx")

const isProcessed = ref(false)

function selectFile(file: File) {
  console.log(selectFile)
  progress.value = 0;
  currentFile.value = file;
}

async function upload() {
  console.log
  try {
    postNewFile(fileInput.value.files[0])
    messageStore.addMessage("File added", "info")
    fileInfos.value = (await getFiles()).data.files

  } catch (e) {

  }

}

async function mergeFiles() {
  isProcessed.value = false
  await mergeAllFiles()
  messageStore.addMessage("Files merged", "info")
  isProcessed.value = true

}

const fileInfos = ref<Array<string>>([])


onMounted(async () => {
  fileInfos.value = (await getFiles()).data.files
  console.log(fileInfos.value)

})


</script>
  
<style lang="css" ></style>
