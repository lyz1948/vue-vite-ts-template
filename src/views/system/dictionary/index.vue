<script setup lang="ts">
import { ref } from 'vue'
import ModTitle from '@/components/Title/index.vue'
import { DictionaryTable as columns } from '@/config/dictionaryTable'

const tagList = ['产品线路', '产品标签', '海报', 'H5']

const dicData = ref([
  { name: '线路类型', index: 0, content: '高端线路' },
  { name: '产品类型', index: 1, content: '高端线路' },
  { name: '酒店类型', index: 2, content: '高端线路' },
  { name: '收费类型', index: 3, content: '高端线路' },
])
</script>

<template>
  <div class="dictionary">
    <ModTitle title="字典列表" />
    <div class="dictionary-content">
      <div class="tag-warp">
        <BtnBase
          v-for="(item, index) in tagList"
          :key="index"
          type="success"
          class="tag-item"
        >
          {{ item }}
        </BtnBase>
      </div>
      <div class="dictionary-body">
        <ModTitle title="产品线路" />
        <TableBase :data="dicData" :columns="columns" border>
          <template #action>
            <BtnLinkBase type="success" class="mr5">
              编辑
            </BtnLinkBase>
            <BtnLinkBase type="danger">
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
      border-right: 1px solid $base-border-color;

      .el-button {
        margin-left: 0 !important;
      }
    }

    .tag-item {
      margin-top: 12px;
      padding: 12px 0;
      text-align: center;
      // border-bottom: 1px solid $base-border-color;
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
