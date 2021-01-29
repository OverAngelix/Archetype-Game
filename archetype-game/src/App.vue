<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Accueil msg="Mon application" />
  </div>
</template>

<script>
import Accueil from "./components/Accueil.vue";

export default {
  name: "App",
  components: {
    Accueil,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
