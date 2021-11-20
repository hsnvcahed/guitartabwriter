<template>
  <v-container class="d-flex justify-center flex-column text-center">
    <div class="text-h1">Home Page</div>
    <v-container class="pa-3" style="width: 100%">
      <v-btn v-if="!isLoggedIn" class="green white--text my-5 mx-1" @click="login()">Log In</v-btn>
      <v-btn v-if="!isLoggedIn" class="blue white--text my-5 mx-1" @click="register()">Register</v-btn>
      <v-btn v-if="isLoggedIn" class="purple white--text my-5" @click="logout()">Log Out</v-btn>
    </v-container>
    <v-btn v-if="isLoggedIn" class="red darken-3 white--text my-5" @click="getData()">Get Data</v-btn>
    <v-container v-if="isLoggedIn">
      <input type="text" class="elevation-4 mx-3 green lighten-4" v-model="tabName" />
      <v-btn class="green darken-2 white--text my-5" @click="createTab()">Create Tab</v-btn>
    </v-container>
    <v-container v-if="isLoggedIn">
      <input type="text" class="elevation-4 mx-3 orange lighten-4" v-model="tabId" placeholder="Tab-ID" />
      <v-btn class="orange darken-2 white--text my-5" @click="deleteTab()">Delete Tab</v-btn>
    </v-container>
    <v-data-table :headers="headers" :items="response"></v-data-table>
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
        { text: 'Type', value: 'mimeType' },
      ],
      isLoggedIn: false,
      tabName: '',
      tabId: '',
    };
  },
  components: {},
  methods: {
    async login() {
      const googleUser = await this.$gAuth.signIn();
      const goaRes = await googleUser.grantOfflineAccess({
        scope: 'https://www.googleapis.com/auth/drive.file',
      });
      const res = await axios({
        url: 'http://localhost:3000/login',
        method: 'POST',
        'Content-Type': 'application/json',
        data: {
          code: goaRes.code,
        },
      });
      if (res.data.code !== 401) localStorage.setItem('UserEmail', res.data.data);
      else alert(res.data.data);
      this.isLoggedInF();
    },
    async register() {
      const googleUser = await this.$gAuth.signIn();
      const goaRes = await googleUser.grantOfflineAccess({
        scope: 'https://www.googleapis.com/auth/drive.file',
      });
      const res = await axios({
        url: 'http://localhost:3000/register',
        method: 'POST',
        'Content-Type': 'application/json',
        data: {
          code: goaRes.code,
        },
      });
      if (res.data.code === 401) alert(res.data.data);
    },
    isLoggedInF() {
      const code = localStorage.getItem('UserEmail');
      if (code) this.isLoggedIn = true;
      else this.isLoggedIn = false;
    },
    async getData() {
      const res = await axios({
        url: 'http://localhost:3000/tabs/' + localStorage.getItem('UserEmail'),
        method: 'GET',
      });
      this.response = res.data.data.files;
    },
    async logout() {
      await axios({
        method: 'GET',
        url: 'http://localhost:3000/logout',
      });
      localStorage.clear();
      this.isLoggedInF();
      this.response = [];
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
  created() {
    this.isLoggedInF();
  },
};
</script>
