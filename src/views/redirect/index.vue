<script setup lang="ts">
import { onMounted } from 'vue-demi'
import { useRoute, useRouter } from 'vue-router'

onMounted(() => {
  const { params, query } = useRoute()
  console.log('params, query:', params, query)
  const { path } = params
  // /login?redirect=
  useRouter()
    .replace({ path: '/' + path, query })
    .catch(err => {
      console.warn(err)
    })
})
</script>

<style scoped></style>
