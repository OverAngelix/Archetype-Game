<template>
  <div class="row">
    <div class="col-md-9">
      <form @submit.prevent="connexion">
        <div class="gorm-group">
          <label for="user">Nom d'utilisateur:</label>
          <input type="text" v-model="user" class="form-control" />
        </div>
        <button type="submit" class="btn btn-success">Envoyer</button>
      </form>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  data() {
    return {
      user: "",
    };
  },

  methods: {
    connexion(e) {
      if (this.user != "") {
        e.preventDefault();
        localStorage.username = this.user;
      }
    },
  },

  mounted() {
    if (localStorage.username) {
      this.user = localStorage.username;
    }
  },
};
</script>
