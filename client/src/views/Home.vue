<template>
  <v-container class="d-flex justify-center flex-column text-center">
    <v-container v-if="!isLoggedIn">Please Log In</v-container>
    <v-container v-if="isLoggedIn">
      <input type="text" class="elevation-4 mx-3 deep-purple lighten-4" v-model="tabName" placeholder=" Tab Name" />
      <v-btn class="deep-purple darken-2 white--text my-5" @click="createTab()">Create Tab</v-btn>
      <input type="text" class="elevation-4 mx-3 deep-purple lighten-4" v-model="tabId" placeholder=" Tab-ID" />
      <v-btn class="deep-purple darken-2 white--text my-5" @click="deleteTab()">Delete Tab</v-btn>
      <v-container class="d-flex flex-row justify-center">
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="mx-2 elevation-2" color="deep-purple" text outlined v-bind="attrs" v-on="on"> Create/Delete Label </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Labels</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-data-table v-model="labelSelected" item-key="name" show-select :headers="labelHeaders" :items="labels"></v-data-table>
                </v-row>
                <v-row>
                  <v-col cols="4">
                    <input type="text" class="elevation-4 mx-3 deep-purple lighten-4" v-model="labelName" placeholder=" Label Name" />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn color="deep-purple darken-1 white--text" small @click="delSelectedLabels"> Delete Selected </v-btn>
              <v-btn color="deep-purple darken-1 white--text" small @click="createLabel"> Create </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="deep-purple darken-1" text @click="dialog = false"> Close </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-select
          :items="labels"
          v-model="labelDropDown"
          item-text="name"
          item-value="label_id"
          label="Filter by Label"
          dense
          outlined
        ></v-select>
        <v-btn class="deep-purple darken-2 white--text mx-1" @click="findTabs()"><v-icon class="white--text">mdi-magnify</v-icon></v-btn>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
      </v-container>
    </v-container>
    <v-data-table v-if="isLoggedIn" :headers="headers" :items="listTabs" @click:row="goToTab"></v-data-table>
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
      labelName: '',
      labelDropDown: '',
      labels: [],
      labelHeaders: [
        {
          text: 'Name',
          value: 'name',
        },
      ],
      labelSelected: [],
      dialog: false,
      filteredIds: [],
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
    async getLabels() {
      const res = await axios({
        url: 'http://localhost:3000/labels/' + localStorage.getItem('UserEmail'),
        method: 'GET',
      });

      this.labels = res.data;
    },
    async findTabs() {
      if (!this.labelDropDown) this.filteredIds = [];
      else {
        const res = await axios({
          url: 'http://localhost:3000/tabs/' + localStorage.getItem('UserEmail') + '?label=' + this.labelDropDown,
          method: 'GET',
        });

        this.filteredIds = res.data.length > 0 ? res.data.map((x) => x.tab_id) : ['Error'];
        console.log(this.filteredIds);
        this.labelDropDown = '';
      }
    },
    async createLabel() {
      if (this.labelName != '') {
        const res = await axios({
          url: 'http://localhost:3000/label',
          method: 'POST',
          'Content-Type': 'application/json',
          data: {
            user: localStorage.getItem('UserEmail'),
            label: this.labelName,
          },
        });
        console.log(res.data);
        this.getLabels();
      }
    },
    async delSelectedLabels() {
      for (const label of this.labelSelected) {
        const res = await axios({
          url: 'http://localhost:3000/label/' + label.label_id,
          method: 'DELETE',
        });
      }
      this.getLabels();
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
    if (this.isLoggedIn) {
      this.getData();
      this.getLabels();
    }
  },
  computed: {
    listTabs() {
      if (this.filteredIds.length != 0) return this.response.filter((tab) => this.filteredIds.includes(tab.id));
      else return this.response;
    },
  },
};
</script>
