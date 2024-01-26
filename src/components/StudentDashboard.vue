<template>
  <div class="container">
    <h1 class="my-4 text-success">Student Dashboard</h1>
    <form @submit.prevent="addStudent">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th class="text-primary">Name</th>
            <th class="text-success">Email</th>
            <th class="text-info">Username</th>
            <th class="text-warning">Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in students" :key="student.id"
            :class="(index % 2 === 0) ? 'table-success' : 'table-info'">
            <td>{{ index + 1 }}</td>
            <td>
              <template v-if="!student.isEditing">
                {{ student.name }}
              </template>
              <input v-else v-model="student.editedName" class="form-control"
                :class="{ 'is-invalid': student.isEditing && student.editedName.trim() === '' }" />
              <div v-if="student.isEditing && student.editedName.trim() === ''" class="invalid-feedback">
                Name is required.
              </div>
            </td>
            <td>
              <template v-if="!student.isEditing">
                {{ student.email }}
              </template>
              <input v-else v-model="student.editedEmail" class="form-control"
                :class="{ 'is-invalid': student.isEditing && student.editedEmail.trim() === '' }" />
              <div v-if="student.isEditing && student.editedEmail.trim() === ''" class="invalid-feedback">
                Email is required.
              </div>
            </td>
            <td>
              <template v-if="!student.isEditing">
                {{ student.username }}
              </template>
              <input v-else v-model="student.editedUsername" class="form-control"
                :class="{ 'is-invalid': student.isEditing && student.editedUsername.trim() === '' }" />
              <div v-if="student.isEditing && student.editedUsername.trim() === ''" class="invalid-feedback">
                Username is required.
              </div>
            </td>
            <td>
              <template v-if="!student.isEditing">
                {{ student.phone }}
              </template>
              <input v-else v-model="student.editedPhone" class="form-control"
                :class="{ 'is-invalid': student.isEditing && student.editedPhone.trim() === '' }" />
              <div v-if="student.isEditing && student.editedPhone.trim() === ''" class="invalid-feedback">
                Phone is required.
              </div>
            </td>
            <td>
              <button @click="toggleEdit(student)" class="btn btn-primary mr-2">
                {{ student.isEditing ? 'Save' : 'Edit' }}
              </button>
              <button @click="cancelEdit(student)" class="btn btn-secondary" v-if="student.isEditing">Cancel</button>
              <button @click="deleteStudent(student)" class="btn btn-danger">Delete</button>

              <router-link :to="'/students/' + student.id" class="btn btn-info mr-2">
                View
              </router-link>


            </td>
          </tr>
        </tbody>
      </table>

      <div class="form-group">
        <label for="newStudentName">Name:</label>
        <input id="newStudentName" v-model="newStudentData.name" class="form-control" />
      </div>

      <div class="form-group">
        <label for="newStudentEmail">Email:</label>
        <input id="newStudentEmail" v-model="newStudentData.email" class="form-control" />

      </div>

      <div class="form-group">
        <label for="newStudentUsername">Username:</label>
        <input id="newStudentUsername" v-model="newStudentData.username" class="form-control" />

      </div>

      <div class="form-group">
        <label for="newStudentPhone">Phone:</label>
        <input id="newStudentPhone" v-model="newStudentData.phone" class="form-control" />

      </div>

      <button type="submit" class="btn btn-success">Add Student</button>
    </form>

    <div v-if="successMessage" class="alert alert-success">
      {{ successMessage }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      students: [],
      successMessage: '',
      newStudentData: {
        name: '',
        email: '',
        username: '',
        phone: '',
      },
    };
  },
  methods: {

    fetchStudents() {
      axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
          this.students = response.data.map((student) => ({
            ...student,
            isEditing: false,
            editedName: student.name,
            editedEmail: student.email,
            editedUsername: student.username,
            editedPhone: student.phone,
          }));
        })
        .catch((error) => {
          console.error('Error fetching students: ' + error);
        });
    },
    toggleEdit(student) {
      if (student.isEditing) {
        if (
          student.editedName.trim() === '' ||
          student.editedEmail.trim() === '' ||
          student.editedUsername.trim() === '' ||
          student.editedPhone.trim() === ''
        ) {
          return;
        }

        if (student.id) {
          // This is an existing student, send the update request to the server
          if (window.confirm('Are you sure you want to save changes to this student?')) {
            const updatedStudentData = {
              name: student.editedName,
              email: student.editedEmail,
              username: student.editedUsername,
              phone: student.editedPhone,
            };

            axios
              .put(`https://jsonplaceholder.typicode.com/users/${student.id}`, updatedStudentData)
              .then(() => {
                // Update the student's data in the local list
                student.name = student.editedName;
                student.email = student.editedEmail;
                student.username = student.editedUsername;
                student.phone = student.editedPhone;
                student.isEditing = false;
              })
              .catch((error) => {
                console.error('Error saving student changes: ' + error);
              });
          }
        } else {
          // This is a new student, simply exit edit mode without sending a request
          student.isEditing = false;
        }
      } else {
        // Enter edit mode
        student.isEditing = true;
        // Initialize edited data with current data
        student.editedName = student.name;
        student.editedEmail = student.email;
        student.editedUsername = student.username;
        student.editedPhone = student.phone;
      }
    },

    cancelEdit(student) {
      if (!student.id) {
        // This is a new student, remove it
        const index = this.students.findIndex((s) => s.isEditing);
        if (index !== -1) {
          this.students.splice(index, 1);
        }
      } else {
        // Restore the original data
        student.isEditing = false;
      }
    },
    addStudent() {
      const newStudentData = this.newStudentData;

      if (
        newStudentData.name.trim() === '' ||
        newStudentData.email.trim() === '' ||
        newStudentData.username.trim() === '' ||
        newStudentData.phone.trim() === ''
      ) {
        return;
      }

      axios
        .post('https://jsonplaceholder.typicode.com/users', newStudentData)
        .then((response) => {
          this.students.push({ ...response.data, isEditing: false });
          this.successMessage = 'New student added successfully!';

          setTimeout(() => {
            this.successMessage = '';
          }, 3000);

          this.newStudentData = {
            name: '',
            email: '',
            username: '',
            phone: '',
          };
        })
        .catch((error) => {
          console.error('Error adding a new student: ' + error);
        });
    },
    deleteStudent(student) {
      if (student.isEditing) {
        this.cancelEdit(student);
      }

      if (window.confirm(`Are you sure you want to delete student with ID ${student.id}?`)) {
        axios
          .delete(`https://jsonplaceholder.typicode.com/users/${student.id}`)
          .then(() => {
            const index = this.students.findIndex((s) => s.id === student.id);
            if (index !== -1) {
              this.students.splice(index, 1);
            }
          })
          .catch((error) => {
            console.error('Error deleting the student: ' + error);
          });
      }
    },
  },
  mounted() {
    this.fetchStudents();
  },
};
</script>



