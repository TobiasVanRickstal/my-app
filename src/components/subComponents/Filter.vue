<template>
    <div class="filterBox">
        <div>
            <label for="docent">docent</label>
            <select name="docent" id="docent" v-model="docent">
                <option value="" selected>All</option>
                <option value="Robby">Robby</option>
                <option value="Christianne">Christianne</option>
                <option value="Geert">Geert</option>
            </select>
        </div>
        
        <div>
            <label for="topic">topic</label>
            <select name="topic" id="topic" v-model="topic">
                <option value="" selected>All</option>
                <option value="development">development</option>
                <option value="design">design</option>
                <option value="business">business</option>
            </select>
        </div>

        <div>
            <label for="vak">vak</label>
            <select name="vak" id="vak" v-model="vak">
                <option value="" selected>All</option>
                <option value="creatie 1">creatie 1</option>
                <option value="creatie 2">creatie 2</option>
                <option value="creatie 3">creatie 3</option>
                <option value="ontwerpen 1">ontwerpen 1</option>
                <option value="ontwerpen 2">ontwerpen 2</option>
                <option value="development 1">development 1</option>
                <option value="development 2">development 2</option>
                <option value="development 3">development 3</option>
                <option value="development 4">development 4</option>
                <option value="ondernemerschap 1">ondernemerschap 1</option>
                <option value="ondernemerschap 2">ondernemerschap 2</option>
                <option value="ondernemerschap 3">ondernemerschap 3</option>
                <option value="lab 1">lab 1</option>
                <option value="lab 2">lab 2</option>
                <option value="lab 3">lab 3</option>
                <option value="integratie advanced">integratie advanced: front-end development</option>
                <option value="capita selecta 1">capita selecta 1</option>
                <option value="capita selecta 2">capita selecta 2</option>
                <option value="capita selecta 3">capita selecta 3</option>
            </select>
        </div>
        <div>
            <label for="fase">fase</label>
            <select name="fase" id="fase" v-model="fase">
                <option value="" selected>All</option>
                <option value="1">fase 1</option>
                <option value="2">fase 2</option>
                <option value="3">fase 3</option>
            </select>
        </div>

        <div>
            <periodeForm/>
        </div>
    </div>
</template>

<script>
import periodeForm from './periodeForm.vue';

export default{
    data(){
        return{
        type: "",
        titel: "",
        docent: "",
        topic: "",
        vak: "",
        fase: "",
        periodes: ""
        }
    },
    components: {
        periodeForm
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