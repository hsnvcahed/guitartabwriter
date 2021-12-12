<template>
  <v-container class="d-flex justify-center flex-column text-center">
    <v-container v-if="!isLoggedIn">Please Log In</v-container>
    <v-container v-if="isLoggedIn">
      <input type="text" class="elevation-4 mx-3 green lighten-4" v-model="tabName" />
      <v-btn class="green darken-2 white--text my-5" @click="createTab()">Create Tab</v-btn>
    </v-container>
    <v-container v-if="isLoggedIn">
      <input type="text" class="elevation-4 mx-3 orange lighten-4" v-model="tabId" placeholder="Tab-ID" />
      <v-btn class="orange darken-2 white--text my-5" @click="deleteTab()">Delete Tab</v-btn>
    </v-container>
    <v-data-table v-if="isLoggedIn" :headers="headers" :items="response" @click:row="goToTab"></v-data-table>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      response: [],
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Last Edit', value: 'modifiedTime' },
      ],
      tabName: '',
      tabId: '',
    };
  },
  props: {
    isLoggedIn: {
      type: Boolean,
    },
  },
  methods: {
    goToTab(value) {
      this.$router.push('/tab/' + value.id);
    },
    async getData() {
      const res = await axios({
        url: 'http://localhost:3000/tabs/' + localStorage.getItem('UserEmail'),
        method: 'GET',
      });
      this.response = res.data.data.files;
    },
    async createTab() {
      const res = await axios({
        method: 'POST',
        url: 'http://localhost:3000/tab',
        'Content-Type': 'application/json',
        data: {
          tabName: this.tabName,
          email: localStorage.getItem('UserEmail'),
        },
      });
      alert('Done');
    },
    async deleteTab() {
      const res = await axios({
        method: 'Delete',
        url: 'http://localhost:3000/tab',
        'Content-Type': 'application/json',
        data: {
          tabId: this.tabId,
          email: localStorage.getItem('UserEmail'),
        },
      });
      alert('Done');
    },
  },
  watch: {
    isLoggedIn(newValue, oldValue) {
      if (this.isLoggedIn) this.getData();
    },
  },
  created() {
    if (this.isLoggedIn) this.getData();
  },
};
</script>
