<template>
    <!-- TODO -- change to bedrijven! -->
    <div class="aanbods">
        <h2>Ons aanbod</h2>
        <div class="aanbod" v-for="aanbod in aanbods">
            <div class="difficulty" :class="fetchColor(aanbod.difficulty)">
                
            </div>
            <div class="info">
                <div class="head">
                    <p>{{ getDocentName(aanbod.docent) }} - {{aanbod.topic }}</p>
                </div>
                <div class="title">
                    <h3>{{aanbod.naam}}</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AanbodDataService from '@/services/AanbodDataService';
import DocentDataService from '@/services/DocentDataService';

export default{
    data(){
        return{
            aanbods:[],
            docentNaam: ""
        }
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
        getDocentName(id) {
            DocentDataService.get(id)
                .then(response => {
                    this.docentNaam = response.data.naam;
                })
                .catch(e => {
                    console.log(e);
                });
                return this.docentNaam
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

<style>
.aanbods{
    margin: 5px;
    display: flex;
    flex-direction: column;
    background-color: dimgrey;
    padding: 25px 5px;
}
.aanbod{
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