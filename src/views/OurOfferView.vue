<template>
    <div class="our-offer">
        <h1>Ons aanbod</h1>
    </div>

    <div class="filter-segment">
        <div class="add">
            <div class="add-icon" @click="addItem = !addItem"><span v-show="!addItem">+</span><span v-show="addItem">x</span></div>
        </div>
        <div class="filter" v-show="!addItem">
            <button @click="type = !type">type</button>
            <button>filter</button>
        </div>
    </div>
    <div class="form" v-show="addItem">
        <h2>Nieuw aanbod</h2>
        <Form/>
        <!-- TODO When submitted refresh page -->
    </div>
    <div class="typeSelect" v-show="type">
        <TypeFilter @click="type = false"/>
        <!-- TODO  when clicked on a type close -->
    </div>
    <div class="items" v-show="!addItem">
        <div class="item">
            <div class="difficulty">
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
            <div class="difficulty">
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
    </div>
</template>

<script>
import Form from '@/components/Form.vue';
import TypeFilter from '@/components/subComponents/TypeFilter.vue';

export default{
    data(){
        return{
            addItem: false,
            type: false
        }
    },
    components: {
        Form,
        TypeFilter
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
.typeSelect, .form{
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
    background-color: red;
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