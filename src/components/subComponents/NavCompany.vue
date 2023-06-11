<template>
  <div class="logged-in-nav">
    <div class="nav-logo">
      <router-link to="/" class="home no-active"><img src="../../assets/icons/home.png" alt="mainLogo"></router-link>
    </div>
    <div class="nav-options">
      <router-link to="/aanbod" class="button">Aanbod</router-link>
      <router-link to="/vragen" class="button">Vraag</router-link>
    </div>
    <div class="nav-options-right">
      <router-link :to="`/ons-bedrijf/${bedrijf}`">Ons bedrijf</router-link>
      <router-link to="/historiek">Historiek</router-link>
    </div>
    <div class="nav-options-user">
      <router-link :to="`/profile/${user}`" class="no-active"><img src="@/assets/icons/user.png" alt="mainLogo"></router-link>
      <!-- <a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Freepik - Flaticon</a> -->
    </div>
  </div>
</template>
<script>
import WerknemerDataService from '@/services/WerknemerDataService';

export default {
  props:{
    bedrijf: Number,
    user: Number
  },
  created(){
    console.log('COMPANY NAV')
  }
}
</script>