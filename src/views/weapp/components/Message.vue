<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { SMSCustomerTpl, SMSBusinessTpl } from '@/config/weappTable'
import { messageCustomer, messageBusiness } from '../params'
import { useStore } from '@/store'
import { AppActionTypes } from '@/store/modules/app/action-types'
import { SMSType } from '@/enums'
import useElement from '@/hooks/useElement'

const store = useStore()
const { success }  = useElement()
const tableCustomer = ref(messageCustomer)
const tableBusiness = ref(messageBusiness)

const fetchData = () => {
  return store.dispatch(AppActionTypes.ACTION_MALL_SMS_GET)
}

const initTpl = () => {
  const cList = tableCustomer.value.map(it => {
    return store.dispatch(AppActionTypes.ACTION_MALL_SMS_SET, it)
  })

  const bList = tableBusiness.value.map(it => {
    return store.dispatch(AppActionTypes.ACTION_MALL_SMS_SET, it)
  })

  Promise.all([...cList, ...bList]).then(() => {
    console.log('init tpl ok')
  })
}

const formatTpl = (data: Message) => {

  const toCTpl = data.filter(it => it.type === SMSType.TOC)
  const toBTpl = data.filter(it => it.type === SMSType.TOB)

  return { toCTpl, toBTpl }
}

const handleChange = (item) => {
  store.dispatch(AppActionTypes.ACTION_MALL_SMS_SET, item).then(() => {
    success({ message: '设置成功' })
  })
}

onMounted(async () => {
  const data = await fetchData()

  if (!data || !data.length) {
    initTpl()
  } else {
    const { toCTpl, toBTpl } = formatTpl(data)
    console.log('toCTpl:', toCTpl)
    tableCustomer.value = toCTpl
    tableBusiness.value = toBTpl
  }
})

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
          <SwitchBase v-model="row.isEnable" @change="handleChange(row)" />
        </template>
      </TableBase>

      <TableBase
        :data="tableBusiness"
        :columns="SMSBusinessTpl"
        :show-footer="false"
        border
      >
        <template #status="{ row }">
          <SwitchBase v-model="row.isEnable" @change="handleChange(row)" />
        </template>
      </TableBase>
    </div>
  </div>
</template>

<style></style>
