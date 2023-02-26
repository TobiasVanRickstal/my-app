<template>
  <div class="register">
    <h1>Register</h1>
    <form @keyup.enter="register">
    <p><input type="text" placeholder="Email" v-model="email"></p>
    <p><input type="password" placeholder="Password" v-model="password"></p>
    <button @click="register" class="button">Register</button>
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

      signInWithEmailAndPassword(getAuth(), email.value, password.value)
      .then((data) => {
        console.log("Succesfully signed in!")
        router.push("/register-next")
      })
      .catch((error) => {
        console.log("something went wrong!")
      })
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
