<template>
  <div class="scoreboard">
    <h1>Top Scores</h1>
    <table v-if="scores.length">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Score</th>
          <th>Attempts</th>
          <th>Time (s)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(score, index) in scores" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ score.score }}</td>
          <td>{{ score.attempts }}</td>
          <td>{{ score.time }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>No scores available yet!</p>
    <button @click="goBack">Back to Menu</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { audioService } from '../services/audioService';

export default defineComponent({
  name: 'Scoreboard',
  setup() {
    console.log('sss', localStorage.getItem('scoreboard'));
    const scores = ref(
      JSON.parse(localStorage.getItem('scoreboard') || '[]')
    );
    const router = useRouter();

    const goBack = () => {
      audioService.playSound('click');
      router.push('/');
    };

    return { scores, goBack };
  },
});
</script>

<style scoped lang="scss">
.scoreboard {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;

  table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;

    th,
    td {
      padding: 8px;
      border: 1px solid #ddd;
    }

    th {
      background-color: #f4f4f4;
    }
  }

  button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
}
</style>