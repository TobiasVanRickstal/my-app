<template>
  <div class="home" :class="{ reverse : companiesView}">
    <div class="left-side">
      <div class="blok">
        <Aanbods/>
      </div>
    </div>
    <div class="line"></div>
    <div class="right-side">
      <Vragen />
    </div>
  </div>
</template>

<script>
import Vragen from '@/components/Vragen.vue';
import Aanbods from '@/components/Aanbods.vue';

export default({
  data(){
    return{
      type: ""
    }
  },
  components: {
    Vragen,
    Aanbods
  },
  props:{
    companiesView: Boolean
  },
  mounted(){
    if(this.companiesView){
      console.log("DOCENT")
    }else{
      console.log("WERKNEMER")
    }
  }
})
</script>