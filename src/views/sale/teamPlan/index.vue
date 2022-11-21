<script setup lang="ts">
import { ref } from 'vue';
import Search from './components/Search.vue'
import TableList from './components/TableList.vue'
import DialogJoin from './components/DialogJoin.vue'

const dialogJoinRef = ref(null)

const showJoin = () => {
  dialogJoinRef.value.show()
}
</script>

<template>
  <div>
    <DialogJoin ref="dialogJoinRef" />
    <div class="content">
      <Search />
      <TableList @on:edit="showJoin" />
    </div>
  </div>
</template>