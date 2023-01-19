<template>
  <nav>
    <NavView :status='isLoggedIn'/>
    <router-link to="/profile" v-if="isLoggedIn"><img src="@/assets/icons/user.png" alt="mainLogo"></router-link>
    <button @click="handleSignOut" v-if="isLoggedIn">Sign out</button>
  </nav>
  <router-view/>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoggedIn = ref(false);

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if(user) {
      isLoggedIn.value = true;
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
}

</script>
<script>
import NavView from '@/components/NavView.vue'
import axios from 'axios';

export default {
  data(){
    return{
      info:[],
    }
  },
  components: {
    NavView,
  },
  methods:{
    getData(){
      axios.get('http://localhost:8080/#/php/config.php}')
            .then(function (response) {
              // handle success
              console.log(response.data);
              if(response.data.error){

              }
            })
            .catch(function (error) {
              // handle error
              console.log(error);
              console.log("error");
            })
            .finally(function () {
              // always executed
            });
    }
  },
  mounted:  function (){
    console.log('test voor')
    this.getData();
  }
  
//   data() {
//    return {
//      status: {
//        nav: 'not-logged-in'
//      }
//    }
//  }
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