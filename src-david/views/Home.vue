<template>
  <div class="home">
    <v-container fluid :style="status == 200 ? 'border: 1px solid red' : 'border: none '">
      <v-row>
        <v-col cols="12" class="text-center" >
          <h1>Estadística</h1>
          <v-btn @click="$router.push('/resum')"  class="mt-4">Resum</v-btn>
          <v-btn @click="$router.push('/config')"  class="mt-4">Config</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-center">
            <p>Durada del joc: {{ durada_joc_str }}</p>
          <v-btn @click="duradaJoc(true)" :disabled="durada_joc != null" class="mt-4">Iniciar</v-btn>
          <v-btn @click="duradaJoc(false)" :disabled="durada_joc == null" class="mt-4">Parar</v-btn>
          <v-btn @click="resetDurada()" :disabled="!reset_durada" class="mt-4">Reset</v-btn>
        </v-col>
      </v-row>
      <v-row >
        <v-col cols="5">
          <v-row class="px-2">
            <v-col cols="6">
              <h3>Equip roig</h3>
              <p>Colps totals: {{ colps_totals_rojos }}</p>
              <p>Guanyadors: {{ colps_guanyadors_rojos }}</p>
              <p>Errades: {{ errades_rojos }}</p>
            </v-col>
            <v-col cols="6">
              <h3>Equip blau</h3>
              <p>Colps totals: {{ colps_totals_blaus }}</p>
              <p>Guanyadors: {{ colps_guanyadors_blaus }}</p>
              <p>Errades: {{ errades_blaus }}</p>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="3" >
          <h3>Últim quinze</h3>          
          <h3>{{ text_durada }}</h3>          
        </v-col>
        <v-col cols="4" >
          <h3>Canvis de pilota</h3>
          <v-row>
            <v-col cols="6">
              <p>Equip roig: {{ canvis_rojos }}</p>
              <v-btn x-small @click="canvi_pilota_roig(1)">+</v-btn>
              <v-btn x-small @click="canvi_pilota_roig(-1)">-</v-btn>
            </v-col>
            <v-col cols="6">
              <p>Equip blau:  {{ canvis_blaus }}</p>
              <v-btn x-small @click="canvi_pilota_blau(1)">+</v-btn>
              <v-btn x-small @click="canvi_pilota_blau(-1)">-</v-btn>
            </v-col>
          </v-row>          
        </v-col>
      </v-row>
      <v-divider class="my-4"></v-divider>
      <v-row>
        <v-col cols="12" class="text-center">
          <v-btn @click="acabarQuinze()">Acabar quinze</v-btn>
        </v-col>
      </v-row>
      <v-row  justify="center">
        <v-col cols="3" v-for="jugador in equip_roig" :key="jugador.id">
            <EstJugador 
            :nombre="jugador.nombre"
            :colps="jugador.colps_guanyadors"
            :errades="jugador.errades" 
            :id="jugador.id"
            :colps_totals="jugador.colps_totals"
            :tecla="jugador.tecla"
            v-on:colpEst="estColpsRoig"
            v-on:erradaEst="estErradesRoig"/>
        </v-col>
        <v-col cols="3">
          <v-card>
            <v-card-title class="red">
              <h4 class="white--text">TRETES |  {{ feridor_roig.nombre }}</h4>
            </v-card-title>
            <v-card-text >
              <p class="pa-2">Tretes directes: <span class="font-weight-black">{{ feridor_roig.tretes_directes}}</span></p>
              <v-btn @click="tretaRoig(1)" x-small>+</v-btn>
              <v-btn @click="tretaRoig(-1)" x-small>-</v-btn>
              <p class="pa-2">Errades:  <span class="font-weight-black">{{ feridor_roig.errades_treta }}</span></p>
              <v-btn @click="erradatretaRoig(1)" x-small>+</v-btn>
              <v-btn @click="erradatretaRoig(-1)" x-small>-</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="3" v-for="jugador in equip_blau" :key="jugador.id">
            <EstJugador 
            :nombre="jugador.nombre"
            :colps="jugador.colps_guanyadors"
            :errades="jugador.errades"  
            :id="jugador.id"
            :colps_totals="jugador.colps_totals"
            :tecla="jugador.tecla"
            v-on:colpEst="estColpsBlau"
            v-on:erradaEst="estErradesBlau"/>
        </v-col>
        <v-col cols="3">
          <v-card>
            <v-card-title class="blue">
              <h4 class="white--text">TRETES |  {{ feridor_blau.nombre }}</h4>
            </v-card-title>
            <v-card-text >
              <p class="pa-2">Tretes directes: <span class="font-weight-black">{{ feridor_blau.tretes_directes}}</span></p>
              <v-btn @click="tretaBlau(1)" x-small>+</v-btn>
              <v-btn @click="tretaBlau(-1)" x-small>-</v-btn>
              <p class="pa-2">Errades:  <span class="font-weight-black">{{ feridor_blau.errades_treta}}</span></p>
              <v-btn @click="erradatretaBlau(1)" x-small>+</v-btn>
              <v-btn @click="erradatretaBlau(-1)" x-small>-</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="caigudes_flag">
        <v-col cols="3" offset="3">
          <v-card >
            <v-card-title class="red">
              <h4 class="white--text" >CAIGUDES | {{ caigudes_roig.nombre }}</h4>
            </v-card-title>
            <v-card-text >
              <p>Caigudes: {{ caigudes_roig.quinzes}} / {{ caigudes_roig.caigudes}}</p>
              <v-row>
                <v-col cols="6">
                  <p class="pa-2">Caigudes</p>
                  <v-btn @click="caigudesRoig(1)" x-small>+</v-btn>
                  <v-btn @click="caigudesRoig(-1)" x-small>-</v-btn>
                </v-col>
                <v-col cols="6">
                  <p class="pa-2">Quinzes</p>
                  <v-btn @click="quinzeCaigudesRoig(1)" x-small>+</v-btn>
                  <v-btn @click="quinzeCaigudesRoig(-1)" x-small>-</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card>
            <v-card-title class="blue">
              <h4 class="white--text">CAIGUDES | {{ caigudes_blau.nombre }}</h4>
            </v-card-title>
            <v-card-text >
              <p>Caigudes: {{ caigudes_blau.quinzes}} / {{ caigudes_blau.caigudes}}</p>
              
              <v-row>
                <v-col cols="6">
                  <p class="pa-2">Caigudes</p>
                  <v-btn @click="caigudesBlau(1)" x-small>+</v-btn>
                  <v-btn @click="caigudesBlau(-1)" x-small>-</v-btn>
                </v-col>
                <v-col cols="6">
                  <p class="pa-2">Quinzes</p>
                  <v-btn @click="quinzeCaigudesBlau(1)" x-small>+</v-btn>
                  <v-btn @click="quinzeCaigudesBlau(-1)" x-small>-</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="align-center justify-center">
        <v-col cols="2" class="text-center">
          <v-btn @click="reset" color="error" x-large>RESET</v-btn>
          <v-btn @click="exportar" color="success" small>DESCARREGAR DADES</v-btn>
        </v-col>
        <v-col cols="6" class="mx-auto">
          <v-card>
            <v-card-title>
              <p class="mx-auto">Enviar comparativa</p>
            </v-card-title>
            <v-card-text>
              <div class="text-center">
            <v-btn @click="enviar_comparativa(0)">RESTOS</v-btn>
            <v-btn @click="enviar_comparativa(1)">MITGERS</v-btn>
            <v-btn @click="enviar_comparativa(2)">PUNTERS</v-btn>
          </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4" class="mx-auto">
          <v-card>
            <v-card-title class="text-center">
              <p>Enviar estadístiques finals</p>
            </v-card-title>
            <v-card-text class="text-center">
            <v-btn @click="enviar_finales">ENVIAR</v-btn>
            </v-card-text>
          </v-card>
          
          
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import EstJugador from '@/components/EstJugador.vue'

