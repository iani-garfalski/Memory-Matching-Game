<template>
  <div id="app">
    <LayoutWrapper>
      <router-view />
    </LayoutWrapper>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import LayoutWrapper from './layouts/LayoutWrapper.vue';
import { useBackground } from './composables/useBackground';

export default defineComponent({
  name: 'App',
  components: {
    LayoutWrapper
  },
  setup() {
    const { backgroundImage, changeBackground } = useBackground();

    // Change the background when the app loads
    onMounted(() => {
      changeBackground();
    });

    return { backgroundImage };
  }
});
</script>
