<template>
  <v-container>
    <v-container class="d-flex flex-row flex-nowrap">
      <input type="text" v-model="delFrom" class="orange lighten-3 ma-2 elevation-2" placeholder="From" />
      <input type="text" v-model="delTo" class="orange lighten-3 ma-2 elevation-2" placeholder="To" />
      <v-btn class="orange white--text" @click="removeChars">DEL</v-btn>
      <v-spacer></v-spacer>
      <v-btn class="green white--text" @click="saveTab"
        ><span :hidden="saveCheck">Save</span>
        <span :hidden="!saveCheck"><v-icon>mdi-check-bold</v-icon></span>
      </v-btn>
    </v-container>
    <input
      v-model="string1"
      @input="addDashToAll(1)"
      style="width: 100%"
      class="text-h3 elevation-3"
      type="text"
    />
    <p>{{ string1.length }}</p>
    <input
      v-model="string2"
      @input="addDashToAll(2)"
      style="width: 100%"
      class="text-h3 elevation-3"
      type="text"
    />
    <p>{{ string2.length }}</p>

    <input
      v-model="string3"
      @input="addDashToAll(3)"
      style="width: 100%"
      class="text-h3 elevation-3"
      type="text"
    />
    <p>{{ string3.length }}</p>

    <input
      v-model="string4"
      @input="addDashToAll(4)"
      style="width: 100%"
      class="text-h3 elevation-3"
      type="text"
    />
    <p>{{ string4.length }}</p>

    <input
      v-model="string5"
      @input="addDashToAll(5)"
      style="width: 100%"
      class="text-h3 elevation-3"
      type="text"
    />
    <p>{{ string5.length }}</p>

    <input
      v-model="string6"
      @input="addDashToAll(6)"
      style="width: 100%"
      class="text-h3 elevation-3"
      type="text"
    />
    <p>{{ string6.length }}</p>

    <div style="width: 100%" class="elevation-4 grey lighten-2">
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
    async saveTab() {
      const res = await axios({
        url: 'http://localhost:3000/savetab/' + this.tabId,
        method: 'PATCH',
        'Content-Type': 'application/json',
        data: {
          string1: this.string1,
          string2: this.string2,
          string3: this.string3,
          string4: this.string4,
          string5: this.string5,
          string6: this.string6,
        },
      });
      if (res) {
        this.saveCheck = true;
        setTimeout(() => (this.saveCheck = false), 2000);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
