<template>
    <div class="container aanbod-create">

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
            <button @click="updateAanbod()" class="button">Opslagen</button>
        </div>
    </div>
</template>
<script>
import router from '@/router';
import WerknemerDataService from '@/services/WerknemerDataService';
import AanbodsDataService from '@/services/AanbodsDataService';
import periodeForm from '@/components/subComponents/periodeForm.vue';

export default{
    data(){
        return{
            aanbod: {},
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
        getAanbod(){
            AanbodsDataService.get(this.$route.params.id)
            .then(response=>{
                this.aanbod= response.data
            })
            .catch(e=>{
                console.log(e)
            })
        },
        updateAanbod() {
            AanbodsDataService.update(this.aanbod.id,this.aanbod)
                .then(response => {
                    router.push("/aanbod")
                })
                .catch(e => {
                    console.log(e);
                });
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
        this.getAanbod()
    },
    components:{
        periodeForm
    }
}
</script>