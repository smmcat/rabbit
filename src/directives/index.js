// 定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
  install(app) {
    // 懒加载指令逻辑
    app.directive('img-lazy', {
      mounted(el, binding) {
        // el: 指令绑定的那个元素 img
        // binding: binding.value  指令等于号后面绑定的表达式的值  图片url
        const { stop } = useIntersectionObserver(
          el,
          (entries) => {
            // 如果进度到视野区域 回调函数的下方参数返回 true
            if (entries[0].isIntersecting) {
              console.log(entries[0].isIntersecting);
              // 修改图片的 src 的值 实现延迟加载图片
              el.src = binding.value
              // 为避免重复触发 stop() 停止监听元素的交叉情况
              stop()
            }
          }
        )
      }
    })
  }
}