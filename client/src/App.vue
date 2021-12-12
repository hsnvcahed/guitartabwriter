<template>
  <v-app>
    <v-app-bar app>
      <v-btn to="/" class="blue white--text" active-class="indigo darken-4 white--text">Home</v-btn>
      <v-spacer></v-spacer>
      <v-container class="text-h3"
        ><span style="font-family: 'Titillium Web', sans-serif">Guitar—Tab Writer</span></v-container
      >
      <v-spacer></v-spacer>
      <v-btn v-if="!isLoggedIn" class="green white--text my-5 mx-1" @click="login()">Log In</v-btn>
      <v-btn v-if="!isLoggedIn" class="blue white--text my-5 mx-1" @click="register()">Register</v-btn>
      <v-btn v-if="isLoggedIn" class="purple white--text my-5" @click="logout()">Log Out</v-btn>
    </v-app-bar>
    <v-main>
      <router-view :isLoggedIn="isLoggedIn" />
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',

  data: () => ({
    isLoggedIn: false,
  }),
  methods: {
    async login() {
      const googleUser = await this.$gAuth.signIn();
      const goaRes = await googleUser.grantOfflineAccess({
        scope: 'https://www.googleapis.com/auth/drive',
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
        scope: 'https://www.googleapis.com/auth/drive',
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
    async logout() {
      await axios({
        method: 'GET',
        url: 'http://localhost:3000/logout',
      });
      localStorage.clear();
      this.isLoggedInF();
      this.response = [];
      this.$router.push({ path: '/' });
    },
  },
  created() {
    this.isLoggedInF();
  },
};
</script>
