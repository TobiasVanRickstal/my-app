<template>
  <div class="register">
    <h1>Registreren</h1>
    <form @keyup.enter="register">
    <input type="text" placeholder="Email" v-model="email">
    <input type="password" placeholder="Wachtwoord" v-model="password">
    <button @click="register" class="button">Registreer</button>
    </form>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {useRouter} from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Succesfully registered!")

      login()
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    })
}
const login = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Succesfully signed in!")
      router.push("/register-next")
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
