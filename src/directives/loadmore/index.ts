import { Directive } from 'vue'

export const loadmore: Directive = {
  beforeMount(el, binding) {
    el.addEventListener('click', () => {
      const child = el.querySelector('.select-trigger')
      if (!child) return
      const id = child.getAttribute('aria-describedby')
      const poper = document.getElementById(id)
  
      // 获取element-ui定义好的scroll盒子
      const dragDom = (poper?.parentNode as HTMLDivElement).querySelector('.el-select-dropdown__wrap')
      if (!dragDom) return
      dragDom.addEventListener('scroll', () => {
        const CONDITION =
          dragDom.scrollHeight - dragDom.scrollTop <= dragDom.clientHeight
        if (CONDITION) {
          binding.value()
        }
      })
    })
  },
}
