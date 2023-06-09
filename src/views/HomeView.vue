<template>
  <div class="home">
    <h1>Home</h1>
  </div>
  <div class="body">
    <div class="left-side">
      <div class="blok">
        <Aanbods/>
      </div>
    </div>
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
})
</script>
<style>
.body{
  width: fit-content;
  display: flex;
  justify-content: space-evenly;
}
</style>