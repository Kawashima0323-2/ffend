<template>
  <v-app>
    <Header />
    <router-link to="/"></router-link>
    <router-view/>
    <Footer />
  </v-app>
</template>
  
<script>
  // @ is an alias to /src
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
  export default {
    name: 'HomeView',
    components: {
      Header,
      Footer,
      
    }
  }
</script>
  
  