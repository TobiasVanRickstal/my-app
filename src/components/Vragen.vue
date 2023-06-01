<template>
    <div class="vragen">
        <h2>Vraag</h2>
        <div class="vraag" v-for="vraag in vragen">
            <div class="difficulty" :class="fetchColor(vraag.difficulty)">
                
            </div>
            <div class="info">
                <div class="head">
                    <p v-if="vraag.docent">{{ vraag.docent.naam }} - {{vraag.topic }}</p>
                    <p v-else>loading...</p>
                </div>
                <div class="title">
                    <h3>{{vraag.naam}}</h3>
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

<style>
.vragen{
    margin: 5px;
    display: flex;
    flex-direction: column;
    background-color: dimgrey;
    padding: 25px 5px;
}
.vraag{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    background-color: grey;
    margin: 10px auto;
    padding: 10px 15px;
    border: 1px solid black;
}
.difficulty{
    width: 50px;
    height: 50px;
    border-radius: 100%;
}
.orange{
    background-color: orange;
}
.green{
    background-color: green;
}
.red{
    background-color: red;
}
.info{
    text-align: left;
    width: 80%;
}
</style>