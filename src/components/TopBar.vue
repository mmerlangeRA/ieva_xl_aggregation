
<template>
    <v-app-bar color="secundary">
        <template v-slot:prepend >
            <v-icon @click="toggleSelectionBar" v-if="openSelectionBar">mdi-menu-open</v-icon>
            <v-icon @click="toggleSelectionBar" v-if="!openSelectionBar">mdi-menu-close</v-icon>
        </template>

        <v-app-bar-title>{{ title }}</v-app-bar-title>

        <v-spacer></v-spacer>
        <span v-if="game">{{ game.name }}</span>
        
        <v-spacer></v-spacer>
       <v-btn @click="openTest" icon>
            <v-icon>mdi-test-tube</v-icon>
        </v-btn>
        <v-btn @click="openFileComponent" icon :disabled="componentName=='files'">
              <v-icon>mdi-file-multiple</v-icon>
          </v-btn>
          <v-btn @click="openDashboardComponent" icon :disabled="componentName == 'dashboard'">
                <v-icon>mdi-view-dashboard</v-icon>
          </v-btn>
         <select v-model="$i18n.locale" @change="setLanguage($i18n.locale)">
          <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
        </select>

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              v-bind="props"
            >
               <v-icon icon="mdi-account"></v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title @click="logout">{{ t('logout') }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
    </v-app-bar>
    <TestGenerator v-if="openTestBool" :show="openTestBool" @closeTest="closeTest"></TestGenerator>
</template>

<script setup lang="ts">
import { IUserData } from '@/api/users';
import { useUserStore } from '@/stores'
import { useI18n } from 'vue-i18n'
import TestGenerator from '../components/TestGenerator.vue';

import { setLanguage } from '@/utils/language';


const { t } = useI18n()


const props = defineProps<{
  user: IUserData,
  componentName:string
}>()

const emit = defineEmits([
  'openFileComponent','openDashboardComponent'
])

const openTestBool = ref(false)


function openTest() {
  openTestBool.value= true
}


function closeTest() {
  openTestBool.value = false
}

function openFileComponent() {
  console.log("openFileComponent")
  emit('openFileComponent')
}

function openDashboardComponent() {
  console.log("openDashboardComponent")
  emit('openDashboardComponent')
}

const title = import.meta.env.VITE_APP_TITLE


async function logout() {
  const userStore = useUserStore()
      await userStore.userLogout()
}


</script>
  
<style lang="scss" scoped></style>
  