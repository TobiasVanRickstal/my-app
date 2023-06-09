<template>
    <h1>historiek</h1>
    <HistoriekSchool v-if="docentAsUser"/>
    <HistoriekBedrijf v-else/>
    
</template>
<script>
import HistoriekSchool from '@/components/HistoriekSchool.vue';
import HistoriekBedrijf from '@/components/HistoriekBedrijf.vue';

export default{
    data(){
        return{

        }
    },
    props:{
        userId: {
            type: String, // Specify the prop type
            required: true // Set it as required if necessary
        },
        docentAsUser: Boolean
    },
    components:{
        HistoriekBedrijf,
        HistoriekSchool
    },
    created(){
        console.log(this.docentAsUser)
        console.log(this.userId)
    }
}
</script>