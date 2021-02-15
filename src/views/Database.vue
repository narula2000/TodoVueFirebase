<template>
  <v-btn v-on:click="addData">
    add
  </v-btn>
</template>

<script>
import firebase from 'firebase/app';

const database = firebase.database();

export default {
  methods: {
    addData() {
      database
        .ref('tasks')
        .push()
        .set({
          data: String(new Date())
        });
    }
  }
};
</script>
