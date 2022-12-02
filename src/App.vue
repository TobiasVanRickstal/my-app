<template>
  <nav>
    <NavView :status='status.nav'/>
  </nav>
  <router-view/>
</template>

<script>
// @ is an alias to /src
import NavView from '@/components/NavView.vue'

export default {
  components: {
    NavView,
  },
  data() {
   return {
     status: {
       nav: 'company'
     }
   }
 }
}
</script>

<style>
  @font-face {
    font-family: "Blaak-bold";
    src: local("Blaak-bold"),
    url(../src/fonts/BlaakBold_PERSONAL.ttf) format("truetype");
  }
  *{
    margin: 0;
    padding: 0;
  }
  body{
    max-width: 80%;
    margin: auto;
    background: rgba(137, 142, 30, 0.5);
    font-family: museo-sans,sans-serif;
    font-weight: 500;
    font-style: normal;
  }
  nav{
    font-family: "Blaak-bold";
  }
</style>