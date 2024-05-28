import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/user.js'
import { ref } from 'vue'


export const useUserStore = defineStore('user', () => {
    // 用户数据
    const userInfo = ref({})
    // 获取数据接口函数
    const getUserInfo = async ({ account, password }) => {
        const res = await loginAPI({ account, password })
        userInfo.value = res.result
    }
    return { userInfo, getUserInfo }
}, {
    persist: {
        key: 'xiaotixian-user'
    }
})