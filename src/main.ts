/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@/styles/styles.scss'
import '@core/scss/index.scss'
import { createI18n } from 'vue-i18n'
import enJson from '@/locales/en.json'
import frJson from '@/locales/fr.json'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { useUserStore } from './stores';
import { getLanguage } from '@/utils/language';


const i18n = createI18n({
    legacy: false,
    locale: getLanguage(),
    messages: {
        fr: frJson,
        en: enJson,
    },
})

loadFonts()

const app = createApp(App)

app.use(vuetify)
app.use(createPinia())
app.use(i18n)
app.use(router)

app.mount('#app')


const userStore = useUserStore()
userStore.$subscribe((mutation, state) => {
    if (!state.user || !state.token) {
        router.push({ path: '/login' }).catch((e) => {
            console.error(e)
        })
    }
})

const setFavicon = (faviconUrl:string) => {
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (link) {
        link.href = faviconUrl;
    } else {
        const newLink = document.createElement('link');
        newLink.rel = 'icon';
        newLink.href = faviconUrl;
        document.head.appendChild(newLink);
    }
};

// Use the environment variable for the favicon URL

setFavicon(import.meta.env.VITE_APP_FAVICON_URL);
console.log("in main")

