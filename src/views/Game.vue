<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import CardGrid from '../components/CardGrid.vue';
import Modal from '../components/Modal.vue';
import Button from '../components/Button.vue';
import { ensureImagesInStorage } from '../services/pexelsService';
import { saveScore } from '../services/scoreboardService';
import { Card } from '../types/card';
import { useTimer } from '../composables/useTimer';
import { useBackground } from '../composables/useBackground';
import router from '../router/router';
import { audioService } from '../services/audioService';

export default defineComponent({
  name: 'Game',
  components: { CardGrid, Modal, Button },
  props: {
    category: { type: String, required: true },
    gameSize: { type: Number, required: true },
  },
  setup(props) {
    const cards = ref<Card[]>([]);
    const attempts = ref(0);
    const selectedCards = ref<Card[]>([]);
    const showSuccessModal = ref(false);
    const backgroundImage = ref('');
    const loadedCards = ref<number[]>([]); // Track which cards are loaded
    const { changeBackground } = useBackground();

    // Use the timer logic from the composable
    const { timer, start, stop, reset } = useTimer();

    const initializeGame = async () => {
      try {
        loadedCards.value = [];
        for (let i = 0; i < cards.value.length; i++) {
          setTimeout(() => {
            loadedCards.value.push(i); // Mark each card as loaded with a delay
          }, i * 100); // Stagger animation
        }
        // Ensure enough images are in localStorage
        const images = await ensureImagesInStorage(props.category, props.gameSize / 2);

        // Duplicate and shuffle the cards
        const duplicatedCards: Card[] = images.flatMap((image, index) => [
          { id: index * 2, image: image.url, alt: image.alt, flipped: false, matched: false },
          { id: index * 2 + 1, image: image.url, alt: image.alt, flipped: false, matched: false },
        ]);

        // Assign the shuffled cards to cards.value
        cards.value = shuffleArray(duplicatedCards);

        attempts.value = 0;
        reset(); // Reset the timer
        showSuccessModal.value = false;
        start(); // Start the timer
      } catch (error) {
        console.error('Error initializing game:', error);
        alert('Failed to load images. Please try again later.');
      }
    };

    // Arrow function for Fisher-Yates shuffle
    const shuffleArray = (duplicatedCards: Card[]): Card[] => {
      for (let i = duplicatedCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [duplicatedCards[i], duplicatedCards[j]] = [duplicatedCards[j], duplicatedCards[i]]; // Swap
      }
      return duplicatedCards; // Return the shuffled array
    };

    // Handle card flip logic
    const handleCardFlip = (card: Card) => {
      if (selectedCards.value.length === 2 || card.flipped || card.matched) return;

      card.flipped = true;
      audioService.playSound('flip');
      selectedCards.value.push(card);

      if (selectedCards.value.length === 2) {
        attempts.value++;
        const [firstCard, secondCard] = selectedCards.value;

        if (firstCard.image === secondCard.image) {
          firstCard.matched = true;
          secondCard.matched = true;
          selectedCards.value = [];
          audioService.playSound('correct');
          checkGameCompletion();
        } else {
          setTimeout(() => {
            firstCard.flipped = false;
            secondCard.flipped = false;
            selectedCards.value = [];
          }, 1000);
        }
      }
    };

    // Check if all cards are matched
    const checkGameCompletion = () => {
      if (cards.value.every(card => card.matched)) {
        stop(); // Stop the timer when game is completed
        saveScore(attempts.value, timer.value); // Save the score with attempts and time
        audioService.playSound('win');
        showSuccessModal.value = true;
      }
    };

    // Reset game
    const resetGame = async () => {
      stop(); // Stop the timer before resetting
      audioService.playSound('shuffle');
      await initializeGame();
    };

    // Format time (MM:SS)
    const formattedTime = computed(() => {
      const minutes = Math.floor(timer.value / 60);
      const seconds = timer.value % 60;
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    });

    // Modal control
    const closeModal = () => {
      audioService.playSound('click');
      showSuccessModal.value = false;
    };

    const goBack = () => {
      audioService.playSound('click');
      router.push('/');
    };

    onMounted(() => {
      changeBackground();
      initializeGame();
    });

    return {
      cards,
      attempts,
      formattedTime,
      showSuccessModal,
      handleCardFlip,
      resetGame,
      closeModal,
      goBack,
      backgroundImage,
      loadedCards,
    };
  },
});
</script>

<template>
  <div class="game">
    <h1>Memory Card Game</h1>
    <CardGrid :cards="cards" :loadedCards="loadedCards" :onFlipCard="handleCardFlip" />
    <p>Attempts: {{ attempts }}</p>
    <p>Time: {{ formattedTime }}</p>
    <div class="button-container">
      <Button @click="resetGame" type="primary" size="medium">Reset Game</Button>
      <Button @click="goBack" type="primary" size="medium">Back to Menu</Button>
    </div>
  </div>
  <!-- Reusable Modal -->
  <Modal v-if="showSuccessModal" :isVisible="showSuccessModal" title="Congratulations!"
    :message="'You completed the game in ' + formattedTime + ' with ' + attempts + ' attempts.'" :buttons="[
      { label: 'Close', action: closeModal },
      { label: 'Restart', action: resetGame }
    ]" :onClose="closeModal" />
</template>

<style scoped lang="scss">
.game {
  position: relative;
  top: 0;
  left: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  width: 100%;
  height: 90vh;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
}
</style>
