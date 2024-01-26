import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import StudentDashboard from './components/StudentDashboard.vue';
import StudentProfile from './components/StudentProfile.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: StudentDashboard },
  { path: '/students/:id', component: StudentProfile, },
  { path: '*', redirect: '/students' },
];

const router = new VueRouter({
  routes,
  
});

new Vue({
  el: '#app',
  render: (h) => h(App),
  router,
});





