<template>
  <div class="home">
    <h1>Memory Card Game</h1>
    <form @submit.prevent="startGame">
      <SelectInput v-model="category" label="Select Category" id="category" :options="categoryOptions" required />
      <SelectInput v-model="gameSize" label="Select Grid Size" id="gameSize" :options="gridSizeOptions" required />

      <Button type="primary" size="medium">Start Game</Button>
    </form>
    <div class="button-container">
      <Button @click="goToScoreboard" type="primary" size="medium">View Scoreboard</Button>
      <Button @click="goToInstructions" type="primary" size="medium">View Instructions</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import SelectInput from '../components/SelectInput.vue';
import Button from '../components/Button.vue';
import { audioService } from '../services/audioService';

export default defineComponent({
  name: 'Home',
  components: {
    SelectInput, Button
  },
  setup() {
    const category = ref<string>('animals');
    const gameSize = ref<number>(16); // Default to 4x4 grid
    const router = useRouter();

    const categoryOptions = [
      { label: 'Animals', value: 'animals' },
      { label: 'Fruits', value: 'fruits' },
      { label: 'Icons', value: 'icons' },
    ];

    const gridSizeOptions = [
      { label: '4x4', value: 16 },
      { label: '6x6', value: 36 },
      { label: '12*12', value: 144 },
    ];

    const startGame = () => {
      audioService.playSound('click');
      router.push({
        path: '/game',
        query: { category: category.value, gameSize: gameSize.value },
      });
    };

    const goToScoreboard = () => {
      audioService.playSound('click');
      router.push('/scoreboard');
    };

    const goToInstructions = () => {
      audioService.playSound('click');
      router.push('/Instructions');
    };

    return { category, gameSize, startGame, goToScoreboard, goToInstructions, categoryOptions, gridSizeOptions };
  },
});
</script>

<style scoped lang="scss">
.home {
  margin: 0 auto;
  text-align: center;
}
</style>
