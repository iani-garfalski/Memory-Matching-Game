<script lang="ts">
import { defineComponent, PropType, defineEmits } from 'vue';

export default defineComponent({
  name: 'Modal',
  props: {
    isVisible: { type: Boolean, required: true },
    title: { type: String, default: 'Notification' },
    message: { type: String, default: '' },
    buttons: {
      type: Array as PropType<{ label: string; action?: () => void }[]>,
      default: () => [],
    },
    onClose: {
      type: Function as PropType<() => void>,
      default: () => { },
    },
  },
  setup(props) {
    // Emit to close modal
    const emitClose = defineEmits<{
      (e: 'close'): void;
    }>();

    const closeModal = () => {
      emitClose('close'); // Emit close event when modal closes
      if (props.onClose) {
        props.onClose(); // Call the onClose function if provided
      }
    };

    const handleButtonClick = (action?: () => void) => {
      if (action) action();
      closeModal();
    };

    return {
      closeModal,
      handleButtonClick,
      ...props, // Expose the props to the template
    };
  },
});
</script>

<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
      <button
        v-for="(button) in buttons"
        :key="button.label"
        @click="handleButtonClick(button.action)"
      >
        {{ button.label }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 400px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    h2 {
      margin-bottom: 10px;
    }

    button {
      margin: 10px 5px 0;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      background-color: #007bff;
      color: white;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
}
</style>