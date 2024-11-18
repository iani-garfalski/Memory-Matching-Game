<template>
  <div class="grid">
    <MemoryCard v-for="(card, index) in cards" :key="card.id" :image="card.image" :alt="card.alt"
      :flipped="card.flipped" :matched="card.matched" :loaded="loadedCards.includes(index)" @flip="onFlipCard(card)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import MemoryCard from './MemoryCard.vue';
import { Card } from '../types/card';

export default defineComponent({
  name: 'CardGrid',
  components: { MemoryCard },
  props: {
    cards: {
      type: Array as PropType<Card[]>,
      required: true,
    },
    loadedCards: {
      type: Array as PropType<number[]>, // Track loaded card indices
      required: true,
    },
    onFlipCard: {
      type: Function as PropType<(card: Card) => void>,
      required: true,
    },
  },
  setup(props) {
    const onFlipCard = (card: Card) => {
      props.onFlipCard(card);
    };

    return { onFlipCard };
  },
});
</script>


<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  grid-row-gap: 15px;
  /* Space between cards */
  grid-column-gap: 0px;
  justify-content: center;
  justify-items: center;
  width: 100%;
  max-width: 800px;
  box-sizing: border-box;
}

img {
  /* Visually hide the alt text */
  text-indent: -9999px;
  display: inline-block;
}
</style>
