<template>
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
            <option value="semester 1">semester 1</option>
            <option value="semester 2">semester 2</option>
        </select>
    </div>
    <div class="select periode" v-if="periodes.type == 'periode'">
        <label for="periode">periode</label>
        <select name="periode" id="periode" v-model="periodes.periode">
            <option value="periode 1">periode 1</option>
            <option value="periode 2">periode 2</option>
            <option value="periode 3">periode 3</option>
            <option value="periode 4">periode 4</option>
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
    <button @click="showDetailModal()">Ok</button>
</template>

<script>
export default{
    data(){
        return{
            periodes:{
                type: null,
                semseter: null,
                periode: null,
                exacteDatum: null,
                bepaaldeWeek: null,
                beginDatum: null,
                eindDatum: null
            }
        }
    },
    methods:{
        showDetailModal: function () {
            this.$emit('clicked-show-detail', this.periodes);
        }
    }
}
</script>