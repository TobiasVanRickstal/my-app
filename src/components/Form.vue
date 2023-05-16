<template>
    <div class="vraag-create">

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
        <div class="input docent">
            <label for="docent">Docent:</label>
            <p>{{currentDocent.naam}}</p>
        </div>

        <div class="select type-select">
            <label for="type">type</label>
            <select name="type" id="type" v-model="type">
                <option value="gastlessen">gastlessen</option>
                <option value="reeks">reeks</option>
                <option value="goodies">goodies</option>
                <option value="materiaal">(les)materiaal</option>
                <option value="opdrachten">opdrachten</option>
                <option value="lezing">lezing</option>
                <option value="evenement">evenement</option>
            </select>
        </div>

        <div class="input naam">
            <label for="naam">titel</label>
            <input type="text" name="naam" id="naam" v-model="naam">
        </div>

        <div class="input prijs">
            <label for="prijs">prijs</label>
            <input type="number" name="prijs" id="prijs" v-model="prijs">
        </div>

        <div class="input difficulty">
            <label for="difficulty">difficulty</label>
            <p>(makkelijkst) 1 - 2 - 3 (moeilijkst)</p>
            <input type="range" name="difficulty" id="difficulty" v-model="difficulty" min="1" max="3">
        </div>

        <div class="input beschrijving">
            <label for="beschrijving">beschrijving</label>
            <textarea name="beschrijving" id="beschrijving" v-model="beschrijving" cols="30" rows="10"></textarea>
        </div>
        
        <div class="select topic">
            <label for="topic">topic</label>
            <select name="topic" id="topic" v-model="topic">
                <option value="development">development</option>
                <option value="design">design</option>
                <option value="business">business</option>
            </select>
        </div>

        <div class="select vak" v-if="type !== 'goodies'">
            <label for="vak">vak</label>
            <select name="vak" id="vak" v-model="vak">
                <option value="creatie 1">creatie 1</option>
                <option value="creatie 2">creatie 2</option>
                <option value="creatie 3">creatie 3</option>
                <option value="ontwerpen 1">ontwerpen 1</option>
                <option value="ontwerpen 2">ontwerpen 2</option>
                <option value="development 1">development 1</option>
                <option value="development 2">development 2</option>
                <option value="development 3">development 3</option>
                <option value="development 4">development 4</option>
                <option value="ondernemerschap 1">ondernemerschap 1</option>
                <option value="ondernemerschap 2">ondernemerschap 2</option>
                <option value="ondernemerschap 3">ondernemerschap 3</option>
                <option value="lab 1">lab 1</option>
                <option value="lab 2">lab 2</option>
                <option value="lab 3">lab 3</option>
                <option value="integratie advanced">integratie advanced: front-end development</option>
                <option value="capita selecta 1">capita selecta 1</option>
                <option value="capita selecta 2">capita selecta 2</option>
                <option value="capita selecta 3">capita selecta 3</option>
            </select>
        </div>
        
        <div class="select fase">
            <label for="fase">fase</label>
            <select name="fase" id="fase" v-model="fase">
                <option value="1">fase 1</option>
                <option value="2">fase 2</option>
                <option value="3">fase 3</option>
            </select>
        </div>

        <div class="insideDiv">
            <periodeForm @clicked-show-detail="clickedShowDetailModal"/>
        </div>

        <div class="button">
            <button @click="saveVraag()">Opslagen</button>
            
        </div>
    </div>
</template>

<script>
import periodeForm from './subComponents/periodeForm.vue';
import DocentDataService from '@/services/DocentDataService';
import VraagDataService from '@/services/VraagDataService';

export default{
    data(){
        return{
            naam: "",
            docent: "",
            type: "",
            topic: "",
            vak: "",
            beschrijving: "",
            fase: 0,
            periodes: "",
            prijs:  "",
            serie: false,
            difficulty: 2,
            currentDocent:{}
        }
    },
    props:{
        userId: {
            type: String, // Specify the prop type
            required: true // Set it as required if necessary
        }
    },
    components: {
        periodeForm,
    },
    methods:{
        clickedShowDetailModal: function (value) {
            this.periodes = value.toString();
            console.log(this.periodes)
        },
        getDocent(id) {
            DocentDataService.get(id)
                .then(response => {
                    this.currentDocent = response.data;
                    console.log(response.data);
                    console.log(response.data.admin);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        saveVraag() {
        
            var data = {
                naam: this.naam,
                docent: this.currentDocent.id,
                type: this.type,
                topic: this.topic,
                vak: this.vak,
                informatie: this.beschrijving,
                status: "pending",
                fase: this.fase,
                views: 0,
                solicitanten: 0,
                periodes: this.periodes,
                prijs: this.prijs,
                serie: this.serie,
                difficulty: this.difficulty,
            };
            console.log(data)

            VraagDataService.create(data)
                .then(response => {
                    console.log(response.data);
                    router.push('/ons-vraag');
                })
                .catch(e => {
                    console.log(e);
                });
            },
        // https://codepen.io/Kradek/pen/rmBBPo?editors=1010
    },
    mounted() {
        this.getDocent(this.userId);
    }
}
</script>
<!-- Goedkeuring als een veld niet ingevuld is => override error -->