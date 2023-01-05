<template>
    <div class="typeBox">
        <div class="type">gastlessen</div>
        <div class="type">reeks</div>
        <div class="type">goodies</div>
        <div class="type">(les)materiaal</div>
        <div class="type">opdrachten</div>
        <div class="type">lezing</div>
        <div class="type">evenement</div>
    </div>
</template>

<style>
    .typeBox{
        background-color: grey;
        height: fit-content;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 10px;
    }
    .type{
        width: fit-content;
        flex: 2 3 15%;
        margin: 5px;
        padding: 5px;
        text-align: center;
        border: 1px solid black;
    }
</style>