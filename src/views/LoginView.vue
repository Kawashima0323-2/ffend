<template>
  <v-app>
    <v-card width="400px" class="mx-auto mt-5">
      <v-card-title class="display-1"> ログイン </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            width="40px"
            prepend-icon="mdi-account-circle"
            label="ユーザ名"
            v-model="userId"
          />
          <v-text-field
            v-bind:type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            v-bind:append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            label="パスワード"
            @click:append-inner="showPassword = !showPassword"
            v-model="password"
          />
          <v-card-actions>
            <v-btn class="info" v-on:click="login()">ログイン</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-app>
</template>
  
  <script>
export default {
  name: "App",
  data: () => ({
    showPassword: false,
    userId: "",
    password: "",
  }),
  methods: {
    login() {
      this.$store.dispatch("login", {
        userId: this.userId,
        password: this.password,
      });

      //this.$router.push("/");
    },
  },
};
</script>