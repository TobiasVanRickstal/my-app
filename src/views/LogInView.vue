<template>
  <div class="login">
    <h1>Aanmelden</h1>
    <form @keyup.enter="login">
    <input type="text" placeholder="Email" v-model="email">
    <input type="password" placeholder="Wachtwoord" v-model="password">
    <p class="error-message" v-if="errMsg">{{ errMsg }}</p>
    <button @click="login" class="button">Aanmelden</button>
  </form>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useRouter} from "vue-router";

const email = ref("");
const password = ref("");
const errMsg = ref();
const router = useRouter();

const login = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Succesfully signed in!")
      router.push("/")
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code){
        case "auth/invalid-email":
            errMsg.value = "Invalid email";
            break;
        case "auth/user-not-found":
            errMsg.value = "User not found";
            break;
        case "auth/wrong-password":
            errMsg.value = "Wrong password";
            break;
        default:
            errMsg.value = "Email or password are incorrect";
            break;
      }
    })
}
</script>