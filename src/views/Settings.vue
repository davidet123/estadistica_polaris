<template>
  <v-container fluid >
    <v-row>
      <v-col cols="12" class="text-center" >
        <h1>Settings</h1>
        <v-btn @click="$router.push('/')"  class="mt-4">Tornar</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" class="text-center">
        <v-select
          v-model="tipo"
          :items="tipo_partida"
          item-text="TIpo partida"
          item-value="abbr"
          label="Select"
          persistent-hint
          return-object
          single-line
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      
      <v-col cols="6">
        <h4>Equip roig</h4>
        <span v-for="(jugador, index) in rojos" :key="jugador.id">
          <v-row>
            <v-col cols="9">
              <v-text-field
                v-model="rojos[index].nombre"
                :label="String(index+1)"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="rojos[index].tecla"
                label="Tecla"
              ></v-text-field>
            </v-col>
          </v-row>
        </span>
        <v-text-field
          v-model="treta_roig.nombre"
          label="Treta roig"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <h4>Equip blau</h4>
        <span v-for="(jugador, index) in blaus" :key="jugador.id">
          <v-row>
            <v-col cols="9">
              <v-text-field
                v-model="blaus[index].nombre"
                :label="String(index+1)"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="blaus[index].tecla"
                label="Tecla"
              ></v-text-field>
            </v-col>
          </v-row>
        </span>
        <v-text-field
          v-model="treta_blau.nombre"
          label="Treta blau"
        ></v-text-field>
      </v-col>
      <v-col cols="6" offset="3">
        <v-text-field
        v-model="url_vmix"
        label="URL VMIX"
        ></v-text-field>
        <v-text-field
        v-model="url_server"
        label="URL SERVER"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center" >
        <v-btn @click="aceptar" :disabled="tipo == null" color="success" class="mt-4">ACCEPTAR</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import io from "socket.io-client"


export default {
  data() {
    return {
      rojos: [],
      blaus: [],
      treta_roig: null,
      treta_blau: null,
      url_vmix: null,
      url_server: null,
      tipo_partida: ["Escala i corda", "Raspall", "Frontó", "Llargues"],
      tipo: null,
      imcremento: null
    }
  },

  computed: {
    equip_roig() {
      return this.$store.getters.equip_roig
    },
    equip_blau() {
      return this.$store.getters.equip_blau
    }
    
  },
  methods: {
    cargarDatos() {
      this.equip_roig.forEach(jug => {
        this.rojos.push(jug)
      });
      this.equip_blau.forEach(jug => {
        this.blaus.push(jug)
      });
      this.url_vmix = this.$store.getters.url
      this.url_server = this.$store.getters.url_server
      this.treta_roig = this.$store.getters.feridor_roig
      this.treta_blau = this.$store.getters.feridor_blau
      this.tipo = this.$store.getters.get_tipo
      console.log(this.treta_roig)
    },
    aceptar() {
      let jugadores = {rojos: this.rojos, blaus: this.blaus, url: this.url_vmix, server: this.url_server, treta_roig: this.treta_roig, treta_blau:this.treta_blau, tipo:this.tipo}

      this.$store.commit("set_state", jugadores)
      this.$store.commit("save_state")
      this.$router.push('/')
    }
  },
  created() {
    this.cargarDatos()
    this.socket = io(this.$store.getters.server)
  }

}
</script>

<style>
</style>