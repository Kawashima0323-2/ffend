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
    <v-subheader>{{ stationListFrom }}aaaa</v-subheader>
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
import axios from "axios"
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
      onchangeFrom(val) {
        axios.get("https://api.ekispert.jp/v1/json/station/light?key=test_LJYtHBhahBd&type=train&nameMatchType=partial&name=" + val)
            .then(function(response) {
                //通信に成功した時の処理
                //responseの中に返ってきたオブジェクトが入ってる
                var cnt = 0;
                var sstationListFrom=[];
                this.stationListFrom="bbbb";
                response.data.ResultSet.Point.forEach(element => {
                    if (element.Station.Type == "train") {
                        sstationListFrom[cnt++] = element.Station.Name;
                       
                    }
                }); console.log( this.stationListFrom);
                this.stationListFrom= sstationListFrom;
               
            }.bind(this))
            .catch(function(error) {
                //エラーをキャッチした時。
                console.log(error);
            })
            .finally(function() {
                //ファイナリーです。
            });
      console.log(val+"val");
      console.log(this.stationListFrom+"slf")
      },
      onchangeTo() {
         
      },
      searchFare() {
         
      }
  }
  }
</script>