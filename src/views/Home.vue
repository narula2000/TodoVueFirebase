<template>
  <div class="home">
    <div id="nav">
      <router-link to="/">Home</router-link> | <router-link to="/login">Login</router-link> |
      <router-link to="/todo">Todo</router-link> |
      <router-link to="/register">Register</router-link>
    </div>
    <HelloWorld />
  </div>
</template>

<script>
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
