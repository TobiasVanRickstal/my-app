<template>
    <div>
        <div class="welcome">
            <h1>Welcome {{currentDocent.naam}}</h1>
        </div>
        <div class="profile-gegevens" v-show="!edit">
            <div>
                <h3>Naam:</h3>
                <h2>{{currentDocent.naam}}</h2>
            </div>
            <div>
                <h3>mail:</h3>
                <h2>{{currentDocent.mail}}</h2>
            </div>
            <div class="boolean">
                <h3 :class="(currentDocent.admin)?'class_if_is_true':'else_class'">admin</h3>
            </div>
            <div class="boolean">
                <h3 :class="(currentDocent.extern)?'class_if_is_true':'else_class'">extern</h3>
            </div>
        </div>
        <div class="profile-update" v-show="edit">
            <div>
                <p>Naam</p>
                <input type="text" v-model="currentDocent.naam">
            </div>
            <div>
                <p>Mail</p>
                <input type="text" v-model="currentDocent.mail">
            </div>
            <div>
                <p>Extern</p>
                <input type="checkbox" v-model="currentDocent.extern">
            </div>
            <div>
                <button @click="updateDocent">Opslaan</button>
                <button @click="back">Annuleer</button>
            </div>
        </div>
        <div class="acties" v-show="!edit">
            <button @click="edit = true">Bewerk gegevens</button>
            <router-link to="/">
                <button>bekijk mijn vacatures</button>
            </router-link>
            <button class="delete" @click="deleteDocent">Delete Account</button>
        </div>
        <p>{{message}}</p>
    </div>
</template>

<script>
import DocentDataService from '@/services/DocentDataService';

export default{
    data(){
        return{
            currentDocent: {},
            edit: false
        }
    },
    methods: {
        getDocent(id) {
            DocentDataService.get(id)
                .then(response => {
                    this.currentDocent = response.data;
                    console.log(response.data);
                    console.log(response.data.admin);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        updateDocent() {
            DocentDataService.update(this.currentDocent.id, this.currentDocent)
                .then(response => {
                    console.log(response.data);
                    this.message = 'The Docent was updated successfully!';
                    this.edit = false;
                })
                .catch(e => {
                    console.log(e);
                });
        },
        deleteDocent() {
           if (confirm("Ben je zeker?")){
                DocentDataService.delete(this.currentDocent.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "login" });
                })
                .catch(e => {
                    console.log(e);
                });
            }
        },
        back(){
            this.edit = false
        }
    },
    mounted() {
        this.getDocent(this.$route.params.id);
    }
}
</script>

<style>
.profile-gegevens, .profile-update{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
.profile-gegevens div:not(.boolean){
    margin: 15px auto;
    padding: 15px 5px;
    text-align: center;
    border: 1px solid black;
}
.profile-update div{
    margin: 15px auto;
    text-align: center;
}
.profile-update div p{
    margin-bottom: 5px;
}
.boolean{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px auto;
}
.boolean h3{
    padding: 10px;
}
.class_if_is_true{
    background-color: green;
    color: white;
}
.else_class{
    background-color: red;
}
.acties{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.acties button{
    width: fit-content;
    margin: 10px;
    padding: 15px 5px;
    border-radius: 10px;
    border: none;
}
.delete{
    background-color: red;
    color: white;
}
</style>