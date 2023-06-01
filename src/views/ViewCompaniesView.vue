<template>
   <div class="bedrijven">
        <div class="bedrijf" :id="bedrijf.naam" v-for="(bedrijf, index) in bedrijven" :key="index">
            <div class="logo">
                <img :src="getBedrijfImage(bedrijf.naam)" :alt="bedrijf.naam">
                <h2>{{bedrijf.naam}}</h2>
                <div class="beschrijving" v-show="showMore[index]">
                    <p>{{bedrijf.beschrijving}}</p>
                </div>
            </div>
            <div class="personen" v-show="showMore[index]">
                <!-- TODO werknemers tonen van dit bedrijf, BUGGINGGS -->
                <div class="persoon" v-for="werknemer in getCorrectWerknemers(bedrijf.id)" :key="werknemer.id">
                    <div>
                        <div class="personen-foto"><img src="../assets/bedrijven/profile.jpg" alt=""></div>
                        <div class="personen-naam">{{werknemer.naam}}</div>
                        <div class="personen-functie">{{werknemer.specialisatie}}</div>
                    </div>
                </div>
            </div>
            <div class="gegevens"  v-show="showMore[index]">
                <div class="address">
                    <h3>address:</h3>
                    <div class="gegevens-straat">destraat 25</div>
                    <div class="gegevens-postcode">3000, Leuven</div>
                </div>
                <div class="economisch">
                    <h3>BTW:</h3>
                    <div class="gegevens-BTW">{{bedrijf.BTW}}</div>
                </div>
                
                <div class="contact">
                    <h3>contact gegevens:</h3>
                    <div class="gegevens-tel">+32/478 5500650</div>
                    <div class="gegevens-mail">{{bedrijf.email}}</div>
                </div>
            </div>
            <button class="showMore[index] button" :class="{activeButton: showMore[index]}"  @click="showMore[index] =  !showMore[index]"><span v-show="!showMore[index]">meer zien</span><span v-show="showMore[index]">minder zien</span></button>
        </div>
   </div> 
</template>

<script>
import BedrijfDataService from '@/services/BedrijfDataService';
import WerknemerDataService from '@/services/WerknemerDataService';


export default{
    data(){
        return{
            werknemers: {},
            bedrijven: {},
            showMore:  [],
            // werknemers: 0
        }
    },
    methods:{
        async getWerknemers(){
            try {
                const response = await WerknemerDataService.getAll();
                this.werknemers = response.data
                console.log(response.data)
                // return response.data.length
            } catch (error) {
                console.log(error);
            }
        },
        async getBedrijven(){
            try {
                const response = await BedrijfDataService.getAll();
                this.bedrijven = response.data;
                // console.log(response.data)
                // TODO for each (this.getWerknemers(bedrijf.id))
                // TODO this.werknemers map bedrijf.id + werknemer
            } catch (error) {
                console.log(error);
            }
        },
        check(bedrijfId, id){
            if(bedrijfId === id){
                return true
            }
            else{
                return false
            }
        },
        getBedrijfImage(naam){
            return require(`../assets/bedrijven/${naam}/bedrijf.jpg`);
        }
    },
    computed: {
        getCorrectWerknemers() {
            return (bedrijfId) => {
                return this.werknemers.filter((werknemer) => werknemer.bedrijfId === bedrijfId);
            };
        }
    },
    mounted(){
        this.getBedrijven();
        this.getWerknemers();
        this.showMore = Array(this.bedrijven.length).fill(false);
    }
}
</script>