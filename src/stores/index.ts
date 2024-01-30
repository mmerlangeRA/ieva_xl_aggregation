import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { type Pinia, createPinia } from 'pinia'

// Pinia Stores

import { useUserStore } from './user'
import { useMessageStore } from './message'
import { useSocketStore } from './socket'
import { useDashboardStore } from './dashboard'


/** Pinia Store */
const pinia: Pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
export default pinia

export { useUserStore, useMessageStore, useSocketStore, useDashboardStore }
