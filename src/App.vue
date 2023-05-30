<template>
  <nav>
    <NavView :status='isLoggedIn'/>
    <router-link :to="`/profile/${id}`" v-if="isLoggedIn"><img src="@/assets/icons/user.png" alt="mainLogo"></router-link>
    <button @click="handleSignOut" v-if="isLoggedIn">Sign out</button>
  </nav>
  
  <router-view :user-id="userId"/>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import { useRouter } from 'vue-router';
import DocentDataService from './services/DocentDataService';
// import WerknemerDataService from './services/WerknemerDataService';

const router = useRouter();
const isLoggedIn = ref(false);
const id = ref(null);
const userId = ref(null);

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if(user) {
      isLoggedIn.value = true;
      const email = user.email
      DocentDataService.findByEmail(email)
        .then(response => {
            var docent = response.data
            id.value = docent[0].id        
        })
        .catch(e => {
            console.log(e);
        });
        // WerknemerDataService.findByEmail(email)
        //   .then(response => {
        //       var werknemer = response.data
        //       id.value = werknemer[0].id        
        //   })
        //   .catch(e => {
        //       console.log(e);
        //   });
    }
    else{
      isLoggedIn.value = false;
    }
  });
});


const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/login");
  })
};

watch(id, (newValue) => {
  userId.value = newValue;
});

onMounted(() => {
  console.log(userId.value);
});

</script>

<script>
import NavView from '@/components/NavView.vue'
import WerknemerDataService from './services/WerknemerDataService';

export default {
  data(){
    return{
      userId: null
    }
  },
  components: {
    NavView,
  }
}
</script>

<style>
  @font-face {
    font-family: "Blaak-bold";
    src: local("Blaak-bold"),
    url(../src/fonts/BlaakBold_PERSONAL.ttf) format("truetype");
  }
  *{
    margin: 0;
    padding: 0;
  }
  body{
    max-width: 70%;
    margin: auto;
    background: #ffffff;
    font-family: museo-sans,sans-serif;
    font-weight: 500;
    font-style: normal;
  }
  nav{
    font-family: "Blaak-bold";
  }
  .body{
    width: 50%;
    margin: auto;
    text-align: center;
  }
  .form div:not(.insideDiv){
    width: 70%;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .form div label{
    margin-bottom: 15px;
    text-align: left;
  }
  .form div select,.form div input{
    padding: 5px;
  }
  img{
    width: 100%;
  }
</style>