<template>
   <div class="bedrijven">
        <div class="bedrijf" id="capgemini">
            <div class="logo">
                <img src="../assets/capgemini-logo.jpg" alt="capgemini">
                <div class="beschrijving" v-show="showMoreCapgemini">
                    <p>Capgemini is een Frans consultancybedrijf, dat zijn werkgebied in de ICT en consultancy heeft. Wereldwijd bood de multinational in 2017 aan meer dan 195.000 mensen werk. Het hoofdkantoor van de Capgemini Group is gevestigd in Parijs.</p>
                </div>
            </div>
            <div class="personen">
                <div class="persoon" v-for="i in 6" :key="i">
                    <div class="personen-foto"><img src="../assets/bedrijven/profile.jpg" alt=""></div>
                    <div class="personen-naam">werknemer {{i}}</div>
                    <div class="personen-functie" v-show="showMoreCapgemini">functie</div>
                </div>
            </div>
            <div class="gegevens"  v-show="showMoreCapgemini">
                <div class="address">
                    <h3>address:</h3>
                    <div class="gegevens-straat">destraat 25</div>
                    <div class="gegevens-postcode">3000, Leuven</div>
                </div>
                <div class="economisch">
                    <h3>BTW:</h3>
                    <div class="gegevens-BTW">2561 48452 7875 4545</div>
                </div>
                
                <div class="contact">
                    <h3>contact gegevens:</h3>
                    <div class="gegevens-tel">+32/478 5500650</div>
                    <div class="gegevens-mail">teste@gidjsgsj.erkg</div>
                </div>
            </div>
            <button class="showMore button" :class="{activeButton: showMoreCapgemini}"  @click="showMoreCapgemini =  !showMoreCapgemini"><span v-show="!showMoreCapgemini">meer zien</span><span v-show="showMoreCapgemini">minder zien</span></button>
        </div>
   </div> 
</template>

<script>
export default{
    data(){
        return{
            showMoreCapgemini: false
        }
    },
    methods:{
        // showMore: function(thisID){
            
        // }
    }
}
</script>