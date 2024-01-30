import axios, { type AxiosError } from 'axios'
import { useUserStore, useMessageStore } from '@/stores'
import { Message } from '@/stores/message'

const service = axios.create({
  baseURL:
    import.meta.env.VITE_SERVER_URL,
  timeout: 120000,
})



const errHandler = async (error: AxiosError) => {
  console.error(error.message)
  const response = error.message
  const userStore = useUserStore()
  const messageStore = useMessageStore()
  if (error.code) {
    switch (error.code) {
      case "ERR_NETWORK":
      // TODO: refresh token according to your backend
      // if (userStore.token) {
      //   return userStore.refreshToken().then((resp) => {
      //     return service(error.response!.config)
      //   })
      // }
      break
    }
    messageStore.addMessage(error.message, 'error')
/*     if (!response.headers['content-type']?.includes('text/html'))
      throw response.data */
  }
  throw error
}

// Request interceptors
service.interceptors.request.use(
  async config => {
    const userStore = useUserStore()
    // Add Bear authorization header to every request, you can add other custom headers here
    const user = userStore.user
    const sessionId = userStore.token
    if (user && sessionId) {
      config.headers!.Authorization = `Bearer ${sessionId}`
    }
    config.headers['ngrok-skip-browser-warning'] = "69420"//for ngrok
    return config
  },

  // Add Error Handler Below
)

// Response interceptors
service.interceptors.response.use(response => {
  return response
}, errHandler)

export default service
