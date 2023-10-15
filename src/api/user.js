import request from '@/utils/request'

export function login(params) {
    return request({
        url: '/user/login',
        method: 'post',
        params,
    })
}

export function info() {
    return request({
        url: '/user/info',
        method: 'get',
    })
}