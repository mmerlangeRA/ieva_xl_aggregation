<template>
  <div style="height:calc(100vh - 64px);width:100vw;overflow: hidden;">
    <TopBar v-if="user" :user="user" @openFileComponent="openFileComponent" @openDashboardComponent="openDashboardComponent" :componentName="componentName"></TopBar>
      <div class="main-view">
          <Files v-if="componentName=='files'"></Files>
          <Dashboard v-if="componentName=='dashboard'"></Dashboard>
      </div>
  </div>
</template>
  
<script setup lang="ts">
import Files from '../components/Files.vue';
import Dashboard from '../components/Dashboard.vue';
import TopBar from '@/components/TopBar.vue';

import { useUserStore} from '@/stores'
import { IUserData, checkToken } from '@/api/users';


const userStore = useUserStore()

const componentName=ref("dashboard")


const user = ref<IUserData>({
    id: "",
    name: "",
    email: '',
})
const token = ref('')



function openFileComponent() {
  componentName.value ="files"
}
function openDashboardComponent() {
  componentName.value = "dashboard"
}




onMounted(async () => {
  const loginData = await userStore.getUserInfo()
  user.value = loginData.user || {
    id: "",
    name: "",
    email: '',
  }
  // token.value = loginData.access_token
  
  // if (token.value) {//check if staill valid
  //   const isValidData = await checkToken(token.value)
  //   if (!isValidData.data) {
  //     userStore.userLogout()
  //     return
  //   }
  // } else {
  //   userStore.userLogout()
  // }

}
)

</script>
  
<style scoped>




</style>
  