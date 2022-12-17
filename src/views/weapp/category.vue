<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import draggable from 'vuedraggable'
import Dialog from './components/DialogCategory.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { ProductActionTypes } from '@/store/modules/product/action-types'
import { useStore } from '@/store'

const store = useStore()
let idGlobal = 1

// const list1 = ref([
//   { name: '周边游', id: 1, icon: '标记_mark', color: '#f50' },
//   { name: '自由行', id: 2, icon: '标记_mark', color: '#f50' },
//   { name: '国内游', id: 3, icon: '标记_mark', color: '#f50' },
//   { name: '亲子游', id: 4, icon: '标记_mark', color: '#f50' },
// ])

// const list2 = ref([
//   { name: '高端游', id: 5, icon: '标记_mark', color: '#f50' },
//   { name: '购物团', id: 6, icon: '标记_mark', color: '#a30' },
//   { name: '经典游', id: 7, icon: '标记_mark', color: '#c21' },
// ])

const controlOnStart = ref(true)
const dialogRef = ref(null)
const list1 = ref([])
const list2 = ref([])

const tableData = computed(() => {
  let list = store.state.product.productCateList
  if (list && list.length) {
    list = list.sort((a, b) => a.orderNumber - b.orderNumber)
  }
  return list
})

// const list1 = computed(() => {
//   return tableData.value.filter(it => it.isShow)
// })

// const list2 = computed({

// })

const fetchData = (params = {}) => {
  return store.dispatch(ProductActionTypes.ACTION_PRODUCT_CATE_LIST, params)
}

const clone = item => {
  return { ...item, id: idGlobal++ }
}

const start = ({ originalEvent }) => {
  console.log('originalEvent:', originalEvent)
  controlOnStart.value = originalEvent.ctrlKey
}

const log = ev => {
  // 删除
  // if (ev.added) {

  // }
  // // 添加
  // if (ev.removed) {


  // }
  store.dispatch(ProductActionTypes.ACTION_PRODUCT_CATE_SET, state.form)
 
}

const showDialog = () => {
  dialogRef.value.show()
}

onMounted(() => {
  if (!tableData.value.length) {
    fetchData()
  }
  list1.value = tableData.value.filter(it => it.isShow)
  list2.value= tableData.value.filter(it => !it.isShow)
})
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
            :clone="clone"
            @start="start"
          >
            <template #item="{ element }">
              <div class="list-group-item">
                <div class="icon-box" :style="{ background: element.color }">
                  <component
                    :is="element.icon"
                    fill="#000"
                    size="20"
                    :stroke-width="4"
                  />
                  <!-- <SvgIcon :name="element.icon" size="30px" /> -->
                </div>
                {{ element.name }}
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
            @change="log"
          >
            <template #item="{ element }">
              <div class="list-group-item">
                <div class="icon-box" :style="{ background: element.color }">
                  <SvgIcon :name="element.icon" size="30px" />
                </div>
                {{ element.name }}
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
    padding: 10px 12px;
    border: 1px solid $base-color-border;
    margin-bottom: 10px;
    background: #fff;
    cursor: pointer;
    @include flexcenter(flex-start);

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
