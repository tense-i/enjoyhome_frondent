import { useUserStore } from '@/store'
// 用来控制权限配置的按钮显示
export const hasRole = {
  install: (app: any) => {
    app.directive('hasRole', {
      mounted(el: any, binding: any) {
        const roles = []
        const routeStore = useUserStore()
        routeStore.routeNewButton.forEach((ele) => {
          roles.push(ele.name)
        })
        const value = binding.value
        const flag = value.filter((v: any) => {
          // 如果roles中包含v，则返回true
          return roles.indexOf(v) !== -1
        })
        // 如果flag为空，则隐藏元素
        if (flag.length <= 0) {
          // 如果元素没有父节点，则直接设置display为none
          if (!el.parentNode) {
            el.style.display = 'none'
          } else {
            // 如果元素有父节点，则移除元素（隐藏元素）
            el.parentNode.removeChild(el)
          }
        }
      }
    })
  }
}
