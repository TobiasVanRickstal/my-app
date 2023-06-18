<template>
    <div class="vraag-create">
        
        <h3 class="error-message">Gelive alle velden in te vullen</h3>
        
        <!-- search bar - docenten database -->
        <div class="input docent">
            <label for="docent">Docent:</label>
            <p>{{currentDocent.naam}}</p>
        </div>

        <div class="select type-select">
            <label for="type">type</label>
            <select name="type" id="type" v-model="vraag.typeId">
                <option  v-for="type in types" :value="type.id">{{type.naam}}</option>
            </select>
        </div>

        <div class="input naam">
            <label for="naam">titel</label>
            <input type="text" name="naam" id="naam" v-model="vraag.naam">
        </div>

        <div class="input prijs">
            <label for="prijs">prijs</label>
            <input type="number" name="prijs" id="prijs" v-model="vraag.prijs">
        </div>

        <div class="input difficulty">
            <label for="difficulty">belangerijkheidsgraad</label>
            <p  class="ernst"><span>geen noodzaak</span><span>!DRINGEND!</span></p>
            <input type="range" name="difficulty" id="difficulty" v-model="vraag.difficulty" min="1" max="3">
        </div>

        <div class="input beschrijving">
            <label for="beschrijving">beschrijving</label>
            <textarea name="beschrijving" id="beschrijving" v-model="vraag.informatie" cols="30" rows="10"></textarea>
        </div>
        
        <div class="select topic">
            <label for="topic">topic</label>
            <select name="topic" id="topic" v-model="vraag.topicId">
                <option v-for="topic in topics" :value="topic.id">{{topic.naam}}</option>
            </select>
        </div>

        <div class="select vak" v-if="type !== 'goodies'">
            <label for="vak">vak</label>
            <select name="vak" id="vak" v-model="vraag.vakId">
                <option v-for="vak in vaks" :value="vak.id">{{vak.naam}}</option>
            </select>
        </div>
        
        <div class="select fase">
            <label for="fase">fase</label>
            <select name="fase" id="fase" v-model="vraag.fase">
                <option value="1">fase 1</option>
                <option value="2">fase 2</option>
                <option value="3">fase 3</option>
            </select>
        </div>

        <div class="insideDiv">
            <periodeForm @clicked-show-detail="clickedShowDetailModal"/>
        </div>

        <div>
            <button @click="updateVraag()" class="button">Opslagen</button>
        </div>
    </div>
</template>

<script>
import periodeForm from '@/components/subComponents/periodeForm.vue';
import DocentDataService from '@/services/DocentDataService';
import VraagDataService from '@/services/VraagDataService';
import TypeDataService from '@/services/TypeDataService';
import TopicDataService from '@/services/TopicDataService';
import VakDataService from '@/services/VakDataService';
import AanbodsDataService from '@/services/AanbodsDataService';
import router from '@/router';

export default{
    data(){
        return{
            vraag:{},
            aanbod:{},
            types: {},
            topics: {},
            vaks: {},
            currentDocent:{},
            id:this.$route.params.id
        }
    },
    props:{
        userId: {
            type: String, // Specify the prop type
            required: true // Set it as required if necessary
        },
        docentAsUser: Boolean
    },
    components: {
        periodeForm,
    },
    methods:{
        clickedShowDetailModal: function (value) {
            this.vraag.periodes = value.toString();
            console.log(this.periodes)
        },
        getDocent(id) {
            DocentDataService.get(id)
                .then(response => {
                    this.currentDocent = response.data;
                    // console.log(response.data);
                    // console.log(response.data.admin);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        getTypes(){
            TypeDataService.getAll()
                .then(response => {
                    this.types = response.data;
                    // console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        getTopics(){
            TopicDataService.getAll()
                .then(response => {
                    this.topics = response.data;
                    // console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        getVaks(){
            VakDataService.getAll()
                .then(response => {
                    this.vaks = response.data;
                    // console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        getFields(){
            this.getTopics();
            this.getTypes();
            this.getVaks();
        },
        getVraag(){
            VraagDataService.get(this.$route.params.id)
            .then(response=>{
                this.vraag= response.data
            })
            .catch(e=>{
                console.log(e)
            })
        },
        updateVraag() {
            VraagDataService.update(this.$route.params.id,this.vraag)
                .then(response => {
                    router.push("/vragen")
                })
                .catch(e => {
                    console.log(e);
                });
        },
        // https://codepen.io/Kradek/pen/rmBBPo?editors=1010
    },
    mounted() {
        this.getDocent(this.userId);
        this.getFields();
        this.getVraag()
        
    }
}
</script>
<!-- Goedkeuring als een veld niet ingevuld is => override error -->