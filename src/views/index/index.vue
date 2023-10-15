<template>
    <div class="p-4 overflow-auto flex justify-center">
        <div style="width: 640px;">
            <div class="border rounded mb-4 p-4" v-for="item in repoList" :key="item.username + item.name">
                <div class="flex">
                    <el-link @click="onNavToCode(item)" type="primary" :underline="false">
                        <span class="font-bold">
                            <span>{{ item.username }}</span>
                            <span>/</span>
                            <span>{{ item.name }}</span>
                        </span>
                    </el-link>
                </div>

                <div class="mt-2 text-xs">
                    <span>{{ item.description }}</span>
                </div>

                <div class="mt-2 text-slate-500">
                    <div class="text-xs flex items-center">
                        <el-link type="info" :underline="false">
                            <span class="text-xs">
                                <span>Issue</span>
                                <span class="ms-1">({{ item.issueNum }})</span>
                            </span>
                        </el-link>
                        <el-link class="ms-2" type="info" :underline="false">
                            <span class="text-xs">
                                <span>Pull Request</span>
                                <span class="ms-1 ">({{ item.pullRequestNum }})</span>
                            </span>
                        </el-link>
                        <span class="ms-2">Update on</span>
                        <span class="ms-2" :title="item.updatedTime">{{ item.updatedAt }}</span>
                    </div>
                </div>
            </div>
            <el-pagination @size-change="onSizeChange" @current-change="onCurrentPageChange" :current-page="pageQuery.page"
                :page-sizes="pageSizeList" :page-size="pageQuery.pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { defineComponent, nextTick, reactive, ref } from '@vue/composition-api';
import router from '../../router';
import Pagination from '../../components/Pagination/index.vue'
import { getRecommendRepoPageList } from '@/api/repo'
import moment from 'moment';
export default defineComponent({
    components: {
        Pagination
    },
    setup() {

        const searchForm = reactive({
            repoName: '',
            username: ''
        })
        const pageQuery = reactive({
            page: 1,
            pageSize: 20,
        })
        const pageSizeList = [20, 40, 60, 100]
        pageQuery.page = Number(router.currentRoute.query.page) ? Number(router.currentRoute.query.page) : 1
        pageQuery.pageSize = Number(router.currentRoute.query.pageSize) ? Number(router.currentRoute.query.pageSize) : 20
        searchForm.repoName = router.currentRoute.query.repoName || ''
        searchForm.username = router.currentRoute.query.username || ''
        const total = ref(0)
        function onCurrentPageChange(page) {
            pageQuery.page = page
            router.replace({
                name: router.currentRoute.name,
                query: {
                    ...pageQuery
                }
            })
        }
        function onSizeChange(size) {
            pageQuery.page = 1
            pageQuery.pageSize = size
            router.replace({
                name: router.currentRoute.name,
                query: {
                    ...pageQuery
                }
            })
        }

        function onSearch() {
            pageQuery.page = 1
            router.replace({
                name: router.currentRoute.name,
                query: {
                    ...pageQuery,
                    ...searchForm
                }
            })
        }

        const repoList = ref([])
        const searchLoading = ref(false)
        function fetchRepoList() {

            const params = {
                ...pageQuery,
                ...searchForm
            }
            searchLoading.value = true
            getRecommendRepoPageList(params)
                .then(res => {
                    repoList.value = res.data.list.map(item => {
                        const { createdAt, updatedAt, ...result } = item

                        return {
                            createdTime: moment(createdAt).fromNow(),
                            createdAt: moment(createdAt).format('yyyy-MM-DD HH:mm:ss'),
                            updatedAt: moment(updatedAt).fromNow(),
                            updatedTime: moment(updatedAt).format('yyyy-MM-DD HH:mm:ss'),
                            ...result
                        }
                    })
                    total.value = res.data.total

                    nextTick(() => {
                        pageQuery.page = Number(router.currentRoute.query.page) ? Number(router.currentRoute.query.page) : 1
                    })
                })
                .finally(() => {
                    searchLoading.value = false
                })
        }
        fetchRepoList()

        function onNavToCode(row) {
            router.push({ name: 'code', query: { username: row.username, repoName: row.name } })
        }

        return {
            searchForm,
            searchLoading,
            pageQuery,
            pageSizeList,
            total,
            repoList,

            onSearch,
            onCurrentPageChange,
            onSizeChange,
            fetchRepoList,
            onNavToCode
        }
    },
    beforeRouteUpdate(to, from, next) {
        this.fetchRepoList()
        next()
    }

})
</script>

<style scoped>
a {
    color: rgb(0, 0, 238);
}

a:visited {
    color: rgb(0, 0, 238);
}

.main-container {
    width: 768px;
    position: relative;
    left: 50%;
    margin-left: -384px;
}

@media screen and (max-width: 768px) {
    .main-container {
        left: 0;
        margin-left: 0;
    }
}
</style>