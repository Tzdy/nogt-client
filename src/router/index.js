import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        name: 'login',
        path: '/login',
        component: () => import('@/views/login/index.vue')
    },
    {
        name: 'index',
        path: '/',
        component: () => import('@/views/index/index.vue')
    },
    {
        name: 'repo',
        path: '/repo',
        component: () => import('@/views/repo/index.vue'),
        children: [
            {
                name: 'repo-main',
                path: '',
                component: () => import('@/views/repo/children/index.vue'),
                meta: { title: '仓库', icon: 'el-icon-folder-opened' },
                children: [
                    {
                        name: 'code',
                        path: '',
                        meta: { title: '代码', icon: 'el-icon-document' },
                        component: () => import('@/views/repo/children/code/index.vue')
                    },
                    {
                        name: 'branch',
                        path: 'branch',
                        meta: { title: '分支', icon: 'el-icon-document' },
                        component: () => import('@/views/repo/children/branch/index.vue')
                    },
                    {
                        name: 'tag',
                        path: 'tag',
                        meta: { title: '标签', icon: 'el-icon-document' },
                        component: () => import('@/views/repo/children/tag/index.vue')
                    }
                ]
            },
            {
                name: 'repo-communication',
                path: '',
                component: () => import('@/views/repo/children/index.vue'),
                meta: { title: '交流', icon: 'el-icon-folder-opened' },
                children: [
                    {
                        name: 'issue',
                        path: '',
                        meta: { title: '问题', icon: 'el-icon-document' },
                        component: () => import('@/views/repo/children/issue/index.vue')
                    },
                    {
                        name: 'pull-request',
                        path: 'pull-request',
                        meta: { title: '合并请求', icon: 'el-icon-document' },
                        component: () => import('@/views/repo/children/pull-request/index.vue')
                    },
                ]
            }
            // {
            //     name: 'code',
            //     path: '',
            //     component: () => import('@/views/repo/b.')
            // }
        ]
    },
]

const router = new VueRouter({
    routes,
})

export default router