<template>
    <div class="our-company">
        <h1>Our Company</h1>
        <h2>{{bedrijf.naam}}</h2>
    </div>
</template>
<script>
import BedrijfDataService from '@/services/BedrijfDataService';
import WerknemerDataService from '@/services/WerknemerDataService';

export default{
    data(){
        return{
            bedrijf: {},
            werknemers: {}
        }
    },
    methods:{
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
        getAllWerknemers(id){
            if(id){
                WerknemerDataService.findAllByBedrijfId(id)
                .then(response => {
                    console.log(response.data)
                })
                .catch(e => {
                    console.log(e)
                })
            }
        }
    },
    created(){
        this.getBedrijf(this.$route.params.id);
    }
}
</script>