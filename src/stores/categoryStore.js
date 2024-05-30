import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout'
import { ref } from 'vue'

// 导航列表业务 pinia
export const useCategoryStore = defineStore('category', () => {
    
    // state 导航列表数据
    const categoryList = ref([])

    // action 获取导航数据的方法
    const getCategory = async () => {
        const res = await getCategoryAPI()
        categoryList.value = res.result
    }

    return { categoryList, getCategory }
})