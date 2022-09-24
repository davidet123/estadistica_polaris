<template>
  <div class="config">
    <v-container fluid>
      <v-row>
        <v-col cols="6" class="px-6">
          <h3>Equip roig</h3>
          <v-divider></v-divider>
          <v-text-field v-for="(jug, index) in rojos" :key="jug.id"
          v-model="jug.nombre"
          :label="'Jug ' + (index + 1)">
            {{index}}
          </v-text-field>
          <v-text-field v-model="feridor_roig.nombre" label="Treta Roig"></v-text-field>
          <v-text-field v-model="caigudes_roig.nombre" label="Caigudes Roig"></v-text-field>
        </v-col>
        <v-col cols="6" class="px-6">
          <h3>Equip Blau</h3>
          <v-divider></v-divider>
          <v-text-field v-for="(jug, index) in blaus" :key="jug.id"
          v-model="jug.nombre"
          :label="'Jug ' + (index + 1)">
            {{index}}
          </v-text-field>
          <v-text-field v-model="feridor_blau.nombre" label="Treta blau"></v-text-field>
          <v-text-field v-model="caigudes_blau.nombre" label="Caigudes blau"></v-text-field>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="url" label="ip Vmix"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="server" label="ip Websocket"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-btn @click="update">ACTUALITZAR</v-btn>
        <v-btn @click="$router.push('/')"  class="mt-4">Tornar</v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rojos: [],
      blaus: [],
      feridor_roig: null,
      feridor_blau: null,
      caigudes_roig: null,
      caigudes_blau: null,
      url: null,
      server: null
    }
  },
  computed: {
    equip_roig() {
      return this.$store.getters.equip_roig
    },
    equip_blau() {
      return this.$store.getters.equip_blau
    },
    get_feridor_roig() {
      return this.$store.getters.feridor_roig
    },
    get_feridor_blau() {
      return this.$store.getters.feridor_blau
    },
    get_caigudes_roig() {
      return this.$store.getters.caigudes_roig
    },
    get_caigudes_blau() {
      return this.$store.getters.caigudes_blau
    },
    getUrl() {
      return this.$store.getters.url
    },
    getServer() {
      return this.$store.getters.server
    }
    
  },
  methods: {
    update() {
      let data = {rojos: this.rojos,
      blaus: this.blaus,
      feridors: [this.feridor_roig, this.feridor_blau],
      caigudes: [this.caigudes_roig, this.caigudes_blau],
      url: this.url,
      server: this.server
      }
      this.$store.commit("update_partida", data)
      this.$store.commit("save_state")
    }
  },
  created() {
    this.equip_roig.forEach(el => {
      this.rojos.push(el)
    });
    this.equip_blau.forEach(el => {
      this.blaus.push(el)
    });
    this.feridor_roig = this.get_feridor_roig
    this.feridor_blau = this.get_feridor_blau
    this.caigudes_roig = this.get_caigudes_roig
    this.caigudes_blau = this.get_caigudes_blau
    this.url = this.getUrl
    this.server = this.getServer
  }
}
</script>

<style>

</style>