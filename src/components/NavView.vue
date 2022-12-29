<template>
  <nav>
    <NavSchool class="nav" v-if="status"/>
    <NavCompany  class="nav" v-if="status"/>
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
  }
}
</script>
// scss van alle navigatie balken
<style lang="scss">
  nav{
    margin: 2% auto;
    width: 95%;
    display: flex;
    align-items: flex-end;
    justify-content: space-evenly;

    a{
      color: #171717;
      font-size: 16px;
      text-decoration: none;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .hover-state{
        display: none;
      }
    &:hover .hover-state{
      display: block;
      width: 25px;
      height: auto;
      margin:-10px auto 5px;
    }
    &:active{
      color: #0600FF;
    }
      img{
        width: 50px;
        height: auto;
      }
    }
  }
</style>

