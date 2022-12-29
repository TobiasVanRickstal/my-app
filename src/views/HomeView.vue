<template>
  <div class="home">
    <h1>Home</h1>
    <select name="type" id="type" v-model="type">
      <option value="gastles">gastles</option>
      <option value="service">service</option>
    </select>
    <img src="../assets/icons/hover-state.png" alt="" v-show="type == 'gastles'">
  </div>
</template>

<script>
export default({
  setup() {
    
  },
  data(){
    return{
      type: ""
    }
  }
})
</script>
