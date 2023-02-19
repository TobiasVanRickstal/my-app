<template>
  <div class="register">
    <h1>Login</h1>
    <form @keyup.enter="login">
    <p><input type="text" placeholder="Email" v-model="email"></p>
    <p><input type="password" placeholder="Password" v-model="password"></p>
    <p class="error-message" v-if="errMsg">{{ errMsg }}</p>
    <button @click="register">Login</button>
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

const register = () => {
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