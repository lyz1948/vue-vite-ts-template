import { reactive, computed } from 'vue'
import { useStore } from '@/store'

// 加载更多
export default function({ url, data: selectData, query = 'undefined' }: { url: any, data: Array<any>, query?: any }) {
  const store = useStore()
  
  const page = reactive({
    pageNum: 1,
    pageSize: 10,
  })

  const fetchData = async () => {
    return await store.dispatch(url, query)
  }

  const list = computed(() => {
    return selectData.slice(0, page.pageNum * page.pageSize)
  })
  
  const lazyLoad = () => {
    if (!selectData || !selectData.length) {
      fetchData()
    }
  }

  const loadMoreData = () => {
    if (selectData.length <= list.value.length) return
    page.pageNum++
  }

  return {
    list,
    fetchData,
    lazyLoad,
    loadMoreData,
  }
}