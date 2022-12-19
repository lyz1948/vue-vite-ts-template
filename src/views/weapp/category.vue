<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import draggable from 'vuedraggable'
import Dialog from './components/DialogCategory.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { ProductActionTypes } from '@/store/modules/product/action-types'
import { useStore } from '@/store'
import useElement from '@/hooks/useElement'

// let idGlobal = 1
const store = useStore()
const { confirm } = useElement()
const controlOnStart = ref(true)
const dialogRef = ref(null)
const list1 = ref([])
const list2 = ref([])

const tableData = computed(() => {
  // let list = store.state.product.productCateList
  // if (list && list.length) {
  //   list = list.sort((a, b) => a.orderNumber - b.orderNumber)
  // }
  return store.state.product.productCateList
})

const fetchData = (params = {}) => {
  return store.dispatch(ProductActionTypes.ACTION_PRODUCT_CATE_LIST, params)
}

// const clone = item => {
//   return { ...item, id: idGlobal++ }
// }

const start = ({ originalEvent }) => {
  controlOnStart.value = originalEvent.ctrlKey
}

const moveLog = ev => {
  if (ev.added) {
    const { element } = ev.added
    store.dispatch(ProductActionTypes.ACTION_PRODUCT_CATE_SET, { ...element, isShow: false })
  }
}

const addLog = ev => {
  if (ev.moved) {
    const { newIndex, element } = ev.moved
    element.orderNumber = newIndex
    store.dispatch(ProductActionTypes.ACTION_PRODUCT_CATE_SET, element)
    // const old = list1.value[oldIndex]
    // old.orderNumber = oldIndex
    // store.dispatch(ProductActionTypes.ACTION_PRODUCT_CATE_SET, element)
  }

  if (ev.added) {
    const { element } = ev.added
    store.dispatch(ProductActionTypes.ACTION_PRODUCT_CATE_SET, { ...element, isShow: true })
  }
}

const handleRemove = ({ id }) => {
  confirm().then(() => {
    store.dispatch(ProductActionTypes.ACTION_PRODUCT_CATE_DEL, id).then(() => {
      const fIndex = list2.value.findIndex(it => it.id === id)
      list2.value.splice(fIndex, 1)
    })
  })
}

const showDialog = () => {
  dialogRef.value.show()
}

watch(
  () => tableData.value,
  cateList => {
    if (cateList.length) {
      list1.value = cateList.filter(it => it.isShow)
      list2.value = cateList.filter(it => !it.isShow)
    } else {
      fetchData()
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="weapp-category">
    <div class="container">
      <div class="content">
        <BtnBase type="primary" @click="showDialog">
          新增自定义类目
        </BtnBase>
      </div>
      <div class="weapp-category--wrap">
        <div class="weapp-category--item">
          <h3>当前添加分类</h3>
          <p>
            已选中类别目录
            <span class="red">(最多8个)</span>
          </p>
          <draggable
            class="list-group"
            item-key="id"
            :list="list1"
            :group="{ name: 'cate', pull: true }"
            @start="start"
            @change="addLog"
          >
            <template #item="{ element }">
              <div class="list-group-item">
                <div class="flex">
                  <div class="icon-box" :style="{ background: element.color }">
                    <SvgIcon :name="element.icon" size="30px" />
                  </div>
                  {{ element.name }}
                </div>
              </div>
            </template>
          </draggable>
        </div>

        <div class="weapp-category--item">
          <h3>未添加分类</h3>
          <p>未选中类别目录</p>
          <draggable
            class="list-group"
            group="cate"
            item-key="id"
            :list="list2"
            @change="moveLog"
          >
            <template #item="{ element }">
              <div class="list-group-item">
                <div class="flex">
                  <div class="icon-box" :style="{ background: element.color }">
                    <SvgIcon :name="element.icon" size="30px" />
                  </div>
                  {{ element.name }}
                </div>
                <span class="fr" @click="handleRemove(element)">
                  <icon-delete fill="#d0d2d8" size="18" />
                </span>
              </div>
            </template>
          </draggable>
        </div>
      </div>

      <div class="weapp-category--foot">
        <BtnBase type="primary">
          预览
        </BtnBase>
        <BtnBase type="success">
          保存
        </BtnBase>
      </div>
    </div>
    <Dialog ref="dialogRef" @on:reload="fetchData" />
  </div>
</template>

<style lang="scss">
@import '@/styles/mixin.scss';
@import '@/styles/variables.scss';

.weapp-category {
  &--wrap {
    display: flex;
  }
  &--item {
    flex: 1;
    padding: 20px;
    color: $base-font-color;
    @include flexcenter();
    flex-direction: column;
  }
  &--foot {
    @include flexcenter();
  }
  .list-group {
    width: 300px;
    padding: 20px;
    height: 600px;
    border-radius: 8px;
    background: #f1f1f1;
    overflow-y: auto;
  }

  .list-group-item {
    width: 260px;
    padding: 10px 12px;
    border: 1px solid $base-color-border;
    margin-bottom: 10px;
    background: #fff;
    cursor: pointer;
    @include flexcenter(space-between);

    .icon-box {
      @include flexcenter();
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>
