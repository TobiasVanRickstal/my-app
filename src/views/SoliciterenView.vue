<template>
    <div class="soliciteren" id="bericht" style="display: flex; align-items: center; flex-direction:column;">
        <div class="top" style="text-align: center;">
            <h2 style="margin: 20px auto;">Solicitatie van {{user.naam}}</h2>
            <h3 style="text-decoration: underline;font-size:24px;">{{item.naam}}</h3>
            <h4 style="text-decoration: underline; margin-top: 5px;font-size:22px;">Van: {{maker.naam}}</h4>
        </div>
        <div class="informatie" style="text-align: center;margin-top: 40px;">
            <p>{{item.informatie}}</p>
            <p v-show="item.datum">{{item.datum}}</p>
        </div>
        <div class="input" style="display:flex; flex-direction: column; align-items: center;margin-top: 40px;">
            <p style="font-size: 16px;">Schrijf hier je bericht:</p>
            <p style="font-size: 16px;">Vergeet de belangrijke informatie niet mee te delen (datum, hoeveelheid, prijs, ...)</p>
            <textarea name="message" id="message" cols="80" rows="15" v-model="bericht"></textarea>
            <p>{{bericht}}</p>
        </div>
        <div class="send">
            <button class="button" style="margin-top: 20px;" @click="makeMessage">Klaar</button>
        </div>
    </div>
</template>

<script>
import AanbodsDataService from '@/services/AanbodsDataService';
import DocentDataService from '@/services/DocentDataService';
import VraagDataService from '@/services/VraagDataService';
import WerknemerDataService from '@/services/WerknemerDataService';

export default{
    data(){
        return{
            user:{},
            item:{},
            maker: "",
            bericht:"",
            mailtoLink: 'mailto:r0753448@student.thomasmore.be'
        }
    },
    props:{
        docentAsUser: Boolean,
        userId:  Number,
    },
    created(){
        console.log("docentAsUser : " +  this.docentAsUser)
    },
    methods:{
        createSolicitatie(id){
            console.log("docentAsUser : " +  this.docentAsUser)
            if(!this.docentAsUser){
                WerknemerDataService.get(this.userId)
                .then(response=>{
                    console.log(response.data)
                    this.user = response.data
                })
                .catch(e =>{
                    console.log(e)
                })

                VraagDataService.get(id)
                .then(response =>{
                    console.log(response.data)
                    this.item =  response.data
                    this.maker = response.data.docent
                })
                .catch(e =>{
                    console.log(e)
                })
            }
            else{
                DocentDataService.get(this.userId)
                .then(response =>{
                    console.log(response.data)
                    this.user = response.data
                })
                .catch(e =>{
                    console.log(e)
                })
                AanbodsDataService.get(id)
                .then(response =>{
                    console.log(response.data)
                    this.item = response.data
                    this.maker = response.data.werknemer
                })
                .catch(e=>{
                    console.log(e)
                })
            }
        },
        makeMessage(){
            if(confirm("Kijk je bericht nog even na, alles in orde?")){
                this.sendEmail()
            }
        },
        getHtmlContent(){
            const message = document.getElementById('message').value;
            if(this.docentAsUser){
                // const content = `
                //     <div class="soliciteren">
                //         <div class="top" style="text-align: center;">
                //             <h2 style="margin: 20px auto;">Solicitatie van ${this.user.naam}</h2>
                //             <a href="http://localhost:8081/#/aanbod/${this.item.id}" style="text-decoration: underline;font-size:24px;">${this.item.naam}</a>
                //             <h4 style="margin-top: 5px;font-size:20px;">Van: ${this.maker.naam}</h4>
                //         </div>
                //         <div class="informatie" style="text-align: center;margin-top: 40px;">
                //             <p>${this.item.informatie}</p>
                //             <p>${this.item.datum}</p>
                //         </div>
                //         <div class="input" style="margin-top:20px;">
                //             <p>Bericht:</p>
                //             <p>${message}</p>
                //         </div>
                //     </div>
                // `;
                const content = "Solicitatie van " + this.user.naam + "\n" +
                                "Titel vraag: " + this.item.naam + "\n\n" +
                                "Vraag aangemaakt door: " + this.maker.naam + "\n\n" +
                                this.item.datum + "\n\n" +
                                "Bericht van "+ this.user.naam+": " + message + "\n\n"+
                                "link naar de vraag: http://localhost:8081/#/vragen/"+this.item.id+ "\n\n";
                return content;
            }
            else{
                const content = "Solicitatie van " + this.user.naam + "\n" +
                                "Titel aanbod: " + this.item.naam + "\n\n" +
                                "Aanbod aangemaakt door: " + this.maker.naam + "\n\n" +
                                this.item.datum + "\n\n" +
                                "Bericht van "+ this.user.naam+": " + message + "\n\n"+
                                "link naar het aanbod: http://localhost:8081/#/aanbod/"+this.item.id+ "\n\n";
                return content;
            }
            
            
        },
        sendEmail() {
            const subject = 'Solicitatie van '+this.user.naam+', voor '+this.item.naam+' - user-id: ' +this.user.id+' vacature-id: '+this.item.id;
            const body = this.getHtmlContent();

            this.mailtoLink += '?subject=' + subject
            this.mailtoLink += '&body=' + encodeURIComponent(body)
            // const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            console.log(this.mailtoLink)
            window.location.href = this.mailtoLink;
        },
    },
    mounted(){
        this.createSolicitatie(this.$route.params.id)
    },
}
</script>