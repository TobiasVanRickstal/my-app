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
  *{
    margin: 0;
    padding: 0;
  }
  body{
    max-width: 80%;
    margin: auto;
    background: rgba(137, 142, 30, 0.5);
  }
</style>