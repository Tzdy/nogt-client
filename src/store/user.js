import { login, info } from '@/api/user'
import { defineStore } from 'pinia'
import router from '../router'
export const useUserStore = defineStore('user', {
    state: () => ({
        token: localStorage.getItem('token'),
        /**
         * @type {{username: string, nickname: string, id: number} | null}
         */
        user: null
    }),
    getters: {
    },
    actions: {
      async login(form) {
        const response = await login(form)
        const data = response.data
        this.token = data.token  
        localStorage.setItem('token', this.token)
        await this.info()
      },
      async info() {
        const res = await info()
        const user = res.data
        this.user = user;
      },
      exit() {
        this.token = ''
        this.user = null
        localStorage.removeItem('token')
        router.replace({ name: 'login' })
      }
    },
  })