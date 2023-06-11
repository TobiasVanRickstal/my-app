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
                <h3 :class="(currentUser.bedrijf)?'class_if_is_true':'else_class'">{{bedrijf.naam}}</h3>
            </div>
            <div>
                <button class="button" @click="edit = true">Bewerk gegevens</button>
            </div>
        </div>
        <div class="profile-update" v-show="edit">
            <div class="inputFields">
                <div>
                    <p>Naam</p>
                    <input type="text" v-model="currentUser.naam">
                </div>
                <div>
                    <p>Mail</p>
                    <input type="text" v-model="currentUser.email">
                </div>
            </div>
            <div class="acties">
                <button class="button" @click="updateDocent">Opslaan</button>
                <button class="button"  @click="back">Annuleer</button>
            </div>
        </div>
        <div class="acties" v-show="!edit">
            <router-link to="/">
                <button class="button">Mijn vacatures</button>
            </router-link>
            <button class="delete button" @click="deleteDocent">Delete Account</button>
            <button class="logOut button" @click="handleSignOut">Uitloggen</button>
        </div>
        
        <p v-show="messageHide" :class="{ messageBlock: messageHide }">{{message}}</p>
    </div>
</template>

<script>
import DocentDataService from '@/services/DocentDataService';
import WerknemerDataService from '@/services/WerknemerDataService';
import { signOut, getAuth } from 'firebase/auth';
import router from '@/router';

export default{
    data(){
        return{
            currentUser: {},
            bedrijf: {},
            edit: false,
            messageHide: false,
        }
    },
    props: {
        docentAsUser: Boolean
    },
    methods: {
        getUser(id) {
            if(this.docentAsUser){
                DocentDataService.get(id)
                .then(response => {
                    this.currentUser = response.data;
                    // console.log(response.data);
                    console.log('DOCENT')
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
                    // console.log(response.data);
                    console.log('WERKNEMER')
                })
                .catch(e => {
                    console.log(e);
                });
            }
        },
        updateDocent() {
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
        }
    },
    mounted() {
        this.getUser(this.$route.params.id);
    }
}
</script>