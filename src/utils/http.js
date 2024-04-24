/**
 * 封装 axios 的网络请求功能
*/

import axios from "axios";

const httpInstance = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000
})

// axios 请求拦截器
httpInstance.interceptors.request.use(config => {
    return config
}, e => Promise.reject(e))

// axios 响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
    return Promise.reject(e)
})


export default httpInstance