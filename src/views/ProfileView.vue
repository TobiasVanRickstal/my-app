<template>
    <div>
        <div class="welcome">
            <h1>Welcome {{currentUser.naam}}</h1>
        </div>
        <div class="profile-gegevens" v-show="!edit">
            <div>
                <h2>{{currentUser.naam}}</h2>
            </div>
            <div>
                <h2>{{currentUser.email}}</h2>
            </div>
            <div class="boolean">
                <h2 v-show="currentUser.admin">admin</h2>
            </div>
            <div class="boolean" v-if="!docentAsUser">
                <h2 @click="visitCompany(currentUser.bedrijf.id)" class="pointer">{{bedrijf.naam}}</h2>
            </div>
            <div>
                <button class="button" @click="edit = true">Bewerk gegevens</button>
            </div>
        </div>
        <p v-show="messageHide" :class="{ messageBlock: messageHide }">{{message}}</p>
        <div class="acties top" v-show="!edit">
            <button class="delete button" @click="deleteDocent">Delete Account</button>
            <button class="logOut button" @click="handleSignOut">Uitloggen</button>
        </div>
        <div class="profile-update" v-show="edit">
            <div class="inputFields">
                
                <div>
                    <div>
                        <p>Naam</p>
                        <input type="text" v-model="currentUser.naam">
                    </div>
                    <div>
                        <p>Mail</p>
                        <input type="text" v-model="currentUser.email">
                    </div>
                </div>
                <div v-if="currentUser.telefoon || currentUser.specialisatie">
                    <div v-if="currentUser.telefoon">
                        <p>Telefoon</p>
                        <input type="text" v-model="currentUser.telefoon">
                    </div>
                    <div v-if="currentUser.specialisatie">
                        <p>Specialisatie</p>
                        <input type="text" v-model="currentUser.specialisatie">
                    </div>
                </div>
            </div>
            <div class="acties">
                <button class="button" @click="updateUser">Opslaan</button>
                <!-- <button class="button"  @click="back">Annuleer</button> -->
            </div>
        </div>
        <div class="line" v-if="!edit && (aanbods.length || vragen.length)"></div>
        <div class="mijnBijdrages" v-show="!edit" v-if="aanbods.length || vragen.length">
            <div class="aanbods vragen">
                <div class="vraag"  v-if="vragen.length" v-for="vraag in getItems">
                    <router-link  :to="`/vragen/${vraag.id}`"><h2>{{vraag.naam}}</h2></router-link>
                    <p>{{vraag.solicitanten}}/{{vraag.views}} - {{vraag.status}}</p>
                </div>
                <div class="aanbod"  v-if="aanbods.length" v-for="aanbod in getItems">
                    <router-link  :to="`/aanbod/${aanbod.id}`"><h2>{{aanbod.naam}}</h2></router-link>
                </div>
            </div>
            <button class="button" @click="loadMore()" v-if="(vragen.length > aantalItems) || (aanbods.length > aantalItems)">
                Meer <span v-if="vragen.length">vragen</span><span v-if="aanbods.length">aanbods</span>
            </button>
        </div>
    </div>
</template>

<script>
import DocentDataService from '@/services/DocentDataService';
import WerknemerDataService from '@/services/WerknemerDataService';
import AanbodsDataService from '@/services/AanbodsDataService';
import VraagDataService from '@/services/VraagDataService';
import { signOut, getAuth } from 'firebase/auth';
import router from '@/router';

export default{
    data(){
        return{
            currentUser: {},
            bedrijf: {},
            edit: false,
            messageHide: false,
            vragen: {},
            aanbods: {},
            aantalItems: 5
        }
    },
    props: {
        docentAsUser: Boolean
    },
    computed:{
        getItems(){
            if(this.vragen.length){
                return  this.vragen.slice(0, this.aantalItems)
            }
            else{
                return  this.aanbods.slice(0, this.aantalItems)
            }
        }
    },
    methods: {
        getUser(id) {
            if(this.docentAsUser){
                DocentDataService.get(id)
                .then(response => {
                    this.currentUser = response.data;
                    console.log(response.data);
                    console.log('DOCENT')
                    this.getMijnVragen(id)
                })
                .catch(e => {
                    console.log(e);
                });
            }
            else{
                WerknemerDataService.get(id)
                .then(response => {
                    this.currentUser = response.data;
                    this.bedrijf = response.data.bedrijf
                    console.log(response.data);
                    console.log('WERKNEMER')
                    this.getMijnAanbods(id)
                })
                .catch(e => {
                    console.log(e);
                });
            }
        },
        updateUser() {
            if(this.docentAsUser){
                DocentDataService.update(this.currentUser.id, this.currentUser)
                .then(response => {
                    console.log(response.data);
                    this.messageHide = true
                    this.message = 'The Docent was updated successfully!';
                    this.edit = false;
                    setTimeout(() => this.messageHide = false, 2000)
                })
                .catch(e => {
                    console.log(e);
                });
            }
            else{
                WerknemerDataService.update(this.currentUser.id, this.currentUser)
                .then(response => {
                    console.log(response.data);
                    this.messageHide = true
                    this.message = 'The Werknemer was updated successfully!';
                    this.edit = false;
                    setTimeout(() => this.messageHide = false, 2000)
                })
                .catch(e => {
                    console.log(e);
                });
            }
            
        },
        deleteDocent() {
            if(this.docentAsUser){
                if (confirm("Ben je zeker?")){
                    DocentDataService.delete(this.currentUser.id)
                    .then(response => {
                        console.log(response.data);
                        this.$router.push({ name: "login" });
                    })
                    .catch(e => {
                        console.log(e);
                    });
                }
            }
            else{
                if (confirm("Ben je zeker?")){
                    WerknemerDataService.delete(this.currentUser.id)
                    .then(response => {
                        console.log(response.data);
                        this.$router.push({ name: "login" });
                    })
                    .catch(e => {
                        console.log(e);
                    });
                }
            }
        },
        back(){
            this.edit = false
            // TODO -> when annuleer -> don't take the changes
        },
        handleSignOut(){
            let auth = getAuth();
            console.log('handle sign out')
            signOut(auth)
            .then(() => {
                console.log('Auth sign out')
                router.push("/login")
                // window.location.reload();
            })
            .catch(e =>{
                console.log(e)
            })
        },
        visitCompany(id){
            this.$router.push('/ons-bedrijf/' +  id)
        },
        getMijnVragen(id){
            VraagDataService.findAllByDocentId(id)
            .then(response  =>{
                this.vragen = response.data
            })
            .catch(e =>{
                console.log(e)
            })
        },
        getMijnAanbods(id){
            AanbodsDataService.findAllByWerknemerId(id)
            .then(response  =>{
                this.aanbods = response.data
            })
            .catch(e =>{
                console.log(e)
            })
        },
        loadMore(){
            this.aantalItems += 5;
        }
    },
    mounted() {
        this.getUser(this.$route.params.id);
    }
}
</script>