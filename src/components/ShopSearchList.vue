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
  max-width="374"
  v-for="shop in displayLists" :key="shop.cnt"
  v-on:click="click(shop)"
  >

    <template>
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
        contain = true
      ></v-progress-linear>
    </template>
  
    <v-img
    max-width ="100%"
      height=auto
      v-bind:src="image_src(shop)"
    ></v-img>
  
    <v-card-title>{{shop.name}}</v-card-title>

    <v-card-text  >
      <div class="my-4 text-subtitle-1">
        {{shop.ganre}}
      </div>

      <div>{{shop.address}}</div>
      <div>{{shop.open}}</div>
      <div>{{shop.close}}</div>
      <div>050-5816-4600</div>
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
      <v-btn
        color="deep-purple lighten-2"
        link nuxt href="https://www.google.com/maps/place/%E3%80%92263-0043+%E5%8D%83%E8%91%89%E7%9C%8C%E5%8D%83%E8%91%89%E5%B8%82%E7%A8%B2%E6%AF%9B%E5%8C%BA%E5%B0%8F%E4%BB%B2%E5%8F%B0%EF%BC%92%E4%B8%81%E7%9B%AE%EF%BC%96%E2%88%92%EF%BC%98+%E3%82%B6%E3%83%AC%E3%82%B8%E3%83%87%E3%83%B3%E3%82%B9%E9%98%BF%E9%83%A8/@35.6382383,140.0852509,15z/data=!3m1!4b1!4m5!3m4!1s0x6022838468dd7cab:0xd4f550249033ff70!8m2!3d35.6382386!4d140.0940057"
      >
        <v-chip>地図で開く</v-chip>
      </v-btn>
      <v-btn color="deep-purple lighten-2" ><v-chip>aaa</v-chip></v-btn>
    </v-card-actions>
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
          loading: false,
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
        }
      },
    
  }
  </script>