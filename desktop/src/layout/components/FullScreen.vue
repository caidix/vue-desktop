<template>
  <span
    @click="toggle"
    class="iconfont"
    :class="isFullscreen ? 'icon-full-screen-cancel' : 'icon-full-screen'"
  ></span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useFullscreen } from '@vueuse/core'
export default defineComponent({
  setup() {
    const { isFullscreen, toggle } = useFullscreen()
    return { isFullscreen, toggle }
  }
})
</script>
