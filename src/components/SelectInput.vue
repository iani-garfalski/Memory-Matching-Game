<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

interface Option {
  label: string;
  value: string | number;
}

export default defineComponent({
  name: 'SelectInput',
  props: {
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    options: {
      type: Array as () => Option[],
      required: true,
    },
    modelValue: {
      type: [String, Number],
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const selectedValue = ref(props.modelValue);

    // Watch the selectedValue to emit changes to the parent
    watch(selectedValue, (newValue) => {
      emit('update:modelValue', newValue);
    });

    return { selectedValue };
  },
});
</script>

<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <select :id="id" v-model="selectedValue" :required="required">
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
    </select>
  </div>
</template>

<style scoped lang="scss">
.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
}

select {
  padding: 8px;
  font-size: 16px;
  width: 100%;
}
</style>