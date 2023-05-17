<template>
    <div class="register">
        <h1>Register Aanvulling</h1>

        <form @keyup.enter="registerNext" class="register-next">
            <input type="text" placeholder="Naam" v-model="NewDocent.naam">
            <input type="text" placeholder="Email" v-model="NewDocent.email">
            <div class="radio-buttons">
                <div>
                    <input type="radio" v-model="extern" value="false">
                    <label>Ik ben een docent</label>
                </div>
                <div>
                    <input type="radio" v-model="extern" value="true">
                    <label>Ik ben een werknemer van een extern bedrijf</label>
                </div>
            </div>
            <div class="checkbox">
                <!-- TODO Verzend een mail met admin aanvraag -->
                <input type="checkbox" value="True" v-model="AdminAanvraag">
                <label>Vraag admin label aan</label>
            </div>
            <button @click="registerNext" class="button">Vervolledig mijn account</button>
        </form>
    </div>
</template>
  
<script>
    import router from "@/router";
    import DocentDataService from "@/services/DocentDataService";
    import WerknemerDataService from "@/services/WerknemerDataService"
    
    import { getAuth } from "firebase/auth";

    const auth = getAuth();
    const user = auth.currentUser;

    export default{
        data(){
            return{
                NewDocent:{
                    naam: "",
                    email: user.email,
                    // Get eamil from logged in user!
                },
                extern: false,
                AdminAanvraag: false,
                NewExtern:{
                    naam:  "",
                    email: user.email,
                    // TODO verder info aanvullen
                }
            }
        },
        methods:{
            registerNext() {
                if(this.AdminAanvraag){
                    alert("Je aanvraag om als admin verder te gaan is verzonden")
                }
                if(this.NewDocent.extern){
                    DocentDataService.create(this.NewDocent)
                        .then(response => {
                            console.log(response.data);
                            router.push("/")
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
                else{
                    WerknemerDataService.create(this.NewDocent)
                        .then(response => {
                            console.log(response.data);
                            router.push("/")
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
            }
            // TODO Adminlabel aanvragen => mail naar Geert.
        }
    }
</script>