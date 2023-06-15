<template>
    <div class="our-offer">
        <h1 v-show="!addItem">Onze vragen</h1>
        <h1 v-show="addItem">Nieuwe vraag aanmaken</h1>
    </div>

    <div class="filter-segment">
        <div class="add" v-if="docentAsUser">
            <div class="button" @click="addItem = !addItem" :class="{activeButton: addItem}"><span v-show="!addItem">+ Voeg toe</span><span v-show="addItem" class="close">x Sluiten</span></div>
        </div>
        <div class="filter" v-show="!addItem">
            <button class="button" @click="typeBox = !typeBox; filterBox = false" :class="{activeButton: typeBox}"><span v-if="type === 'all'">Type</span><span v-else>{{typeNaam}}</span></button>
            <button class="button" @click="filterBox = !filterBox; typeBox = false" :class="{activeButton: filterBox}">Filter</button>
        </div>
    </div>
    <div class="form" v-show="addItem">
        <Form :user-id="userId"  v-if="docentAsUser"/>
    </div>
    <div class="typeSelect" v-if="typeBox && !addItem && !filterBox">
        <TypeFilter @clicked-show-detail="activeType" :selectedType="type" />
        <!-- TODO  when clicked on a type close -->
    </div>
    <div class="filterSelect" v-if="filterBox && !typeBox && !addItem">
        <Filter @clicked-show-detail="SendDataBack"/>
    </div>
    
    <div class="items" v-show="!addItem" v-for="vraag in sortedVragen">
        <div class="item" v-if="(type ==  vraag.type.id || type == 'all') && getFilteredVraags(vraag)">
            <!-- can be added -->
            <!-- <div class="top-bar">
                <div class="difficulty" :class="'diff' + vraag.difficulty">
                    <div class="circle" :class="{color: (vraag.difficulty >= i)}" v-for="i in 3" :key="i"></div> 
                </div>
            </div> -->
            

            <div class="titel">
                <router-link :to="{path: '/vragen/'  + vraag.id}"><h2>{{vraag.naam}}</h2></router-link>
                <div>
                    <p v-if="vraag.difficulty ===  3" class="bold">!DRINGEND!</p>
                    <p v-else-if="vraag.difficulty ===  1">Geen noodzaak</p>
                </div>
            </div>

            <div class="beschrijving">
                <p>{{vraag.informatie}}</p>
            </div>
            <div class="bottom-info">
                <div class="infographics">
                    <div class="bekeken">
                        <p>{{vraag.views}}</p>
                        <img src="../assets/icons/eye.png" alt="">
                        <!-- <a href="https://www.flaticon.com/free-icons/person" title="person icons">Person icons created by Freepik - Flaticon</a> -->
                    </div>
                    <div class="solicitanten">
                        <p>{{vraag.solicitanten}}</p>
                        <img src="../assets/icons/person.png" alt="">
                        <!-- <a href="https://www.flaticon.com/free-icons/eye" title="eye icons">Eye icons created by Freepik - Flaticon</a> -->
                    </div>
                    <div class="kostprijs">
                        <span>€{{vraag.prijs}}</span>
                    </div>
                </div>

                <div class="details">
                    <!-- <div class="periode">
                        {{ vraag.periodes }}
                    </div> -->
                    <div class="docent">
                        <p>{{ vraag.docent.naam }}</p>
                    </div>
                    <div class="vak">
                        {{ vraag.vak.naam }}
                    </div>
                    <div class="topic">
                        {{ vraag.topic.naam }}
                    </div>
                    <div class="type">
                        {{ vraag.type.naam }}
                    </div>
                </div>

            </div>
            
        </div>
    </div>
</template>

<script>
import Form from '@/components/Form.vue';
import TypeFilter from '@/components/subComponents/TypeFilter.vue';
import Filter from '@/components/subComponents/Filter.vue';
import VraagDataService from '@/services/VraagDataService';
import DocentDataService from '@/services/DocentDataService';
import TypeDataService from '@/services/TypeDataService';

export default{
    data(){
        return{
            addItem: false,
            type: 'all',
            typeNaam: "",
            typeBox: false,
            filterBox: false,
            vragen:[],
            filters:null,
        }
    },
    props:{
        userId: {
            type: String, // Specify the prop type
            required: true // Set it as required if necessary
        },
        docentAsUser: Boolean
    },
    created(){
        console.log(this.docentAsUser)
    },
    components: {
        Form,
        TypeFilter,
        Filter
    },
    computed:{
        sortedVragen(){
            return this.vragen.sort((a,b) =>  b.difficulty - a.difficulty);
        }
    },
    methods: {
        async retrieveVraags() {
            try {
                const response = await VraagDataService.getAll();
                this.vragen = response.data;
                // console.log(response.data)
            } catch (error) {
                console.log(error);
            }
        },

        async getDocentName(id) {
            try {
                const response = await DocentDataService.get(id);
                return response.data.naam;
            } catch (error) {
                console.log(error);
                return "";
            }
        },
        activeType: function (value) {
            this.type = value;
            this.getNameType(value)
            this.typeBox = false
        },
        SendDataBack: function (data){
            this.filters = data[0]
        },
        getFilteredVraags:  function(vraag){
            if(vraag.status != "done"){ // ENKEL ALS JE GEEN DOCENT BENT
                if(this.filters){
                    let filtered = true
                    if(this.filters.docent){
                        if(this.filters.docent == "all"){
                            filtered = true
                        }
                        else{
                            filtered = vraag.docent.id == this.filters.docent
                        }
                    }
                    if(filtered){
                        if(this.filters.topic){
                            if(this.filters.topic == "all"){
                                filtered = true
                            }
                            else{
                                filtered = vraag.topic.id == this.filters.topic
                            }
                        }
                    }
                    if(filtered){
                        if(this.filters.difficulty){
                            if(this.filters.difficulty == "all"){
                                filtered = true
                            }
                            else{
                                filtered = vraag.difficulty == this.filters.difficulty
                            }
                        }
                    }
                    if(filtered){
                        if(this.filters.vak){
                            if(this.filters.vak == "all"){
                                filtered = true
                            }
                            else{
                                filtered = vraag.vak.id == this.filters.vak
                            }
                        }
                    }
                    if(filtered){
                        if(this.filters.fase){
                            if(this.filters.fase == "all"){
                                filtered = true
                            }
                            else{
                                filtered = vraag.fase == this.filters.fase
                            }
                        }
                    }
                    return filtered
                    // https://stackoverflow.com/questions/49521851/how-to-filter-list-from-multiple-select-options-dropdowns-using-vuejs
                }
                else{
                    return true
                }
            }
            return false           
        },
        getNameType(id){
            TypeDataService.get(id)
            .then(response => {
                this.typeNaam = response.data.naam
            })
            .catch(e =>{
                console.log(e)
            })
        },
        mounted() {
            this.retrieveVraags();
        },
    },
    mounted() {
        this.retrieveVraags();
    },
}
</script>