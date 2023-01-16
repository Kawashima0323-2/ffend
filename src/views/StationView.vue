<template>
    <div>
    <Header />
    <Station />
    <Footer />
    </div>
  </template>
  <script>
  import Station from '../components/Station.vue'
  import Header from '../components/Header.vue'
  import Footer from '../components/Footer.vue'
  //import Navigation from '../components/Navigation.vue'
  export default {
     
        components: {
          Station,
          Header,
          Footer,
         
          //Navigation
    }
  }
  </script>