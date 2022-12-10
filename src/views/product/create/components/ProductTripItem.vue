<script setup lang="ts">
import { ref } from 'vue'
import { formTripState } from '../params'
import Uploader from '@/components/Uploader/UploadList.vue'

const form = ref(formTripState())
</script>

<template>
  <div class="content">
    <FormBase>
      <FormItemBase prop="" label="Day1">
        <div class="flex-box">
          <InputBase v-model="form.title" />
        </div>
      </FormItemBase>

      <div class="form-item-box">
        <FormItemBase prop="" label="出发地">
          <InputBase v-model="form.title" />
        </FormItemBase>
        <FormItemBase prop="" label="目的地">
          <InputBase v-model="form.title" />
        </FormItemBase>
        <FormItemBase prop="" label="住宿">
          <InputBase v-model="form.title" />
        </FormItemBase>
        <FormItemBase prop="" label="交通">
          <InputBase v-model="form.title" />
        </FormItemBase>
      </div>

      <div class="rest-item">
        <FormItemBase prop="" label="用餐">
          <div class="form-item-box">
            <div class="check-box">
              <el-checkbox>早</el-checkbox>
            </div>
            <InputBase v-model="form.title" />
          </div>
          <div class="form-item-box">
            <div class="check-box">
              <el-checkbox>中</el-checkbox>
            </div>
            <InputBase v-model="form.title" />
          </div>
          <div class="form-item-box">
            <div class="check-box">
              <el-checkbox>晚</el-checkbox>
            </div>
            <InputBase v-model="form.title" />
          </div>
        </FormItemBase>
      </div>
      <FormItemBase prop="" label="行程">
        <div class="flex-box">
          <InputBase v-model="form.title" type="textarea" rows="6" />
        </div>
      </FormItemBase>
      <div class="pic-box">
        <FormItemBase prop="" label="">
          <Uploader />
        </FormItemBase>
        <FormItemBase prop="" label="">
          <BtnBase>上传图片</BtnBase>
          <BtnBase>选择图库</BtnBase>
        </FormItemBase>
      </div>
    </FormBase>
  </div>
</template>

<style lang="scss">
.form-item-box {
  display: flex;
  justify-content: space-around;
  flex: 1;

  .input-base {
    flex: 1;
  }

  & > div {
    flex: 1;
    margin-right: 12px;
    &:last-child {
      margin-right: 0;
    }
  }

  .check-box {
    flex: 0 0 40px;
    padding-left: 8px;
    .input-box {
      margin-left: 12px;
    }
  }
}

.pic-box {
  padding-left: 40px;
}

.flex-box {
  width: 100%;
}

.icon-box {
  cursor: pointer;
}
</style>
