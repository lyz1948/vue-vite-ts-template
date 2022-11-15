<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'TableBase',
})
</script>

<script setup lang="ts">
import { PageDefault } from '@/config'
import useElement from '@/hooks/useElement'

const emit = defineEmits(['update:page'])
const { loading } = useElement()
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },

  columns: {
    type: Array,
    required: true,
  },

  totalCount: {
    type: Number,
    default: 0,
  },

  highlight: {
    type: Boolean,
    default: true,
  },

  showSelection: {
    type: Boolean,
    default: false,
  },

  showFooter: {
    type: Boolean,
    default: true,
  },

  showEmpty: {
    type: Boolean,
    default: true,
  },

  page: {
    type: Object,
    default: () => ({
      pageSize: PageDefault.pageSize,
      pageNum: PageDefault.ageNum,
    }),
  },

  pageLayout: {
    type: String,
    default: PageDefault.pageLayout,
  },

  pageSizes: {
    type: Array,
    default() {
      return PageDefault.pageSizes
    },
  },

  pageBgShow: {
    type: Boolean,
    default: PageDefault.bgShow,
  },
})

const handleSizeChange = (pageSize: number) => {
  emit('update:page', { ...props.page, pageSize })
}

const handleCurrentChange = (pageNum: number) => {
  // 模拟数据请求
  const loadInstance = loading()
  setTimeout(() => {
    loadInstance.close()
  }, 2000)
  emit('update:page', { ...props.page, pageNum })
}
</script>

<template>
  <div class="table-base">
    <div class="table-base-header">
      <div class="table-base-header-title">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div class="table-base-header-handler">
        <slot name="headerHandler" />
      </div>
    </div>
    <el-table :highlight-current-row="highlight" :data="data">
      <el-table-column v-if="showSelection" type="selection" width="55" />
      <template v-for="(item, index) in columns" :key="index">
        <el-table-column v-bind="item.attrs">
          <template v-if="item.headerSlot" #header>
            <slot :name="item.headerSlot" />
          </template>

          <template #default="scope">
            <slot :name="item.slot" :row="scope.row">
              {{ scope.row[item.attrs.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div v-if="showFooter" class="table-base-footer">
      <el-pagination
        :background="pageBgShow"
        :current-page="page.pageNum"
        :page-size="page.pageSize"
        :layout="pageLayout"
        :page-sizes="pageSizes"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.table-base {
  padding: 0 20px;
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid $base-border-color;
    &-title {
      font-size: 14px;
      color: $base-color-primary;
    }
    &-handler {
      display: flex;
      align-items: center;
    }
  }
  &-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>
