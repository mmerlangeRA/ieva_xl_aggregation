<script setup lang="ts">
import { useRouter } from 'vue-router'
//import { useTheme } from 'vuetify'
import { useI18n } from 'vue-i18n'

import { useUserStore } from '@/stores'
import { toBoolean } from '@/utils/utils'

const { t } = useI18n()

const form = ref({
    email: '',
    password: '',
    remember: false,
})

const appTitle = import.meta.env.VITE_APP_TITLE
console.log(appTitle)
const logo = import.meta.env.VITE_APP_LOGO

const isPasswordVisible = ref(false)

const router = useRouter()
const userStore = useUserStore()
const waiting = ref(false)
const valid = ref(true)
const signupAllowed = toBoolean(import.meta.env.VITE_APP_SIGNUP_ALLOWED)

const lsLoginName = "login"

const nameRules = [
    (v: string) => !!v || t('pleaseEnter', [t('login.email')]),
    (v: string) =>
        v.length <= 25
        || t('form.LTE', { input: t('lengthOf', [t('login.email')]), limit: 25 }),
]
const passwordRules = [(v: string) => !!v || t('pleaseEnter', [t('login.password')])]


function validateForm() {
    return true
}

function readLS() {
    const loginJson = localStorage.getItem(lsLoginName)
    if (!loginJson) {
        return
    }
    try { 
        const loginData = JSON.parse(loginJson)
        form.value = loginData
    } catch (e) {
        flushLS()//will be clean after reload
    }
    
}

function saveLS() {
    localStorage.setItem(lsLoginName, JSON.stringify(form.value))
}

function flushLS() {
    localStorage.removeItem(lsLoginName)   

}

function rememberMe(shouldRemember: boolean) {
    if (form.value.remember) {
        saveLS()
    } else {
        flushLS()
    }
}

onMounted(() => {
    readLS()
})

async function onSubmit() {
    if (validateForm()) {
        try {
            waiting.value = true
            rememberMe(form.value.remember)
            await userStore.userLogin(form.value.email, form.value.password)
            await router.push({ path: '/' }).catch((e) => {
                console.error(e)
            })
        }
        catch (e) {
            // snackMessage.value = JSON.stringify(e)
            // snackbar.value = true
        }
        finally {
            waiting.value = false
        }
    }
}

</script>

<template>
    <div class="auth-wrapper d-flex align-center justify-center pa-4">
        <VCard class="auth-card pa-4 pt-7" max-width="448">
            <VCardText class="pt-2">
                <h5 class="text-h5 font-weight-semibold mb-1">
                     {{t('login.title', { appTitle: appTitle })}}👋🏻
                </h5>
                <p class="mb-0">
                   {{ t('login.text')}}
                </p>
            </VCardText>

            <VCardText>
                <VForm @submit.prevent="() => { }">
                    <VRow>
                        <VCol cols="12">
                            <VTextField v-model.trim="form.email" :label='t("login.email")' type="email" :rules="nameRules"
                                @keydown.enter.prevent="onSubmit" />
                        </VCol>

                        <VCol cols="12">
                            <VTextField v-model="form.password" :label='t("login.password")'
                                :type="isPasswordVisible ? 'text' : 'password'"
                                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                                :rules="passwordRules" @keydown.enter.prevent="onSubmit"
                                @click:append-inner="isPasswordVisible = !isPasswordVisible" />

                            <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                                <VCheckbox v-model="form.remember" :label="t('login.rememberme')" />

<!--                                 <a class="ms-2 mb-1" href="javascript:void(0)">
                                    {{ t('login.passwordForgotten') }}
                                </a> -->
                            </div>

                            <VBtn block type="submit" @click="onSubmit" :disabled="waiting">
                                {{ t('login.submit') }}
                            </VBtn>
                        </VCol>
                         <!-- create account -->
                        <VCol v-if="signupAllowed"
                        cols="12"
                        class="text-center text-base"
                        >

                        <span>New on our platform?</span>
                        <RouterLink
                            class="text-primary ms-2"
                            :to="{ name: 'Register' }"
                        >
                            Create an account
                        </RouterLink>
                        </VCol>

                    </VRow>
                </VForm>
            </VCardText>
        </VCard>

    </div> 
</template>

<!-- <style lang="scss">
@use "@core/scss/pages/page-auth.scss";
</style> -->

