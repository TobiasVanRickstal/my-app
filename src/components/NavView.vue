<template>
  <nav>
    <NavSchool class="nav" v-if="status && school"/>
    <NavCompany  class="nav" v-if="status && company"/>
    <NavNotLoggedIn class="nav" v-if="!status"/>
  </nav>
</template>

<script>
// @ is an alias to /src
import NavSchool from '@/components/subComponents/NavSchool.vue'
import NavCompany from '@/components/subComponents/NavCompany.vue'
import NavNotLoggedIn from '@/components/subComponents/NavNotLoggedIn.vue'

export default {
  created(){
    console.log(this.status)
  },
  components: {
    NavSchool,
    NavCompany,
    NavNotLoggedIn
  },
  props: {
    status: Boolean
  },
  data(){
    return{
      school: false,
      company: true
    }
  }
}
</script>


