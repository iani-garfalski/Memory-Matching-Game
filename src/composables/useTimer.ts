import { ref, onUnmounted } from 'vue';
import { IntervalId, UseTimerReturn } from '../types/timer';
/**
 * useTimer composable provides a simple timer functionality.
 * It exposes reactive timer value and methods to start, stop, and reset the timer.
 * The timer increments every second when started, and stops when the stop method is called.
 * Additionally, the timer is automatically stopped when the component using this composable is unmounted.
 *
 * @returns {UseTimerReturn} - Object containing the reactive timer value, 
 *                              and methods to control the timer (start, stop, reset).
 */
export function useTimer(): UseTimerReturn {
  const timer = ref(0);
  let intervalId: IntervalId = null;

  const start = () => {
    if (intervalId === null) {
      intervalId = setInterval(() => {
        timer.value++;
      }, 1000);
    }
  };

  const stop = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  const reset = () => {
    stop();
    timer.value = 0;
  };

  onUnmounted(stop);

  return { timer, start, stop, reset };
}
