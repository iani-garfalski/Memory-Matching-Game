<template>
  <div class="timer">
    Time: {{ time }} seconds
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';

export default defineComponent({
  props: {
    isRunning: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    const time = ref(0);
    let timer: number | null = null;

    onMounted(() => {
      if (props.isRunning) {
        startTimer();
      }
    });

    onBeforeUnmount(() => {
      stopTimer();
    });

    const startTimer = () => {
      if (timer) return;
      timer = window.setInterval(() => {
        time.value++;
      }, 1000);
    };

    const stopTimer = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    return { time, startTimer, stopTimer };
  }
});
</script>

<style scoped>
.timer {
  font-size: 18px;
  margin: 10px;
  font-weight: bold;
}
</style>