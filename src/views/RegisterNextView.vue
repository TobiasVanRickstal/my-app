<template>
    <div class="register">
        <h1>Register Aanvulling</h1>

        <form @keyup.enter="registerNext" class="register-next">
            <input type="text" placeholder="Naam" v-model="NewAccount.naam">
            <input type="text" placeholder="Email" v-model="NewAccount.email">
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
            <div class="extern" v-show="extern">
                <div>
                    <p>Medewerker  van dit bedrijf:</p>
                    <select name="bedrijf" id="bedrijf" v-model="bedrijf">
                        <option value="bedrijf1">Bedrijf 1</option>
                        <option value="bedrijf2">Bedrijf 2</option>
                    </select>
                </div>
                <div>
                    <p>Dit is mijn  specialisatie:</p>
                    <input type="text" v-model="specialisatie">
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
                NewAccount:{
                    naam: "",
                    email: user.email,
                    specialisatie: "",
                    bedrijf: ""
                    // Get eamil from logged in user!
                },
                extern: false,
                AdminAanvraag: false,
            }
        },
        methods:{
            registerNext() {
                console.log(this.extern)
                if(this.AdminAanvraag){
                    alert("Je aanvraag om als admin verder te gaan is verzonden")
                }
                if(!this.extern){
                    DocentDataService.create(this.NewAccount)
                        .then(response => {
                            console.log(response.data);
                            router.push("/")
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
                else{
                    console.log(this.NewAccount)
                    WerknemerDataService.create(this.NewAccount)
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