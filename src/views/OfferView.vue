<template>
    <div>

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
        <div class="docent">
            <p>Docent</p>
        </div>

        <div class="type">
            <p>Type</p>
        </div>

        <div class="titel">
            <p>Titel</p>
        </div>

        <div class="beschrijving">
            <p>beschrijving</p>    
        </div>
        
        <div class="topic">
            <p>Topic</p>
        </div>

        <div class="vak">
            <p>Vak</p>
        </div>
        
        <div class="fase">
            <p>fase</p>
        </div>

        <div class="periode">
            <p>Periode</p>
        </div>
    </div>
</template>

<script>

export default{
    data(){
        return{
         
        }
    }
}
</script>
<!-- https://stackoverflow.com/questions/61585411/pass-data-through-router-to-other-component-in-vue -->