// 封装分类数据业务相关代码
import { ref, onMounted } from "vue"
import { getTopCategoryAPI } from '@/apis/category'
import { useRoute, onBeforeRouteUpdate } from 'vue-router';

export function useCategory() {

    const categoryData = ref({})
    const route = useRoute()

    const getCategory = async (id = route.params.id) => {
        const res = await getTopCategoryAPI(id)
        categoryData.value = res.result
    }
    onMounted(() => getCategory())

    // 路由更新后执行的回调
    onBeforeRouteUpdate((to) => {
        getCategory(to.params.id)
    })
    return {
        categoryData
    }
}