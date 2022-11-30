<template>
  <nav>
    <NavSchool class="nav" v-if="status == 'school'"/>
    <NavCompany  class="nav" v-if="status == 'company'"/>
    <NavNotLoggedIn class="nav" v-if="status == 'not-logged-in'"/>
  </nav>
</template>

<script>
// @ is an alias to /src
import NavSchool from '@/components/subComponents/NavSchool.vue'
import NavCompany from '@/components/subComponents/NavCompany.vue'
import NavNotLoggedIn from '@/components/subComponents/NavNotLoggedIn.vue'

export default {
  components: {
    NavSchool,
    NavCompany,
    NavNotLoggedIn
  },
  props: {
    status: String
  }
}
</script>
// scss van alle navigatie balken
<style lang="scss">
  nav{
    margin: 2% auto;
    width: 95%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    a{
      color: red;
      font-size: 150%;
    &:hover{
      color: turquoise;
    }
      img{
        width: 100px;
        height: auto;
      }
    }
  }
</style>

