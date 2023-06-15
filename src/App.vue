<template>
  <nav>
    <template v-if="(userIsDocent !== null || !isLoggedIn)">
      <NavView :status="isLoggedIn" :navSelect="userIsDocent" :idUser="userId"/>
    </template>
  </nav>
  <BreadCrump/>
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
import BreadCrump from './components/BreadCrump.vue';

export default {
  data(){
    return{
      userId: null,
      userType: null
    }
  },
  components: {
    NavView,
    BreadCrump
  }
}
</script>