<script setup lang="ts">
import { computed, reactive, toRefs, watch } from 'vue'
import { ProductList as columns } from '@/config/productTable'
import { useStore } from '@/store'
// import { ProductActionTypes } from '@/store/modules/product/action-types'
import { PageDefault } from '@/config'
import { useRouter } from 'vue-router'
import { ProductMutationTypes } from '@/store/modules/product/mutation-types'
import { ProductActionTypes } from '@/store/modules/product/action-types'
import useElement from '@/hooks/useElement'

const store = useStore()
const emit = defineEmits(['on:reload'])
const router = useRouter()
const { confirm, success, error } = useElement()

const state = reactive({
  tableData: [],
  total: 0,
  pageNum: PageDefault.pageNum,
  pageSize: PageDefault.pageSize,
})

const productData = computed(() => {
  return store.state.product.productData
})

const handlePage = ({ pageNum, pageSize }) => {
  state.pageNum = pageNum
  state.pageSize = pageSize
}

const updateProduct = (row: any) => {
  store.commit(ProductMutationTypes.PRODUCT_ITEM_UPDATE, row)
  router.push({ path: '/product/create', query: { id: row.id } })
}

const updateStock = (row: any) => {
  store.commit(ProductMutationTypes.PRODUCT_ITEM, row)
  router.push({ path: '/product/stock', query: { id: row.id } })
}

const excludeKey = (data: any, keys: string[]) => {
  keys.map(key => {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      delete data[key]
    }
  })
  return data
}

const handleClone = (product: any) => {
  const { itinerarys, bannerPics, tags, types } = product

  const newItinerary = itinerarys.map(it => {
    return excludeKey(it, ['id', 'productId'])
  })

  const newBanner = bannerPics.map(it => {
    return { picId: it.id }
  })

  const newTags = tags.map(it => {
    return { tid: it.id, type: it.type }
  })

  const newTypes = types.map(it => {
    return { tid: it.id, type: it.type }
  })

  const newProduct = {
    ...product,
    plans: [],
    itinerarys: newItinerary,
    bannerPics: newBanner,
    tags: newTags,
    types: newTypes,
    id: '',
  }

  confirm('确定要复制该产品吗？').then(() => {
    store
      .dispatch(ProductActionTypes.ACTION_PRODUCT_SET, newProduct)
      .then(() => {
        success()
        emit('on:reload')
      })
      .catch(error)
  })
}

const handleDelete = (id: number) => {
  confirm().then(() => {
    store.dispatch(ProductActionTypes.ACTION_PRODUCT_DEL, id)

    state.tableData = state.tableData.filter(it => it.id !== id)
    state.total--
    success({ message: '删除成功' })
  })
}

const toggleStatus = (type: string, row: unknown) => {
  const status = row[type]
  row[type] = !status
  store.dispatch(ProductActionTypes.ACTION_PRODUCT_SET, { ...row, [type]: !status })
}

watch(
  () => productData.value,
  data => {
    if (!data) return
    state.tableData = data.list
    state.total = data.totalCount
  }
)

const { tableData, total } = toRefs(state)
</script>

<template>
  <TableBase
    :data="tableData"
    :columns="columns"
    :total-count="total"
    @update:page="handlePage"
  >
    <template #code="{ row }">
      <el-tag v-if="row.code" type="info">
        {{ row.code }}
      </el-tag>
    </template>
    <template #cate="{ row }">
      <span v-for="(item, index) in row.types" :key="index">{{ item.name }}</span>
    </template>
    <template #status="{ row }">
      <span class="mr5 hand" @click="toggleStatus('isHot', row)">
        <el-tag :type="row.isHot ? 'success' : 'info'"> 热卖 </el-tag>
      </span>
      <span class="mr5 hand" @click="toggleStatus('isRecommend', row)">
        <el-tag :type="row.isRecommend ? 'success' : 'info'"> 推荐 </el-tag>
      </span>
    </template>
    <template #isEnable="{ row }">
      <SwitchBase :model-value="row.isEnable" @change="toggleStatus('isEnable', row)" />
    </template>
    <template #action="{ row }">
      <BtnPermission type="success" @click="updateProduct(row)">
        编辑
      </BtnPermission>
      <BtnPermission type="primary" @click="updateStock(row)">
        团期
      </BtnPermission>
      <BtnPermission type="success" @click="handleClone(row)">
        复制
      </BtnPermission>
      <BtnPermission type="warning" @click="handleDelete(row.id)">
        删除
      </BtnPermission>
      <BtnPermission type="primary">
        分享
      </BtnPermission>
    </template>
  </TableBase>
</template>

<style scoped></style>
