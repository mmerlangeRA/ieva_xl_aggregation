import { defineStore } from 'pinia'

import { useMessageStore } from './message'
import { useSocketStore } from './socket'

import {
    type ILoginData,
    getUser,
    createUserNoCredentials,
    login,
    logout,
    refreshToken,
    getUsers,
    IUserData,
} from '@/api/users'



function readUserInLS(): ILoginData {
    const lsUser = localStorage.getItem('user')
    const lsToken = localStorage.getItem('token')
    if (lsUser) {
        const savedUser = JSON.parse(lsUser) as IUserData
        
        if(savedUser)
            return {
            user: savedUser,
                access_token: lsToken!,
        }
    }
    return {
        user: null as unknown as IUserData,
        access_token: ''
    }
}

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            token: readUserInLS().access_token,
            user: readUserInLS().user,
        }
    },
    actions: {
        loginInfoToJson():ILoginData {
            return {
                user: this.user,
                access_token: this.token,
            }
        },
        async createUser(username: string, password: string): Promise<IUserData> {
            const user = await createUserNoCredentials(username, password)
            const userData = user.data
            useMessageStore().$reset()
            return userData;
        },
        async userLogin(username: string, password: string): Promise<ILoginData> {
            const user = await login(username, password)
            console.log(user.data)
            const loginData = user.data
            useSocketStore().init(user.data.user.id)
            this.updateUserLocally(loginData.user, loginData.access_token) 
            useMessageStore().$reset()
            return this.loginInfoToJson();
        },
        getUserInfo(): ILoginData {
            const savedUser = readUserInLS()
            if (savedUser) {
                console.log(savedUser.user)
                useSocketStore().init(savedUser.user.id)
                this.updateUserLocally(savedUser.user, savedUser.access_token)
            }
            return this.loginInfoToJson();
                
        },
        async userLogout(): Promise<void> {
            try {
                await logout(this.token)
            } catch (e) {
                console.error(e)
            }
            ['user', 'session'].forEach(k =>
                localStorage.removeItem(k),
            )
            this.$reset()
            this.user=null as unknown as IUserData;
            this.token = '';
        },
        async refreshToken() {
            const response = await refreshToken(localStorage.getItem('refresh')!)
            localStorage.setItem('access', response.data.accessToken)
            localStorage.setItem('fresh', response.data.refreshToken)
           // this.updateUser(user.name, user.user_id, response.data.accessToken, user.organization_id)

            return response
        },
        updateUserLocally(userData: IUserData, access_token:string): void {
            this.user = userData
            this.token = access_token
            this.saveInLs()
        },
        saveInLs() {
            localStorage.setItem('user', JSON.stringify(this.user))
            localStorage.setItem('token', this.token)
        },

        async getAllUsers() {
            const all = await getUsers()
            return all;
        }
},
})
