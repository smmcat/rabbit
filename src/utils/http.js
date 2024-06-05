/**
 * 封装 axios 的网络请求功能
*/
import { useUserStore } from '@/stores/userStore';
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import router from '@/router'
import axios from "axios";

const httpInstance = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 10000
})

// axios 请求拦截器
httpInstance.interceptors.request.use(config => {
    // 获取用户 token 数据
    const userStore = useUserStore()
    const token = userStore.userInfo.token
    if (token) {
        // 传入 token
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, e => Promise.reject(e))

// axios 响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
    const userStore = useUserStore()

    // 统一错误提示
    ElMessage({
        type: 'warning',
        message: e.response.data.message
    })

    // 401 token 失效处理
    if (e.response.status === 401) {
        // 清除用户信息
        userStore.clearUserInfo()
        // 回退到登录页
        router.push('/login')
    }

    return Promise.reject(e)
})


export default httpInstance