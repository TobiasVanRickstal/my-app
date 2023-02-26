<template>
    <div class="register">
        <h1>Register Aanvulling</h1>

        <form @keyup.enter="registerNext" class="register-next">
            <input type="text" placeholder="Naam" v-model="NewDocent.naam">
            <input type="text" placeholder="Email" v-model="NewDocent.mail">
            <div class="radio-buttons">
                <div>
                    <input type="radio" v-model="NewDocent.extern" value="false">
                    <label>Ik ben een docent</label>
                </div>
                <div>
                    <input type="radio" v-model="NewDocent.extern" value="true">
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

    export default{
        data(){
            return{
                NewDocent:{
                    naam: "",
                    mail: "",
                    extern: false
                },
                AdminAanvraag: false
            }
        },
        methods:{
            registerNext() {
                DocentDataService.create(this.NewDocent)
                    .then(response => {
                        console.log(response.data);
                        router.push("/")
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        }
    }
</script>