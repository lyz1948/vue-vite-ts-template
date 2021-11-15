<script setup lang="ts">
import { reactive, ref, watch, unref } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { login } from '@/api/user'
import { ILogin } from '@/types'
import { UserActionTypes } from '@/store/modules/user/action-types'

const store = useStore()
const currentRoute = useRouter()
const validateForm = ref(null)

const state = reactive({
  ruleForm: {
    username: 'admin',
    password: 'admin',
  },
  loading: false,
  checkedPwd: false,
  redirect: undefined,
  rules: {
    username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
  },
})

const userLogin = (loginState: ILogin) => {
  return store.dispatch(UserActionTypes.ACTION_LOGIN, loginState)
}

const handleLogin = async () => {
  const form = unref(validateForm)
  if (!form) return
  await form.validate(valid => {
    if (valid) {
      state.valid = true
      state.loading = true
      userLogin(state.ruleForm)
        .then(() => {
          const routerPath =
            state.redirect === '/404' || state.redirect === '/401'
              ? '/'
              : state.redirect
          router.push(routerPath).catch(() => {})
          state.loading = false
        })
        .catch(() => {
          state.loading = false
        })
    }
  })
}

watch(
  () => currentRoute.name,
  ({ _value }) => {
    const route = _value
    state.redirect = (route.query && route.query.redirect) || '/'
  }
)
</script>

<template>
  <el-form
    :model="state.ruleForm"
    :rules="rules"
    ref="validateForm"
    class="login-ruleForm"
  >
    <el-form-item prop="username">
      <el-input placeholder="用户名" v-model="state.ruleForm.username">
        <template #prefix>
          <user theme="outline" size="16" fill="#999" />
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        @keyup.enter="handleLogin"
        placeholder="密码"
        type="password"
        v-model="state.ruleForm.password"
      >
        <template #prefix>
          <lock theme="outline" size="16" fill="#999" />
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <div class="login-check">
        <el-checkbox v-model="state.checkedPwd">记住密码</el-checkbox>
        <el-button type="text">忘记密码</el-button>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        size="medium"
        :loading="state.loading"
        class="login-btn"
        round
        @click="handleLogin"
        >登录</el-button
      >
    </el-form-item>
    <!-- <el-divider>第三方登录</el-divider>
    <el-form-item>
      <div class="login-methods">
        <wechat theme="outline" size="24" fill="#333" />
        <alipay theme="outline" size="24" fill="#333" />
        <github theme="outline" size="24" fill="#333" />
        <twitter theme="outline" size="24" fill="#333" />
        <google theme="outline" size="24" fill="#333" />
      </div>
    </el-form-item> -->
  </el-form>
</template>

<style lang="scss" scoped>
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
  }
  .login-check {
    display: flex;
    align-content: center;
    justify-content: space-between;
  }
}
</style>
