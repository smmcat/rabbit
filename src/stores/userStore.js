import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/user.js'
import { mergeCartAPI } from '@/apis/cart'
import { ref, computed } from 'vue'
import { useCartStore } from './cartStore'


export const useUserStore = defineStore('user', () => {
    const cartStore = useCartStore()
    // 用户数据
    const userInfo = ref({})
    // 获取数据接口函数
    const getUserInfo = async ({ account, password }) => {
        const res = await loginAPI({ account, password })
        userInfo.value = res.result
        // 合并本地购物车信息
        await mergeCartAPI(cartStore.cartList.map(item => {
            return {
                skuId: item.skuId,
                count: item.count,
                selected: item.selected
            }
        }))
        cartStore.updateNewList()
    }
    // 清除用户数据
    const clearUserInfo = () => {
        userInfo.value = {}
        cartStore.clearCart()
    }
    // 是否登录状态
    const isLogin = computed(() => userInfo.value.token)
    return { userInfo, isLogin, getUserInfo, clearUserInfo }
}, {
    persist: {
        key: 'xiaotixian-user'
    }
})