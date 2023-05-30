<template>
    <div>
        <router-link to="/ons-vraag">Terug naar overzicht</router-link>
    </div>
    <div class="vraag-preview">

        <!-- Goedkeuring -->
        <!-- <div>
            <label for="abonnement">abonnement</label>
            <select name="abonnement" id="abonnement" v-model="abonnement">
                <option value="Silver">Silver</option>
                <option value="Gold">Gold</option>
                <option value="Platinum">Platinum</option>
            </select>
        </div> -->
        
        
        <!-- search bar - docenten database -->
        <div class="docent">
            <p>Docent:</p>
            <p>{{docent}}</p>
        </div>

        <div class="naam">
            <p>Naam:</p>
            <p>{{currentVraag.naam}}</p>
        </div>

        <div class="beschrijving">
            <p>Beschrijving:</p>
            <p>{{currentVraag.informatie}}</p>
        </div>

        <div class="typeData">
            <p>Type:</p>
            <p>{{type}}</p>
        </div>
        
        <div class="topic">
            <p>Topic:</p>
            <p>{{topic}}</p>
        </div>

        <div class="vak">
            <p>Vak:</p>
            <p>{{vak}}</p>
        </div>
        
        <div class="fase">
            <p>Fase:</p>
            <p>{{currentVraag.fase}}</p>
        </div>

        <div class="periode">
            <p>Periodes:</p>
            <p>{{currentVraag.periodes}}</p>
        </div>
        
        <div class="views">
            <p>Solicitanten /  views:</p>
            <p>{{currentVraag.solicitanten}} / {{currentVraag.views}}</p>
        </div>

        <div class="status" v-show="adminWatching">
            <p>Admin prrivillege:</p>
            <p>Change Status: "{{currentVraag.status}}"</p>
            <button v-show="currentVraag.status  != 'pending'" @click="changeStatus('pending')">Pending</button>
            <button v-show="currentVraag.status  != 'active'" @click="changeStatus('active')">Active</button>
            <button v-show="currentVraag.status  != 'done'" @click="changeStatus('done')">Done</button>
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
            currentVraag: {},
            adminWatching: false,
            docent: "",
            type: "",
            topic: "",
            vak: ""
        }
    },
    methods:{
        async getCurrentDocent(){
            const auth = getAuth();
            const user = auth.currentUser;
            await DocentDataService.findByEmail(user.email)
                .then(response => {
                    // console.log(response.data)
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
                    this.currentVraag = response.data;
                    this.docent =  response.data.docent.naam
                    this.type =  response.data.type.naam
                    this.topic =  response.data.topic.naam
                    this.vak =  response.data.vak.naam

                    if(!this.getCurrentDocent()){
                        console.log(this.getCurrentDocent())
                         // Niet doen als een docent  of het school deze  bekijkt ------
                        this.currentVraag.views +=  1;
                        VraagDataService.update(this.currentVraag.id, this.currentVraag)
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
                id: this.currentVraag.id,
                status: to
            };

            VraagDataService.update(this.currentVraag.id, updateData)
                .then(response => {
                    this.currentVraag.status = to;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
    mounted(){
        this.getVraag(this.$route.params.id)
    }
}
</script>
<!-- https://stackoverflow.com/questions/61585411/pass-data-through-router-to-other-component-in-vue -->