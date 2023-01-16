<template>
  <div>
  <Header />
  <Calendar />
  <Footer />
  </div>
</template>
<script>
import Calendar from '../components/Calendar.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
//import Navigation from '../components/Navigation.vue'
export default {
   
      components: {
        Calendar,
        Header,
        Footer,
       
        //Navigation
  }
}
</script>