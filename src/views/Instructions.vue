<template>
    <div class="instructions">
        <section>
            <h2>How to Play the Game</h2>
            <p>
                This is a memory card game where your objective is to match all card pairs with the fewest attempts
                and in
                the
                shortest time possible:
            </p>
            <ol>
                <li>Select a category and grid size from the main menu.</li>
                <li>Flip a card by clicking on it to reveal its image.</li>
                <li>Flip another card to try and find a match.</li>
                <li>If the two cards match, they stay flipped. If not, they are flipped back over.</li>
                <li>Continue until all cards are matched.</li>
                <li>Track your progress with the timer and attempts counter displayed during gameplay.</li>
            </ol>
        </section>
        <section>
            <h2>Scoring Formula</h2>
            <p>
                The score is calculated based on the time you spend and the number of attempts you make. Faster
                completion and
                fewer attempts result in a higher score.
            </p>
            <pre>
  Base Score: 1000
  Time Penalty: -4 points per second
  Attempts Penalty: -6 points per attempt
  
  Formula:
  Total Score = Base Score - (Time Spent * 4) - (Attempts * 6)
  
  Note: The score is never negative; if penalties exceed the base score, the score is set to 0.
        </pre>
            <p>
                <strong>Example:</strong> If you spend 60 seconds and make 10 attempts:
            </p>
            <pre>
  Total Score = 1000 - (60 * 4) - (10 * 6) = 700
        </pre>
        </section>
        <Button @click="goBack" type="primary" size="medium">Back to Menu</Button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { audioService } from '../services/audioService';
import Button from '../components/Button.vue';

export default defineComponent({
    name: 'Instructions',
    components: { Button },
    setup() {
        const router = useRouter();

        const goBack = () => {
            audioService.playSound('click');
            router.push('/');
        };

        return { goBack };
    },
});
</script>

<style scoped lang="scss">
.instructions {
    padding: 20px;
    width: 90%;
    margin: 0 auto;
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    overflow-y: scroll;
    max-height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    button {
        align-self: center;
    }

    h1 {
        text-align: center;
        margin-bottom: 20px;
    }

    h2 {
        color: #333;
        margin-bottom: 10px;
    }

    p {
        margin-bottom: 15px;
    }

    ol {
        margin-left: 20px;
        padding-left: 0;
    }

    code {
        background-color: #f4f4f4;
        padding: 2px 4px;
    }

    pre {
        background-color: #f4f4f4;
        padding: 10px;
        border-radius: 5px;
        overflow-x: auto;
    }
}
</style>