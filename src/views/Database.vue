<template>
  <div>
    <v-btn v-on:click="addData">
      add
    </v-btn>
    <v-btn v-on:click="fetchData">
      fetch
    </v-btn>
    <v-btn v-on:click="emptyData">
      add empty
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
        .ref('tasks/')
        .child(this.$store.state.auth.user.uid)
        .set({
          updatedAt: String(new Date()),
          uid: String(this.$store.state.auth.user.uid),
          tasks: [
            { done: false, text: 'hello' },
            { done: false, text: 'Hi' },
            { done: true, text: 'T-T' }
          ]
        });
    },
    emptyData() {
      database
        .ref('tasks/')
        .child(this.$store.state.auth.user.uid)
        .set({
          updatedAt: String(new Date()),
          uid: String(this.$store.state.auth.user.uid),
          tasks: []
        });
    },
    fetchData() {
      const path = 'tasks/'.concat(this.$store.state.auth.user.uid);
      const ref = database.ref(path);

      ref.on(
        'value',
        snap => {
          console.log(snap.val());
        },
        err => {
          console.log(err.code);
        }
      );
    }
  }
};
</script>
