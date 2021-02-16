<template>
  <v-app id="inspire">
    <v-toolbar fixed>
      <v-toolbar-title>Todo App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn @click="drawer = !drawer" flat><v-icon>mdi-menu</v-icon></v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container style="height:2000px;"> </v-container>
    <v-navigation-drawer temporary v-model="drawer" light absolute>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
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
  }
};
</script>
