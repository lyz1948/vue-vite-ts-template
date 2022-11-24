<script setup lang="ts">
import { ref } from 'vue';
import Search from './components/Search.vue'
import TableList from './components/TableList.vue'
import DialogJoin from './components/DialogJoin.vue'
import DialogEdit from './components/DialogEdit.vue'

const dialogJoinRef = ref(null)
const dialogEditRef = ref(null)

const showJoin = () => {
  dialogJoinRef.value.show()
}

const showEdit = () => {
  dialogEditRef.value.show()
}
</script>

<template>
  <div>
    <DialogJoin ref="dialogJoinRef" />
    <DialogEdit ref="dialogEditRef" />
    <Search />
    <TableList @on:edit="showEdit" @on:join="showJoin" />
  </div>
</template>