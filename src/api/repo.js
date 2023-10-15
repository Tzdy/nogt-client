import request from '@/utils/request'

export function getRepoPageList(params) {
    return request({
        url: '/repo/getRepoPageList',
        method: 'get',
        params,
    })
}

export function getRecommendRepoPageList(params) {
    return request({
        url: '/repo/getRecommendRepoPageList',
        method: 'get',
        params,
    })
}

export function getRepoOne(params) {
    return request({
        url: '/repo/getRepoOne',
        method: 'get',
        params
    })
}

export function getBranchPageList(params) {
    return request({
        url: '/repo/getBranchPageList',
        method: 'get',
        params
    })
}

export function getTagPageList(params) {
    return request({
        url: '/repo/getTagPageList',
        method: 'get',
        params
    })
}

export function getRepoCommitPageList(params) {
    return request({
        url: '/repo/getRepoCommitPageList',
        method: 'get',
        params,
    })
}

export function getLatestCommitByPath(params) {
    return request({
        url: '/repo/getLatestCommitByPath',
        method: 'get',
        params
    })
}


export function getLsTree(params) {
    return request({
        url: '/repo/getLsTree',
        method: 'get',
        params
    })
}

export function getCatFile(params) {
    return request({
        url: '/repo/getCatFile',
        method: 'get',
        params
    })

}


export function createBranch(params) {
    return request({
        url: '/repo/createBranch',
        method: 'post',
        params
    })
}