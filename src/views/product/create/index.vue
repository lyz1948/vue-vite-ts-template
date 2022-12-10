<script setup lang="ts">
import ProductInfo from './components/ProductInfo.vue'
// import ProductEdit from './components/ProductEdit.vue'
import ProductTrip from './components/ProductTrip.vue'
import TextareaItem from './components/TextareaItem.vue'
import SwiperItem from './components/SwiperItem.vue'

const compList = [
  { name: '基础信息', id: 'JCXX', component: ProductInfo },
  // { name: '产品详情', id: 'CPXQ', component: ProductEdit },
  { name: '行程安排', id: 'XCAP', component: ProductTrip },
  { name: '费用包含', id: 'FYBH', component: TextareaItem },
  { name: '费用不含', id: 'FYBBH', component: TextareaItem },
  { name: '服务标准', id: 'FWBZ', component: TextareaItem },
  { name: '其他备注', id: 'QTBZ', component: TextareaItem },
  { name: '友情提示', id: 'YQTS', component: TextareaItem },
  { name: '轮播图片', id: 'LBTP', component: SwiperItem },
]
</script>

<template>
  <div class="product-create">
    <div class="tools">
      <el-link
        v-for="item in compList"
        :key="item.id"
        type="primary"
        :href="'#' + item.id"
      >
        {{ item.name }}
      </el-link>
    </div>

    <template v-for="(comp) in compList" :key="comp.id">
      <component
        :is="comp.component"
        :id="comp.id"
        :title="comp.name"
      />
      <!-- <div v-if="idx !== compList.length - 1" class="split-line" /> -->
    </template>
    <div class="product-create--foot">
      <BtnBase type="success">
        保存
      </BtnBase>
    </div>
  </div>
</template>

<style lang="scss">
.product-create {
  // padding-right: 80px;
  .tools {
    position: fixed;
    right: 20px;
    top: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: translateY(-50%);
    z-index: $base-z-index-default;
    & > a {
      padding: 6px;
      width: 50px;
      height: 50px;
      display: block;
      background: rgba($dark-bg-color, .88);
      color: #fff;
      font-size: 14px;
      line-height: 20px;
      text-decoration: none;
      text-align: center;
      &:not(:last-child) {
        border-bottom: 1px solid $base-color-border;
      }
    }
  }

  &--foot {
    padding-top: 20px;
    border-top: 1px solid $base-color-border;
    text-align: center;
  }
}
</style>
