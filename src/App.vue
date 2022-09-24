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
      if(localStorage.getItem("rojos") && JSON.parse(localStorage.getItem("rojos")).length != 0) {
        this.$store.commit("load_state")
      } else {
        this.$store.commit("reset")
        this.$store.commit("save_state")
        console.log("reset")
      }
    },
  mounted() {
    this.socket.on("estadistica", data => {
      this.$store.commit("set_rojos", data.rojos)
      this.$store.commit("set_blaus", data.blaus)
      this.$store.commit("set_durada", data.durada)
      this.$store.commit("set_tretes", data.tretes)
      this.$store.commit("set_caigudes", data.caigudes)
      this.$store.commit("set_durades", data.durades)
      this.$store.commit("set_canvis_pilota", data.canvis_pilota)
      this.$store.commit("set_marcador", data.marcador)
      this.$store.commit("set_marcador_temp", data.marcador_temp)
      this.$store.commit("set_pilotes_val", data.pilotes_val)
      this.$store.commit("set_tipo", data.tipo)
      
    })
  }
};
</script>
