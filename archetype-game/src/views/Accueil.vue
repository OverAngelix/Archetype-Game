<template>
  <div>
    <div class="row justify-content-center">
      <ul
        class="listePersonnes col-1"
        v-for="(personne, index) in p"
        :key="index"
      >
        <li class="list-group-item active" v-if="personne.user == user">
          {{ personne.user }}
        </li>
        <li class="list-group-item" v-else>
          {{ personne.user }}
        </li>
      </ul>
    </div>
    <div class="row pt-5 pl-3">
      <div class="col-md-9"></div>
      <div class="col-md-3">
        <perfect-scrollbar id="ps-container">
          <div class="messages" v-for="(msg, index) in messages" :key="index">
            <p>
              <span class="font-italic">{{ msg.timeInfo }}: </span>
              <span class="font-weight-bold">{{ msg.user }}: </span>
              {{ msg.message }}
            </p>
          </div>
        </perfect-scrollbar>
        <form @submit.prevent="sendMessage">
          <div class="gorm-group">
            <input type="text" v-model="message" class="form-control" />
          </div>
          <button type="submit" class="btn btn-success">Envoyer</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  data() {
    return {
      user: "",
      message: "",
      messages: [],
      p: [],
      socket: io("localhost:3001"),
    };
  },

  watch: {
    user(newuserName) {
      localStorage.username = newuserName;
    },
  },

  created() {
    window.addEventListener("beforeunload", () => this.beforeunloadFn());
  },

  destroyed() {
    window.removeEventListener("beforeunload", () => this.beforeunloadFn());
  },

  methods: {
    beforeunloadFn() {
      console.log(this.user);
      this.socket.emit("deconnexionServeur", {
        user: this.user,
      });
    },

    scrollToEnd() {
      setTimeout(() => {
        const container = document.getElementById("ps-container");
        container.scrollTop = container.scrollHeight;
      }, 0);
    },

    currentTime() {
      let today = new Date();
      let hours = today.getHours();
      let minutes = today.getMinutes();
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      return hours + ":" + minutes;
    },

    sendMessage(e) {
      if (this.message != "" && this.user != "") {
        e.preventDefault();

        this.socket.emit("SEND_MESSAGE", {
          user: this.user,
          message: this.message,
          timeInfo: this.currentTime(),
        });
        this.message = "";
      }
    },
  },

  mounted() {
    this.socket.on("MESSAGE", (data) => {
      this.messages = [...this.messages, data];
      this.scrollToEnd();
    });

    if (localStorage.username) {
      this.user = localStorage.username;
    }
    this.socket.emit("connexionServeur", {
      user: this.user,
    });

    this.socket.on("miseAJourChat", (data) => {
      this.messages = [];
      for (let i = 0; i < data.length; i++) {
        this.messages = [...this.messages, data[i]];
      }
    });

    this.socket.on("miseAJourPersonnes", (data) => {
      this.p = [];
      for (let i = 0; i < data.length; i++) {
        this.p = [...this.p, data[i]];
      }
    });
  },
};
</script>

<style >
.ps {
  height: 700px;
}
.listePersonnes {
  display: inline-block;
  margin: 0;
  padding: 0;
  text-align: center;
}
</style>