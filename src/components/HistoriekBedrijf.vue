<template>
    <h1>Bedrijf historiek</h1>
    <div class="tables">
        <h3>Vragen van ons bedrijf</h3>

        <table>
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>informatie</th>
                <th>type</th>
                <th>topic</th>
                <th>vak</th>
                <th>status</th>
                <th>fase</th>
                <th>views</th>
                <th>solicitanten</th>
                <th>periode</th>
                <th>prijs</th>
                <th>docent</th>
                <th>werknemer</th>
                <th>bedrijf</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody  class="table-inhoud">
              <tr v-for="vraag in vragen" :key="vraag.id">
                    <td class="button-table"><router-link :to="`/vragen/${vraag.id}`">{{vraag.id}}</router-link></td>
                    <td>{{ vraag.naam }}</td>
                    <td>{{ vraag.informatie }}</td>
                    <td>{{ vraag.type.naam }}</td>
                    <td>{{ vraag.topic.naam }}</td>
                    <td>{{ vraag.vak.naam }}</td>
                    <td>{{ vraag.status }}</td>
                    <td>{{ vraag.fase }}</td>
                    <td>{{ vraag.views }}</td>
                    <td>{{ vraag.solicitanten }}</td>
                    <td>{{ vraag.periodes }}</td>
                    <td>{{ vraag.prijs }}</td>
                    <td>{{ vraag.docent.naam }}</td>
                    <td  v-if="vraag.werknemer">{{ vraag.werknemer.naam }}</td>
                    <td v-if="vraag.bedrijf">{{ vraag.bedrijf.naam }}</td>
                    <td>{{ vraag.status }}</td>
              </tr>
            </tbody>
          </table>
          
        <h3>Aanbod</h3>
        <table>
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>informatie</th>
                <th>status</th>
                <th>views</th>
                <th>prijs</th>
                <th>werknemer</th>
                <th>bedrijf</th>
                <th>docent</th>
              </tr>
            </thead>
            <tbody  class="table-inhoud">
              <tr v-for="aanbod in aanbods" :key="aanbod.id">
                    <td class="button-table"><router-link :to="`/aanbod/${aanbod.id}`">{{aanbod.id}}</router-link></td>
                    <td>{{ aanbod.naam }}</td>
                    <td>{{ aanbod.informatie }}</td>
                    <td>{{ aanbod.status }}</td>
                    <td>{{ aanbod.views }}</td>
                    <td>{{ aanbod.prijs }}</td>
                    <td>{{ aanbod.werknemer.naam }}</td>
                    <td>{{ aanbod.bedrijf.naam }}</td>
                    <td v-if="aanbod.docent">{{ aanbod.docent.naam }}</td>
              </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import AanbodsDataService from '@/services/AanbodsDataService';
import VraagDataService from '@/services/VraagDataService';
import WerknemerDataService from '@/services/WerknemerDataService';
export  default{
    data(){
        return{
            aanbods: {},
            vragen: {},
        }
    },
    methods:{
        getVragen(){
            console.log(this.user)
            VraagDataService.findAllByBedrijfId(this.$route.params.id)
            .then(response=>{
                this.vragen = response.data
            })
            .catch(e=>{
                console.log(e)
            })
        },
        getAanbods(){
            AanbodsDataService.findAllByBedrijfId(this.$route.params.id)
            .then(response=>{
                this.aanbods = response.data
            })
            .catch(e=>{
                console.log(e)
            })
        },
    },
    mounted(){
        this.getAanbods();
        this.getVragen();  
    }
}
</script>