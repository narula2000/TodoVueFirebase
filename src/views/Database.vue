<template>
  <div>
    <v-btn v-on:click="addData">
      add
    </v-btn>
    <v-btn v-on:click="updateData">
      update
    </v-btn>
  </div>
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
    },
    updateData() {
      database
        .ref('tasks')
        .child()
        .update({
          data: String(new Date())
        });
    }
  }
};
</script>
