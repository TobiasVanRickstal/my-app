<template>
    <div class="our-offer">
        <h1>Ons aanbod</h1>
    </div>

    <div class="filter-segment">
        <div class="add">
            <div class="add-icon" @click="addItem = !addItem"><span v-show="!addItem">+</span><span v-show="addItem">x</span></div>
        </div>
        <div class="filter" v-show="!addItem">
            <button @click="typeBox = !typeBox; filterBox = false">type</button>
            <button @click="filterBox = !filterBox; typeBox = false">filter</button>
        </div>
    </div>
    <div class="form" v-show="addItem">
        <h2>Nieuw aanbod</h2>
        <Form/>
        <!-- TODO When submitted refresh page -->
    </div>
    <div class="typeSelect" v-if="typeBox && !addItem && !filterBox">
        <TypeFilter @clicked-show-detail="activeType" :selectedType="type" />
        <!-- TODO  when clicked on a type close -->
    </div>
    <div class="filterSelect" v-if="filterBox && !typeBox && !addItem">
        <Filter @clicked-show-detail="SendDataBack"/>
    </div>
    <div class="items" v-show="!addItem" v-for="aanbod in aanbods">
        <div class="item" v-if="(type ==  aanbod.type || type == 'all') && getFilteredAanbods(aanbod)">
            <!-- can be added -->
            <!-- <div class="difficulty diff3">
                <span class="circle"></span>
                <span class="circle"></span>
                <span class="circle"></span>
            </div> -->

            <div class="titel">
                <router-link to="/offer"><h2>{{aanbod.naam}}</h2></router-link>
            </div>

            <div class="beschrijving">
                <p>{{aanbod.informatie}}</p>
            </div>

            <div class="infographics">
                <div class="bekeken">
                    <span>{{aanbod.views}}</span>
                </div>
                <div class="solicitanten">
                    <span>{{aanbod.solicitanten}}</span>
                </div>
                <div class="kostprijs">
                    <span>€ {{aanbod.prijs}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Form from '@/components/Form.vue';
import TypeFilter from '@/components/subComponents/TypeFilter.vue';
import Filter from '@/components/subComponents/Filter.vue';
import AanbodDataService from '@/services/AanbodDataService';

export default{
    data(){
        return{
            addItem: false,
            type: 'all',
            typeBox: false,
            filterBox: false,
            aanbods:[],
            filters:null
        }
    },
    components: {
        Form,
        TypeFilter,
        Filter
    },
    methods: {
        retrieveAanbods() {
            AanbodDataService.getAll()
                .then((response) => {
                    this.aanbods = response.data;
                    console.log(response.data);
                })
                .catch((e) => {
                    console.log(e);
            });
        },
        activeType: function (value) {
            this.type = value;
        },
        SendDataBack: function (data){
            this.filters = data[0]
        },
        getFilteredAanbods:  function(aanbod){
            if(this.filters){
                let filtered = true
                if(this.filters.docent){
                    if(this.filters.docent == "all"){
                        filtered = true
                    }
                    else{
                        filtered = aanbod.docent == this.filters.docent
                    }
                }
                if(filtered){
                    if(this.filters.topic){
                        if(this.filters.topic == "all"){
                            filtered = true
                        }
                        else{
                            filtered = aanbod.topic == this.filters.topic
                        }
                    }
                }
                if(filtered){
                    if(this.filters.vak){
                        if(this.filters.vak == "all"){
                            filtered = true
                        }
                        else{
                            filtered = aanbod.vak == this.filters.vak
                        }
                    }
                }
                if(filtered){
                    if(this.filters.fase){
                        if(this.filters.fase == "all"){
                            filtered = true
                        }
                        else{
                            filtered = aanbod.fase == this.filters.fase
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
    },
    mounted() {
        this.retrieveAanbods();
    },
}
</script>