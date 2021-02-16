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
                <p>Register with your email and password:</p>
                <v-form>
                  <v-text-field outline label="Email" type="text" v-model="email"></v-text-field>
                  <v-text-field
                    outline
                    hide-details
                    label="Password"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                  <v-text-field
                    outline
                    hide-details
                    label="Confirm Password"
                    type="password"
                    v-model="conpassword"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
                <v-btn color="info" :large="$vuetify.breakpoint.smAndUp" v-on:click="register">
                  <v-icon left>mdi-account</v-icon>
                  Register
                </v-btn>
                <v-spacer></v-spacer>
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
      conpassword: null,
      email: null,
      error: null
    };
  },
  methods: {
    async register() {
      console.log(this.email, this.password);
      try {
        if (this.password !== this.conpassword) {
          throw new Error('Password and Confirmation password are not equal');
        }
        const response = await auth.createUserWithEmailAndPassword(this.email, this.password);
        if (response) {
          await this.$store.dispatch('auth/setAuthenticatedUser', response.user);
          this.$nextTick(() => {
            this.$router.push('login');
          });
        }
      } catch (e) {
        this.error = true;
        this.email = '';
        this.password = '';
        this.conpassword = '';
        // eslint-disable-next-line
        alert('Oops. ' + e.message);
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
</style>
