<template>
    <div class="register">
        <h1>Register Aanvulling</h1>

        <form @keyup.enter="registerNext" class="register-next">
            <input type="text" placeholder="Naam" v-model="NewAccount.naam">
            <input type="text" placeholder="Email" v-model="NewAccount.email">
            <div class="radio-buttons">
                <div>
                    <input type="checkbox" v-model="extern" value="true">
                    <label>Ik ben een werknemer van een extern bedrijf</label>
                </div>
                    
            </div>
            <div class="extern" v-if="extern">
                <div>
                    <p>Medewerker  van dit bedrijf:</p>
                    <select name="bedrijf" id="bedrijf" v-model="NewAccount.bedrijfId">
                        <option v-for="bedrijf in bedrijven" :value="bedrijf.id">{{bedrijf.naam}}</option>
                    </select>
                    <p class="error-message">Als uw bedrijf hier niet tussenstaat, neem dan contact op met <a href="mailto:">geert@thomas.more</a></p>
                </div>
                <div>
                    <p>Dit is mijn  specialisatie:</p>
                    <input type="text" v-model="NewAccount.specialisatie">
                </div>
                <div>
                    <p>Telefoon:</p>
                    <input type="text" v-model="NewAccount.telefoon">
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
    import BedrijfDataService from "@/services/BedrijfDataService";
    
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
                    bedrijfId: "",
                    telefoon: ""
                    // Get eamil from logged in user!
                },
                extern: false,
                AdminAanvraag: false,
                bedrijven: {}
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
            },
            getBedrijven(){
                BedrijfDataService.getAll()
                    .then(response => {
                        this.bedrijven = response.data
                    })
                    .catch(e => {
                        console.log(e)
                    })

            }
            // TODO Adminlabel aanvragen => mail naar Geert.
        },
        mounted(){
            this.getBedrijven();
        }
    }
</script>