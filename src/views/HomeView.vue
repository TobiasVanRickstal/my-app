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
      <Vragen />
    </div>
  </div>
</template>

<script>
import Vragen from '@/components/Vragen.vue';
import Bedrijven from '@/components/Bedrijven.vue';

export default({
  data(){
    return{
      type: ""
    }
  },
  components: {
    Vragen,
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