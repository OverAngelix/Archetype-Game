<template>
  <div class="row">
    <div class="col-md-9">
      <form @submit.prevent="sendMessage">
        <div class="gorm-group">
          <label for="user">Nom d'utilisateur:</label>
          <input type="text" v-model="user" class="form-control" />
        </div>
        <div class="gorm-group">
          <label for="message">Message:</label>
          <input type="text" v-model="message" class="form-control" />
        </div>
        <button type="submit" class="btn btn-success">Envoyer</button>
      </form>
    </div>
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
      socket: io("localhost:3001"),
    };
  },

  watch: {
    user(newuserName) {
      localStorage.username = newuserName;
    },
  },

  methods: {
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
    this.socket.emit("recuperationChat", {});

    this.socket.on("miseAJourChat", (data) => {
      this.messages = [];
      for (let i = 0; i < data.length; i++) {
        this.messages = [...this.messages, data[i]];
      }
    });
  },
};
</script>

<style >
.ps {
  height: 600px;
}
</style>