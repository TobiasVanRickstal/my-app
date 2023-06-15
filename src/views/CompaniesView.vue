<template>
   <div class="bedrijven">
        <div class="bedrijf" :id="bedrijf.naam" v-for="(bedrijf, index) in bedrijven" :key="index">
            <div class="logo">
                <img class="bedrijf-img" :class="{activeButton: showMore[index]}"  @click="showMore[index] =  !showMore[index]" :src="getBedrijfImage(bedrijf.naam)" :alt="bedrijf.naam">
                <h2 v-show="showMore[index]">{{bedrijf.naam}}</h2>
                <div class="beschrijving" v-show="showMore[index]">
                    <p>{{bedrijf.beschrijving}}</p>
                </div>
            </div>
            <div class="personen" v-show="showMore[index]">
                <!-- TODO werknemers tonen van dit bedrijf, BUGGINGGS -->
                <div class="persoon" v-for="werknemer in getCorrectWerknemers(bedrijf.id)" :key="werknemer.id">
                    <div class="personen-foto"><img src="../assets/bedrijven/profile.jpg" alt=""></div>
                    <div class="personen-info">
                        <p>{{werknemer.naam}}</p>
                        <p>{{werknemer.specialisatie}}</p>
                        <p>{{werknemer.telefoon}}</p>
                    </div>
                </div>
            </div>
            <button class="button" @click="showMoreWerknemers" v-show="showMore[index]"  v-if="getCorrectWerknemers(bedrijf.id).length >= aantalWerknemers">Meer</button>
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
            <button class="button" v-show="showMore[index]" @click="showMore[index] =  !showMore[index]"><span>Sluiten</span></button>
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
            aantalWerknemers: 4
        }
    },
    methods:{
        async getWerknemers(){
            try {
                const response = await WerknemerDataService.getAll();
                this.werknemers = response.data
                // console.log(response.data)
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
        },
        showMoreWerknemers(){
            this.aantalWerknemers += 4
        }
    },
    computed: {
        getCorrectWerknemers() {
            return (bedrijfId) => {
                return this.werknemers.filter((werknemer) => werknemer.bedrijfId === bedrijfId).slice(0, this.aantalWerknemers);
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