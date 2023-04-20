<template>
    <div class="typeBox">
        <div class="type button" v-on:click="setActive('all')" :class="{ active: isActive('all') }">all</div>
        <div class="type button" v-on:click="setActive('gastlessen')" :class="{ active: isActive('gastlessen') }">gastlessen</div>
        <div class="type button" v-on:click="setActive('reeks')" :class="{ active: isActive('reeks') }">reeks</div>
        <div class="type button" v-on:click="setActive('goodies')" :class="{ active: isActive('goodies') }">goodies</div>
        <div class="type button" v-on:click="setActive('(les)materiaal')" :class="{ active: isActive('(les)materiaal') }">(les)materiaal</div>
        <div class="type button" v-on:click="setActive('opdrachten')" :class="{ active: isActive('opdrachten') }">opdrachten</div>
        <div class="type button" v-on:click="setActive('lezing')" :class="{ active: isActive('lezing') }">lezing</div>
        <div class="type button" v-on:click="setActive('evenement')" :class="{ active: isActive('evenement') }">evenement</div>
    </div>
</template>
<script>

export default{
    data() {
        return { 
            activeItem: this.selectedType,
            filterBoxActive: false
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
        }
    },
}
</script>
<!-- active class -->
<!-- https://forum.vuejs.org/t/how-to-make-a-component-with-menu-item-changing-css-to-active-when-clicked/3235/2 -->