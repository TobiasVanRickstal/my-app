<template>
    <div class="typeBox">
        <div class="type button" v-on:click="setActive('all')" :class="{ active: isActive('all') }">all</div>
        <div class="type button" v-for="bedrijf  in bedrijven" v-on:click="setActive(bedrijf.id)" :class="{ active: isActive(bedrijf.id) }">{{bedrijf.naam}}</div>
    </div>
</template>
<script>
import BedrijfDataService from '@/services/BedrijfDataService'

export default{
    data() {
        return { 
            activeItem: this.selectedBedrijf,
            filterBoxActive: false,
            bedrijf: "all",
            bedrijven: {}
        }
    },
    props:{
        selectedBedrijf:  String
    },
    methods: {
        isActive: function (menuItem) {
            return this.activeItem === menuItem
        },
        setActive: function (menuItem) {
            this.activeItem = menuItem // no need for Vue.set()
            this.$emit("clicked-show-detail", menuItem)
        },
        getBedrijven(){
            BedrijfDataService.getAll()
                .then(response => {
                    this.bedrijven = response.data;
                })
                .catch(e => {
                    console.log(e);
                });
        },
    },
    mounted(){
        this.getBedrijven();
    }
}
</script>
<!-- active class -->
<!-- https://forum.vuejs.org/t/how-to-make-a-component-with-menu-item-changing-css-to-active-when-clicked/3235/2 -->