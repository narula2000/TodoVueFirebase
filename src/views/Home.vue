<template>
  <div class="home">
    <div id="nav">
      <router-link to="/">Home</router-link> | <router-link to="/login">Login</router-link> |
      <router-link to="/todo">Todo</router-link>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
};
</script>

<style scoped>
#nav {
  padding: 30px;
  text-align: center;
}
</style>
