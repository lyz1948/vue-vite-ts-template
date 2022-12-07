<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon/index.vue";
import { ref, onMounted } from "vue";

const iconFiles = import.meta.globEager("../../assets/icon/*.svg");

const icons = ref([]);
const activeIcon = ref("");

const select = (val) => {
  activeIcon.value = val;
};

onMounted(() => {
  for (const path in iconFiles) {
    const val = path.split("/icon/")[1].split(".svg")[0];
    icons.value.push(val);
  }
});
</script>

<template>
  <div class="svg-icon--wrap">
    <template v-for="icon in icons" :key="icon">
      <SvgIcon
        :name="icon"
        size="36"
        color="#fff"
        :class="{'active': activeIcon == icon}"
        @click="select(icon)"
      />
    </template>
  </div>
</template>

<style lang="scss">
.svg-icon--wrap {
  .svg-icon {

    &.active {
      border: 1px solid #f50;
      color: #f50;
    }
  }
}
</style>
