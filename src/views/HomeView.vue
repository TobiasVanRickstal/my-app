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
      <Vraags />
    </div>
  </div>
  
</template>

<script>
import Vraags from '@/components/Vraags.vue';
import Bedrijven from '@/components/Bedrijven.vue';

export default({
  data(){
    return{
      type: ""
    }
  },
  components: {
    Vraags,
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