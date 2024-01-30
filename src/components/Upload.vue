<template>
    <el-upload ref="uploadRef" class="upload-demo" action="/api/upload" :auto-upload="true" :show-file-list="false"
        :on-success="uploadSuccess" :before-upload="beforeUpload">
        <template #trigger>
            <el-button type="primary" style="width: 100%;">document</el-button>
        </template>
    </el-upload>
</template>
<script setup>
const emit = defineEmits(['uploadSuccess'])
const supportFileType = ['application/pdf', 'application/epub+zip', 'text/markdown', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
const beforeUpload = (rawFile) => {
  if (!supportFileType.includes(rawFile.type)) {
    console.log(rawFile.type)
    ElMessage.error('Ne prend en charge que .pdf, .epub, .md, .txt saisir un fichier')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('La taille du fichier ne peut pas dépasser 2MB!')
    return false
  }
  return true
}

const uploadSuccess= () => {
    emit('uploadSuccess')
}
</script>