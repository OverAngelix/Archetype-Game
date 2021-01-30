<template>
  <div class="card mt-3">
    <div class="card-body">
      <div class="card-title">
        <h3>Chat Group</h3>
        <hr />
      </div>
      <div class="card-body">
        <div class="messages" v-for="(msg, index) in messages" :key="index">
          <p>
            <span class="font-italic">{{ msg.timeInfo }}: </span>
            <span class="font-weight-bold">{{ msg.user }}: </span>
            {{ msg.message }}
          </p>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <form @submit.prevent="sendMessage">
        <div class="gorm-group">
          <label for="user">Nom d'utilisateur:</label>
          <input type="text" v-model="user" class="form-control" />
        </div>
        <div class="gorm-group pb-3">
          <label for="message">Message:</label>
          <input type="text" v-model="message" class="form-control" />
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
      if (this.message != "") {
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
