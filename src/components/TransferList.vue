<template>
   <v-app>
    <v-card 
    width="400px"
    class="mx-auto mt-5"
    v-for="sl in stationListParam" :key="sl.cnt"
    v-on:click="click(sl.cnt)">
        <v-card-title>
          {{sl.departureTime}}⇒{{ sl.arrivalTime}}
        </v-card-title>
        <v-card-text>
              <div class="font-weight-bold ml-8 mb-2">
               {{sl.totalRideTime}}分{{ sl.fare }}円乗換{{ sl.transferCount }}回
              </div>
            </v-card-text>
    </v-card>
  </v-app>
</template>
<script>
export default {
  name: "App",

  computed: {
    stationListParam(){
      return this.$store.state.st.stationListParam
    },

  },
  methods:{
    click(cnt){
      this.$store.dispatch("cnt", {
      cnt: cnt})
      this.$store.dispatch("searchShop")
      this.$router.push("/TransferDetail");
    }
  }
}
</script>
