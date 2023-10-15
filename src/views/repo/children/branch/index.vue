<template>
    <div>
        <div>

        </div>
        <el-divider></el-divider>
        <el-table :data="branchList" style="width: 100%">
            <el-table-column prop="name" label="分支名" width="180">
                <template v-slot="scope">
                    <el-link @click="onToCode(scope.row.name)">{{ scope.row.name }}</el-link>
                </template>
            </el-table-column>
            <el-table-column prop="commitHash" label="最后提交" width="360">
            </el-table-column>
            <el-table-column prop="createdAt" label="推送创建时间">
                <template v-slot="scope">
                    <span :title="scope.row.createdAt">{{ scope.row.createdTime }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="updatedAt" label="更新时间">
                <template v-slot="scope">
                    <span :title="scope.row.updatedAt">{{ scope.row.updatedTime }}</span>
                </template>
            </el-table-column>
            <el-table-column>
                <template v-slot="scope">
                    <div>
                        <el-button size="mini" @click="onOpenCreateBranch(scope.row)">创建分支</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="创建分支" :visible.sync="dialogCreateBranchVisible" width="30%">
            <div class="flex items-center">
                <div>
                    <span>原分支：</span>
                    <el-input readonly :value="createBranchForm.branch"></el-input>
                </div>
                <div class="ms-4">
                    <span>新分支</span>
                    <el-input v-model="createBranchForm.newBranch"></el-input>
                </div>
            </div>
            <span slot="footer">
                <el-button @click="dialogCreateBranchVisible = false">取 消</el-button>
                <el-button type="primary" @click="onCreateBranch">确 定</el-button>
            </span>
        </el-dialog>
        <el-pagination @size-change="onSizeChange" @current-change="onCurrentChange" :current-page="pageQuery.page"
            :page-sizes="pageSizeList" :page-size="pageQuery.pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
import { getBranchPageList, createBranch } from '@/api/repo'
import { useRepoStore } from '@/store/repo';
import moment from 'moment';
import router from '@/router/index';
import { defineComponent, reactive, readonly, ref } from '@vue/composition-api';
export default defineComponent({
    setup() {
        const repoStore = useRepoStore()
        const username = ref(router.currentRoute.query.username)
        const repoName = ref(router.currentRoute.query.repoName)
        const searchForm = reactive({
            branchName: ''
        })
        const pageQuery = reactive({
            page: 1,
            pageSize: 20,
        })
        const pageSizeList = readonly([20, 40, 60, 100])
        const total = ref(0)
        const branchList = ref([])
        function fetchBranchList() {
            getBranchPageList({
                username: username.value,
                repoName: repoName.value,
                ...searchForm,
                ...pageQuery
            }).then(res => {
                branchList.value = res.data.list.map(item => {
                    const { createdAt, updatedAt, ...result } = item
                    return {
                        ...result,
                        createdTime: moment(createdAt).fromNow(),
                        updatedTime: moment(updatedAt).fromNow(),
                        createdAt: moment(createdAt).format('yyyy-MM-DD HH:mm:ss'),
                        updatedAt: moment(updatedAt).format('yyyy-MM-DD HH:mm:ss'),
                    }
                })
                total.value = res.data.total
            })
        }
        fetchBranchList()
        function onSizeChange(size) {
            pageQuery.page = 1
            pageQuery.pageSize = size
            fetchBranchList()
        }
        function onCurrentChange(page) {
            pageQuery.page = page
            fetchBranchList()
        }

        function onToCode(branchName) {
            router.push({ name: 'code', query: { ...router.currentRoute.query, branch: branchName } })
        }

        const createBranchForm = reactive({
            branch: '',
            branchId: '',
            newBranch: '',
        })
        const dialogCreateBranchVisible = ref(false)
        function onOpenCreateBranch(row) {
            dialogCreateBranchVisible.value = true
            createBranchForm.branch = row.name
            createBranchForm.branchId = row.id
            createBranchForm.newBranch = ''
        }

        function onCreateBranch() {
            createBranch({
                repoId: repoStore.repoInfo.id,
                oldBranchId: createBranchForm.branchId,
                newBranch: createBranchForm.newBranch,
            })
        }

        return {
            repoStore,
            pageQuery,
            total,
            pageSizeList,
            branchList,
            onSizeChange,
            onCurrentChange,
            onToCode,

            dialogCreateBranchVisible,
            createBranchForm,
            onOpenCreateBranch,
            onCreateBranch

        }
    }
})
</script>

<style scoped></style>