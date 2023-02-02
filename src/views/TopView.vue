<template>
  <v-card
  class="mx-auto my-12"
  max-width="374">
      <router-link to="/login">
      <v-chip
  close-icon="mdi-delete"
  color="red"
>ログイン</v-chip>
</router-link>
<router-link to="/newMember">
      <v-chip
  close-icon="mdi-delete"
  color="red"
>新規会員登録</v-chip>
</router-link>
</v-card>
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