// 封装倒计时逻辑函数
import { computed, onUnmounted, ref } from 'vue'
import dayjs from 'dayjs'
export const useCountDown = () => {
    // 1. 响应式数据
    const time = ref(0)
    let timer = null
    const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
    // 2. 开启倒计时函数
    const start = (currentTime, fn) => {
        time.value = currentTime
        // 开启倒计时逻辑
        timer = setInterval(() => {
            if (time.value == 0) {
                clearInterval(timer)
                fn && fn()
            }
            time.value--
        }, 1000);
    }

    // 组件销毁前清除定时器
    onUnmounted(() => {
        timer && clearInterval(timer)
    })
    return {
        formatTime,
        start
    }
}