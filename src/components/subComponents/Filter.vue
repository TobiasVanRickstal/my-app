<template>
    <div class="filterBox">
        <div>
            <label for="docent">docent</label>
            <select name="docent" id="docent" v-model="chosenDocent">
                <option v-for="docent in docents" :value="docent.id">{{docent.naam}}</option>
            </select>
        </div>
        
        <div>
            <label for="topic">topic</label>
            <select name="topic" id="topic" v-model="topic">
                <option value="all" selected>All</option>
                <option v-for="topic in topics" :value="topic.id">{{topic.naam}}</option>
            </select>
        </div>

        <div>
            <label for="vak">vak</label>
            <select name="vak" id="vak" v-model="vak">
                <option value="all" selected>All</option>
                <option v-for="vak in vaks" :value="vak.id">{{vak.naam}}</option>
            </select>
        </div>
        <div>
            <label for="fase">fase</label>
            <select name="fase" id="fase" v-model="fase">
                <option value="all" selected>All</option>
                <option value="1">fase 1</option>
                <option value="2">fase 2</option>
                <option value="3">fase 3</option>
            </select>
        </div>
        <div>
            <label for="difficulty">difficulty</label>
            <select name="difficulty" id="difficulty" v-model="difficulty">
                <option value="all" selected>All</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </div>
        <div>
            <button @click="filteredData()">Filter</button>
            <button @click="resetData()">Reset</button>
        </div>
    </div>
</template>

<script>
import DocentDataService from '@/services/DocentDataService';
import VakDataService from '@/services/VakDataService';
import TopicDataService from '@/services/TopicDataService';

export default{
    data(){
        return{
            docents: [],
            chosenDocent: "all",
            topic: "all",
            vak: "all",
            fase: "all",
            difficulty: "all",
            data:[],
            vaks:{},
            topics:{},
        }
    },
    methods:{
        retrieveDocents() {
            DocentDataService.getAll()
                .then((response) => {
                    this.docents = response.data;
                })
                .catch((e) => {
                    console.log(e);
            });
        },
        filteredData:  function (){
            this.data = []
            this.data.push({'docent': this.chosenDocent, 'topic': this.topic, 'vak': this.vak, 'fase': this.fase, 'difficulty': this.difficulty})
            this.$emit('clicked-show-detail', this.data)
        },
        resetData: function (){
            this.chosenDocent = "all"
            this.topic = "all"
            this.vak = "all"
            this.fase = "all"
            this.difficulty = "all"
            this.filteredData();
        },
        getTopics(){
            TopicDataService.getAll()
                .then(response => {
                    this.topics = response.data;
                })
                .catch(e => {
                    console.log(e);
                });
        },
        getVaks(){
            VakDataService.getAll()
                .then(response => {
                    this.vaks = response.data;
                })
                .catch(e => {
                    console.log(e);
                });
        },
        getData(){
            this.getTopics();
            this.getVaks();
        }
    },
    created(){
        this.retrieveDocents();
        this.getData();
    }
}
</script>

<style scoped>
.filterBox{
    background-color: grey;
    display: flex;
    flex-wrap: wrap;
}
.filterBox div{
    width: fit-content;
    flex: 1 0 20%;
    margin: 5px;
    padding: 5px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
}
</style>