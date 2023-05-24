<template>
    <div class="typeBox">
        <div class="type button" v-on:click="setActive('all')" :class="{ active: isActive('all') }">all</div>
        <div class="type button" v-for="type  in types" v-on:click="setActive(type.id)" :class="{ active: isActive(type.id) }">{{type.naam}}</div>
    </div>
</template>
<script>
import TypeDataService from '@/services/TypeDataService'

export default{
    data() {
        return { 
            activeItem: this.selectedType,
            filterBoxActive: false,
            types: {}
        }
    },
    props:{
        selectedType:  String
    },
    methods: {
        isActive: function (menuItem) {
            return this.activeItem === menuItem
        },
        setActive: function (menuItem) {
            this.activeItem = menuItem // no need for Vue.set()
            this.$emit("clicked-show-detail", menuItem)
        },
        getTypes(){
            TypeDataService.getAll()
                .then(response => {
                    this.types = response.data;
                })
                .catch(e => {
                    console.log(e);
                });
        },
    },
    mounted(){
        this.getTypes();
    }
}
</script>
<!-- active class -->
<!-- https://forum.vuejs.org/t/how-to-make-a-component-with-menu-item-changing-css-to-active-when-clicked/3235/2 -->