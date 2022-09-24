<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';
//import io from "socket.io-client"

export default {
  name: 'App',
  data() {
    return {
      /* socket: {} */
    }
  },

  components: {
    
  },

  created() {
      //this.socket = io(this.$store.getters.server)
      if(localStorage.getItem("rojos") || localStorage.getItem("blaus") || localStorage.getItem("feridors") || localStorage.getItem("caigudes") || localStorage.getItem("durades")) {
        console.log("loading state...")
        this.$store.commit("load_state")
      }
    },
  mounted() {
    /* this.socket.on("estadistica", data => {
      this.$store.commit("set_rojos", data.rojos)
      this.$store.commit("set_blaus", data.blaus)
      this.$store.commit("set_durada", data.durada)
      this.$store.commit("set_tretes", data.tretes)
      this.$store.commit("set_caigudes", data.caigudes)
      this.$store.commit("set_durades", data.durades)
      this.$store.commit("set_canvis_pilota", data.canvis_pilota)
      
    }) */
  }
};
</script>
