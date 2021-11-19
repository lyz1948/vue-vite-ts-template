<script setup lang="ts">
import { reactive, ref, watch, unref, onMounted } from 'vue'
import { useStore } from '@/store'
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'
import { ILogin } from '@/types'
import { UserActionTypes } from '@/store/modules/user/action-types'
import { ElForm } from 'element-plus'

const store = useStore()
const router = useRouter()
const currentRouter = useRoute()
const validateForm = ref<InstanceType<typeof ElForm>>()

const state = reactive({
  ruleForm: {
    username: 'admin',
    password: 'admin',
  },
  valid: false,
  loading: false,
  checkedPwd: false,
  redirect: ref(''),
  rules: {
    username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
  },
})

const userLogin = (loginState: ILogin) => {
  state.valid = true
  state.loading = true
  store
    .dispatch(UserActionTypes.ACTION_LOGIN, loginState)
    .then(() => {
      const routerPath: RouteRecordRaw | any =
        state.redirect === '/404' || state.redirect === '/401' ? '/' : state.redirect

      router.push({ path: routerPath }).catch(() => {})
      state.loading = false
    })
    .catch(() => {
      state.loading = false
    })
}

const handleLogin = async () => {
  const isValid = validateForm.value?.validate()

  if (isValid) {
    await userLogin(state.ruleForm)
  }
}

watch(
  () => router.currentRoute.value,
  (route) => {
    state.redirect = ((route.query && route.query.redirect) || '/') as string
  },
  { immediate: true }
)
</script>

<template>
  <FormBase :model="state.ruleForm" :rules="state.rules" ref="validateForm" class="login-ruleForm">
    <FormItemBase prop="username">
      <el-input placeholder="用户名" v-model="state.ruleForm.username">
        <template #prefix>
          <icon-user theme="outline" size="16" fill="#999" />
        </template>
      </el-input>
    </FormItemBase>
    <FormItemBase prop="password">
      <el-input
        @keyup.enter="handleLogin"
        placeholder="密码"
        type="password"
        v-model="state.ruleForm.password"
      >
        <template #prefix>
          <icon-lock theme="outline" size="16" fill="#999" />
        </template>
      </el-input>
    </FormItemBase>
    <FormItemBase>
      <div class="login-check">
        <el-checkbox v-model="state.checkedPwd">记住密码</el-checkbox>
        <el-button type="text">忘记密码</el-button>
      </div>
    </FormItemBase>
    <FormItemBase>
      <el-button
        type="primary"
        size="medium"
        :loading="state.loading"
        class="login-btn"
        round
        @click="handleLogin"
        >登录</el-button
      >
    </FormItemBase>
    <!-- <el-divider>第三方登录</el-divider>
    <FormItemBase>
      <div class="login-methods">
        <wechat theme="outline" size="24" fill="#333" />
        <alipay theme="outline" size="24" fill="#333" />
        <github theme="outline" size="24" fill="#333" />
        <twitter theme="outline" size="24" fill="#333" />
        <google theme="outline" size="24" fill="#333" />
      </div>
    </FormItemBase> -->
  </FormBase>
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
