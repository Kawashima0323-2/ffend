<template>
  <v-app>
    <v-container>
      <v-row justify="space-around">
        <v-card width="400">
      <div
v-for="line in  lineList"
                :key="line.cnt">
          <strong
          @click="click"
          >
            <div class="font-weight-bold ml-8 mb-0 pa-0">
              {{line.from}}<br/>
              {{line.departureTime }}発
             
            </div>
          </strong>
          <v-divider></v-divider>
            <v-timeline
              dense

            >
              <v-timeline-item
                small
                :icon="mdi-star"
              >
              <v-container>
                <v-row>
                  <v-col cols="1"></v-col>
                  <v-col cols="11"><strong>{{ line.lineName }}</strong></v-col>
                </v-row>
                <v-row>
                  <v-col  cols="2">▲<br/>{{ line.numberOfStops }}<br/>▼</v-col>
                  <v-col cols="10"><p class="mb-0 pa-0">[発]{{ line.departureTrack }}</p>
                    <p class=" pa-0">[着]{{ line.arrivalTrack }}</p></v-col>
                </v-row>
                <v-row>
                  <v-col  cols="1"></v-col>
                  <v-col cols="11"><p class="mb-0 pa-0"></p>
                    <p class="text-right pa-0">{{line.totalPrice}}{{line.lineDistance }} {{ line.rideTime }}</p></v-col>
                </v-row>
              </v-container>
              </v-timeline-item>
            </v-timeline>
            <v-divider></v-divider>
          <strong
          >
            <div class="font-weight-bold ml-8  mb-0 pa-0" >
              {{ line.arrivalTime }}着<br/>
            </div>
          </strong>
        
        </div>
        <strong
          >
            <div class="font-weight-bold ml-8  mb-0 pa-0" >
              {{ stationParam.to }}<br/>
            </div>
          </strong>
        </v-card>
      </v-row>
    </v-container>
  </v-app>
</template>

  <script>
  export default {
    data: () => ({

    }),
    computed:{
    stationParam(){
      return this.$store.state.st.station
    },
    lineList(){
  return this.$store.state.st.lineList
    },
    },
    methods:{
      click(){
        console.log(this.no+"s")
      }
    }
   
  }
</script>