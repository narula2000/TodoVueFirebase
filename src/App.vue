<template>
  <div>
    <v-app-bar width="100000%">
      <v-toolbar width="100000%" dark>
        <v-toolbar-title>Todo App</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-items>
          <v-btn @click="drawer = !drawer" flat><v-icon>mdi-menu</v-icon></v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container style="height:2000px;"> </v-container>
      <v-navigation-drawer temporary v-model="drawer" dark absolute>
        <v-list class="pt-0">
          <v-list-tile v-for="item in items" :key="item.idx" v-on:click="navigation(item.link)">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-divider></v-divider>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      drawer: false,
      items: [
        { title: 'Home', icon: 'mdi-view-dashboard', link: '/todo' },
        { title: 'About', icon: 'mdi-help-circle-outline', link: '/login' }
      ]
    };
  },
  methods: {
    navigation(link) {
      this.$router.push(link);
    }
  }
};
</script>
