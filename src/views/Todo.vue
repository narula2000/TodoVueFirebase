<template>
  <div id="app">
    <v-app>
      <v-main>
        <v-container style="max-width: 500px">
          <v-text-field v-model="task" label="What need to be done?" solo @keydown.enter="create">
            <v-fade-transition slot="append">
              <v-icon v-if="task" @click="create">
                mdi-plus-circle-outline
              </v-icon>
            </v-fade-transition>
          </v-text-field>

          <h2 class="display-1 success--text pl-3">
            Tasks:&nbsp;
            <v-fade-transition leave-absolute>
              <span :key="`tasks-${tasks.length}`">
                {{ tasks.length }}
              </span>
            </v-fade-transition>
          </h2>

          <v-divider class="mt-3"></v-divider>

          <v-layout my-1 align-center>
            <strong class="mx-3 info--text text--darken-3">
              Remaining: {{ remainingTasks }}
            </strong>

            <v-divider vertical></v-divider>

            <strong class="mx-3 black--text"> Completed: {{ completedTasks }} </strong>

            <v-spacer></v-spacer>

            <v-progress-circular :value="progress" class="mr-2"></v-progress-circular>
          </v-layout>

          <v-divider class="mb-3"></v-divider>

          <v-card v-if="tasks.length > 0">
            <v-slide-y-transition class="py-0" group tag="v-list">
              <template v-for="(task, i) in tasks">
                <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>

                <v-list-tile :key="`${i}-${task.text}`">
                  <v-list-tile-action>
                    <v-checkbox v-model="task.done" color="info darken-3">
                      <div
                        slot="label"
                        :class="(task.done && 'grey--text') || 'text--primary'"
                        class="ml-3"
                        v-text="task.text"
                      ></div>
                    </v-checkbox>
                    <v-icon v-on:click="removeTask(task)">
                      mdi-close
                    </v-icon>
                  </v-list-tile-action>

                  <v-spacer></v-spacer>

                  <v-scroll-x-transition>
                    <v-icon v-if="task.done" color="success" class="mx-5">
                      mdi-check
                    </v-icon>
                  </v-scroll-x-transition>
                </v-list-tile>
              </template>
            </v-slide-y-transition>
          </v-card>
          <br />
          <v-btn v-on:click="clearTask" v-if="tasks.length > 0">Clear</v-btn>
        </v-container>
      </v-main>
      <v-footer>
        <v-btn v-on:click="logout" align-right>
          Logout
        </v-btn>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/database';

export default {
  data() {
    return {
      tasks: null,
      task: null
    };
  },

  computed: {
    completedTasks() {
      return this.tasks.filter(task => task.done).length;
    },
    progress() {
      return (this.completedTasks / this.tasks.length) * 100;
    },
    remainingTasks() {
      return this.tasks.length - this.completedTasks;
    },
    activeTodos() {
      return this.tasks.filter(todo => !todo.done);
    }
  },

  methods: {
    create() {
      this.tasks.push({
        done: false,
        text: this.task
      });
      this.task = null;

      const database = firebase.database();

      database
        .ref('tasks/')
        .child(this.$store.state.auth.user.uid)
        .set({
          updatedAt: String(new Date()),
          uid: String(this.$store.state.auth.user.uid),
          tasks: this.tasks
        });
    },
    clearTask() {
      this.tasks = this.activeTodos;

      const database = firebase.database();

      database
        .ref('tasks/')
        .child(this.$store.state.auth.user.uid)
        .set({
          updatedAt: String(new Date()),
          uid: String(this.$store.state.auth.user.uid),
          tasks: this.tasks
        });
    },
    removeTask(task) {
      const idx = this.tasks.indexOf(task);
      if (this.tasks.length > 1) {
        this.tasks.splice(idx, 1);
      } else {
        this.tasks = [];
      }

      const database = firebase.database();

      database
        .ref('tasks/')
        .child(this.$store.state.auth.user.uid)
        .set({
          updatedAt: String(new Date()),
          uid: String(this.$store.state.auth.user.uid),
          tasks: this.tasks
        });
    },
    logout() {
      this.$store.dispatch('auth/signOut');
      this.$router.push('home');
    }
  },
  created() {
    const path = 'tasks/'.concat(this.$store.state.auth.user.uid);
    const database = firebase.database();
    const ref = database.ref(path);

    let data;

    ref.on(
      'value',
      snap => {
        console.log('Data =>', snap.val());
        data = snap.val();
        if (data === null || data.tasks === undefined) {
          database
            .ref('tasks/')
            .child(this.$store.state.auth.user.uid)
            .set({
              updatedAt: String(new Date()),
              uid: String(this.$store.state.auth.user.uid)
            });
          this.tasks = [];
        } else {
          this.tasks = data.tasks;
        }
      },
      err => {
        console.log(err.code);
      }
    );
  }
};
</script>
