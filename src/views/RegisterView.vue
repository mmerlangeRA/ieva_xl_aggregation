<script setup lang="ts">
import { useTheme } from 'vuetify'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore, useMessageStore } from '@/stores'
import { toBoolean } from '@/utils/utils'
const signupAllowed = toBoolean(import.meta.env.VITE_APP_SIGNUP_ALLOWED)

const router = useRouter()
const userStore = useUserStore()
const messageStore = useMessageStore()
const waiting = ref(false)

const { t } = useI18n()

const form = ref({
  username: '',
  email: '',
  password: '',
  privacyPolicies: false,
})

const vuetifyTheme = useTheme()
const logo = import.meta.env.VITE_APP_LOGO
console.log(logo)
const appTitle = import.meta.env.VITE_APP_TITLE


const isPasswordVisible = ref(false)

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


async function onSubmit() {
  if (validateForm()) {
    waiting.value = true
    try {
      waiting.value = true
      await userStore.createUser(form.value.email, form.value.password)
      messageStore.addMessage("User Created", "info")
      router.push("/login")
    }
    catch (e) {
      messageStore.addMessage("User Error", "error")
      // snackMessage.value = JSON.stringify(e)
      // snackbar.value = true
    }
    finally {
      waiting.value = false
    }
  }
}

onMounted(() => {
  if (!signupAllowed) {
    messageStore.addMessage("SignUp not allowed", "info")
    router.push("/login")
  }
})

</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <img :src="logo" class="logo"/>
          </div>
        </template>

        <VCardTitle class="font-weight-semibold text-2xl text-uppercase">
          {{ appTitle }}
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">
          Adventure starts here 🚀
        </h5>
        <p class="mb-0">
          Make your app management easy and fun!
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="() => {console.log('submit');onSubmit()}">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                label="Email"
                type="email"
                :rules="nameRules"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Password"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
                :rules="passwordRules"
              />
              <div class="d-flex align-center mt-1 mb-4">
                <VCheckbox
                  id="privacy-policy"
                  v-model="form.privacyPolicies"
                  inline
                />
                <VLabel
                  for="privacy-policy"
                  style="opacity: 1;"
                >
                  <span class="me-1">I agree to</span>
                  <a
                    href="javascript:void(0)"
                    class="text-primary"
                  >privacy policy & terms</a>
                </VLabel>
              </div>

              <VBtn
                block
                type="submit"
              >
                Sign up
              </VBtn>
            </VCol>

            <!-- login instead -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>Already have an account?</span>
              <RouterLink
                class="text-primary ms-2"
                to="login"
              >
                Sign in instead
              </RouterLink>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core/scss/pages/page-auth.scss";
.logo{
  width:80px;
}
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
