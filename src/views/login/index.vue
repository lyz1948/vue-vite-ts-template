<script setup lang="ts">
import { login } from '@/api/user'
import { ILogin } from '@/types'
import { onMounted } from 'vue-demi'
import { useStore } from '@/store'
import { UserActionTypes } from '@/store/modules/user/action-types'

const loginState: ILogin = {
  username: 'mcgl8888-1',
  password: 'mc123456',
}

const store = useStore()

const userLogin = () => {
  store.dispatch(UserActionTypes.ACTION_LOGIN, loginState)
}

onMounted(() => {
  userLogin()
})
</script>

<template>
  <h1>Login</h1>
</template>

<style scoped></style>
