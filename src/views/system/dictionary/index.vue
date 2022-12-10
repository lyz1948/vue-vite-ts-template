<script setup lang="ts">
import { computed, reactive, onBeforeMount, watch } from 'vue'
import ModTitle from '@/components/Title/index.vue'
import { DictionaryTable as columns } from '@/config/dictionaryTable'
import { useStore } from 'vuex'
import { DictionaryActionTypes } from '@/store/modules/dictionary/action-types'
import useElement from '@/hooks/useElement'
const store = useStore()

const { success } = useElement()

const state = reactive({
  tabIndex: 0,
  tableData: [],
})

const dicTypeData = computed(() => {
  return store.state.dictionary.dictionaryTypeData
})

const tableData = computed(() => {
  return store.state.dictionary.dictionaryData
})

const firstTab = computed(() => {
  return state.dicTypeData[state.tabIndex]
})

const getDictionaryId = computed(() => {
  return firstTab.value?.id
})

const getDictionaryTitle = computed(() => {
  return firstTab.value?.name
})

const fetchData = () => {
  return store.dispatch(DictionaryActionTypes.ACTION_DICTIONARY_TYPE_FETCH)
}

const fetchCurrentData = async () => {
  const id = getDictionaryId.value || firstTab.value?.id
  await store.dispatch(DictionaryActionTypes.ACTION_DICTIONARY_FETCH, id)
}

const deleteRow = async (id: any) => {
  await store.dispatch(
    DictionaryActionTypes.ACTION_DICTIONARY_DELETE,
    id
  )
  fetchCurrentData()
  success()
}

onBeforeMount(() => {
  fetchData()
})

watch(
  () => dicTypeData.value,
  (data: any[]) => {
    state.tabData = data
    fetchCurrentData()
  }
)

watch(
  () => tableData.value,
  (data: any) => {
    console.log('data:', data)
    state.tableData = data
  }
)

</script>

<template>
  <div class="dictionary">
    <ModTitle title="字典列表" />
    <div class="dictionary-content">
      <div class="tag-warp">
        <BtnBase
          v-for="(item, index) in dicTypeData"
          :key="index"
          type="success"
          class="tag-item"
        >
          {{ item.name }}
        </BtnBase>
      </div>
      <div class="dictionary-body">
<<<<<<< HEAD
        <ModTitle :title="getDictionaryTitle" />
        <TableBase :data="tableData" :columns="columns" border>
          <template #action="row">
=======
        <ModTitle title="产品线路" />
        <TableBase :data="dicData" :columns="columns" border>
          <template #action="{ row }">
>>>>>>> ac2f2bfc077e7b895e1bfb5dc38b7a90f44122c8
            <BtnLinkBase type="success" class="mr5">
              编辑
            </BtnLinkBase>
            <BtnLinkBase type="danger" @click="deleteRow(row.id)">
              删除
            </BtnLinkBase>
          </template>
        </TableBase>
      </div>
    </div>
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
