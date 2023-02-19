<template>
  <div class="home">
    <h1>Home</h1>
  </div>
  <div class="body">
    <div class="left-side">
      <div class="blok">
        Aanbod dat je te zien krijgt
      </div>
    </div>
    <div class="right-side">
      <div class="blok">
        Bedrijven dat je te zien krijgt
      </div>
    </div>
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
<style>
.body{  
  display: flex;
}
.blok{
  background-color: beige;
  margin: 10px;
}
</style>