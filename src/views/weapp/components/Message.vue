<script setup lang="ts">
import { ref } from 'vue'
import { SMSCustomerTpl, SMSBusinessTpl } from '@/config/weappTable'
import { messageCustomer, messageBusiness } from '../params'

const tableCustomer = ref(messageCustomer)

const tableBusiness = ref(messageBusiness)
</script>

<template>
  <div class="mod-wrap">
    <div class="mod-title">
      短信通知设置
    </div>

    <div class="mod-body container">
      <TableBase
        :data="tableCustomer"
        :columns="SMSCustomerTpl"
        :show-footer="false"
        border
      >
        <template #status="{ row }">
          <SwitchBase v-model="row.status" />
        </template>
      </TableBase>

      <TableBase
        :data="tableBusiness"
        :columns="SMSBusinessTpl"
        :show-footer="false"
        border
      >
        <template #status="{ row }">
          <SwitchBase v-model="row.status" />
        </template>
      </TableBase>
    </div>
  </div>
</template>

<style></style>
