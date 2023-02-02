<template>
  <div>
    <v-toolbar
      dark
      prominent
    >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer
    v-model="drawer"
      absolute
      bottom
      temporary
      height="400"
    width="256"

    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            お出かけ支援サイト
          </v-list-item-title>
          <v-list-item-subtitle>
            メニュー
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          @click="click(item.router)"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

  </div>
</template>


<script>
  export default {
    data: () => ({
      drawer: false,
      group: null,
      items: [
          { title: 'ホーム', icon: 'mdi-home',router:"/calendar"},
          { title: 'カレンダー', icon: 'mdi-calendar' },
          { title: '乗車検索', icon: 'mdi-train' },
          { title: '店検索', icon: 'mdi-store' ,router:"/ShopSearch"},
          { title: '天気予報', icon: 'mdi-weather-partly-cloudy' }
        ],
        right: null,
    }),

    watch: {
      group () {
        this.drawer = false
      },
    },
    methods:{
      click(val){
        alert(val)
        this.$router.push(val);
      }
    }
  }
</script>