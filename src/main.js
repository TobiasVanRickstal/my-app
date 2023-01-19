import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { initializeApp } from "firebase/app";
import '@/SCSS/main.scss';

const firebaseConfig = {
  apiKey: "AIzaSyD_jZ5rOzC9ukOExVcpBpMEnivVJxOjceU",
  authDomain: "schoolproject-e8e80.firebaseapp.com",
  projectId: "schoolproject-e8e80",
  storageBucket: "schoolproject-e8e80.appspot.com",
  messagingSenderId: "778479687645",
  appId: "1:778479687645:web:2359e33c719469f784c834"
};
initializeApp(firebaseConfig)
createApp(App).use(store).use(router).mount('#app')
