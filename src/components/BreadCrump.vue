<template>
    <nav class="breadcrumb">
      <ul>
        <li v-for="(item, index) in breadcrumbs" :key="index">
          <router-link :to="item.to">{{ item.label }}</router-link>
        </li>
      </ul>
    </nav>
  </template>
  
<script>
    import { router } from '../router';


    export default {
    computed: {
        breadcrumbs() {
            const matchedRoutes = this.$route.matched;
            const breadcrumbs = [];

            matchedRoutes.forEach(route => {
            if (route.meta && route.meta.breadcrumb) {
                breadcrumbs.push({
                label: route.meta.breadcrumb,
                to: route.path,
                });
            }
            });

            return breadcrumbs;
        },
        },
    };
</script>
  