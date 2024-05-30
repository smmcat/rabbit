// 购物车模块

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
    // 购物车商品数据
    const cartList = ref([])

    // 添加购物车商品
    const addCart = (goods) => {
        console.log(goods.skuId);
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

    // 删除购物车
    const delCart = async (skuId) => {
        // 找到需要删除的下标
        const idx = cartList.value.findIndex((item) => skuId === item.skuId)
        // 删除内容
        cartList.value.splice(idx, 1)
    }

    return {
        cartList,
        addCart,
        delCart
    }
},
    {
        persist: {
            key: 'xiaotuxian-cart'
        }
    }
)