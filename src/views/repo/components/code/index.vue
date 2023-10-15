<template>
    <div>
        <div class="mt-3 mb-4" style="word-break: break-all; font-size: 16px;">{{ repoInfo.description }}</div>
        <div style="height: 44px; line-height: 44px;">
            <div style="width: 33%;" class="h-100 d-inline-block text-center">
                <span class="me-2">{{ repoInfo.commitNum }}</span>
                <span>Commit</span>
            </div>
            <div style="width: 33%;" class="h-100 d-inline-block text-center">
                <span class="me-2">{{ repoInfo.branchNum }}</span>
                <span>Branch</span>
            </div>
            <div style="width: 33%;" class="h-100 d-inline-block text-center">
                <span class="me-2">{{ repoInfo.tagNum }}</span>
                <span>Tag</span>
            </div>
        </div>
        <div class="mt-2">
            <div class="d-inline-block w-50 text-left">
                <!-- <select class="px-2 py-1" v-model="branch">
                    <option v-for="item in branchList" :key="item.name" :value="item.name">
                        <span v-if="item.name === branch">分支：</span>
                        <span>{{ item.name }}</span>
                    </option>
                </select> -->
                <Dropdown placement="start" style="font-size: 14px; width: 144px; box-sizing: border-box; cursor: pointer;"
                    class="border">
                    <template v-slot:summary>
                        <span class="pe-2 py-1">
                            <span>分支：</span>
                            <span>{{ branch }}</span>
                        </span>
                    </template>
                    <div class="bg-white p-2" style="width: 228px">
                        <a v-for="item in branchList" :key="item.name" target="_blank" href="https://10.67.234.33"
                            class="d-block px-3 py-1">{{ item.name }}</a>
                    </div>
                </Dropdown>

            </div>
            <div class="d-inline-block w-50 text-end" style="height: 28px;">
                <input ref="gitUrlElem" readonly class="border px-2 py-1 h-100 align-bottom" style="box-sizing: border-box;"
                    type="text" :value="repoStore.httpGitUrl">
                <div @click="onCopyGitUrl" class="h-100 d-inline-block border px-2 py-1"
                    style="box-sizing: border-box; font-size: 12px; cursor: pointer;">
                    复制
                </div>
                <Dropdown class="h-100 d-inline-block position-relative border"
                    style="box-sizing: border-box; font-size: 12px; cursor: pointer;">
                    <template v-slot:summary>
                        <span>下载</span>
                    </template>
                    <div class="bg-white">
                        <a target="_blank" href="https://10.67.234.33" class="d-block px-3 py-1">ZIP</a>
                        <a target="_blank" href="https://10.67.234.33" class="d-block px-3 py-1">TAR.GZ</a>
                    </div>
                </Dropdown>

            </div>
        </div>
        <TreeView v-if="['tree', ''].includes(repoStore.type)" />
        <BlobView v-if="['blob'].includes(repoStore.type)" />


    </div>
</template>

<script>
import { computed, defineComponent, reactive, ref } from '@vue/composition-api';
import router from '@/router/index';
import TreeView from './tree.vue'
import BlobView from './blob.vue'
import GitDialog from '@/components/Dialog/index.vue'
import Dropdown from '@/components/Dropdown/index.vue'
import { useRepoStore } from '@/store/repo';
export default defineComponent({
    components: {
        GitDialog,
        Dropdown,

        TreeView,
        BlobView,
    },
    setup() {
        const repoStore = useRepoStore()
        const repoInfo = reactive({
            description: 'dssadadasdadadsfdssdvdvsvd.sdvvsdv.',
            commitNum: 100,
            branchNum: 10,
            tagNum: 5,
        })
        
        const branch = ref(repoStore.defaultBranch)
        const branchList = ref([
            {
                name: 'main',
                hash: 'dsadasdasdas'
            },
            {
                name: 'dev',
                hash: 'dasdasdevevevevr'
            }
        ])
        const gitUrlElem = ref(null)
        function onCopyGitUrl() {
            /* 获取文本内容 */
            var copyText = gitUrlElem.value

            /* 选择复制内容 */
            copyText.select();
            copyText.setSelectionRange(0, 99999); /* 为移动设备设置 */

            /* 复制内容到文本域 */
            document.execCommand('copy')
        }

        return {
            repoStore,
            repoInfo,
            branch,
            branchList,

            gitUrlElem,

            onCopyGitUrl,
        }




    }
})
</script>

<style scoped></style>