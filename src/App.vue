<template>
  <v-app>
    <v-app-bar app color="dark" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <v-spacer></v-spacer>
        <div id="nav" align-center center>
          <router-link to="/">Home</router-link> | <router-link to="/login">Login</router-link> |
          <router-link to="/todo">Todo</router-link> |
          <router-link to="/register">Register</router-link>
        </div>
      </div>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {};
  }
};
</script>

<style scoped>
#nav {
  text-align: right;
}
.v-application a {
  color: white;
}
</style>
