<template>
    <div>
        <router-link to="/aanbod">Terug naar overzicht</router-link>
    </div>
    <div class="aanbods">
        <div class="aanbod">
            <h1>{{aanbod.naam}}</h1>
        </div>
    </div>
</template>
<script>
import AanbodsDataService from '@/services/AanbodsDataService';

export default{
    data(){
        return{
            aanbod: {},
            bedrijf: "",
            docent: "",
            werknemer: "",
        }
    },
    props: {
        docentAsUser: Boolean
    },
    methods:{
        getAanbod(id){
            AanbodsDataService.get(id)
            .then(response => {
                this.aanbod = response.data;
                this.docent =  response.data.docent.naam
                this.bedrijf =  response.data.bedrijf.naam
                this.werknemer =  response.data.werknemer.naam
                console.log(this.currentVraag)
            })
            .catch(e => {
                console.log(e)
            })
        }
    },
    mounted(){
        this.getAanbod(this.$route.params.id)
    }
}
</script>