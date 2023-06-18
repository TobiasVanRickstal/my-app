<template>
    <div class="our-offer">
        <h1 v-show="!addItem">Aanbod</h1>
        <h1 v-show="addItem">Nieuw aanbod aanmaken</h1>
    </div>

    <div class="filter-segment">
        <div class="add" v-if="!docentAsUser">
            <div class="button" @click="addItem = !addItem" :class="{activeButton: addItem}"><span v-show="!addItem">+ Voeg toe</span><span v-show="addItem" class="close">x Sluiten</span></div>
        </div>
        <div class="filter" v-show="!addItem">
            <button class="button" @click="filterBox = !filterBox" :class="{activeButton: filterBox}"><span v-if="bedrijf === 'all'">Bedrijf</span><span v-else>{{bedrijfNaam}}</span></button>
        </div>
    </div>


    <div class="form" v-show="addItem" v-if="!docentAsUser">
        <CreateAanbod :user-id="userId"  />
    </div>


    <div class="typeSelect" v-if="filterBox">
        <AanbodFilter @clicked-show-detail="activeType" :selectedType="bedrijf" />
    </div>

    <div class="aanbods-pagina">
        <div class="aanbods"  v-show="!addItem" v-for="aanbod in aanbods">
            <div class="aanbod" v-if="bedrijf ==  aanbod.bedrijf.id || bedrijf == 'all'">
                
                <router-link :to="`/aanbod/${aanbod.id}`"><h2>{{aanbod.naam}}</h2></router-link>
                <p>{{aanbod.informatie}}</p>
                <!-- <p  class="small">{{aanbod.bedrijf.naam}} - {{aanbod.werknemer.naam}}</p> -->
                <div class="bewerk" v-if="docentAsUser ||( aanbod.werknemerId === werknemer.id)">
                    <router-link :to="{path: '/bewerk-aanbod/' +aanbod.id}" class="button-edit">bewerk</router-link>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
import CreateAanbod from '@/components/CreateAanbod.vue';
import AanbodsDataService from '@/services/AanbodsDataService';
import AanbodFilter from '@/components/subComponents/AanbodFilter.vue';
import BedrijfDataService from '@/services/BedrijfDataService';
import WerknemerDataService from '@/services/WerknemerDataService';

export default{
    data() {
        return {
            addItem:  false,
            aanbods: {},
            werknemerId: null,
            filterBox: false,
            bedrijf: "all",
            bedrijfNaam:  "",
            filters: null,
            werknemer: {}
        };
    },
    props:{
        userId: {
            bedrijf: String, // Specify the prop bedrijf
            required: true // Set it as required if necessary
        },
        docentAsUser: Boolean
    },
    methods: {
        getAanbods() {
            AanbodsDataService.getAll()
                .then(response => {
                console.log(response.data);
                this.aanbods = response.data;
            })
                .catch(e => {
                console.log(e);
            });
            WerknemerDataService.get(this.userId)
            .then(response=>{
                this.werknemer = response.data
            })
            .catch(e=>{
                console.log(e)
            })
        },
        activeType: function (value) {
            this.bedrijf = value;
            this.getNameBedrijf(value)
            this.filterBox = false
        },
        SendDataBack: function (data){
            this.filters = data[0]
        },
        getNameBedrijf(id){
            BedrijfDataService.get(id)
            .then(response => {
                this.bedrijfNaam = response.data.naam
            })
            .catch(e =>{
                console.log(e)
            })
        },
    },
    mounted(){
        this.getAanbods()
    },
    components: {
    CreateAanbod,
    AanbodFilter
}
}
</script>