<template>
    <div class="our-offer">
        <h1 v-show="!addItem">Aanbod</h1>
        <h1 v-show="addItem">Nieuw aanbod aanmaken</h1>
    </div>

    <div class="filter-segment">
        <div class="add">
            <div class="button" v-if="!docentAsUser" @click="addItem = !addItem" :class="{activeButton: addItem}"><span v-show="!addItem">+ voeg toe</span><span v-show="addItem">x sluiten</span></div>
        </div>
    </div>
    <div class="form" v-show="addItem">
        <CreateAanbod :user-id="userId"  v-if="!docentAsUser"/>
    </div>
    
    <div class="aanbods"  v-show="!addItem">
        <div class="aanbod" v-for="aanbod in aanbods">
            <router-link :to="`/aanbod/${aanbod.id}`"><h3>{{aanbod.naam}}</h3></router-link>
        </div>
    </div>
</template>
<script>
import CreateAanbod from '@/components/CreateAanbod.vue';
import AanbodsDataService from '@/services/AanbodsDataService';

export default{
    data() {
        return {
            addItem:  false,
            aanbods: {},
            werknemerId: null
        };
    },
    props:{
        userId: {
            type: String, // Specify the prop type
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
        }
    },
    mounted(){
        this.getAanbods()
    },
    components: { 
        CreateAanbod 
    }
}
</script>
<style>
</style>