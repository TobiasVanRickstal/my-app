<template>
    <div class="our-offer">
        <h1 v-show="!addItem">Ons vraag</h1>
        <h1 v-show="addItem">Nieuw vraag</h1>
    </div>

    <div class="filter-segment">
        <div class="add">
            <div class="button" @click="addItem = !addItem" :class="{activeButton: addItem}"><span v-show="!addItem">+ voeg toe</span><span v-show="addItem">x sluiten</span></div>
        </div>
        <div class="filter" v-show="!addItem">
            <button class="button" @click="typeBox = !typeBox; filterBox = false" :class="{activeButton: typeBox}">type</button>
            <button class="button" @click="filterBox = !filterBox; typeBox = false" :class="{activeButton: filterBox}">filter</button>
        </div>
    </div>
    <div class="form" v-show="addItem">
        <Form :user-id="userId"/>
        <!-- TODO When submitted refresh page -->
    </div>
    <div class="typeSelect" v-if="typeBox && !addItem && !filterBox">
        <TypeFilter @clicked-show-detail="activeType" :selectedType="type" />
        <!-- TODO  when clicked on a type close -->
    </div>
    <div class="filterSelect" v-if="filterBox && !typeBox && !addItem">
        <Filter @clicked-show-detail="SendDataBack"/>
    </div>
    
    <div class="items" v-show="!addItem" v-for="vraag in vraags">
        <div class="item" v-if="(type ==  vraag.type || type == 'all') && getFilteredVraags(vraag)">
            <!-- can be added -->
            <div class="top-bar">
                <div class="difficulty" :class="'diff' + vraag.difficulty">
                    <div class="circle" :class="{color: (vraag.difficulty >= i)}" v-for="i in 3" :key="i"></div>
                </div>
            </div>
            

            <div class="titel">
                <router-link :to="{path: '/vraags/'  + vraag.id}"><h2>{{vraag.naam}}</h2></router-link>
            </div>

            <div class="beschrijving">
                <p>{{vraag.informatie}}</p>
            </div>
            <div class="bottom-info">
                <div class="infographics">
                    <div class="bekeken">
                        <span>{{vraag.views}}</span>
                    </div>
                    <div class="solicitanten">
                        <span>{{vraag.solicitanten}}</span>
                    </div>
                    <div class="kostprijs">
                        <span>€ {{vraag.prijs}}</span>
                    </div>
                </div>

                <div class="details">
                    <!-- <div class="periode">
                        {{ vraag.periodes }}
                    </div> -->
                    <div class="docent">
                        <p>{{ vraag.docent }}</p>
                    </div>
                    <div class="vak">
                        {{ vraag.vak }}
                    </div>
                    <div class="topic">
                        {{ vraag.topic }}
                    </div>
                    <div class="type">
                        {{ vraag.type }}
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

export default{
    data(){
        return{
            addItem: false,
            type: 'all',
            typeBox: false,
            filterBox: false,
            vraags:[],
            filters:null,
        }
    },
    props:{
        userId: {
            type: String, // Specify the prop type
            required: true // Set it as required if necessary
        }
    },
    components: {
        Form,
        TypeFilter,
        Filter
    },
    methods: {
        // retrieveVraags() {
        //     VraagDataService.getAll()
        //         .then((response) => {
        //             const vraags = response.data;
        //             const updatedVraags = [];

        //             vraags.forEach((vraag) => {
        //                 const updatedVraag = { ...vraag };
        //                 updatedVraag.docent = this.getDocentName(vraag.docent);
        //                 updatedVraags.push(updatedVraag);
        //             });

        //             this.vraags = updatedVraags;
        //         })
        //         .catch((e) => {
        //             console.log(e);
        //         });
        // },

        async retrieveVraags() {
            try {
                const response = await VraagDataService.getAll();
                const vraags = response.data;
                const updatedVraags = await Promise.all(vraags.map(async (vraag) => {
                    const docentName = await this.getDocentName(vraag.docent);
                    return { ...vraag, docent: docentName };
                }));
                this.vraags = updatedVraags;
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
                            filtered = vraag.docent == this.filters.docent
                        }
                    }
                    if(filtered){
                        if(this.filters.topic){
                            if(this.filters.topic == "all"){
                                filtered = true
                            }
                            else{
                                filtered = vraag.topic == this.filters.topic
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
                                filtered = vraag.vak == this.filters.vak
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
        
        mounted() {
            this.retrieveVraags();
            // console.log(this.userId)
        },
    },
    computed:{
        // getDocentName(id) {
        //     DocentDataService.get(id)
        //         .then(response => {
        //             return response.data.naam;
        //         })
        //         .catch(e => {
        //             console.log(e);
        //         });
        // }

    //     async getDocentName(id) {
    //   return async (id) => {
    //     try {
    //       const response = await DocentDataService.get(id);
    //       return response.data.naam;
    //     } catch (e) {
    //       console.log(e);
    //       return "";
    //     }
    //   };
    // },
    },
    mounted() {
        this.retrieveVraags();
        // console.log(this.userId)
    },
}
</script>