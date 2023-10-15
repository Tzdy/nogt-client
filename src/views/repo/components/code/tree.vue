<template>
    <div>
        <div class="mt-4 border-start border-top border-end">
            <table style="table-layout: fixed; border-spacing: 0;" class="w-100">
                <colgroup>
                    <col width="30%">
                    <col width="60%">
                    <col width="10%">
                </colgroup>
                <tr style="font-size: 15px; background-color: aliceblue;">
                    <td class="py-3 px-1 border-bottom" colspan="2">
                        <router-link class="px-2" :to="'/' + lastCommitInfo.commiter" v-if="lastCommitInfo.isUser">{{
                            lastCommitInfo.commiter }}</router-link>
                        <span v-else>{{ lastCommitInfo.commiter }}</span>
                        <router-link :title="lastCommitInfo.hash" class="mx-3"
                            :to="'/' + repoStore.username + '/' + lastCommitInfo.repoName + '/commit/' + lastCommitInfo.hash">{{
                                lastCommitInfo.shortHash }}</router-link>
                        <span>{{ lastCommitInfo.body }}</span>
                    </td>
                    <td class="py-3 px-1 text-secondary border-bottom" style="font-size: 13px;">{{ lastCommitInfo.createdDt
                    }}</td>
                </tr>

                <tr v-for="item in fileList" :key="item.filename" style="font-size: 14px;">
                    <td class="p-1 border-bottom">
                        <span style="width: 32px;" class="d-inline-block text-start px-2"
                            v-if="item.type === 'blob'">[file]</span>
                        <span style="width: 32px;" class="d-inline-block text-start px-2"
                            v-if="item.type === 'tree'">[dir]</span>
                        <router-link :to="repoStore.fileUrl(item.type, item.filename)">
                            <span>{{ item.filename }}</span>
                        </router-link>
                    </td>
                    <td class="p-1 border-bottom">{{ item.commitBody }}</td>
                    <td class="p-1 border-bottom text-secondary" style="font-size: 13px;">{{ item.commitTime }}</td>
                </tr>
            </table>

        </div>

        <div class="mt-4 border">
            <div class="border-bottom" style="height: 44px; line-height: 44px;">
                <h4 class="ms-2">README.md</h4>
            </div>
            <div class="p-4 markdown-body" v-html="readmeHtml"></div>
        </div>
    </div>
</template>

<script>
import { defineComponent, reactive, ref } from '@vue/composition-api';
import { useRepoStore } from '@/store/repo'
import Markdown from 'markdown-it'
export default defineComponent({
    setup() {
        const repoStore = useRepoStore()
        const lastCommitInfo = reactive({
            commiter: 'Tsdy',
            isUser: true,
            hash: 'dsad3454dsadasdasdasdasdasdasd',
            shortHash: 'dsad3454',
            body: 'fix: 修复的撒的撒的',
            createdDt: '3天前'
        })

        const fileList = ref([
            {
                type: 'tree',
                filename: 'src',
                commitBody: 'dasdadadasdasdasd',
                commitTime: '6天前'
            },
            {
                type: 'blob',
                filename: 'index.mjs',
                commitBody: 'dasdadadasdasdasd',
                commitTime: '6天前'
            },
            {
                type: 'blob',
                filename: 'package.json',
                commitBody: 'dasdadadasdasdasd',
                commitTime: '6天前'
            }
        ])

        const readmeHtml = ref('')
        const markdown = Markdown()
        readmeHtml.value = markdown.render(`# 你好`)

        return {
            repoStore,
            readmeHtml,
            lastCommitInfo,
            fileList
        }
    }   
})
</script>

<style scoped></style>