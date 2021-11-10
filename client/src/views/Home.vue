<template>
  <v-container class="d-flex justify-center flex-column text-center">
    <div class="text-h1">Home Page</div>
    <v-btn class="green white--text my-5" @click="login()">Log In</v-btn>
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
    };
  },
  components: {},
  methods: {
    async login() {
      const googleUser = await this.$gAuth.signIn();
      const goaRes = await googleUser.grantOfflineAccess({
        scope: 'https://www.googleapis.com/auth/drive.metadata',
      });
      console.log(goaRes);
      console.log('++++++++++++++++++');
      const res = await axios({
        url: 'http://localhost:3000/login',
        method: 'POST',
        'Content-Type': 'application/json',
        data: {
          code: goaRes.code,
        },
      });
      console.log(res.data);
      this.response = res.data;
    },
  },
};
</script>
