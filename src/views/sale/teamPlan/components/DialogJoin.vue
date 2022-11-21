<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue'
import type { MyFormExpose } from '@/components/base/FormBase.vue'
import FormBase from '@/components/base/FormBase.vue'
import useElement from '@/hooks/useElement'
import SelectCustomer from '@/components/business/SelectCustomer.vue'
import TableTourist from './TableTourist.vue'

const visibleDialog = ref(false)
const title = '报名计划'
const { error, success } = useElement()
const formRef = ref<InstanceType<typeof FormBase> & MyFormExpose>()

const formState = () => ({
  name: '',
  remark: '',
  role: '', // 角色名字
  isEnable: true,
})

const rules = {
  name: [{ required: true, message: '名字不能为空', trigger: 'blur' }],
  role: [{ required: true, message: '角色不能为空', trigger: 'blur' }],
}

const customerRules = {
  name: [{ required: true, message: '客户名字不能为空', trigger: 'change' }],
  contact: [{ required: true, message: '名字不能为空', trigger: 'blur' }],
}

const state = reactive({
  loading: false,
  form: formState(),
  customer: {},
})

const show = () => {
  visibleDialog.value = true
}

const hide = () => {
  visibleDialog.value = false
  state.form = formState()
}

const edit = (row: any) => {
  show()
  state.form = { ...row }
}

const handleConfirm = () => {
  formRef.value
    ?.validate()
    .then(() => {
      success()
      hide()
    })
    .catch(err => {
      console.log('err:', err)
      error()
    })
}

const { form, customer } = toRefs(state)

defineExpose({
  show,
  edit,
})
</script>

<template>
  <DialogBase
    :title="title"
    :visible="visibleDialog"
    custom-class="dialog-join"
    @update:visible="visibleDialog = $event"
    @update:confirm="handleConfirm"
  >
    <div class="order-info">
      <div class="order-info--item">
        <span class="text el-form-item__label">订单号</span>
        <span class="text el-form-item__label">线路名称</span>
      </div>
      <div class="order-info--item">
        <div>
          <span>发团日期：</span>
          <span class="text">2022-12-01</span>
        </div>
        <div>
          <span>出发城市：</span>
          <span class="text">上海</span>
        </div>
        <div>
          <span>余位：</span>
          <span class="text">12</span>
        </div>
      </div>
    </div>

    <div class="order-customer">
      <FormBase :form="customer" :rules="customerRules" inline>
        <h3>客户信息</h3>
        <FormItemBase prop="" label="客户">
          <SelectCustomer v-model="customer.name" />
        </FormItemBase>
        <FormItemBase prop="" label="联系人">
          <InputBase v-model="customer.contact" />
        </FormItemBase>
        <FormItemBase prop="" label="联系电话">
          <InputBase v-model="customer.phone" />
        </FormItemBase>
      </FormBase>
      <FormBase>
        <FormItemBase prop="" label="预定人数">
          <div class="booking">
            <div class="booking-item">
              <span>成人数</span>
              <InputBase />
              <span>价格</span>
              <InputBase />
            </div>
            <div class="booking-item">
              <span>儿童数</span>
              <InputBase />
              <span>价格</span>
              <InputBase />
            </div>
            <div class="booking-item">
              <span>单房差</span>
              <InputBase />
              <span>价格</span>
              <InputBase />
            </div>
          </div>
        </FormItemBase>
      </FormBase>
    </div>

    <div class="tourist">
      <div class="tourist-head">
        <h3>游客名单</h3>
        <BtnBase>批量导入</BtnBase>
        <BtnBase>新增</BtnBase>
      </div>
      <div class="tourist-body">
        <TableTourist />
      </div>
    </div>

    <div class="agency">
      <FormBase
        :form="customer"
        :rules="customerRules"
        inline
        label-width="60px"
      >
        <h3>地接信息</h3>

        <div class="agency-item row-half">
          <FormItemBase prop="" label="联系人">
            <InputBase v-model="customer.contact" />
          </FormItemBase>
          <FormItemBase prop="" label="联系电话">
            <InputBase v-model="customer.phone" />
          </FormItemBase>
        </div>
        <div class="agency-item">
          <FormItemBase prop="" label="备注">
            <InputBase v-model="customer.phone" type="textarea" class="flex-1" />
          </FormItemBase>
        </div>
      </FormBase>
    </div>
  </DialogBase>
</template>

<style lang="scss" scoped>
.dialog-join {
  .order-info {
    padding: 0 20px;
    &--item {
      display: flex;
      margin-bottom: 10px;
      .text {
        margin-right: 24px;
      }
    }
  }
  .booking {
    &-item {
      display: flex;
      margin-bottom: 10px;

      span {
        margin: 0 10px;
      }
    }
  }
  .tourist {
    &-head {
      display: flex;
      align-items: center;
      padding: 20px;
      h3 {
        margin-right: 20px;
      }
    }
  }
  .agency {
    &-item {
      display: flex;
      width: 100%;
      .row-half {
        width: 50%;
      }
      .input-base {
        flex: 1;
      }
      .el-form-item__content {
        flex: 1;
      }

      .el-form-item {
        display: flex;
        width: 100%;
      }
    }
  }
}
</style>
