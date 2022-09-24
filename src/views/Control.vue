<template>
  <div class="control">
    <v-container :style="status == 200 ? 'border: 1px solid red' : 'border: none '">
      <v-row>
          <v-col class="text-center mt-4">
              <h3>Panel de control</h3>
          </v-col>
      </v-row>
      <v-row> 
        <v-col cols="4" class="text-center">
          <v-btn @click="toVmix('TRINQUET')">TRINQUET</v-btn>
        </v-col>
        <v-col cols="4" class="text-center">
          <v-btn @click="toVmix('ROTULOS')">ROTULOS</v-btn>
        </v-col>
        <v-col cols="4" class="text-center">
          <v-btn @click="toVmix('ROTULOS 2 LINEAS')">HOMES BONS</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" v-for="jug in equip_roig" :key="jug.id" class="text-center">
          <v-btn class="red white--text" @click="toVmix(jug.nombre)">{{ jug.nombre }}</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" v-for="jug in equip_blau" :key="jug.id" class="text-center">
          <v-btn class="blue white--text" @click="toVmix(jug.nombre)">{{ jug.nombre }}</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-btn @click="toVmix('TRETA ROIG')">TRETA ROIG</v-btn>
        </v-col>
      </v-row>

    </v-container>
  </div>

</template>

<script>
const axios = require("axios").default

export default {
  data() {
      return {
        status: null
      }
  },

  computed: {
    url() {
      return this.$store.getters.url
    },
    equip_roig() {
      return this.$store.getters.equip_roig.filter(el => {
        return el.nombre != ""
      })
    },
    equip_blau() {
      return this.$store.getters.equip_blau.filter(el => {
        return el.nombre != ""
      })
    },
  },
  methods: {
    async toVmix (input) {
      let f = 'OverlayInput2'
      let dir = this.url +"API/?Function=" + f + "&Input=" + input
      const send = await axios.post(dir)
      .catch(err => {
        console.log("Error de conexión " + err)
      })
      this.status = send.status
    },
  }

}
</script>
    
<style>
    
</style>