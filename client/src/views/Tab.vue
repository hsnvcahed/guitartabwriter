<template>
  <v-container>
    <v-container class="d-flex flex-row flex-nowrap algin-center">
      <input type="text" v-model="delFrom" class="deep-purple lighten-3 ma-2 elevation-2" placeholder=" From" />
      <input type="text" v-model="delTo" class="deep-purple lighten-3 ma-2 elevation-2" placeholder=" To" />
      <v-btn class="deep-purple white--text" @click="removeChars">DEL</v-btn>
      <v-spacer></v-spacer>
      <v-container style="30%">
        <v-btn small v-for="(tab, id) in tabLabels" class="mx-1" :key="id" disabled>{{ tab.name }}</v-btn>
      </v-container>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mx-2 elevation-2" color="deep-purple" text outlined v-bind="attrs" v-on="on"> Labels </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Labels</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-select
                  :items="labels"
                  dense
                  outlined
                  multiple
                  item-text="name"
                  label="Add/Remove Label"
                  item-value="label_id"
                  v-model="labelSelect"
                ></v-select>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="deep-purple darken-1 white--text" small @click="createTabLabel"> Add Selected </v-btn>
            <v-btn color="deep-purple darken-1 white--text" small @click="deleteTabLabel"> Remove Selected </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="deep-purple darken-1"
              text
              @click="
                dialog = false;
                labelSelect = [];
              "
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn class="green white--text" @click="saveTab"
        ><span :hidden="saveCheck">Save</span>
        <span :hidden="!saveCheck"><v-icon>mdi-check-bold</v-icon></span>
      </v-btn>
    </v-container>
    <input
      v-model="string1"
      @input="addDashToAll(1)"
      style="width: 100%; font-family: 'Share Tech Mono', monospace"
      class="text-h3 elevation-3"
      type="text"
    />
    <p>{{ string1.length }}</p>
    <input
      v-model="string2"
      @input="addDashToAll(2)"
      style="width: 100%; font-family: 'Share Tech Mono', monospace"
      class="text-h3 elevation-3"
      type="text"
    />
    <p>{{ string2.length }}</p>

    <input
      v-model="string3"
      @input="addDashToAll(3)"
      style="width: 100%; font-family: 'Share Tech Mono', monospace"
      class="text-h3 elevation-3"
      type="text"
    />
    <p>{{ string3.length }}</p>

    <input
      v-model="string4"
      @input="addDashToAll(4)"
      style="width: 100%; font-family: 'Share Tech Mono', monospace"
      class="text-h3 elevation-3"
      type="text"
    />
    <p>{{ string4.length }}</p>

    <input
      v-model="string5"
      @input="addDashToAll(5)"
      style="width: 100%; font-family: 'Share Tech Mono', monospace"
      class="text-h3 elevation-3"
      type="text"
    />
    <p>{{ string5.length }}</p>

    <input
      v-model="string6"
      @input="addDashToAll(6)"
      style="width: 100%; font-family: 'Share Tech Mono', monospace"
      class="text-h3 elevation-3"
      type="text"
    />
    <p>{{ string6.length }}</p>

    <div style="width: 100%; font-family: 'Share Tech Mono', monospace; font-size: 40px" class="elevation-4 grey lighten-2 black--text">
      <p>{{ string1 }}</p>
      <p>{{ string2 }}</p>
      <p>{{ string3 }}</p>
      <p>{{ string4 }}</p>
      <p>{{ string5 }}</p>
      <p>{{ string6 }}</p>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    tabId: {
      type: String,
    },
  },
  data() {
    return {
      string1: '',
      string2: '',
      string3: '',
      string4: '',
      string5: '',
      string6: '',
      delFrom: '',
      delTo: '',
      saveCheck: false,
      dialog: false,
      labels: [],
      tabLabels: [],
      labelSelect: [],
    };
  },
  computed: {
    lineLenght() {
      return this.string1.split('').length * 100;
    },
  },
  methods: {
    addDashToAll(notU) {
      const dash = '—';
      const changedString = this[`string${notU}`];
      if (notU != 1 && this.string1.length < changedString.length) this.string1 += dash;
      if (notU != 2 && this.string2.length < changedString.length) this.string2 += dash;
      if (notU != 3 && this.string3.length < changedString.length) this.string3 += dash;
      if (notU != 4 && this.string4.length < changedString.length) this.string4 += dash;
      if (notU != 5 && this.string5.length < changedString.length) this.string5 += dash;
      if (notU != 6 && this.string6.length < changedString.length) this.string6 += dash;
    },
    removeChars() {
      for (let i = 1; i <= 6; i++) {
        const part1 = this[`string${i}`].substring(0, this.delFrom - 1);
        const part2 = this[`string${i}`].substring(this.delTo);
        this[`string${i}`] = part1 + part2;
      }
      this.delFrom = '';
      this.delTo = '';
    },
    async getLabels() {
      const res = await axios({
        url: 'http://localhost:3000/labels/' + localStorage.getItem('UserEmail'),
        method: 'GET',
      });

      this.labels = res.data;
    },
    async saveTab() {
      const res = await axios({
        url: 'http://localhost:3000/savetab/' + this.tabId,
        method: 'PATCH',
        'Content-Type': 'application/json',
        data: {
          string1: this.string1 + '—\n',
          string2: this.string2 + '—\n',
          string3: this.string3 + '—\n',
          string4: this.string4 + '—\n',
          string5: this.string5 + '—\n',
          string6: this.string6 + '—\n',
        },
      });
      if (res) {
        this.saveCheck = true;
        setTimeout(() => (this.saveCheck = false), 2000);
      }
    },
    async getTab() {
      const res = await axios({ url: 'http://localhost:3000/tab/' + this.tabId, method: 'GET' });
      console.log(res);
      this.string1 = res.data.data.body.content[1].paragraph.elements[0].textRun.content;
      this.string2 = res.data.data.body.content[2].paragraph.elements[0].textRun.content;
      this.string3 = res.data.data.body.content[3].paragraph.elements[0].textRun.content;
      this.string4 = res.data.data.body.content[4].paragraph.elements[0].textRun.content;
      this.string5 = res.data.data.body.content[5].paragraph.elements[0].textRun.content;
      this.string6 = res.data.data.body.content[6].paragraph.elements[0].textRun.content;
      this.delFrom = this.string1.length;
      this.delTo = this.string1.length;
      this.removeChars();
    },
    async getTabLabels() {
      const res = await axios({
        url: 'http://localhost:3000/labels/' + localStorage.getItem('UserEmail') + '?tab=' + this.tabId,
        method: 'GET',
      });
      this.tabLabels = res.data;
      console.log('###################');

      console.log(this.tabLabels);
    },

    async createTabLabel() {
      const filteredLabels = this.labelSelect.filter((el) => this.tabLabels.filter((ell) => ell.label_id == el).length == 0);
      for (const el of filteredLabels) {
        const res = await axios({
          url: 'http://localhost:3000/tabslabel',
          method: 'POST',
          'Content-Type': 'application/json',
          data: {
            label: el,
            tab: this.tabId,
          },
        });
        console.log(res.data);
      }
      this.getTabLabels();
    },
    async deleteTabLabel() {
      const filteredLabels = this.labelSelect.filter((el) => this.tabLabels.filter((ell) => ell.label_id == el).length == 1);
      console.log(filteredLabels);

      for (const el of filteredLabels) {
        console.log(el);

        const res = await axios({
          url: 'http://localhost:3000/tabslabel',
          method: 'DELETE',
          'Content-Type': 'application/json',
          data: {
            id: el,
            tab: this.tabId,
          },
        });
        console.log(res.data);
      }
      this.getTabLabels();
    },
  },
  created() {
    this.getTab();
    this.getLabels();
    this.getTabLabels();
  },
};
</script>

<style lang="scss" scoped></style>
