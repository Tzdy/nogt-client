<template>
    <div>
        <el-table :cell-style="{ padding: '8px 0' }" :data="treeListComputed" style="width: 100%">
            <el-table-column show-overflow-tooltip label="文件名" width="220">
                <template v-slot="scope">
                    <span style="font-size: 16px;">
                        <i v-if="scope.row.type === 'tree'" class="el-icon-folder-opened"></i>
                        <i v-if="scope.row.type === 'blob'" class="el-icon-document"></i>
                        <el-link @click="onToLink(scope.row)" style="margin-left: 12px;">{{ scope.row.name }}</el-link>
                    </span>
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip label="提交" width="490">
                <template v-slot="scope">
                    <el-link>{{ scope.row.commitContent }}</el-link>
                </template>
            </el-table-column>
            <el-table-column label="时间">
                <template v-slot="scope">
                    <span :title="scope.row.commitTime">{{ scope.row.time }}</span>
                </template>
            </el-table-column>
        </el-table>

        <div style="margin-top: 24px">
            <div class="markdown-head">
                <h4>README.md</h4>
            </div>
            <div class="markdown-body" v-html="readmeHtml"></div>
        </div>
    </div>
</template>

<script>
import { computed, defineComponent, reactive, ref } from '@vue/composition-api';
import router from '@/router'
import { useRepoStore } from '@/store/repo'
import Markdown from 'markdown-it'
import moment from 'moment'
import 'github-markdown-css'
export default defineComponent({
    props: {
        treeList: Array,
        readme: String,
    },
    setup(props, { emit }) {
        const repoStore = useRepoStore()

        const treeListComputed = computed(() => props.treeList.map(item => {
            const { commitTime, ...data } = item
            return {
                time: moment(commitTime).fromNow(),
                commitTime: moment(item.commitTime).format('yyyy-MM-DD HH:mm:ss'),
                ...data
            }
        }))

        function onToLink(row) {
            const query = {
                ...router.currentRoute.query,
                type: row.type,
                path: row.path,
            }
            router.push({
                name: router.currentRoute.name,
                query,
            })
        }

        const markdown = Markdown()
        const readmeHtml = computed(() => markdown.render(props.readme))

        return {
            repoStore,
            readmeHtml,
            treeListComputed,

            onToLink
        }
    }
})
</script>

<style scoped>
.markdown-head {
    border: 1px solid #d7dae2;
    padding: 12px 45px;
}
.markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 45px;
    border: 1px solid #d7dae2;
    border-top: none;
}
</style>