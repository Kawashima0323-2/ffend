<template>
      <v-chip-group
      center-active="ture"

      >
    <v-carousel
    hide-delimiters
    height="auto">
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
      >
      <router-link to="/login">
      <v-chip
  close-icon="mdi-delete"
  color="red"
>ログイン</v-chip>
</router-link>

    </v-carousel-item>
    </v-carousel>
</v-chip-group>
  </template>
  <script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
        ],
      }
    },
  }
</script>