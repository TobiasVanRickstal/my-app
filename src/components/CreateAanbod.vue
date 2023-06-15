<template>
    <div class="container aanbod-create">
        <h1>Maak een aanbod aan!</h1>


        
        <div><h4>Aanmaken als: {{currentUser.naam}}</h4></div>
        <div class="input naam">
            <label for="naam">Titel</label>
            <input type="text" v-model="aanbod.naam">
        </div>

        <div class="input informatie">
            <label for="informatie">informatie</label>
            <textarea name="informatie" id="informatie" cols="30" rows="10" v-model="aanbod.informatie"></textarea>
        </div>

        <div class="input prijs">
            <label for="prijs">prijs</label>
            <input type="number" name="prijs" id="prijs" v-model="aanbod.prijs">
        </div>
        <div  class="row"><span>Voeg datum toe</span><input type="checkbox" v-model="selectDatum" value="true"></div>
        <div class="insideDiv">
            <periodeForm @clicked-show-detail="clickedShowDetailModal" v-if="selectDatum"/>
        </div>

        <div>
            <button @click="saveAanbod()" class="button">Opslagen</button>
        </div>
    </div>
</template>
<script>
import WerknemerDataService from '@/services/WerknemerDataService';
import periodeForm from './subComponents/periodeForm.vue';
import AanbodsDataService from '@/services/AanbodsDataService';

export default{
    data(){
        return{
            aanbod: {
                naam: "",
                informatie: "",
                prijs: "",
                datum: "",
                status: "pending",
                werknemerId: null,
                bedrijfId: null
            },
            currentUser: {},
            selectDatum: false
        }
    },
    props:{
        userId: {
            type: String, // Specify the prop type
            required: true // Set it as required if necessary
        }
    },
    methods:{
        saveAanbod(){

            var  data ={
                naam: this.aanbod.naam,
                informatie: this.aanbod.informatie,
                prijs: this.aanbod.prijs,
                status: this.aanbod.status,
                datum: this.aanbod.datum,
                werknemerId: this.currentUser.id,
                bedrijfId: this.currentUser.bedrijfId,
            };
            console.log(data)
            AanbodsDataService.create(data)
            .then(response =>{
                console.log(response.data)
                window.location.reload();
            })
            .catch(e =>{
                console.log(e)
            })
        },
        getWerknemer(id){
            WerknemerDataService.get(id)
            .then(response =>{
                console.log(response.data)
                this.currentUser =  response.data
            })
            .catch(e => {
                console.log(e)
            })
        },
        clickedShowDetailModal: function (value) {
            this.aanbod.datum = value.toString();
        },
    },
    created(){
        this.getWerknemer(this.userId)
    },
    components:{
        periodeForm
    }
}
</script>