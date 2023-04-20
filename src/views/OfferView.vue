<template>
    <div>
        <router-link to="/ons-aanbod">Terug naar overzicht</router-link>
    </div>
    <div class="aanbod-preview">

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
            <p>{{currentDocent.naam}}</p>
        </div>

        <div class="naam">
            <p>Naam:</p>
            <p>{{data.naam}}</p>
        </div>

        <div class="beschrijving">
            <p>Beschrijving:</p>
            <p>{{data.informatie}}</p>
        </div>

        <div class="typeData">
            <p>Type:</p>
            <p>{{data.type}}</p>
        </div>
        
        <div class="topic">
            <p>Topic:</p>
            <p>{{data.topic}}</p>
        </div>

        <div class="vak">
            <p>Vak:</p>
            <p>{{data.vak}}</p>
        </div>
        
        <div class="fase">
            <p>Fase:</p>
            <p>{{data.fase}}</p>
        </div>

        <div class="periode">
            <p>Periodes:</p>
            <p>{{data.periodes}}</p>
        </div>
        
        <div class="views">
            <p>Solicitanten /  views:</p>
            <p>{{data.solicitanten}} / {{data.views}}</p>
        </div>

        <div class="status" v-show="adminWatching">
            <p>Admin prrivillege:</p>
            <p>Change Status: "{{data.status}}"</p>
            <button v-show="data.status  != 'pending'" @click="changeStatus('pending')">Pending</button>
            <button v-show="data.status  != 'active'" @click="changeStatus('active')">Active</button>
            <button v-show="data.status  != 'done'" @click="changeStatus('done')">Done</button>
        </div>
    </div>
</template>

<script>
import AanbodDataService from '@/services/AanbodDataService';
import DocentDataService from '@/services/DocentDataService';

export default{
    data(){
        return{
            data: [],
            currentDocent:[],
            adminWatching: false
        }
    },
    methods:{
        getAanbod(id){
            AanbodDataService.get(id)
                .then(response => {
                    this.data = response.data;
                    console.log(response.data);
                    console.log(response.data.views);
                    this.getDocent(response.data.docent);
                    

                    // // Niet doen als een docent  of het school deze  bekijkt ------
                    // this.data.views +=  1;
                    // AanbodDataService.update(this.data.id, this.data)
                    //     .then(response => {
                    //     this.data.status = to;
                    //     console.log(response.data);
                    // })
                    // .catch(e => {
                    //     console.log(e);
                    // });
                    // // ----------
                })
                .catch(e => {
                    console.log(e);
                });
        },
        getDocent(id) {
            DocentDataService.get(id)
                .then(response => {
                    this.currentDocent = response.data;
                    if(response.data.admin){
                        this.adminWatching = true
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        },
        changeStatus(to){
            var updateData = {
                id: this.data.id,
                status: to
            };

            AanbodDataService.update(this.data.id, updateData)
                .then(response => {
                    this.data.status = to;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }

    },
    mounted(){
        this.getAanbod(this.$route.params.id);
    }
    
}
</script>
<!-- https://stackoverflow.com/questions/61585411/pass-data-through-router-to-other-component-in-vue -->