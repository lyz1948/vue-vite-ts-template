import { reactive, computed } from 'vue'
import { useStore } from '@/store'

// 加载更多
export default function({ url, data, query = {} }: { url: any, data: any, query?: any }) {
  const store = useStore()
  
  const page = reactive({
    pageNum: 1,
    pageSize: 20,
  })

  const fetchData = async () => {
    return await store.dispatch(url, query)
  }

  const list = computed(() => {
    if (!data) return
    const res = data.slice(0, page.pageNum * page.pageSize)
    return res
  })
  
  const lazyLoad = () => {
    if (!data || !data.length) {
      fetchData()
    }
  }

  const loadMoreData = () => {
    if (data.length <= list.value.length) return
    page.pageNum++
    console.log('page.pageNum:', page.pageNum)
  }

  return {
    list,
    fetchData,
    lazyLoad,
    loadMoreData,
  }
}