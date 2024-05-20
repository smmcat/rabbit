// 封装轮播图相关的代码
import { ref, onMounted } from "vue"
import { getBannerAPI } from '@/apis/home.js'

export function userBanner() {
    const bannerList = ref([])
    const getBanner = async () => {
        const res = await getBannerAPI({
            distributionSite: '2'
        })
        if (res.code !== '1') {
            return
        }
        bannerList.value = res.result
    }
    onMounted(() => getBanner())
    return {
        bannerList
    }
}