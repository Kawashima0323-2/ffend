<template>
  <v-app>
    <v-card width="800px" class="mx-auto mt-5">
      <v-form>
        <v-card-title class="blue--text text-sm-h3"> 駅検索 </v-card-title>
        <v-toolbar dark color="teal">
          <v-toolbar-title>出発</v-toolbar-title>
          <v-autocomplete
            class="text-h6"
            v-model="from"
            :search-input.sync="searchFrom"
            :items="stationListFrom"
            cache-items
            flat
            hide-no-data
            hide-details
            label="駅入力"
            solo-inverted
          ></v-autocomplete>
        </v-toolbar>
        <v-toolbar dark color="teal">
          <v-toolbar-title>到着</v-toolbar-title>
          <v-autocomplete
            class="text-h6"
            v-model="to"
            :items="stationListTo"
            :search-input.sync="searchTo"
            cache-items
            flat
            hide-no-data
            hide-details
            label="駅入力"
            solo-inverted
          ></v-autocomplete>
        </v-toolbar>
        <v-card-actions>
          <v-btn width="100%" class="text-h5 info" v-on:click="searchFare()"
            >検索</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    from: null, //出発駅
    to: null, //到着駅
    stationList: [],
    station: [],
    price: 0,
    value: null,
    searchFrom: null,
    searchTo: null,
  }),
  computed: {
    stationListFrom() {
      return this.$store.state.st.stationListFrom;
    },
    stationListTo() {
      return this.$store.state.st.stationListTo;
    },
    stationListParam() {
      return this.$store.state.st.stationListParam;
    },
  },
  watch: {
    searchFrom(val) {
      this.$store.dispatch("searchFrom", {
        from: val,
      });
    },
    searchTo(val) {
      this.$store.dispatch("searchTo", {
        to: val,
      });
    },
  },
  methods: {
    async searchFare() {
      await this.$store.dispatch("searchFare", {
        from: this.from,
        to: this.to,
      });
      await this.$store.dispatch("stationEreaSearchShop", {
        toStation: this.to,
      });
      this.$router.push("/TransferList");
    },
  },
};
</script>
