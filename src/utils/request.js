import axios from 'axios'
import router from '../router'
import pinia from '../store'
import { useUserStore } from '../store/user'

const instance = axios.create({
    baseURL: 'http://localhost:3001',
})

instance.interceptors.request.use((request) => {
    const userStore = useUserStore(pinia)
    request.headers.Authorization = userStore.token
    return request
})

instance.interceptors.response.use((response) => {
    if (response.data.code !== 20000) {
        if (response.data.code === 10001) {
            return router.replace({ name: 'login' })
        }
        return Promise.reject(response.data)
    }


    return response.data
})


export default instance