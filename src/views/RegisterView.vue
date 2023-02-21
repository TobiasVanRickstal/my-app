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
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {useRouter} from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Succesfully registered!")
      router.push("/")
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    })
}
</script>
