<template>
  <v-card>
    <v-toolbar color="cyan" dark flat>
      <v-toolbar-title  class="text-h4" >
        お出かけサイト 
        <div v-if="isLogin"  class="text-h5">
        ようこそ{{ userName }}さん
      </div>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon v-if="isLogin" @click="logout()"  >
        <v-icon>mdi-export</v-icon>
      </v-btn>

      <template v-slot:extension v-if="isLogin">
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab v-for="item in items" :key="item">
            <div @click="click(item)">
              <v-icon>{{ item.icon }}</v-icon>
              {{ item.title }}
            </div>
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item"> </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    items: [
      { title: "ホーム", icon: "mdi-home", router: "/calendar" },
      { title: "カレンダー", icon: "mdi-calendar", router: "/calendar" },
      { title: "乗車検索", icon: "mdi-train", router: "/station" },
      { title: "店検索", icon: "mdi-store", router: "/ShopSearch" },
      {
        title: "天気予報",
        icon: "mdi-weather-partly-cloudy",
        router: "/calendar",
      },
    ],
    right: null,
  }),
  computed: {
    userName() {
      return this.$store.state.userName;
    },
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {
    click(item) {
      alert(item.router);
      alert("aaa");
      this.$router.push(item.router);
    },
    userNameTrue(){
  var flg=""
  if(this.userName !==""){
            console.log("true")
            console.log(this.userNmae)
          flg= Boolean("true")
          }else{
            console.log("false")
            flg= Boolean("")
          }
          console.log(flg+"flg")
          return flg
},
async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/");
    },
  },
};
</script>
