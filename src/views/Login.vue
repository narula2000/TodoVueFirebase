<template>
  <div id="app">
    <v-app :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }" :dark="darkTheme" id="inspire">
      <v-container>
        <v-layout wrap>
          <v-flex sm12 md6 offset-md3>
            <v-card elevation="4" light tag="section">
              <v-card-title>
                <v-layout align-center justify-space-between>
                  <v-img
                    alt="Vuetify Logo"
                    class="shrink mr-2"
                    contain
                    src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                    transition="scale-transition"
                    width="40"
                  />
                  <h3 class="headline">
                    {{ platformName }}
                  </h3>
                </v-layout>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <p>Sign in with your email and password:</p>
                <v-form>
                  <v-text-field outline label="Email" type="text" v-model="email"></v-text-field>
                  <v-text-field
                    outline
                    hide-details
                    label="Password"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
                <v-btn color="info" :large="$vuetify.breakpoint.smAndUp">
                  <v-icon left>mdi-account</v-icon>
                  Register
                </v-btn>
                <v-spacer></v-spacer>
                <button v-on:click="googleLogin" class="social-button">
                  <img alt="Google Logo" src="../assets/google-logo.png" />
                </button>
                <v-spacer></v-spacer>
                <v-btn color="info" :large="$vuetify.breakpoint.smAndUp" v-on:click="login">
                  <v-icon left>mdi-lock</v-icon>
                  Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

const auth = firebase.auth();

export default {
  data() {
    return {
      darkTheme: true,
      platformName: 'Todo App',
      password: null,
      email: null,
      error: null
    };
  },
  methods: {
    async login() {
      console.log(this.email, this.password);
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);
        if (response) {
          await this.$store.dispatch('auth/setAuthenticatedUser', response.user);
          this.$nextTick(() => {
            this.$router.push('todo');
          });
        }
      } catch (e) {
        this.error = true;
      }
    },
    async googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      try {
        const response = await auth.signInWithPopup(provider).then(this.$router.push('todo'));
        if (response) {
          await this.$store.dispatch('auth/setAuthenticatedUser', response.user);
          this.$nextTick(() => {
            this.$router.push('todo');
          });
        }
      } catch (e) {
        this.error = true;
      }
    }
  }
};
</script>

<style scoped>
.v-btn,
.v-card {
  border-radius: 4px;
}
.v-card__title {
  text-transform: uppercase;
}

.social-button {
  width: 75px;
  background: white;
  padding: 11.8px 10px 8.2px 10px;
  border-radius: 100%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  outline: 0;
  border: 0;
}
.social-button:active {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.social-button img {
  width: 100%;
}
</style>
