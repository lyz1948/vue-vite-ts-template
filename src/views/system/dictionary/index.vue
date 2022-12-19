<script setup lang="ts">
import { computed, reactive, watch, ref } from 'vue'
import ModTitle from '@/components/Title/index.vue'
import { DictionaryTable as columns } from '@/config/dictionaryTable'
import { useStore } from '@/store'
import { DictionaryActionTypes } from '@/store/modules/system/dictionary/action-types'
import { DictionaryMutationTypes } from '@/store/modules/system/dictionary/mutation-types'
import useElement from '@/hooks/useElement'
import DialogDic from './components/DialogDic.vue'

const store = useStore()
const { success, confirm } = useElement()
const dialogRef = ref(null)
const state = reactive({
  tabIndex: 0,
  tabData: [],
  tableData: [],
  itemId: '',
})

const dicAllData = computed(() => {
  return store.state.dictionary.dictionaryAllData
})

// const dicTypeData = computed(() => {
//   return store.state.dictionary.dictionaryTypeData
// })


const firstTab = computed(() => {
  return state.tabData[state.tabIndex]
})

// const getDictionaryId = computed(() => {
//   return firstTab.value?.id
// })

const getTitle = computed(() => {
  return firstTab.value?.title
})

// const fetchTypeData = () => {
//   return store.dispatch(DictionaryActionTypes.ACTION_DICTIONARY_TYPE_FETCH)
// }

const getDicTypeItem = (id: string) => {
  const key = id || Object.keys(dicAllData.value)[0]
  return dicAllData.value[key]
}

// const fetchCurrentData = async (id) => {
//   id = id || getDictionaryId.value
//   await store.dispatch(DictionaryActionTypes.ACTION_DICTIONARY_FETCH, id)
// }

const refreshData = () => {
  const curItem = getDicTypeItem(state.itemId)
  store.commit(DictionaryMutationTypes.DICTIONARY_TYPE_DATA_UPDATE, { id: state.itemId, list: curItem.agencyDictionaryList })
}

const deleteRow = (id: any) => {
  confirm().then(() => {
    store.dispatch(
      DictionaryActionTypes.ACTION_DICTIONARY_DELETE,
      id
    )
    const filterData = state.tableData.filter(it => it.id !== id)
    state.tableData = filterData
    store.commit(DictionaryMutationTypes.DICTIONARY_TYPE_DATA_UPDATE, { id: state.itemId, list: filterData })
    
    success()
  })
}

const editRow = (item: any) => {
  dialogRef.value.edit(item)
}

const change = (item: any, index: number) => {
  const data = dicAllData.value[item.id]
  state.tabIndex = index
  state.itemId = item.id
  state.tableData = data.agencyDictionaryList
}


// watch(
//   () => dicTypeData.value,
//   (data: any[]) => {
//     state.tabData = data
//   }
// )

watch(
  () => dicAllData.value,
  (data: any) => {
    if (!data) return
    const firstData = getDicTypeItem()
    state.tableData = firstData.agencyDictionaryList
    state.tabData = Object.keys(data).map(key => data[key])
  }, {
    immediate: true
  }
)

</script>

<template>
  <div class="dictionary">
    <ModTitle title="字典列表" />
    <div class="dictionary-content">
      <div class="tag-warp">
        <BtnBase
          v-for="(item, index) in state.tabData"
          :key="index"
          :type="state.tabIndex == index ? 'danger' : 'primary'"
          class="tag-item"
          @click="change(item, index)"
        >
          {{ item.name }}
        </BtnBase>
      </div>
      <div class="dictionary-body">
        <div class="content">
          <ModTitle :title="getTitle" />
          <TableBase :data="state.tableData" :columns="columns" border>
            <template #action="{ row }">
              <BtnBase type="success" class="mr5" @click="editRow(row)">
                编辑
              </BtnBase>
              <BtnBase type="danger" @click="deleteRow(row.id)">
                删除
              </BtnBase>
            </template>
          </TableBase>
        </div>
      </div>
    </div>

    <DialogDic ref="dialogRef" @on:reload="refreshData" />
  </div>
</template>

<style lang="scss">
.dictionary {
  &-content {
    display: flex;
    margin-top: 10px;
    .tag-warp {
      width: 200px;
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      border-right: 1px solid $base-color-border;

      .el-button {
        margin-left: 0 !important;
      }
    }

    .tag-item {
      margin-top: 12px;
      padding: 12px 0;
      text-align: center;
      // border-bottom: 1px solid $base-color-border;
    }

    .dictionary-body {
      flex: 1;
      .mod-head-wrap {
        padding: 12px 0;
        border-bottom: none;
      }
    }
  }
}
</style>
