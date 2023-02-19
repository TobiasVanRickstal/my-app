import { createRouter, createWebHashHistory } from 'vue-router';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: () => import("../views/HomeView.vue")},
    { path: "/register", component: () => import("../views/RegisterView.vue")},
    { path: "/login", component: () => import("../views/LogInView.vue")},
    { 
      path: "/our-company",
      component: () => import("../views/OurCompanyView.vue"),
      meta: {
        requiresAuth: true,
      }
    },
    { 
      path: "/aanbods/:id",
      component: () => import("../views/OfferView.vue"),
      meta: {
        requiresAuth: true,
      }
    },
    { 
      path: "/ons-aanbod",
      component: () => import("../views/OurOfferView.vue"),
      meta: {
        requiresAuth: true,
      }
    },
    { 
      path: "/bedrijven-bekijken",
      component: () => import("../views/ViewCompaniesView.vue"),
      meta: {
        requiresAuth: true,
      }
    },
    // { 
    //   path: "/historiek",
    //   component: () => import("../views/history"),
    //   meta: {
    //     requiresAuth: true,
    //   }
    // },
    { 
      path: "/:pathMatch(.*)*",
      name: "PageNotFound",
      component: () => import("../views/PageNotFound.vue"),
    },
    {
      path: "/add",
      name: "add",
      component: () => import("../components/AddTutorial.vue")
    },
    {
      path: "/docents/:id",
      name: "docent-details",
      component: () => import("../views/ProfileView.vue"),
      meta: {
        requiresAuth: true,
      }
    },
    // {
    //   path: "/aanbod-docent/:id",
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
