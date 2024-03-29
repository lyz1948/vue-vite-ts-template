<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useStore } from '@/store'
import { RouteRecordRaw, useRouter } from 'vue-router'
import { ILogin } from '@/types'
import { UserActionTypes } from '@/store/modules/user/action-types'
import { ElForm } from 'element-plus'

const store = useStore()
const router = useRouter()
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
      const routerPath: RouteRecordRaw | any = state.redirect === '/404' || state.redirect === '/401' ? '/' : state.redirect

      router.push({ path: routerPath }).catch(err => {
        console.error(err)
      })
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
  route => {
    state.redirect = ((route.query && route.query.redirect) || '/') as string
  },
  { immediate: true }
)
</script>

<template>
  <FormBase
    ref="validateForm"
    :model="state.ruleForm"
    :rules="state.rules"
    class="login-ruleForm"
  >
    <FormItemBase prop="username">
      <el-input v-model="state.ruleForm.username" placeholder="请输入用户名">
        <template #prefix>
          <icon-user theme="outline" size="16" fill="#999" />
        </template>
      </el-input>
    </FormItemBase>
    <FormItemBase prop="password">
      <el-input
        v-model="state.ruleForm.password"
        placeholder="请输入密码"
        type="password"
        @keyup.enter="handleLogin"
      >
        <template #prefix>
          <icon-lock theme="outline" size="16" fill="#999" />
        </template>
      </el-input>
    </FormItemBase>
    <FormItemBase>
      <div class="login-check">
        <el-checkbox v-model="state.checkedPwd">
          记住密码
        </el-checkbox>
        <el-link type="success" :underline="false">
          忘记密码
        </el-link>
      </div>
    </FormItemBase>
    <FormItemBase>
      <el-button
        type="success"
        :loading="state.loading"
        class="login-btn"
        round
        @click="handleLogin"
      >
        登录
      </el-button>
    </FormItemBase>
    <el-divider>第三方登录</el-divider>
    <FormItemBase>
      <div class="login-methods">
        <icon-wechat theme="outline" size="24" fill="#333" />
        <icon-alipay theme="outline" size="24" fill="#333" />
        <icon-github theme="outline" size="24" fill="#333" />
      </div>
    </FormItemBase>
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
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .i-icon {
      cursor: pointer;
    }
  }
  .login-btn {
    width: 100%;
  }
  .login-check {
    width: 100%;
    display: flex;
    align-content: center;
    justify-content: space-between;
  }
}
</style>
