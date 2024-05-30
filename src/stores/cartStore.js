// 购物车模块

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './userStore.js'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)

    // 获取云端最新的购物车列表 覆盖 本地购物车列表
    const updateNewList = async () => {
        const result = await findNewCartListAPI()
        cartList.value = result.result
    }

    // 购物车商品数据
    const cartList = ref([])

    // 添加购物车商品
    const addCart = async (goods) => {
        const { skuId, count } = goods
        // 判断是否登录
        if (isLogin.value) {
            // 登录之后的加入购车逻辑
            await insertCartAPI({ skuId, count })
            updateNewList()
        } else {
            // 找到对应项
            const item = cartList.value.find((item) => goods.skuId === item.skuId)
            // 如存在，直接修改购买数量
            if (item) {
                item.count++
            }
            // 如果不存在 赋值新数据
            else {
                cartList.value.push(goods)
            }
        }
    }

    // 删除购物车
    const delCart = async (skuId) => {
        // 判断是否登录
        if (isLogin.value) {
            // 登录之后的删除购车逻辑
            await delCartAPI([skuId])
            updateNewList()
        } else {
            // 找到需要删除的下标
            const idx = cartList.value.findIndex((item) => skuId === item.skuId)
            // 删除内容
            cartList.value.splice(idx, 1)
        }
    }

    // 清空购物车
    const clearCart = () => {
        cartList.value = []
    }

    // 清空云端购物车
    const clearWebCart = async () => {
        // 判断是否登录
        if (isLogin.value) {
            const skuIdList = cartList.value.map(item => item.skuId)
            // 登录之后的删除购车逻辑
            await delCartAPI(skuIdList)
            updateNewList()
        } else {
            clearCart()
        }
    }

    // 单选功能
    const singleCheck = (skuId, selected) => {
        const item = cartList.value.find((item) => skuId === item.skuId)
        if (item) {
            item.selected = selected
        }
    }

    // 全选功能
    const allCheck = (selected) => {
        cartList.value.forEach(item => item.selected = selected)
    }

    // 计算属性 - 总数量 总价 是否全选 已选择数量 已选择商品价钱合计
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
    const isAll = computed(() => cartList.value.every(item => item.selected))
    const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))

    return {
        allCount,
        allPrice,
        cartList,
        isAll,
        selectedCount,
        selectedPrice,
        addCart,
        delCart,
        clearCart,
        clearWebCart,
        allCheck,
        singleCheck,
        updateNewList,
    }
},
    {
        persist: {
            key: 'xiaotuxian-cart'
        }
    }
)