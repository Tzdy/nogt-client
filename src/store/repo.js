import { defineStore } from 'pinia'
import { getRepoOne } from '@/api/repo'
import router from '../router'
import { join } from '../utils/path'
export const useRepoStore = defineStore('repo', {
  state: () => ({
    loading: false,
    repoInfo: {
      id: 0,
      userId: 0,
      username: '',
      branchNum: 0,
      tagNum: 0,
      commitNum: 0,
      issueNum: 0,
      pullRequestNum: 0,
      name: '',
      type: '',
      description: '',
      defaultBranchName: "",
      createdAt: ""
    },
  }),
  getters: {
  },
  actions: {
    getRepoOne(username, repoName, branch, refType) {
      return getRepoOne({
        username,
        repoName,
        branch,
        refType
      }).then(res => {
        this.repoInfo = {
          ...res.data,
          username,
        }
      })
    },

  }
})