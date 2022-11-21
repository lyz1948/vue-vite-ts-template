<script setup lang="ts">
import Search from './components/Search.vue'
import TableList from './components/TableList.vue'
</script>

<template>
  <div>
    <div class="container">
      <Search />
      <div class="content">
        <TableList />
      </div>
    </div>
  </div>
</template>