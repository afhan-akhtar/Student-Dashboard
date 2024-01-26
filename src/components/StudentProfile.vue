<template>
  <div class="container">
    <h1 class="my-4 text-success">Student Profile</h1>
    <div class="card bg-dark">
      <div class="card-body">
        <h2 class="card-title text-white">Name: {{ student.name }}</h2>
        <p class="card-text text-white">Email: {{ student.email }}</p>
        <p class="card-text text-white">Username: {{ student.username }}</p>
        <p class="card-text text-white">Phone: {{ student.phone }}</p>
        <p class="card-text text-white">Address: {{ student.address }}</p>
      </div>
    </div>
    <router-link to="/" class="btn btn-success mt-3">Back</router-link>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      student: {}, 
    };
  },
  mounted() {
    this.fetchStudentData();
  },
  methods: {
    async fetchStudentData() {
      const studentId = this.$route.params.id;
      console.log(this.$route.params)
      console.log(studentId)
      if (!studentId) {
        console.error('Student ID is undefined');
        return;
      }

      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${studentId}`);
        this.student = response.data;
      } catch (error) {
        console.error('Error fetching student data: ' + error);
      }
    },
  },
};
</script>












