<template>
  <div class="home">
    <h1>Home</h1>
  </div>
  <div class="body">
    <div class="left-side">
      <div class="blok">
        <Bedrijven/>
      </div>
    </div>
    <div class="right-side">
      <Aanbods />
    </div>
  </div>
  
</template>

<script>
import Aanbods from '@/components/Aanbods.vue';
import Bedrijven from '@/components/Bedrijven.vue';

export default({
  data(){
    return{
      type: ""
    }
  },
  components: {
    Aanbods,
    Bedrijven
  },
})
</script>
<style>
.body{
  width: fit-content;
  display: flex;
  justify-content: space-evenly;
}
</style>