<script setup lang="ts">
import AppMessage from '@/components/AppMessage.vue'
import { useRouter } from 'vue-router'

</script>

<template>
  <VApp>
    <VLayout class="layout-wrapper layout-nav-type-vertical">
  <v-main>
        <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  </v-main>
    </VLayout>
    <AppMessage />
  </VApp>
</template>
