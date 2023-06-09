<template>
    <!-- TODO -- change to bedrijven! -->
    <div class="aanbods">
        <h2>Aanbod</h2>
        <div class="aanbod" v-for="aanbod in aanbods">
            <div class="info">
                <div class="head">
                    <p v-if="aanbod.naam">{{aanbod.bedrijf.naam }}</p>
                </div>
                <div class="title">
                    <h3>{{aanbod.naam}}</h3>
                </div>
                <div class="bottom">
                    <p>{{ aanbod.werknemer.naam }}<span v-if="aanbod.docent"> - {{aanbod.docent}}</span></p>
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