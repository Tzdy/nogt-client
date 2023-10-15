<template>
    <div class="main-container">
        <div class="mb-4" v-if="isRoot">
            <div class="flex items-center">
                <h2 class="me-2 text-xl font-bold">{{ repoStore.repoInfo.username }}</h2>
                <h2 class="me-2 text-xl font-bold">/</h2>
                <h2 class="me-2 text-xl font-bold">{{ repoStore.repoInfo.name }}</h2>
                <el-tag class="me-4" size="mini">{{ repoTypeFilter(repoStore.repoInfo.type) }}</el-tag>
                <div class="text-center grow">
                    <el-link class="me-4">
                        <span>分支</span>
                        <span>({{ repoStore.repoInfo.branchNum }})</span>
                    </el-link>
                    <el-link class="me-4">
                        <span>标签</span>
                        <span>({{ repoStore.repoInfo.tagNum }})</span>
                    </el-link>
                    <el-link class="me-4">
                        <span>问题</span>
                        <span>({{ repoStore.repoInfo.issueNum }})</span>
                    </el-link>
                    <el-link class="me-4">
                        <span>拉取请求</span>
                        <span>({{ repoStore.repoInfo.pullRequestNum }})</span>
                    </el-link>
                </div>
            </div>
            <el-divider></el-divider>
            <div class="flex">
                <el-popover @show="onShowRef" placement="bottom-start" width="300" trigger="click">
                    <div class="p-1">
                        <el-input v-model="refSearchText" class="mb-3"></el-input>
                        <el-radio-group v-model="refTypeRadio">
                            <el-radio label="branch">分支</el-radio>
                            <el-radio label="tag">标签</el-radio>
                        </el-radio-group>
                        <div class="overflow-auto" style="height: 200px;">
                            <div @click="onToRef(item.name)" v-if="refTypeRadio === 'branch'"
                                class="cursor-pointer p-2 flex items-center p-1 ref-active" v-for="item in branchList"
                                :key="item.name">
                                <span>{{ item.name }}</span>
                                <el-tag v-if="item.name === repoStore.repoInfo.defaultBranchName" class="ms-3"
                                    size="mini">default</el-tag>
                                <i class="el-icon-circle-check ms-auto me-0 text-lg" v-if="item.name === branch"></i>
                            </div>
                            <div @click="onToRef(item.name)" v-if="refTypeRadio === 'tag'"
                                class="cursor-pointer	p-2 flex items-center p-1 ref-active" v-for="item in tagList"
                                :key="item.name">
                                <span>{{ item.name }}</span>
                            </div>
                        </div>

                    </div>
                    <el-button size="small" slot="reference">
                        <span>{{ branch }}</span>
                        <i class="ms-2 el-icon-arrow-down"></i>
                    </el-button>
                </el-popover>

                <div class="ms-auto me-2">
                    <el-popover placement="bottom-end" width="300" trigger="click">
                        <div class="font-bold">使用HTTP克隆:</div>
                        <div class="flex mt-2">
                            <el-input readonly size="mini"></el-input>
                            <el-button style="margin-left: -1px;" size="mini" icon="el-icon-document-copy"></el-button>
                        </div>
                        <div class="mt-4 font-bold">直接下载源码:</div>
                        <div class="mt-2">
                            <el-button size="mini">zip</el-button>
                            <el-button size="mini">tar</el-button>
                        </div>

                        <el-button size="small" slot="reference">
                            <span>克隆</span>
                            <i class="ms-2 el-icon-arrow-down"></i>
                        </el-button>
                    </el-popover>
                </div>
            </div>
        </div>
        <el-breadcrumb separator="/" class="mb-8 ms-1" v-if="path">
            <el-breadcrumb-item :to="{ name: 'code', query: { ...$router.currentRoute.query, path: '', type: 'tree' } }">{{
                repoStore.repoInfo.name }}</el-breadcrumb-item>
            <el-breadcrumb-item v-for="item in breadcrumbPathComputed" :key="item.path"
                :to="{ name: 'code', query: { ...$router.currentRoute.query, path: item.path, type: 'tree' } }">{{ item.name
                }}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="my-3 border px-3 py-2 flex text-sm rounded" style="height: 50px">
            <div class="me-4 flex items-center me-2">
                <span v-if="latestCommit.isUser">{{ latestCommit.username }}</span>
                <el-link v-else>{{ latestCommit.username }}</el-link>
            </div>
            <div class="flex items-center me-3">
                <el-link class="grow">{{ latestCommit.comment }}</el-link>
            </div>
            <div class="flex items-center">
                <span :title="latestCommit.commitTime" class="grow text-slate-400">{{ latestCommit.time }}</span>
            </div>
            <div class="ms-auto me-2 flex items-center">
                <el-link class="me-4">
                        <span>提交</span>
                        <span>({{ repoStore.repoInfo.commitNum }})</span>
                    </el-link>
                <div :title="latestCommit.commitHash" class="rounded border py-2 ps-2 flex">
                    <span class="me-2">{{ latestCommit.commitShortHash }}</span>
                    <span class="px-3 border-s cursor-pointer"><i class="el-icon-document-copy"></i></span>
                </div>
            </div>
        </div>
        <TreeView :tree-list="treeList" :readme="readme" v-if="['tree'].includes(type)" />
        <BlobView :blob="blob" :blob-size="blobSize" v-if="['blob'].includes(type)" />
    </div>
