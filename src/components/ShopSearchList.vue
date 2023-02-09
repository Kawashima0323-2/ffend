<template>
  <div>
    <v-content>
      <div class="text-center">
        <v-pagination
        v-model="page"
          :length="length"
          @input = "pageChange"
        ></v-pagination>
      </div>     
    </v-content>
  <v-card 
  :loading="loading" 
  class="mx-auto my-12" 

  max-width="1200"
  v-for="shop in displayLists" :key="shop.cnt"
  v-on:click="click(shop)"
  >
  <v-row>
  <v-col cols="4">
    <v-img
    max-width ="304"
      height="358"
      v-bind:src="image_src(shop)"
    ></v-img>
  </v-col>
  <v-col cols="8">
    <v-card-subtitle class="mb-0 pb-0 text-h5">{{ shop.genreName }}|{{ shop.stationName }}</v-card-subtitle>
    <v-card-title class="blue--text text-sm-h3">{{shop.name}}</v-card-title>
    <v-card-subtitle class="text-h5">{{ shop.genreCatch }}</v-card-subtitle>
   
    <v-card-text  >
      <div class="text-h5">   
    <v-icon color="red darken-2">mdi-star</v-icon>
    {{shop.catch}}
      </div>
      <div class="text-h5">   
    <v-icon color="red darken-2">mdi-train</v-icon>
    {{shop.access}}
  </div>
        <div class="text-h5">
     <v-icon color="blue darken-2">mdi-weather-night</v-icon>
     {{shop.budgetAverage}}
  </div>
  <div>
    <v-chip 
    class="text-h5"
    v-if="card(shop.card)"
    color="red"
    text-color="white">
    カード可
    </v-chip>
    <v-chip
    class="text-h5"
    v-if="card(shop.card)"
    color="red"
    text-color="white">
    全席喫煙
    </v-chip>
    <v-chip
    class="text-h5"
    v-if="nonSmoking(shop.nonSmoking)"
    color="red"
    text-color="white">
    個室あり
    </v-chip>
    <v-chip
    class="text-h5"
    v-if="free(shop.freeDrink)"
    color="red"
    text-color="white">
    飲み放題
    </v-chip>
    <v-chip
    class="text-h5"
    v-if="free(shop.freeFood)"
    color="red"
    text-color="white">
    食べ放題
    </v-chip>
  </div>
</v-card-text>
<v-divider class="mx-4"></v-divider>

<v-card-actions>
  <v-btn
 
    color="deep-purple lighten-2"
    v-bind:href="hrefUrl(shop)"
  >
    <v-chip>店舗URL</v-chip>
  </v-btn
  >
</v-card-actions>
  </v-col>
  </v-row>
  </v-card>
  <v-content>
      <div class="text-center">
        <v-pagination
        v-model="page"
          :length="length"
          @input = "pageChange"
        ></v-pagination>
      </div>     
    </v-content>
</div>
</template>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script>
    export default {
      data() {
        return {
          page: 1,
          lists: [],
          pageSize: 2,
          shop:[],
          selection: 1,
          keyword:'',
          shopName:'',
          selected: ['Trevor Handsen'],
          items: ['Trevor Handsen', 'Alex Nelson'],
          title: 'Hi,\nI just wanted to check in and see if you had any plans the upcoming weekend. We are thinking of heading up to Napa',
        };
      },
      computed: {
        shopsList(){
          return this.$store.state.hot.shopsList
        },
        length(){
          return   Math.ceil(this.$store.state.hot.length/this.pageSize)
        },
        displayLists(){
         return  this.shopsList.slice(this.pageSize*(this.page -1), this.pageSize*(this.page));
        }
    },
    methods: {
      pageChange:function(pageNumber){
      this.displayLists = this.shopsList.slice(this.pageSize*(pageNumber -1), this.pageSize*(pageNumber));
    },
       image_src(shop){
          return shop.logo
        },
        hrefUrl(shop){
          return shop.url
        },
        card(card){
          console.log(card)
          var flg=""
          if(card =="利用可"){
            console.log("true")
          flg= Boolean("true")
          }else{
            console.log("false")
            flg= Boolean("")
          }
          console.log(flg+"flg")
          return flg
        },
        nonSmoking(nonSmoking){
          console.log(nonSmoking)
          var flg=""
          if(nonSmoking =="前面喫煙"){
            console.log("true")
          flg= Boolean("true")
          }else{
            console.log("false")
            flg= Boolean("")
          }
          console.log(flg+"flg")
          return flg
        },
        free(free){
          console.log(free)
          var flg=""
          const result = free.indexOf('あり');
          console.log(result)
          if(result !== -1){
            console.log("true")
          flg= Boolean("true")
          }else{
            console.log("false")
            flg= Boolean("")
          }
          console.log(flg+"flg")
          return flg
        },
      },
     
    
  }
  </script>