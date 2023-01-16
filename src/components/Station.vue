<template>
    <v-app>
      <v-card width="400px" class="mx-auto mt-5">
        <v-card-title class="display-1"> 駅検索 </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              width="40px"
              prepend-icon="mdi-account-circle"
              label="出発駅"
              v-model="from"
              v-on:change="onchangeFrom"
            />
            <v-list disabled>
      <v-subheader>REPORTS</v-subheader>
      <v-list-item-group
        color="primary"
      >
        <v-list-item
          v-for="(stationFrom, i) in stationListFrom"
          :key="i"
        >
          <v-list-item-content>
            <v-list-item-title >{{stationFrom}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
            <v-text-field
              prepend-icon="mdi-lock"
              label="到着駅"
              v-model="to"
              v-on:change="onchangeTo"
            />
            <v-card-actions>
              <v-btn class="info" v-on:click="searchFare()">検索</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-app>
  </template>

  <script>
  export default {
    name: "App",
    data: () => ({
      from: "", //出発駅
      to: "", //到着駅
      stationListFrom: [],
      stationListTo: [],
      station: [],
      price: 0,
    }),
    methods: {
        //検索してものをクリックしたら反映される
        onclickFrom(stationFrom) {
            this.from = stationFrom;
        },
        onclickTo(stationTo) {
            console.log("クリックされました。");
            this.to = stationTo;
        },
        onchangeFrom() {
          console.log(this.from);
          this.$store.dispatch("onchangeFrom", {
           from: this.from,
      });
      //console.log(this.stationListFrom[0])
        },
        onchangeTo() {
           
        },
        searchFare() {
           
        }
    }
    }
</script>