import io from "socket.io-client"

const axios = require("axios").default
/* const fs = require('fs'); */
export default {
  name: 'Home',
  components: {
    EstJugador
  },
  /* props: {
    socket: Function
  }, */
  data() {
    return {
      colps_quinze: 0,
      colps_quinze_temp: 0,
      ultim_quinze: null,
      durada_quinze: null,
      activo: false,
      durada_quinze_str: null,
      durada: null,
      caigudes_flag: true,
      durada_joc: null,
      durada_joc_inici: null,
      durada_joc_final: null,
      reset_durada: false,
      socket: {},
      status: null

    }
  },
  computed: {
    durada_joc_str() {
      return this.$store.getters.durada_joc
    },
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
    canvis_rojos() {
      return this.$store.getters.canvis_pilota.rojos
    },
    canvis_blaus() {
      return this.$store.getters.canvis_pilota.blaus
    },
    canvis_pìlota() {
      /* console.log('computed ' + this.$store.getters.canvis_pilota) */
      return this.$store.getters.canvis_pilota
    }
  },
  methods: {
    reset() {
      localStorage.clear()
      this.$store.commit("reset")
      this.socketEmit()
    },
    estadistica(key) {
      switch (key) {
        case "s":
          this.sumaColpRoig(0)
          break
        case "d":
          this.sumaColpRoig(1)
          break
        case "f":
          this.sumaColpRoig(2)
          break
        case "l":
          this.sumaColpBlau(3)
          break
        case "k":
          this.sumaColpBlau(4)
          break
        case "j":
          this.sumaColpBlau(5)
          break
      }
    },
    canvi_pilota_roig(val) {
      this.$store.commit("canvi_pilota_roig", val)
      this.$store.commit("save_state")
      let send = this.socketEmit()
      console.log(send)
    },
    canvi_pilota_blau(val) {
      this.$store.commit("canvi_pilota_blau", val)
      this.$store.commit("save_state")
      this.socketEmit()
    },
    acabarQuinze() {
      this.duradaQuinze(false)
      this.liveUpdate()
      this.socketEmit()
    },
    estColpsRoig(val, id, nombre) {
      let data = {
        id: id,
        val: val
      }
      this.$store.commit("colp_roig", data)
      this.$store.commit("save_state")
      this.duradaQuinze(false)
      this.liveUpdate(nombre, "GUANYADORS", this.equip_roig[id].colps_guanyadors)
      this.liveUpdate(nombre, "ERRADES", this.equip_roig[id].errades)
      this.socketEmit()
    },
    estColpsBlau(val, id, nombre) {
      let data = {
        id: id,
        val: val
      }
      this.$store.commit("colp_blau", data)
      this.$store.commit("save_state")
      this.duradaQuinze(false)
      this.liveUpdate(nombre, "GUANYADORS", this.equip_blau[id-3].colps_guanyadors)
      this.liveUpdate(nombre, "ERRADES", this.equip_blau[id-3].errades)
      this.socketEmit()
    },
    estErradesRoig(val, id, nombre) {
      let data = {
        id: id,
        val: val
      }
      this.$store.commit("errada_roig", data)
      this.$store.commit("save_state")
      this.duradaQuinze(false)
      this.liveUpdate(nombre, "GUANYADORS", this.equip_roig[id].colps_guanyadors)
      this.liveUpdate(nombre, "ERRADES", this.equip_roig[id].errades)
      this.socketEmit()
    },
    estErradesBlau(val, id, nombre) {
      let data = {
        id: id,
        val: val
      }
      this.$store.commit("errada_blau", data)
      this.$store.commit("save_state")
      this.duradaQuinze(false)
      this.liveUpdate(nombre, "GUANYADORS", this.equip_blau[id-3].colps_guanyadors)
      this.liveUpdate(nombre, "ERRADES", this.equip_blau[id-3].errades)
      this.socketEmit()
    },
    sumaColpRoig(id) {
      this.activo= true
      this.$store.commit("suma_colp_roig", id)
      this.$store.commit("save_state")
      this.sumaColpQuinze()
      this.duradaQuinze(true)
    },
    sumaColpBlau(id) {
      this.activo= true
      this.$store.commit("suma_colp_blau", id)
      this.$store.commit("save_state")
      this.sumaColpQuinze()
      this.duradaQuinze(true)
    },
    tretaRoig(val) {
      this.$store.commit("treta_roig", val)
      this.$store.commit("save_state")
      this.liveUpdate("TRETA ROIG", "TRETES", this.feridor_roig.tretes_directes)
      this.liveUpdate("TRETA ROIG", "ERRADES", this.feridor_roig.errades_treta)
      this.socketEmit()
    },
    erradatretaRoig(val) {
      this.$store.commit("errada_treta_roig", val)
      this.$store.commit("save_state")
      this.liveUpdate("TRETA ROIG", "TRETES", this.feridor_roig.tretes_directes)
      this.liveUpdate("TRETA ROIG", "ERRADES", this.feridor_roig.errades_treta)
      this.socketEmit()
    },
    tretaBlau(val) {
      this.$store.commit("treta_blau", val)
      this.$store.commit("save_state")
      this.liveUpdate("TRETA BLAU", "TRETES", this.feridor_blau.tretes_directes)
      this.liveUpdate("TRETA BLAU", "ERRADES", this.feridor_blau.errades_treta)
      this.socketEmit()
    },
    erradatretaBlau(val) {
      this.$store.commit("errada_treta_blau", val)
      this.$store.commit("save_state")
      this.liveUpdate("TRETA BLAU", "TRETES", this.feridor_blau.tretes_directes)
      this.liveUpdate("TRETA BLAU", "ERRADES", this.feridor_blau.errades_treta)
      this.socketEmit()
    },
    caigudesRoig(val) {
      this.$store.commit("caiguda_roig", val)
      this.$store.commit("save_state")
      this.liveUpdate("CAIGUDES ROIG", "PUNTOS", this.caigudes_roig.quinzes + " / " + this.caigudes_roig.caigudes)
      this.socketEmit()
    },
    quinzeCaigudesRoig(val) {
      this.$store.commit("quinze_caiguda_roig", val)
      this.$store.commit("save_state")
      this.liveUpdate("CAIGUDES ROIG", "PUNTOS", this.caigudes_roig.quinzes + " / " + this.caigudes_roig.caigudes)
      this.socketEmit()
    },
    caigudesBlau(val) {
      this.$store.commit("caiguda_blau", val)
      this.$store.commit("save_state")
      this.liveUpdate("CAIGUDES BLAU", "PUNTOS", this.caigudes_blau.quinzes + " / " + this.caigudes_blau.caigudes)
      this.socketEmit()
    },
    quinzeCaigudesBlau(val) {
      this.$store.commit("quinze_caiguda_blau", val)
      this.$store.commit("save_state")
      this.liveUpdate("CAIGUDES BLAU", "PUNTOS", this.caigudes_blau.quinzes + " / " + this.caigudes_blau.caigudes)
      this.socketEmit()
    },
    sumaColpQuinze() {
      this.colps_quinze ++
    },
    
    duradaQuinze(activo) {
      if (this.durada == null) {
        this.durada = Date.now()
      }
      if (activo) {
        this.durada_quinze = setInterval(() => {
          this.durada_quinze_str = this.colps_quinze + " colps " + this.calcular_tiempo(Date.now(), this.durada)
        }, 1000)
      } else if (!activo) {
        clearInterval(this.durada_quinze)
        this.$store.commit("set_durada", this.durada_quinze_str)
        //console.log(this.durada_quinze_str)
        //console.log(this.calcular_tiempo(Date.now(), this.durada))
        this.liveUpdate("ULTIM QUINZE", "TEMPS", this.calcular_tiempo(Date.now(), this.durada))
        this.liveUpdate("ULTIM QUINZE", "COLPS", this.colps_quinze)
        this.colps_quinze = 0
        this.durada = null 
      }
      /* this.duradaQuinzeMimo = "" */
    },
    duradaJoc(activo) {
      if (this.durada_joc_inici == null) {
        this.durada_joc_inici = Date.now()
        clearInterval(this.durada_joc)
        
      }
      if(activo && this.durada_joc == null) {
        this.reset_durada = false
        this.durada_joc_final = null
        this.durada_joc = setInterval(() => {
          let temps = this.calcular_tiempo(Date.now(), this.durada_joc_inici)
          this.$store.commit("set_durada_joc", temps)
          //console.log(this.calcular_tiempo(Date.now(), this.durada_joc_inici))
        }, 1000)
      } else if (!activo) {
        this.reset_durada = true
        this.durada_joc_final = Date.now()
        clearInterval(this.durada_joc)
        this.durada_joc = null
        this.liveUpdate("DURADA", "TEMPS", this.durada_joc_str + " min")
      }  
    },
    resetDurada() {
      let duradaJoc = this.calcular_tiempo(this.durada_joc_final, this.durada_joc_inici)
      this.$store.commit("add_durada", duradaJoc)
      this.socketEmit()
      this.durada_joc_inici = null
      this.durada_joc_final = null
      this.$store.commit("set_durada_joc", "--")
      this.reset_durada = false
    },
    calcular_tiempo(actual, inicio) {
      let tiempo_actual = actual / 1000
      let tiempo_inicio = inicio / 1000
      /* let tiempo = Math.round(tiempo_actual - tiempo_inicio) 
      let tiempo_min = Math.floor(tiempo / 60)
      let tiempo_sec = tiempo - (tiempo_min * 60)
      return tiempo_min.toString() + ' min : ' + tiempo_sec.toString() + ' seg' */
      return this.formatDurada(tiempo_actual - tiempo_inicio)
    },
    formatDurada(item) {
      let joc = item
      //let hr = Math.floor(joc / 3600)
      let resto = joc % 3600
      let min = Math.floor(resto / 60)
      let sec = Math.floor(joc % 60)
      if (sec < 10) {
        sec = "0" + sec
      }
      let str = ""
        return str + " " + min.toString() + ":" + sec.toString()
    },
    calcPorcentaje(a, b) {
      if(!a || !b) {
        return '-'
      } else {
        return b != 0 ? Math.round((a / b) * 100) + "%" : "-"
      }
    },
    enviar_comparativa(pos) {
      let roig = this.equip_roig[pos]
      let blau = this.equip_blau[pos]
      // ROJOS - BLAUS
      this.liveUpdate("COMPARATIVA R-B", "JUGADOR", roig.nombre)
      this.liveUpdate("COMPARATIVA R-B", "PUNTOS1", roig.colps_guanyadors)
      this.liveUpdate("COMPARATIVA R-B", "PUNTOS2", roig.errades)
      this.liveUpdate("COMPARATIVA R-B", "JUGADOR1", blau.nombre)
      this.liveUpdate("COMPARATIVA R-B", "PUNTOS3", blau.colps_guanyadors)
      this.liveUpdate("COMPARATIVA R-B", "PUNTOS4", blau.errades)

      // BLAUS-ROJOS
      this.liveUpdate("COMPARATIVA B-R", "JUGADOR", blau.nombre)
      this.liveUpdate("COMPARATIVA B-R", "PUNTOS1", blau.colps_guanyadors)
      this.liveUpdate("COMPARATIVA B-R", "PUNTOS2", blau.errades)
      this.liveUpdate("COMPARATIVA B-R", "JUGADOR1", roig.nombre)
      this.liveUpdate("COMPARATIVA B-R", "PUNTOS3", roig.colps_guanyadors)
      this.liveUpdate("COMPARATIVA B-R", "PUNTOS4", roig.errades)
      console.log(roig)
    },
    enviar_finales() {

      // COMPARATIVA EQUIPS
      this.liveUpdate("ESTADISTICA FINAL", "R-COLPS T EQ", this.colps_totals_rojos)
      this.liveUpdate("ESTADISTICA FINAL", "R-COLPS G EQ", this.colps_guanyadors_rojos)
      this.liveUpdate("ESTADISTICA FINAL", "R-ERRADES EQ", this.errades_rojos)
      this.liveUpdate("ESTADISTICA FINAL", "R-CANVIS EQ", this.canvis_rojos)
      this.liveUpdate("ESTADISTICA FINAL", "B-COLPS T EQ", this.colps_totals_blaus)
      this.liveUpdate("ESTADISTICA FINAL", "B-COLPS G EQ", this.colps_guanyadors_blaus)
      this.liveUpdate("ESTADISTICA FINAL", "B-ERRADES EQ", this.errades_blaus)
      this.liveUpdate("ESTADISTICA FINAL", "B-CANVIS EQ", this.canvis_blaus)

      // EQUIP_ROIG
      
      this.equip_roig.forEach((jug, val) => {
        let pos = (val+1)
        this.liveUpdate("EQUIP ROIG", "R-JUGADOR" + pos, jug.nombre)
        this.liveUpdate("EQUIP ROIG", "R-COLPS T" + pos, jug.colps_totals)
        this.liveUpdate("EQUIP ROIG", "R-COLPS G" + pos, jug.colps_guanyadors)
        this.liveUpdate("EQUIP ROIG", "R-COLPS ERR" + pos, jug.errades)
        this.liveUpdate("EQUIP ROIG", "R-COLPS EF" + pos, this.calcPorcentaje(jug.colps_guanyadors, jug.colps_totals))
      })

      //EQUIP BLAU
      this.equip_blau.forEach((jug, val) => {
        let pos = (val+1)
        this.liveUpdate("EQUIP BLAU", "B-JUGADOR" + pos, jug.nombre)
        this.liveUpdate("EQUIP BLAU", "B-COLPS T" + pos, jug.colps_totals)
        this.liveUpdate("EQUIP BLAU", "B-COLPS G" + pos, jug.colps_guanyadors)
        this.liveUpdate("EQUIP BLAU", "B-COLPS ERR" + pos, jug.errades)
        this.liveUpdate("EQUIP BLAU", "B-COLPS EF" + pos, this.calcPorcentaje(jug.colps_guanyadors, jug.colps_totals))
      })



    },
    
    async liveUpdate (nombre, capa, val) {
      let dir = this.url +"API/?Function=SetText&Input=" + nombre + "&SelectedName=" + capa + ".Text&Value=" + val
      const send = await axios.post(dir)
        .catch(err => {
          console.log("Error de conexión " + err)
        })
        console.log(send)
      if (status) this.status = send.status
    },
    socketEmit() {
      let est = {
        rojos: this.equip_roig,
        blaus: this.equip_blau,
        durada: this.text_durada,
        tretes: [this.feridor_roig, this.feridor_blau],
        caigudes: [this.caigudes_roig, this.caigudes_blau],
        durades: this.durades,
        canvis_pilota: this.canvis_pìlota,
        server: this.server,
        url: this.url
      }
      this.socket.emit("estadistica", est)
    },
    exportar() {
      const est = JSON.stringify({rojos: this.equip_roig, blaus: this.equip_blau, 
      feridors: [this.feridor_roig, this.feridor_blau],
      caigudes: [this.caigudes_roig, this.caigudes_blau],
      durades: this.durades,
      canvis: {rojos: this.canvis_rojos, blaus: this.canvis_blaus}
      })
      console.log(est)
      const fileName = this.equip_roig[0].nombre + '-' + this.equip_blau[0].nombre + '.txt'
       /* fs.writeFile("test.txt", est, function(err) {
          if (err) {
              console.log(err);
          }
      }); */
      var a = document.createElement("a");
      var file = new Blob([est], {type: 'text/plain'});
      a.href = URL.createObjectURL(file);
      a.download =  fileName;
      a.click();
    }
    
  },
  created() {
    this.socket = io(this.$store.getters.server)
    this.liveUpdate ("TEST", "TextBlock1", "Conectado " + new Date(Date.now()).toUTCString())
  },
  mounted() {
    this.socket.on("estadistica", data => {
      this.$store.commit("set_rojos", data.rojos)
      this.$store.commit("set_blaus", data.blaus)
      this.$store.commit("set_durada", data.durada)
      this.$store.commit("set_tretes", data.tretes)
      this.$store.commit("set_caigudes", data.caigudes)
      this.$store.commit("set_durades", data.durades)
      this.$store.commit("set_url", data.url)
      this.$store.commit("set_server", data.server)
      this.$store.commit("set_canvis_pilota", data.canvis_pilota)
      this.$store.commit("save_state")
      
    })
    window.addEventListener("keyup", e => {
      this.estadistica(e.key)
      /* console.log(e.key) */
    });
  }
}
</script>
