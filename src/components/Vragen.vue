<template>
    <h2>Vragen</h2>
    <div class="vragen">
        <div class="vraag" v-for="vraag in sortedVragen">
            <div class="info">
                <div class="title">
                    <router-link :to="{path: '/vragen/'  + vraag.id}"><h3>{{vraag.naam}}</h3></router-link>
                </div>
                <div class="head">
                    <p v-if="vraag.docent">{{ vraag.docent.naam }} - {{vraag.topic.naam }}</p>
                    <p v-else>loading...</p>
                    <p><span v-if="vraag.difficulty  === 3">!DRINGEND!</span></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VraagDataService from '@/services/VraagDataService';
import DocentDataService from '@/services/DocentDataService';

export default{
    data(){
        return{
            vragen:[],
            docentNaam: ""
        }
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
        this.retrieveVraags();
    }
}
</script>