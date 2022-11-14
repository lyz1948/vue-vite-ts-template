<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: '',
  password: '',
  checkedPwd: '',
})
</script>

<template>
  <el-form ref="form" :model="form" class="login-ruleForm">
    <el-form-item prop="name">
      <el-input v-model="form.name" placeholder="手机号">
        <template #prefix>
          <icon-user theme="outline" size="16" fill="#999" />
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <div class="form-code">
        <el-input v-model="form.name" placeholder="获取验证码">
          <template #prefix>
            <icon-user theme="outline" size="16" fill="#999" />
          </template>
        </el-input>
        <el-button class="code-btn">
          短信验证码
        </el-button>
      </div>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="form.password" placeholder="密码" type="password">
        <template #prefix>
          <icon-lock theme="outline" size="16" fill="#999" />
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="form.password" placeholder="确认密码" type="password">
        <template #prefix>
          <icon-lock theme="outline" size="16" fill="#999" />
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <div class="login-check">
        <el-checkbox v-model="form.checkedPwd">
          我同意xxx隐私政策
        </el-checkbox>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        size="medium"
        class="login-btn"
        round
      >
        注册
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.is-mobile {
  .login-ruleForm {
    width: 100%;
  }
}
.login-ruleForm {
  margin-top: 1rem;
  :deep(.el-input__prefix) {
    top: 2px;
    padding: 0 4px;
  }
  .login-methods {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .login-btn {
    width: 100%;
    margin-bottom: 1rem;
  }
  .login-check {
    display: flex;
    align-content: center;
    justify-content: space-between;
  }
  .form-code {
    display: flex;
    align-content: center;
    justify-content: space-between;
    .code-btn {
      margin-left: 1rem;
    }
  }
}
</style>
