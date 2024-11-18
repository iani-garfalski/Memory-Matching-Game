<template>
  <button class="btn" :class="['btn', type, size, { 'btn--disabled': disabled }]" @click="handleClick"
    :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'primary',
    },
    size: {
      type: String,
      default: 'medium', // default to medium size button
      validator(value: string) {
        return ['small', 'medium', 'large'].includes(value); // Valid size options
      },
    },
    disabled: {
      type: Boolean,
      default: false, // Button is not disabled by default
    },
  },
  methods: {
    handleClick() {
      if (!this.disabled) {
        this.$emit('click');
      }
    },
  },
});
</script>

<style scoped>
/* Base button styles */
.btn {
  padding: 10px 20px;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.2s;
  outline: none;
  /* Remove default outline */
}

.btn:hover {
  transform: scale(1.05);
  /* Slight scaling effect on hover */
}

.btn:focus {
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  /* Focus effect */
}

/* Button types (Primary, Secondary, etc.) */
.primary {
  background-color: #ffffff;
  color: rgb(0, 0, 0);
}

.secondary {
  background-color: #6c757d;
  color: white;
}

.danger {
  background-color: #dc3545;
  color: white;
}

/* Button sizes */
.small {
  padding: 5px 15px;
  font-size: 14px;
}

.medium {
  padding: 10px 20px;
  font-size: 16px;
}

.large {
  padding: 15px 30px;
  font-size: 18px;
}

/* Disabled button styles */
.btn--disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
