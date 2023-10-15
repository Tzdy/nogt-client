<template>
    <div style="height: calc(100vh - 61px); display: flex;">
        <el-menu @select="onSelectMenuItem" :default-active="$router.currentRoute.name" class="el-menu-vertical-demo" :collapse="isCollapse">
            <el-submenu v-for="sub in options" :key="sub.name" :index="sub.name">
                <template slot="title">
                    <i :class="sub.meta.icon"></i>
                    <span>{{ sub.meta.title }}</span>
                </template>
                <el-menu-item :route="child" v-for="child in sub.children" :key="child.name" :index="child.name">{{ child.meta.title }}</el-menu-item>
            </el-submenu>
            <el-menu-item index="5" style="position: absolute; bottom: 0; width: 100%;" @click="isCollapse = !isCollapse">
                <i v-if="isCollapse" class="el-icon-arrow-right"></i>
                <i v-else class="el-icon-arrow-left"></i>
                <span slot="title"></span>
            </el-menu-item>
        </el-menu>
        <div v-if="repoInfo.id" class="box">
            <div class="main-container">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import { computed, defineComponent, ref } from '@vue/composition-api';
import router from '@/router'
import { useRepoStore } from '@/store/repo';
export default defineComponent({
    setup() {
        const { username, repoName, branch, refType } = router.currentRoute.query
        const isCollapse = ref(false)
        const repoStore = useRepoStore()
        repoStore.getRepoOne(username, repoName, branch, refType)
        console.log(router)
        const options = computed(() => {
            return router.options.routes.find(item => item.name === 'repo').children
        })
        const repoInfo = computed(() => repoStore.repoInfo)

        function onSelectMenuItem(index) {
            const { repoName, username } = router.currentRoute.query
            console.log({
                name: index,
                query: {
                    username,
                    repoName
                }
            })
            router.push({
                name: index,
                query: {
                    username,
                    repoName
                }
            })
        }

        console.log(repoInfo)
        return {
            isCollapse,
            repoInfo,
            options,

            onSelectMenuItem
        }
    }
})
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 240px;
  }
.el-menu-vertical-demo {
    height: 100%;
    flex-shrink: 0;
}

.box {
    position: relative;
    flex-grow: 1;
    height: 100%;
    overflow: auto;
}
.main-container {
    position: relative;
    width: 960px;
}

</style>