<template>
  <v-main align="center">
    <v-row>
      <v-col>
        <h1>Resum partida</h1>
        <v-btn @click="$router.push('/')"  class="mt-4">Tornar</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h3>Últim colp : {{ text_durada }}</h3>
      </v-col>
    </v-row>
      <v-row>
        <v-col cols="3" v-for="jugador in total_jugadores(equip_roig)" :key="jugador.id">
          <v-card>
            <v-card-title class="red">
              <h4 class="mx-auto white--text">{{ jugador.nombre }}</h4>
            </v-card-title>
            <v-card-text >
              <p>Colps totals: {{ jugador.colps_totals }}</p>
              <p>Colps guanyadors: {{ jugador.colps_guanyadors }}</p>
              <p>Errades no forçades: {{ jugador.errades }}</p>
              <p>Efectivitat: {{ jugador.colps_guanyadors }} / {{ jugador.colps_totals }} ({{ calcPorcentaje(jugador.colps_guanyadors, jugador.colps_totals) }})</p>
              <p>Percentatge colps:  {{ jugador.colps_totals }} / {{ colps_totals_rojos }} ({{ calcPorcentaje(jugador.colps_totals, colps_totals_rojos) }})</p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="3" >
          <v-card>
            <v-card-title class="red">
              <h4 class="mx-auto white--text">{{ feridor_roig.nombre }}</h4>
            </v-card-title>
            <v-card-text >
              <p>Tretes directes: {{ feridor_roig.tretes_directes }}</p>
              <p>Errades de treta: {{ feridor_roig.errades_treta }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" v-for="jugador in total_jugadores(equip_blau)" :key="jugador.id">
          <v-card>
            <v-card-title class="blue">
              <h4 class="mx-auto white--text">{{ jugador.nombre }}</h4>
            </v-card-title>
            <v-card-text>
              <p>Colps totals: {{ jugador.colps_totals }}</p>
              <p>Colps guanyadors: {{ jugador.colps_guanyadors }}</p>
              <p>Errades no forçades: {{ jugador.errades }}</p>
              <p>Efectivitat: {{ jugador.colps_guanyadors }} / {{ jugador.colps_totals }} ({{ calcPorcentaje(jugador.colps_guanyadors, jugador.colps_totals) }})</p>
              <p>Percentatge colps:  {{ jugador.colps_totals }} / {{ colps_totals_rojos }} ({{ calcPorcentaje(jugador.colps_totals, colps_totals_blaus) }})</p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="3" >
          <v-card>
            <v-card-title class="blue">
              <h4 class="mx-auto white--text">{{ feridor_blau.nombre }}</h4>
            </v-card-title>
            <v-card-text >
              <p>Tretes directes: {{ feridor_blau.tretes_directes }}</p>
              <p>Errades de treta: {{ feridor_blau.errades_treta }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" offset="3" v-if="caigudes_flag">
          <v-card>
            <v-card-title >
              <h4 style="margin: 0 auto;">CAIGUDES</h4>
            </v-card-title>
            <v-card-text >
              <v-row>
                <v-col cols="6">
                  <p class="red white--text">{{ caigudes_roig.nombre }} </p>
                  <p>Caigudes: {{ caigudes_roig.quinzes}} / {{ caigudes_roig.caigudes}} ({{ calcPorcentaje(caigudes_roig.quinzes, caigudes_roig.caigudes) }})</p>
                </v-col>
                <v-col cols="6">
                  <p class="blue white--text">{{ caigudes_blau.nombre }} </p>
                  <p>Caigudes: {{ caigudes_blau.quinzes}} / {{ caigudes_blau.caigudes}} ({{ calcPorcentaje(caigudes_blau.quinzes, caigudes_blau.caigudes) }})</p>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-card>
            <v-card-title>
              <h4 style="margin: 0 auto;">DURADES DEL JOCS</h4>
            </v-card-title>
            <v-card-text>
              <p v-for="(temps, index) in durades" :key="index">
                Joc {{ index + 1 }}: {{ temps }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card>
            <v-card-title class="red">
              <h4 class="white--text mx-auto">EQUIP ROIG</h4>
            </v-card-title>
            <v-card-text>
              <p  class="text-left">Colps totals: {{ colps_totals_rojos }}</p>
              <p  class="text-left">Colps guanyadors: {{ colps_guanyadors_rojos }} </p>
              <p  class="text-left">Errades: {{ errades_rojos }} </p>
              <p  class="text-left">Tretes directes: {{ feridor_roig.tretes_directes }}</p>
              <p  class="text-left">Errades de treta: {{ feridor_roig.errades_treta }}</p>
              <p  class="text-left">Canvis de pilota: {{ canvis_pilota.rojos }}</p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card>
            <v-card-title class="blue">
              <h4 class="white--text mx-auto">EQUIP BLAU</h4>
            </v-card-title>
            <v-card-text>
              <p  class="text-left">Colps totals: {{ colps_totals_blaus }}</p>
              <p  class="text-left">Colps guanyadors: {{ colps_guanyadors_blaus }} </p>
              <p  class="text-left">Errades: {{ errades_blaus }} </p>
              <p  class="text-left">Tretes directes: {{ feridor_blau.tretes_directes }}</p>
              <p  class="text-left">Errades de treta: {{ feridor_blau.errades_treta }}</p>
              <p  class="text-left">Canvis de pilota: {{ canvis_pilota.blaus }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  </v-main>
</template>

<script>

import io from "socket.io-client"

export default {
  data() {
    return {
      socket: {},
      caigudes_flag: true
    }
  },
  computed: {
    durades() {
      return this.$store.getters.durades
    },
    equip_roig() {
      return this.$store.getters.equip_roig
    },
    equip_blau() {
      return this.$store.getters.equip_blau
    },
    feridor_roig() {
      return this.$store.getters.feridor_roig
    },
    feridor_blau() {
      return this.$store.getters.feridor_blau
    },
    caigudes_roig() {
      return this.$store.getters.caigudes_roig
    },
    caigudes_blau() {
      return this.$store.getters.caigudes_blau
    },
    colps_totals_rojos() {
      return this.$store.getters.colps_totals_rojos
    },
    colps_totals_blaus() {
      return this.$store.getters.colps_totals_blaus
    },
    url() {
      return this.$store.getters.url
    },
    colps_guanyadors_rojos() {
      let sum = 0
      this.equip_roig.forEach(jug => {
        sum += jug.colps_guanyadors
      })
      return sum
    },
    errades_rojos() {
      let sum = 0
      this.equip_roig.forEach(jug => {
        sum += jug.errades
      })
      return sum
    },
    colps_guanyadors_blaus() {
      let sum = 0
      this.equip_blau.forEach(jug => {
        sum += jug.colps_guanyadors
      })
      return sum
    },
    errades_blaus() {
      let sum = 0
      this.equip_blau.forEach(jug => {
        sum += jug.errades
      })
      return sum
    },
    text_durada() {
      return this.$store.getters.durada
    },
    canvis_pilota() {
      return this.$store.getters.canvis_pilota
    }
    
    
  },
  methods: {
    total_jugadores(equipo) {
      const total = equipo.filter(jug => {
        return jug.nombre != ""
      })
      return total
    },
    calcPorcentaje(a, b) {
      /* var val = (a / b) * 100
      return b != 0 ? val.toFixed(2) + "%" : "" */
      if(!a || !b) {
        return '-'
      } else {
        return b != 0 ? Math.round((a / b) * 100) + "%" : "-"
      }
    },
  },
  created() {
      this.socket = io(this.$store.getters.server)
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
      
    })
  }
}
  
</script>

<style>
</style>