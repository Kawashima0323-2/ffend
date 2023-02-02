<template>
  
    <v-app>
  
      <v-card width="400px" class="mx-auto mt-5">
        <v-form>
        <v-card-title class="display-1"> 店検索 </v-card-title>
             <v-select
             v-model="prefecture"
          :items="prefectures"
          label="大エリア"
          dense
        ></v-select>
        <v-select
          v-model="middleAreaCode"
          :items="middleArea"
          item-text="middleAreaName"
          item-value="middleAreaCode"
          label="中エリア"
          dense
        ></v-select>
        <v-select
          v-model="genreCode"
          :items="genres"
          item-text="genreName"
          item-value="genreCode"
          label="ジャンル"
          dense
        ></v-select>
            <v-card-actions>
              <v-btn class="info" v-on:click="searchShop()">検索</v-btn>
            </v-card-actions>
          </v-form>
    </v-card>
  
  
  
    </v-app>
</template>
  
<script>
  export default {
    name: "App",
    data: () => ({
      prefecture:"",
    prefectures:['東京','神奈川','埼玉','千葉','茨城','栃木','群馬','滋賀'
    ,'京都','大阪','兵庫','奈良','和歌山','岐阜','静岡','愛知','三重'
    ,'北海道','青森','岩手','宮城','秋田','山形','福島','新潟','富山'
    , '石川','福井','山梨','長野','鳥取','島根','岡山','広島','山口'
    ,'徳島','香川','愛媛','高知','福岡','佐賀','長崎','熊本','大分','宮城','鹿児島','沖縄'],
    genres:[
      {genreCode:"G001",genreName:"居酒屋"}, {genreCode:"G002",genreName:"ダイニングバー・バル"},
      {genreCode:"G003",genreName:"創作料理"}, {genreCode:"G004",genreName:"和食"},
      {genreCode:"G005",genreName:"洋食"}, {genreCode:"G006",genreName:"イタリアン・フレンチ"},
      {genreCode:"G007",genreName:"中華"}, {genreCode:"G008",genreName:"焼肉・ホルモン"},
      {genreCode:"G017",genreName:"韓国料理"}, {genreCode:"G009",genreName:"アジア・エスニック料理"},
      {genreCode:"G010",genreName:"各国料理"}, {genreCode:"G011",genreName:"カラオケ・パーティ"},
      {genreCode:"G012",genreName:"バー・カクテル"}, {genreCode:"G013",genreName:"ラーメン"},
      {genreCode:"G016",genreName:"お好み焼き・もんじゃ"}, {genreCode:"G014",genreName:"カフェ・スイーツ"},
      {genreCode:"G015",genreName:"その他グルメ"}
    ],
    middleAreaCode:"",
    genreCode:"",
    }),
  
    computed: {
      middleArea(){
        return this.$store.state.hot.middleArea
      },
   
    },
    watch: {
    prefecture() {
      console.log(this.genreCode)
      this.$store.dispatch("middleArea", {
        prefecture: this.prefecture,})
        },
    searchTo(val) {
      this.$store.dispatch("searchTo", {
             to: val,})
        },
      },
    methods: {
      
      searchShop() {
      this.$store.dispatch("searchShop", {
        middleAreaCode: this.middleAreaCode,
        genreCode: this.genreCode})
        this.$router.push("/ShopSearchList");
        },
      
      },
    }
    
</script>
  