</template>

<script>
import { computed, defineComponent, reactive, ref } from '@vue/composition-api';
import { join } from '@/utils/path'
import router from '@/router/index';
import TreeView from './tree.vue'
import BlobView from './blob.vue'
import { useRepoStore } from '@/store/repo';
import { getLsTree, getCatFile, getBranchPageList, getTagPageList, getRepoCommitPageList, getLatestCommitByPath } from '@/api/repo'
import moment from 'moment';
export default defineComponent({
    components: {

        TreeView,
        BlobView,
    },
    setup() {
        const repoStore = useRepoStore()
        const username = ref(router.currentRoute.query.username)
        const repoName = ref(router.currentRoute.query.repoName)
        const branch = ref(router.currentRoute.query.branch ? router.currentRoute.query.branch : repoStore.repoInfo.defaultBranchName)
        const type = ref(router.currentRoute.query.type ? router.currentRoute.query.type : 'tree')
        const path = ref(router.currentRoute.query.path ? router.currentRoute.query.path : '')
        const refType = ref(router.currentRoute.query.refType ? router.currentRoute.query.refType : "")

        const breadcrumbPathComputed = computed(() => {
            const pathArr = path.value.split('/')
            let base = ''

            return pathArr.map(item => {
                const path = join(base, item)
                base = path
                return {
                    name: item,
                    path,
                }
            })

        })

        const isRoot = computed(() => path.value === '')

        const treeList = ref([])
        const readme = ref('')
        const blob = ref('')
        const blobSize = ref(0)
        function fetchTreeOrBlob() {
            const query = {
                username: username.value,
                repoName: repoName.value,
                branch: branch.value,
                path: path.value
            }
            if (type.value === 'tree') {
                return getLsTree(query).then(res => {
                    treeList.value = res.data
                    if (treeList.value.find(item => item.name === 'README.md')) {
                        getCatFile({
                            ...query,
                            path: join(query.path, 'README.md')
                        }).then(res => {
                            readme.value = res.data.text
                        })
                    }
                })
            } else if (type.value === 'blob') {
                return getCatFile(query).then(res => {
                    blob.value = res.data.text
                    blobSize.value = res.data.size
                })
            }
        }

        fetchTreeOrBlob()

        const repoTypeFilter = (type) => type === 0 ? 'Public' : 'Private'

        const branchList = ref([])
        const tagList = ref([])
        const refTypeRadio = ref('branch')
        const refSearchText = ref('')

        function fetchRefList() {
            if (refTypeRadio.value === 'branch') {
                return getBranchPageList({
                    username: username.value,
                    repoName: repoName.value,
                    branchName: refSearchText.value,
                    page: 1,
                    pageSize: 10,
                }).then(res => {
                    branchList.value = res.data.list
                })
            } else if (refTypeRadio.value === 'tag') {

            }
        }

        function onShowRef() {
            fetchRefList()
        }
        function onToRef(refName) {
            if (branch.value !== refName) {
                branch.value = refName
                refType.value = refTypeRadio.value
                router.replace({
                    name: router.currentRoute.name,
                    query: {
                        ...router.currentRoute.query,
                        branch: refName,
                        refType: refType.value,
                    }
                })
                fetchTreeOrBlob()
                fetchLatestCommit()
                repoStore.getRepoOne(username.value, repoName.value, branch.value, refType.value)
            }
        }


        const latestCommit = ref({})
        function fetchLatestCommit() {
            return getLatestCommitByPath({
                username: username.value,
                repoName: repoName.value,
                branch: branch.value,
                path: path.value,
            }).then(res => {
                latestCommit.value = {
                    ...res.data,
                    time: moment(res.data.commitTime).fromNow(),
                    commitTime: moment(res.data.commitTime).format('yyyy-MM-DD HH:mm:ss'),
                    commitShortHash: res.data.commitHash.substring(0, 8)
                }
            })
        }
        fetchLatestCommit()

        return {
            repoStore,
            branch,
            type,
            path,
            refType,
            isRoot,
            breadcrumbPathComputed,

            fetchTreeOrBlob,
            treeList,
            readme,
            blob,
            blobSize,
            repoTypeFilter,


            branchList,
            tagList,
            refTypeRadio,
            refSearchText,
            onShowRef,
            onToRef,

            latestCommit,
            fetchLatestCommit,
        }

    },
    beforeRouteUpdate(to, from, next) {
        if (to.query.path !== from.query.path) {
            const { type, path } = to.query
            this.type = type ? type : 'tree'
            this.path = path ? path : ''
            Promise.all([this.fetchTreeOrBlob(), this.fetchLatestCommit()])
                .then(() => next())
        } else {
            next()
        }
    }
})
</script>

<style scoped>
.ref-active {
    transition: background-color .1s;
    border-radius: 4px;
}

.ref-active:hover {
    background-color: #f5f7fb;
}</style>