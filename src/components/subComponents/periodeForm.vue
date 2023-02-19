<template>
<div v-show="periodeSelected">
    <div class="select periodes">
        <label for="peroides">peroides</label>
        <select name="periodes" id="periodes" v-model="periodes.type">
            <option value="semester">semester</option>
            <option value="periode">periode</option>
            <option value="exacte datum">exacte datum</option>
            <option value="bepaalde week">bepaalde week</option>
            <option value="van - tot datum">van - tot datum</option>
        </select>
    </div>

    <div class="select semester" v-if="periodes.type == 'semester'">
        <label for="semester">semester</label>
        <select name="semester" id="semester" v-model="periodes.semester">
            <option value="1">semester 1</option>
            <option value="2">semester 2</option>
        </select>
    </div>
    <div class="select periode" v-if="periodes.type == 'periode'">
        <label for="periode">periode</label>
        <select name="periode" id="periode" v-model="periodes.periode">
            <option value="1">periode 1</option>
            <option value="2">periode 2</option>
            <option value="3">periode 3</option>
            <option value="4">periode 4</option>
        </select>
    </div>
    <div class="date exact"  v-if="periodes.type == 'exacte datum'">
        <label for="exacteDatum">exacte datum</label>
        <input type="date" name="exacteDatum" id="exacteDatum" v-model="periodes.exacteDatum">
    </div>
    <!-- extra uitleg -->
    <div class="date week" v-if="periodes.type == 'bepaalde week'">
        <label for="bepaaldeWeek">bepaalde week</label>
        <input type="date" name="bepaaldeWeek" id="bepaaldeWeek" v-model="periodes.bepaaldeWeek">
    </div>
    <div class="date beginEind" v-if="periodes.type == 'van - tot datum'">
        <label for="beginDatum">begin datum</label>
        <input type="date" name="beginDatum" id="beginDatum" v-model="periodes.beginDatum">
        <label for="eindDatum">eind datum</label>
        <input type="date" name="eindDatum" id="eindDatum" v-model="periodes.eindDatum">
    </div>
</div>
<div>
    <button v-show="periodeSelected" @click="showDetailModal()">Ok</button>
    <p v-show="!periodeSelected">geselecteerd: {{message}}</p>
    <button v-show="!periodeSelected" @click="periodeSelected = !periodeSelected">Verander</button>
</div>
    
</template>

<script>
export default{
    data(){
        return{
            periodes:{
                type: null,
                semester: null,
                periode: null,
                exacteDatum: null,
                bepaaldeWeek: null,
                beginDatum: null,
                eindDatum: null
            },
            periodeSelected: true,
            message: ""
        }
    },
    methods:{
        showDetailModal: function () {
            var data = []
            if(this.periodes.type){
                data.push(this.periodes.type)
            }
            if(this.periodes.semester){
                data.push(this.periodes.semester)
                this.periodes.semester = null
            }
            if(this.periodes.periode){
                data.push(this.periodes.periode)
                this.periodes.periode = null
            }
            if(this.periodes.exacteDatum){
                data.push(this.periodes.exacteDatum)
                this.periodes.exacteDatum = null
            }
            if(this.periodes.bepaaldeWeek){
                data.push(this.periodes.bepaaldeWeek)
                this.periodes.bepaaldeWeek = null
            }
            if(this.periodes.beginDatum){
                data.push(this.periodes.beginDatum)
                this.periodes.beginDatum = null
            }
            if(this.periodes.eindDatum){
                data.push(this.periodes.eindDatum)
                this.periodes.eindDatum = null
            }
            if(data.length > 1){
                this.$emit('clicked-show-detail', data);
                this.message  = data.toString()
                this.periodeSelected = false
            }
            
        }
    }
}
</script>