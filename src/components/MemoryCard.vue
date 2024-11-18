<template>
  <div class="card" @click="emitFlip" @keydown.space.prevent="emitFlip" tabindex="0"
    :class="{ matched, flipped, loaded }">
    <img v-if="flipped || matched" :src="image" :alt="alt" title="" />
    <span class="sr-only">{{ alt }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MemoryCard',
  props: {
    image: { type: String, required: true },
    alt: { type: String, required: true },
    flipped: { type: Boolean, required: true },
    matched: { type: Boolean, required: true },
    loaded: { type: Boolean, required: true }, // Add a `loaded` prop
  },
  emits: ['flip'],
  setup(_, { emit }) {
    const emitFlip = () => {
      emit('flip'); // Notify parent of a card flip
    };

    return { emitFlip };
  },
});
</script>

<style scoped lang="scss">
.card {
  width: 50px;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  cursor: pointer;
  transition: transform 0.3s, opacity 0.5s ease;
  outline: none;

  &.loaded {
    animation: fadeInUp 0.5s ease-out forwards;
  }

  &.flipped {
    transform: rotateY(180deg);
  }

  &.matched {
    opacity: 0.6;
    pointer-events: none;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px #007bff;
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  clip: rect(0, 0, 0, 0);
  overflow: hidden;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

img {
  font-size: 0;
  /* Hides the alt text */
}
</style>
