/**
 * 封装 axios 的网络请求功能
*/
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

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
    // 统一错误提示
    ElMessage({
        type: 'warning',
        message: e.response.data.message
    })
    return Promise.reject(e)
})


export default httpInstance