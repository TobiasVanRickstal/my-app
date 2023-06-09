<template>
    <router-link to="/" class="home"><img src="../../assets/icons/home.png" alt="mainLogo"></router-link>
    <router-link to="/aanbod"><img src="../../assets/icons/hover-state.png" alt="hover-icon" class="hover-state">Aanbod</router-link>
    <router-link to="/vragen"><img src="../../assets/icons/hover-state.png" alt="hover-icon" class="hover-state">Vraag</router-link>
    <router-link :to="`/ons-bedrijf/${bedrijf}`"><img src="../../assets/icons/hover-state.png" alt="hover-icon" class="hover-state">Ons bedrijf</router-link>
    <router-link to="/historiek"><img src="../../assets/icons/hover-state.png" alt="hover-icon" class="hover-state">Historiek</router-link>
</template>
<script>
import WerknemerDataService from '@/services/WerknemerDataService';

export default {
  props:{
    bedrijf: Number
  },
  created(){
    console.log('COMPANY NAV')
  }
}
</script>