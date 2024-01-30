<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { formatTime } from '@/utils/date'
import AppMessageItem from '@/components/AppMessageItem.vue'
import { useMessageStore } from '@/stores'

const { t } = useI18n()
const messageStore = useMessageStore()
const { messages } = storeToRefs(messageStore)
const messagesShown = computed(() =>
  messages.value.filter(message => message.show),
)
const showAll = ref(false)
const timeout = ref(5000)
function deleteMessage(id: number) {
  messageStore.delMessage(id)
}
function emptyMessages() {
  messageStore.$reset()
}
function toggleAll() {
  showAll.value = !showAll.value
  messages.value.forEach(m => {
    m.show = showAll.value
  })
  if (showAll.value)
    timeout.value = -1

  else
    timeout.value = 5000
}
</script>

<template>
  <div class="d-contents">
    <VTooltip top>
      <template #activator="{ on }">
        <VBtn
          text
          tile
          small
          @click="toggleAll"
          v-on="on"
        >
          <VIcon>
            {{
              messages.length ? 'mdi-bell-badge-outline' : 'mdi-bell-outline'
            }}
          </VIcon>
        </VBtn>
      </template>
      <span>{{ t('notification') }}</span>
    </VTooltip>
    <Teleport to="#app">
      <VCard
        elevation="6"
        width="300"
        class="d-flex flex-column message-card"
        :class="{ 'message-card--open': showAll }"
      >
        <VToolbar
          flat
          dense
        >
          <VToolbarTitle class="font-weight-light text-body-1">
            {{
              t(messages.length ? 'notification' : 'noNew')
            }}
          </VToolbarTitle>
          <VSpacer />
          <VBtn
            small
            icon
            :title="t('clearAll')"
            @click="emptyMessages"
          >
            <VIcon>mdi-bell-remove</VIcon>
          </VBtn>
          <VBtn
            small
            icon
            :title="t('hide')"
            @click="toggleAll"
          >
            <VIcon>$expand</VIcon>
          </VBtn>
        </VToolbar>
        <VSlideYReverseTransition
          tag="div"
          class="d-flex flex-column-reverse message-box"
          group
          hide-on-leave
        >
          <AppMessageItem
            v-for="message in messagesShown"
            :key="message.id"
            v-model="message.show"
            :colored-border="showAll"
            border="left"
            :type="message.type"
            :timeout="timeout"
            dismissible
            :elevation="showAll ? 0 : 10"
            @close="deleteMessage(message.id)"
          >
            <small>{{ formatTime(message.time) }}</small>
            <div>
              {{ message.text }}
            </div>
          </AppMessageItem>
        </VSlideYReverseTransition>
      </VCard>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
// @import '@/assets/styles/variables.scss';

.d-contents{
  position: fixed;
  bottom: 0;
}
.message-item {
  width: 100%;
}
.message-card {
  position: fixed;
  z-index: 1000;
  right: 15px;
  bottom: 5px;
  max-height: 100vh;
  visibility: hidden;
  transition: max-height 0.2s ease-out;
  &.message-card--open {
    visibility: visible;
   // max-height: calc(100vh - #{$footer-height} - #{$app-bar-height} - 10px);
    .message-box {
      justify-content: initial;
      height: auto;
      overflow-y: overlay;
      pointer-events: auto;
      .message-item {
        margin: 0;
        border-radius: 0;
        border-top: 1px solid #5656563d !important;
        padding-top: 5px;
        padding-bottom: 5px;
      }
    }
  }
}
.message-box {
  overflow-y: visible;
  visibility: visible;
  //height: calc(100vh - #{$footer-height} - 5px);
  justify-content: end;
  pointer-events: none;
  .message-item {
    pointer-events: initial;
    user-select: initial;
  }
}
</style>
