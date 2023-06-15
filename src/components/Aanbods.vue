<template>
    <h2>Aanbod</h2>
    <div class="aanbods">
        <div class="aanbod" v-for="aanbod in aanbods">
            <div class="info">
                <div class="title">
                    <router-link :to="{path: '/aanbod/'  + aanbod.id}"><h3>{{aanbod.naam}}</h3></router-link>
                </div>
                <div class="head">
                    <p>{{aanbod.bedrijf.naam }} - {{ aanbod.werknemer.naam }}<span v-if="aanbod.docent"> - {{aanbod.docent}}</span></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AanbodsDataService from '@/services/AanbodsDataService';
import DocentDataService from '@/services/DocentDataService';

export default{
    data(){
        return{
            aanbods:[],
        }
    },
    methods: {
        async retrieveAanbods() {
            try {
                const response = await AanbodsDataService.getAll();
                this.aanbods = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        fetchColor(int){
            if(int == 1){
                return "green"
            }
            else if(int == 2){
                return "orange"
            }
            else{
                return "red"
            }
        }
    },
    mounted() {
        this.retrieveAanbods();
    }
}
</script>