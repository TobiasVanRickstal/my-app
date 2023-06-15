<template>
    <div class="back-arrow">
        <router-link to="#" @click="goBack"><img src="../assets/icons/previous.png" alt=""></router-link>
    </div>
    <div class="vraag-detail">
        <div class="vraag-titel">
            <h2>{{vraag.naam}}</h2>
        </div>
        <div class="vraag-info">
            <p>{{vraag.informatie}}</p>
        </div>
        <div class="contacten">
            <h4>{{docent}} - {{type}} / {{topic}} / {{vak}}</h4>
        </div>
        <div class="vraag-bottom">
            <div class="specificaties">
                <p>Prijs: € {{vraag.prijs}}</p>
                <p v-if="docentAsUser">Status: {{vraag.status}}</p>
                <p v-if="vraag.views">Views: {{vraag.views}}</p>
                <p v-else>views: 0</p>
                <p>Solicitanten: {{vraag.solicitanten}}</p>
                <p class="periode" v-if="vraag.periodes != ''">{{periode[0]}}: {{periode[1]}} <span v-if="periode.length > 2">tot {{periode[2]}}</span></p>
            </div>
            <div class="soliciteren" v-if="!docentAsUser">
                <button class="button" @click="soliciteren(vraag.id)">soliciteren</button>
            </div>
        </div>
    </div>
</template>

<script>
import DocentDataService from '@/services/DocentDataService';
import VraagDataService from '@/services/VraagDataService';
import {getAuth} from 'firebase/auth';

export default{
    data(){
        return{
            vraag: {},
            adminWatching: false,
            docent: "",
            type: "",
            topic: "",
            vak: "",
            periode: []
        }
    },
    props: {
        docentAsUser: Boolean
    },
    methods:{
        async getCurrentDocent(){
            const auth = getAuth();
            const user = auth.currentUser;
            await DocentDataService.findByEmail(user.email)
                .then(response => {
                    console.log(response.data)
                    if (response.data.admin) {
                        this.adminWatching = true
                    }
                    return true
                })
                .catch(e => {
                    console.log(e);
                    return false
                });
        },
        getVraag(id){
            VraagDataService.get(id)
                .then(response => {
                    this.vraag = response.data;
                    this.docent =  response.data.docent.naam
                    this.type =  response.data.type.naam
                    this.topic =  response.data.topic.naam
                    this.vak =  response.data.vak.naam
                    this.periode = response.data.periodes.split(',')
                    console.log(this.vraag)

                    if(!this.docentAsUser){
                         // Niet doen als een docent  of het school deze  bekijkt ------
                        this.vraag.views +=  1;
                        VraagDataService.update(this.vraag.id, this.vraag)
                            .then(response => {
                            this.data.status = to;
                        })
                        .catch(e => {
                            console.log(e);
                        });
                        // ----------
                    }
                   
                })
                .catch(e => {
                    console.log(e);
                });
        },
        changeStatus(to){
            var updateData = {
                id: this.vraag.id,
                status: to
            };

            VraagDataService.update(this.vraag.id, updateData)
                .then(response => {
                    this.vraag.status = to;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        goBack(){
            history.back()
        }
    },
    mounted(){
        this.getVraag(this.$route.params.id)
        this.getCurrentDocent()
    }
}
</script>
<!-- https://stackoverflow.com/questions/61585411/pass-data-through-router-to-other-component-in-vue -->