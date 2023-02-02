<template>
  <v-app>
    <v-card width="400px" class="mx-auto mt-5">
      <v-card-title class="display-1"> 新規会員登録 </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            width="40px"
            prepend-icon="mdi-account-circle"
            label="ユーザー名"
            v-model="userName"
          />
          <v-text-field
            width="40px"
            prepend-icon="mdi-mail"
            label="メールアドレス"
            v-model="mailAddress"
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
            <v-btn class="info" v-on:click="newMember()">登録</v-btn>
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
    userName:"",
    mailAddress: "",
    password: "",
  }),
  methods: {
    async newMember() {
    
       await this.$store.dispatch("newMember", {
        userName: this.userName,
        mailAddress: this.mailAddress,
        password: this.password,
      });
      if(this.$store.state.isLogin){
      console.log(this.$store.state.isLogin)
        this.$router.push("/calendar");
      }
    },
  },
};
</script>