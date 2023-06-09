<template>
  <nav>
    <NavSchool class="nav" v-if="status && userType === 'docent'" />
    <NavCompany :v-if="bedrijfId" class="nav" :bedrijf="bedrijfId" v-if="status && userType === 'werknemer'" />
    <NavNotLoggedIn class="nav" v-if="!status"/>
  </nav>
</template>

<script>
// @ is an alias to /src
import NavSchool from '@/components/subComponents/NavSchool.vue'
import NavCompany from '@/components/subComponents/NavCompany.vue'
import NavNotLoggedIn from '@/components/subComponents/NavNotLoggedIn.vue'
import WerknemerDataService from '@/services/WerknemerDataService'

export default {
  created(){
    // console.log(this.status)
    this.getTypeNav()
  },
  components: {
    NavSchool,
    NavCompany,
    NavNotLoggedIn
  },
  props: {
    status: Boolean,
    navSelect: Boolean,
    idUser: Number
  },
  data(){
    return{
      userType: null,
      bedrijfId: null
    }
  },
  methods:{
    getTypeNav(){
      if(this.navSelect){
        this.userType = 'docent'
        // console.log("docent - nav")
      }
      else if(!this.navSelect){
        this.userType = 'werknemer'
        // console.log("werknemer - nav")
        if(this.idUser){
          // console.log("idUser")
          // console.log(this.idUser)
          this.getBedrijfWerknemer()
        }
        else{
          console.log("no idUser")
        }
      }
      else{
        console.log("are you logged  in?")
      }
    },
    getBedrijfWerknemer(){
      WerknemerDataService.get(this.idUser)
                .then(response => {
                    // console.log('Werknemer found')
                    this.bedrijfId = response.data.bedrijfId
                    // console.log(this.bedrijfId)
                })
                .catch(e => {
                    console.log(e);
                });
    }
  },
}
</script>


