<template>
    <h1>historiek</h1>
    <HistoriekSchool v-if="docentAsUser" :user="userId"/>
    <HistoriekBedrijf v-else :user="id"/>
    
</template>
<script>
import HistoriekSchool from '@/components/HistoriekSchool.vue';
import HistoriekBedrijf from '@/components/HistoriekBedrijf.vue';

export default{
    data(){
        return{
            id: ""
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
        this.id  = this.userId
        console.log(this.id)
    }
}
</script>