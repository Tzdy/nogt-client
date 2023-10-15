import router from "./router";
import { useUserStore } from "./store/user";
import pinia from "./store";

const whiteList = ['login', 'index', 'repo', 'profile', 'code', 'branch', 'tag', 'issue', 'pull-request']

router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore(pinia)
    let token = userStore.token
    if (!token) {
        if (whiteList.includes(to.name)) {
            return next()
        } 
        return next({ name: 'login' })
    }
    if (!userStore.user) {
        await userStore.info()
        if (userStore.user) {
            if (to.name === 'login') {
                return next({ name: 'index' })
            } else {
                return next()
            }
        } else {
            return next({ name: 'login' })
        }
    } else {
       next()
    }
})