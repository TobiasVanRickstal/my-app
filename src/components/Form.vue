<template>
    <form action="" class="form">

        <!-- Goedkeuring -->
        <!-- <div>
            <label for="abonnement">abonnement</label>
            <select name="abonnement" id="abonnement" v-model="abonnement">
                <option value="Silver">Silver</option>
                <option value="Gold">Gold</option>
                <option value="Platinum">Platinum</option>
            </select>
        </div> -->
        
        
        <!-- search bar - docenten database -->
        <div class="input docent">
            <label for="docent">docent</label>
            <input type="text" name="docent" id="docent" v-model="docent">
        </div>

        <div class="select type" v-if="docent">
            <label for="type">type</label>
            <select name="type" id="type" v-model="type">
                <option value="gastlessen">gastlessen</option>
                <option value="reeks">reeks</option>
                <option value="goodies">goodies</option>
                <option value="materiaal">(les)materiaal</option>
                <option value="opdrachten">opdrachten</option>
                <option value="lezing">lezing</option>
                <option value="evenement">evenement</option>
            </select>
        </div>

        <div class="input titel" v-if="docent && type">
            <label for="titel">titel</label>
            <input type="text" name="titel" id="titel" v-model="titel">
        </div>

        <div class="input beschrijving" v-if="docent && type">
            <label for="beschrijving">beschrijving</label>
            <textarea name="beschrijving" id="beschrijving" cols="30" rows="10"></textarea>
        </div>
        
        <div class="select topic" v-if="type !== 'goodies' && type && titel && docent">
            <label for="topic">topic</label>
            <select name="topic" id="topic" v-model="topic">
                <option value="development">development</option>
                <option value="design">design</option>
                <option value="business">business</option>
            </select>
        </div>

        <div class="select vak" v-if="type !== 'goodies' && type && titel && docent && topic">
            <label for="vak">vak</label>
            <select name="vak" id="vak" v-model="vak">
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
        
        <div class="select fase" v-if="(type && titel && docent && topic && vak) || type == 'goodies' && titel && docent">
            <label for="fase">fase</label>
            <select name="fase" id="fase" v-model="fase">
                <option value="1">fase 1</option>
                <option value="1">fase 2</option>
                <option value="1">fase 3</option>
            </select>
        </div>

        <div class="insideDiv" v-if="(type && titel && docent && topic && vak && fase)|| type == 'goodies' && titel && docent && fase">
            <periodeForm/>
        </div>

        <div class="button" v-if="(type && titel && docent && topic && vak && fase) || type == 'goodies' && titel && docent && fase">
            <input type="submit" value="verzenden">
        </div>
    </form>
</template>

<script>
import periodeForm from './subComponents/periodeForm.vue';

export default{
    data(){
        return{
        type: "",
        titel: "",
        docent: "",
        topic: "",
        vak: "",
        fase: null,
        periodes: ""
        }
    },
    components: {
        periodeForm,
    }
}
</script>