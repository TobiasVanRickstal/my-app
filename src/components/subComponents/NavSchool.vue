<template>
    <div class="logged-in-nav">
        <div class="nav-logo">
            <router-link to="/" class="home no-active"><img src="../../assets/icons/home.png" alt="mainLogo"></router-link>
        </div>
        <div class="nav-options">
            <router-link to="/vragen" class="button">Vraag</router-link>
            <router-link to="/aanbod" class="button">Aanbod</router-link>        
        </div>
        <div class="nav-options-right">
            <router-link to="/bedrijven-bekijken">Bedrijven</router-link>
            <router-link to="/historiek">Historiek</router-link>
        </div>
        <div class="nav-options-user">
            <router-link :to="`/profile/${user}`" class="no-active"><img src="@/assets/icons/user.png" class="hide" alt="mainLogo"><img src="@/assets/icons/user-orange.png" class="show" alt="mainLogo"></router-link>
            <!-- <a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Freepik - Flaticon</a> -->
        </div>
    </div>
</template>
<script>
export default{
    props:{
        user: Number
    },
}
</script>