<template>
    <div class="our-offer">
        <h1>Ons aanbod</h1>
    </div>

    <div class="filter-segment">
        <div class="add">
            <div class="add-icon" @click="addItem = !addItem"><span v-show="!addItem">+</span><span v-show="addItem">x</span></div>
        </div>
        <div class="filter" v-show="!addItem">
            <button @click="type = !type; filterBox = false">type</button>
            <button @click="filterBox = !filterBox; type = false">filter</button>
        </div>
    </div>
    <div class="form" v-show="addItem">
        <h2>Nieuw aanbod</h2>
        <Form/>
        <!-- TODO When submitted refresh page -->
    </div>
    <div class="typeSelect" v-if="type && !addItem && !filterBox">
        <TypeFilter/>
        <!-- TODO  when clicked on a type close -->
    </div>
    <div class="filterSelect" v-if="filterBox && !type && !addItem">
        <Filter/>
    </div>
    <div class="items" v-show="!addItem">
        <div class="item">
            <div class="difficulty diff3">
                <span class="circle"></span>
                <span class="circle"></span>
                <span class="circle"></span>
            </div>

            <div class="titel">
                <h2>Typography - how to?</h2>
            </div>

            <div class="beschrijving">
                <p>Voor IMD zijn we opzoek naar een typograaf die ...</p>
            </div>

            <div class="infographics">
                <div class="bekeken">
                    <span>12/50</span>
                </div>
                <div class="solicitanten">
                    <span>P P</span>
                </div>
                <div class="kostprijs">
                    <span>€ 200</span>
                </div>
            </div>
        </div>
        <div class="item">
            <div class="difficulty diff2">
                <span class="circle"></span>
                <span class="circle"></span>
            </div>

            <div class="titel">
                <h2>Typography - how to?</h2>
            </div>

            <div class="beschrijving">
                <p>Voor IMD zijn we opzoek naar een typograaf die ...</p>
            </div>

            <div class="infographics">
                <div class="bekeken">
                    <span>12/50</span>
                </div>
                <div class="solicitanten">
                    <span>P P</span>
                </div>
                <div class="kostprijs">
                    <span>€ 200</span>
                </div>
            </div>
        </div>
        <div class="item">
            <div class="difficulty diff1">
                <span class="circle"></span>
            </div>

            <div class="titel">
                <h2>Typography - how to?</h2>
            </div>

            <div class="beschrijving">
                <p>Voor IMD zijn we opzoek naar een typograaf die ...</p>
            </div>

            <div class="infographics">
                <div class="bekeken">
                    <span>12/50</span>
                </div>
                <div class="solicitanten">
                    <span>P P</span>
                </div>
                <div class="kostprijs">
                    <span>€ 200</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Form from '@/components/Form.vue';
import TypeFilter from '@/components/subComponents/TypeFilter.vue';
import Filter from '@/components/subComponents/Filter.vue';

export default{
    data(){
        return{
            addItem: false,
            type: false,
            filterBox: false
        }
    },
    components: {
        Form,
        TypeFilter,
        Filter
    }
}
</script>

<style scoped>
.filter-segment{
    margin: 50px auto 20px;
    width: 500px;
    display: flex;
    justify-content: space-between;
}
.filter{
    width: 33%;
    display: flex;
    justify-content: space-between;
}
.filter button{
    padding: 5px 15px;
    cursor: pointer;
}
.add-icon{
    padding: 4px 8px;
    background-color: grey;
    cursor: pointer;
}
.typeSelect, .filterSelect, .form{
    margin: auto;
    width: 500px;
}
.item{
    width: 500px;
    height: auto;
    margin: 20px auto;
    padding: 7px;
    background-color: grey;
    border: 1px solid black;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
}
.item div{
    margin: 5px 0px;
}
.difficulty{
    display: flex;
}
.circle{
    width: 10px;
    height: 10px;
    margin: auto 3px;
    border-radius: 100%;
}
.diff3 .circle{
    background-color: red;
}
.diff2 .circle{
    background-color: orange;
}
.diff1 .circle{
    background-color: green;
}
.infographics{
    width: 33%;
    display: flex;
    justify-content: space-between;
}
.infographics div span{
    padding: 4px 8px;
    background-color: darkslategrey;
}
</style>