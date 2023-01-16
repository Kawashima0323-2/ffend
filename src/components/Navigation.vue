<template>
    <v-bottom-navigation v-model="value">
      <v-btn value="recent">
        <span>ホーム</span>
  
        <v-icon>mdi-home</v-icon>
      </v-btn>
  
      <v-btn value="favorites">
        <span>カレンダー</span>
  
        <v-icon>mdi-home</v-icon>
      </v-btn>
  
      <v-btn value="nearby">
        <span>乗車検索</span>
  
        <v-icon>mdi-train</v-icon>
      </v-btn>

      <v-btn value="nearby">
        <span>店検索</span>
  
        <v-icon>mdi-store</v-icon>
      </v-btn>

      <v-btn value="nearby">
        <span>天気予報</span>
  
        <v-icon>mdi-weather-partly-cloudy</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </template>
  <script>
  export default {
    data: () => ({ value: 'recent' }),
  }
</script>