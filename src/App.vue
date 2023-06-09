<template>
  <nav>
    <template v-if="userIsDocent !== null">
      <NavView :status="isLoggedIn" :navSelect="userIsDocent" :idUser="userId"/>
    </template>
    <router-link :to="`/profile/${id}`" v-if="isLoggedIn"><img src="@/assets/icons/user.png" alt="mainLogo"></router-link>
    <button @click="handleSignOut" v-if="isLoggedIn">Sign out</button>
  </nav>
  <template v-if="(userIsDocent !== null || !isLoggedIn)">
    <router-view :user-id="userId" :docentAsUser="userIsDocent"/>
  </template>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import { useRouter } from 'vue-router';
import DocentDataService from './services/DocentDataService';
import WerknemerDataService from './services/WerknemerDataService';

const router = useRouter();
const isLoggedIn = ref(null);
const id = ref(null);
const userId = ref(null);
const userIsDocent = ref(null);

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if(user) {
      isLoggedIn.value = true;
      const email = user.email
      DocentDataService.findByEmail(email)
        .then(docentResponse => {
          if (docentResponse.data.length > 0) {
            var docent = docentResponse.data[0];
            id.value = docent.id;
            userIsDocent.value = true;
            console.log("ISDOCENT:::")
          } else {
            console.log("Email does not exist in Docent table");
            // console.log(email)
            return WerknemerDataService.findByEmail(email);
          }
        })
        .then(werknemerResponse => {
          if (werknemerResponse && werknemerResponse.data.length > 0) {
            var werknemer = werknemerResponse.data[0];
            // console.log(werknemerResponse.data)
            id.value = werknemer.id;
            userIsDocent.value = false;
          } else {
            console.log("Email does not exist in Werknemer table");
          }
        })
        .catch(error => {
          console.log("account was never updated,  go to  registerNext.view")
          console.log(error);
        });
    }
    else{
      isLoggedIn.value = false;
    }
  });
});


const handleSignOut = () => {
  console.log('handle sign out')
  signOut(auth).then(() => {
    console.log('Auth sign out')
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

export default {
  data(){
    return{
      userId: null,
      userType: null
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