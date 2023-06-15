import { createRouter, createWebHashHistory } from 'vue-router';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { 
      path: "/",
      component: () => import("../views/HomeView.vue"),
      meta:{
        breadcrumb: "Home"
      }
    },
    { path: "/register", component: () => import("../views/RegisterView.vue")},
    { path: "/login", component: () => import("../views/LogInView.vue")},
    { 
      path: "/our-company",
      component: () => import("../views/OurCompanyView.vue"),
      meta: {
        requiresAuth: true,
        breadcrumb: "Ons bedrijf"
      }
    },
    { 
      path: "/register-next",
      component: () => import("../views/RegisterNextView.vue"),
      meta: {
        requiresAuth: true,
        breadcrumb: "Registreren"
      }
    },
    { 
      path: "/vragen/:id",
      component: () => import("../views/DetailOfferView.vue"),
      meta: {
        requiresAuth: true,
        breadcrumb: "Vraag detail"
      }
    },
    { 
      path: "/vragen",
      component: () => import("../views/OfferView.vue"),
      meta: {
        requiresAuth: true,
        breadcrumb: "Vragen"
      },
    },
    { 
      path: "/aanbod",
      component: () => import("../views/AanbodView.vue"),
      meta: {
        requiresAuth: true,
        breadcrumb: "Aanboden"
      },
    },
    { 
      path: "/aanbod/:id",
      component: () => import("../views/DetailAanbodView.vue"),
      meta: {
        requiresAuth: true,
        breadcrumb: "Aanbod detail"
      },
    },
    { 
      path: "/bedrijven-bekijken",
      component: () => import("../views/CompaniesView.vue"),
      meta: {
        requiresAuth: true,
        breadcrumb: "Bekijk bedrijven"
      }
    },
    { 
      path: "/ons-bedrijf/:id",
      component: () => import("../views/OurCompanyView.vue"),
      meta: {
        requiresAuth: true,
        breadcrumb: "Ons bedrijf"
      },
    },
    { 
      path: "/historiek",
      component: () => import("../views/HistoriekView.vue"),
      meta: {
        requiresAuth: true,
        breadcrumb: "Historiek"
      }
    },
    { 
      path: "/:pathMatch(.*)*",
      name: "PageNotFound",
      component: () => import("../views/PageNotFound.vue"),
    },
    {
      path: "/profile/:id",
      name: "profile-details",
      component: () => import("../views/ProfileView.vue"),
      meta: {
        requiresAuth: true,
        breadcrumb: "Profiel"
      }
    },
    // {
    //   path: "/vraag-docent/:id",
    //   name: "docent-details",
    //   component: () => import("../views/ProfileView.vue"),
    //   meta: {
    //     requiresAuth: true,
    //   }
    // }
  ]
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next) => {
  if(to.matched.some((record) => record.meta.requiresAuth)){
    if(await getCurrentUser()){
      next();
    } else{
      alert("You don't have access to this page");
      next("/login")
    }
  } else{
    next();
  }
});


export default router
