<template>
  <nav>
    <NavView :status='isLoggedIn'/>
    <router-link to="/profile"><img src="@/assets/icons/user.png" alt="mainLogo"></router-link>
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
    router.push("/");
  })
}

</script>
<script>
import NavView from '@/components/NavView.vue'


export default {
  components: {
    NavView,
  },
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
    max-width: 80%;
    margin: auto;
    background: #ffffff;
    font-family: museo-sans,sans-serif;
    font-weight: 500;
    font-style: normal;
  }
  nav{
    font-family: "Blaak-bold";
  }
</style>