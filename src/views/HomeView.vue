<template>
  <div class="home">
    <h1>Home</h1>
  </div>
  <div class="body">
    <div class="form">
      <Form />
    </div>
  </div>
  
</template>

<script>
import Form from '@/components/Form.vue';

export default({
  setup() {
    
  },
  components: {
    Form
  },
  data(){
    return{
      type: ""
    }
  }
})
</script>