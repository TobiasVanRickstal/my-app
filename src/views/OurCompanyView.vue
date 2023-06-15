<template>
    <div class="our-company">
        <div class="top" v-if="bedrijf.naam || !edit">
            <img :src="getBedrijfImage(bedrijf.naam)" alt="">
            <p v-if="!edit">{{bedrijf.beschrijving}}</p>
            <textarea v-if="edit" v-model="bedrijf.beschrijving" class="input beschrijving"></textarea>
        </div>
        <EditBedrijfWerknemers v-if="edit"/>
        <div class="line"></div>
        <h2>Werknemers</h2>
        <div class="personen" v-if="!edit">  
            <div class="persoon" v-for="werknemer in werknemers">
                <div class="personen-foto" :class="{admin : werknemer.admin}"><img src="../assets/bedrijven/profile.jpg" alt=""></div>
                <div class="personen-info">
                    <p>{{werknemer.naam}}</p>
                    <p>{{werknemer.specialisatie}}</p>
                    <p>{{werknemer.telefoon}}</p>
                </div>
                <div class="personen-edit">
                    <p>delete</p>
                    <p>edit</p>
                    <p>admin</p>
                </div>
            </div>
        </div>
        <div class="bewerk-personen">

        </div>
        <div class="bottom">
            <div class="contact">
                <h3>Contact:</h3>
                <p v-if="!edit">{{bedrijf.email}}</p>
                <input type="text" v-if="edit" v-model="bedrijf.email">
                <p v-if="!edit">{{bedrijf.BTW}}</p>
                <input type="text" v-if="edit" v-model="bedrijf.BTW">
            </div>
            <div class="address">
                <h3>Address:</h3>
                <p v-if="!edit">{{bedrijf.address}}</p>
                <input type="text" v-if="edit" v-model="bedrijf.address">
            </div>
        </div>
        <div class="bewerk" v-if="!docentAsUser && admin">
            <button class="button" @click="edit = !edit" v-if="!edit">Bewerk bedrijf</button>
            <button class="button" v-if="edit"  @click="updateBedrijf">Opslaan</button>
        </div>
    </div>
</template>
<script>
import BedrijfDataService from '@/services/BedrijfDataService';
import WerknemerDataService from '@/services/WerknemerDataService';

export default{
    data(){
        return{
            bedrijf: {},
            werknemers: {},
            admin:null,
            edit: false
        }
    },
    props:{
        docentAsUser: Boolean,
        userId: {
            type: String, // Specify the prop type
            required: true // Set it as required if necessary
        },

    },
    methods:{
        getUser(id){
            WerknemerDataService.get(id)
            .then(response => {
                if(response.data.admin){
                    this.admin = true
                }
                else{
                    this.admin = false
                }
            })
        },
        getBedrijf(id){
            console.log('test')
            if(id){
                BedrijfDataService.get(id)
                .then(response => {
                    console.log(response.data)
                    this.bedrijf = response.data
                    this.getAllWerknemers(id)
                })
                .catch(e => {
                    console.log(e)
                })
            }
            else{
                console.log(id)
            }
        },
        updateBedrijf(){
            BedrijfDataService.update(this.bedrijf.id,this.bedrijf)
            .then(response=>{
                console.log('updated')
                this.edit = false
            })
            .catch(e  =>{
                console.log(e)
            })
        },
        getAllWerknemers(id){
            if(id){
                WerknemerDataService.findAllByBedrijfId(id)
                .then(response => {
                    console.log(response.data)
                    this.werknemers = response.data
                })
                .catch(e => {
                    console.log(e)
                })
            }
        },
        getBedrijfImage(naam){
            return require(`../assets/bedrijven/${naam}/bedrijf.jpg`);
        },
    },
    created(){
        this.getBedrijf(this.$route.params.id);
        this.getUser(this.userId);
    }
}
</script>