<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';
import StudentDashboard from './components/StudentDashboard.vue';
import StudentProfile from './components/StudentProfile.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: StudentDashboard },
  { path: '/students/:id', component: StudentProfile, },
];

const router = new VueRouter({
  routes,
  
});

export default {
  name: 'App',
  router, 
};
</script>


