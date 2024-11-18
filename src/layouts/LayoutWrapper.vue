<template>
  <div class="layout-wrapper">
    <slot />
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',
});
</script>

<style scoped>
.layout-wrapper {
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 15px;
  padding-bottom: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  width: 50%;
  max-width: 95%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  box-sizing: border-box;
}

/* For larger screens (e.g., tablets and desktops) */
@media (min-width: 768px) {
  .layout-wrapper {
    width: 50%;
  }
}

/* For very large screens (e.g., desktops with big screens) */
@media (min-width: 1200px) {
  .layout-wrapper {
    width: 40%;
  }
}

/* For smaller screens (e.g., phones) */
@media (max-width: 480px) {
  .layout-wrapper {
    width: 95%;
  }
}
</style>