<template>
    <div class="back-arrow">
        <router-link to="#" @click="goBack"><img src="../assets/icons/previous.png" alt=""></router-link>
    </div>
    <div class="aanbod-detail">
        <div class="aanbod-titel">
            <h2>{{aanbod.naam}}</h2>
        </div>
        <div class="aanbod-info">
            <p>{{aanbod.informatie}}</p>
        </div>
        <div class="contacten">
            <h4>{{bedrijf}} - {{werknemer}}</h4>
        </div>
        <div class="aanbod-bottom">
            <div class="specificaties">
                <p v-if="aanbod.views">Views: {{aanbod.views}}</p>
                <p v-else>views: 0</p>
                <p v-show="aanbod.status">Status: {{aanbod.status}}</p>
                <p v-if="docent">Docent: {{docent}}</p>
                <p>Prijs: € {{aanbod.prijs}}</p>
                <p v-if="aanbod.datum">Datum: {{aanbod.datum}}</p>
            </div>
            <div class="soliciteren" v-if="docentAsUser">
                <router-link class="button" :to="`/soliciteren/${aanbod.id}`" :props="{aanbod : aanbod.id}">soliciteren</router-link>
            </div>
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
        docentAsUser: Boolean,
        userId: {
            type: String, // Specify the prop type
            required: true // Set it as required if necessary
        },
    },
    methods:{
        getAanbod(id){
            AanbodsDataService.get(id)
            .then(response => {
                this.aanbod = response.data;
                if(response.data.docent){
                    this.docent =  response.data.docent.naam
                }
                this.bedrijf =  response.data.bedrijf.naam
                this.werknemer =  response.data.werknemer.naam
                console.log(this.bedrijf)
                if(this.docentAsUser){
                        // Niet doen als een docent  of het school deze  bekijkt ------
                    this.aanbod.views +=  1;
                    AanbodsDataService.update(this.aanbod.id, this.aanbod)
                        .then(response => {
                        console.log("updated")
                    })
                    .catch(e => {
                        console.log(e);
                    });
                    // ----------
                }
            })
            .catch(e => {
                console.log(e)
            })
        },
        soliciteren(id){
            if(confirm("Akkoord met soliciteren?")){
                console.log(this.userId)
                // TODO ROUTER LINK TO SOLICITEREN FORMULIER
            }
        },
        goBack(){
            history.back()
        }
    },
    mounted(){
        this.getAanbod(this.$route.params.id)
    },
    created(){
        console.log(this.userId)
    }
}
</script>