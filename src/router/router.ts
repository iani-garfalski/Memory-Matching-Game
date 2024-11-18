import { createRouter, createWebHistory, RouteLocationNormalized } from 'vue-router';
import Home from '../views/Home.vue';
import Game from '../views/Game.vue';
import Scoreboard from '../views/Scoreboard.vue';
import Instructions from '../views/Instructions.vue';
import { GameRoute } from '../types/GameRoute';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/game',
    component: Game,
    props: (route: RouteLocationNormalized): { category: string; gameSize: number } => {
      const query = route.query as GameRoute;
      return {
        category: query.category || '',
        gameSize: Number(query.gameSize) || 0,
      };
    },
  },
  {
    path: '/scoreboard',
    component: Scoreboard
  },
  {
    path: '/instructions',
    component: Instructions
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
