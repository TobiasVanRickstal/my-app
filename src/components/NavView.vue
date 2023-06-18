<template>
  <nav>
    <NavSchool :user="idUser" v-if="status && userType === 'docent'" />
    <NavCompany :v-if="bedrijfId && idUser" :user="idUser" :bedrijf="bedrijfId" v-if="status && userType === 'werknemer'" />
    <NavNotLoggedIn v-if="!status"/>
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
    console.log(this.status)
    console.log(this.bedrijfId)
    this.getTypeNav()
  },
  components: {
    NavSchool,
    NavCompany,
    NavNotLoggedIn
  },
  props: {
    status: Boolean,
    docentAsUser: Boolean,
    idUser: Number,
    bedrijfId: Number
  },
  data(){
    return{
      userType: null,
      // bedrijfId: null
    }
  },
  methods:{
    getTypeNav(){
      console.log(this.docentAsUser)
      if(this.docentAsUser){
        this.userType = 'docent'
        // console.log("docent - nav")
      }
      else if(!this.docentAsUser){
        this.userType = 'werknemer'
        // console.log("werknemer - nav")
          // await this.getBedrijfWerknemer()
          console.log("no idUser")
      }
      else{
        console.log("are you logged  in?")
      }
    },
    // async getBedrijfWerknemer(){
    //   await WerknemerDataService.get(this.idUser)
    //             .then(response => {
    //                 console.log('Werknemer found')
    //                 this.bedrijfId = response.data.bedrijfId
    //                 console.log(this.bedrijfId)
    //             })
    //             .catch(e => {
    //                 console.log(e);
    //             });
    // }
  },
}
</script>


