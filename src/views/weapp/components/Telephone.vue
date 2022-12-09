
<script setup lang="ts">
import { reactive, computed, onBeforeMount, watch, ref } from "vue";
import { useStore } from '@/store'
import { AppActionTypes } from '@/store/modules/app/action-types'
import { isPhone, isTelephone } from "@/utils/validate";
import useElement from "@/hooks/useElement";

const store = useStore()
const { showToast } = useElement()

const state = reactive({
  list: [
    {}
  ],
})

const getData = computed(() => {
  return store.state.app.mallPhoneList
})

const fetData = () => {
  return store.dispatch(AppActionTypes.ACTION_MALL_PHONE_LIST)
}

const add = () => {
  state.list.push({ name: '2', val: '' })
}

const minus = (index: number) => {
  state.list.splice(index, 1)
}

const handleSave = () => {

  const isValNull = state.list.every(it => (it.val && it.val.trim() !== ''))
  const isValidPhone = state.list.some(it => {
    if (it.val.startsWith('1')) {
      return !isPhone(it.val)
    } else {
      return !isTelephone(it.val)
    }
  })

  if (!isValNull) {
    showToast({ message: '手机/电话号码不能为空', type: 'warning' })
    return
  }

  if (isValidPhone) {
    showToast({ message: '手机/电话号码不正确', type: 'warning' })
    return
  }
  const data = state.list.map(it => {
    isPhone(it.val) ? it.mobilePhone = it.val : it.telphone = it.val
    return it
  })
  store.dispatch(AppActionTypes.ACTION_MALL_PHONE_SET, data).then(() => {
    showToast({ message: '保存成功', type: 'success' })
  })
}

onBeforeMount(() => {
  fetData()
})

watch(() => getData.value, data => {
  if (!data) return
  state.list = data.map(it => {
    it.val = it.mobilePhone || it.telphone
    return it
  })
})
</script>

<template>
  <div class="mod-wrap telphone">
    <div class="mod-title">
      电话设置
    </div>

    <div class="mod-body ">
      <div v-for="(item, index) in state.list" :key="index" class="field-row">
        <span>电话号码：</span>
        <SelectBase v-model="item.name" type="telType" />
        <span class="mr5" />
          
        <div class="inner">
          <InputBase v-model="item.val" />

          <el-button v-if="index > 0" plain @click="minus(index)">
            <icon-minus title="minus" fill="#999" size="16" />
          </el-button>
          <el-button plain @click="add">
            <icon-plus title="plus" fill="#999" size="16" />
          </el-button>
        </div>
      </div>

      <div class="mod-foot mt20">
        <strong>电话格式：</strong>
        <p>
          座机电话格式：区号+号码+分机号；（无分机号不用加分机号）
        </p>
        <p>
          手机号码格式：11位手机号码；
        </p>
        <p>
          400十位号码格式：400+7位号码
        </p>
      </div>

      <div class="mt20">
        <BtnBase type="success" @click="handleSave">
          确定
        </BtnBase>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.telphone {
  .el-form-item--default {
    margin-bottom: 0;
  }
  .field-row {
    display: flex;
    .inner {
      display: flex;
    }
  }
  .input-base {
    flex: 0 0 300px !important;
  }
}
</style>