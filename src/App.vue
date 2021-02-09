<template>
  <v-app>
    <v-app-bar app color="primary" dark> </v-app-bar>

    <v-main>
      <!-- <HelloWorld/> -->
      <Login />
    </v-main>
  </v-app>
</template>

<script>
import Login from './views/Todo.vue';

export default {
  name: 'App',

  components: {
    Login
  },

  data: () => ({
    //
  })
};
</script>
