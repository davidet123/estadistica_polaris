<template>
  <div class="home">
    <v-container fluid :style="status == 200 ? 'border: 1px solid red' : 'border: none '">
      <v-row>
        <v-col cols="12" class="text-center" >
          <h1>Estadística</h1>
          <v-btn @click="goTo('/resum')"  class="mt-4">Resum</v-btn>
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
        <v-col cols="3" class="text-center" >
          <h3>Últim quinze</h3>          
          <h3>{{ text_durada }}</h3>
          <p>---------------------------</p>
          <h3>Quinzes de mes de 10 colps</h3>
          <h4> EQUIP ROIG - {{ mes_de_deu_roig}} | EQUIP BLAU - {{ mes_de_deu_blau }}</h4>     
        </v-col>
        <v-col cols="4" class="text-center">
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
      <v-row class="my-0 py-0">
        <v-col class="text-center my-0 py-0">
          <Marcador 
          v-if="tipo != 'Frontó'"
          :marcador="marcador"/>
          <MarcadorFronton 
          v-if="tipo == 'Frontó'"
          :marcador="marcador"/>

        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-center">
          <h4 class="mb-1">Parcial de {{ quinzes_consecutius.total }} quinzes a 0 per a l'equip {{ quinzes_consecutius.equip }} </h4>
          <v-btn @click="restarQuinze('roig')" class="red white--text">-</v-btn>
          <v-btn @click="acabarQuinze('roig')" class="red white--text">Quinze roig</v-btn>
          <v-btn @click="acabarQuinze('blau')" class="blue white--text">Quinze blau</v-btn>
          <v-btn @click="restarQuinze('blau')" class="blue white--text">-</v-btn>
        </v-col>
      </v-row>
      <v-row  justify="center">
        <v-col :cols="total_jugadores(equip_roig).length == 1 ? 3 : (9 / total_jugadores(equip_roig).length)" v-for="jugador in total_jugadores(equip_roig)" :key="jugador.id">
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
        <v-col cols="3" class="text-center">
          <v-card>
            <v-card-title class="red">
              <h4 class="white--text">TRETES |  {{ feridor_roig.nombre }}</h4>
            </v-card-title>
            <v-card-text >
              <v-row>
                <v-col cols="6">
                  <p class="pa-2">Tretes directes: <span class="font-weight-black">{{ feridor_roig.tretes_directes}}</span></p>
                  <v-btn @click="tretaRoig(1)" x-small>+</v-btn>
                  <v-btn @click="tretaRoig(-1)" x-small>-</v-btn>

                </v-col>
                <v-col cols="6">
                  <p class="pa-2">Errades:  <span class="font-weight-black">{{ feridor_roig.errades_treta }}</span></p>
                  <v-btn @click="erradatretaRoig(1)" x-small>+</v-btn>
                  <v-btn @click="erradatretaRoig(-1)" x-small>-</v-btn>

                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card v-if="tipo != 'Frontó'">
            <v-card-title class="red">
              <h4 class="white--text">VALS EQUIP ROIG: {{ vals_rojos.dau + vals_rojos.rest }}/{{ vals_rojos.total_dau + vals_rojos.total_rest }}</h4>                    
            </v-card-title>
            <v-card-text class="pa-3">
              <v-row>
                <v-col cols="12" class="pb-0">
                  <h4>Vals al joc: {{ vals_rojos.vals_al_joc }}</h4>
                </v-col>
                <v-col cols="6">
                  <h5>DAU: {{ vals_rojos.dau }}/{{ vals_rojos.total_dau }}</h5>
                  <v-row>
                    <v-col cols="12" class="pb-0">
                      <v-btn @click="val('rojos', 'dau', 1)" x-small class="red--text">VAL ROIG +</v-btn>
                      <v-btn @click="val('rojos', 'dau', -1)" x-small>-</v-btn>
                    </v-col>
                    <v-col cols="12" class="pt-0">
                      <v-btn @click="val_aconseguit('rojos', 'dau', 1)" x-small class="red white--text">JOC DAU +</v-btn>
                      <v-btn @click="val_aconseguit('rojos', 'dau', -1)" x-small class="red white--text">-</v-btn>
                    </v-col>
                  </v-row>
                  
                  
                </v-col>
                <v-col cols="6">
                  <h5>REST: {{ vals_rojos.rest }}/{{ vals_rojos.total_rest }}</h5>
                  <v-row>
                    <v-col cols="12" class="text-center pb-0">
                      <v-btn  @click="val('rojos', 'rest', 1)" x-small class="red--text">VAL ROIG +</v-btn>
                      <v-btn @click="val('rojos', 'rest', -1)" x-small>-</v-btn>
                    </v-col>
                    <v-col cols="12" class="my-0 pt-0">
                      <v-btn @click="val_aconseguit('rojos', 'rest', 1)" x-small class="red white--text">JOC REST +</v-btn>
                      <v-btn @click="val_aconseguit('rojos', 'rest', -1)" x-small class="red white--text">-</v-btn>
                    </v-col>
                  </v-row>
                  
                  
                  
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col :cols="total_jugadores(equip_blau).length == 1 ? 3 : 9 / total_jugadores(equip_blau).length" v-for="jugador in  total_jugadores(equip_blau)" :key="jugador.id">
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
        <v-col cols="3" class="text-center">
          <v-card>
            <v-card-title class="blue">
              <h4 class="white--text">TRETES |  {{ feridor_blau.nombre }}</h4>
            </v-card-title>
            <v-card-text >
              <v-row>
                <v-col cols="6">
                  <p class="pa-2">Tretes directes: <span class="font-weight-black">{{ feridor_blau.tretes_directes}}</span></p>
                  <v-btn @click="tretaBlau(1)" x-small>+</v-btn>
                  <v-btn @click="tretaBlau(-1)" x-small>-</v-btn>
                </v-col>
                <v-col cols="6">
                  <p class="pa-2">Errades:  <span class="font-weight-black">{{ feridor_blau.errades_treta}}</span></p>
                  <v-btn @click="erradatretaBlau(1)" x-small>+</v-btn>
                  <v-btn @click="erradatretaBlau(-1)" x-small>-</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card v-if="tipo != 'Frontó'">
            <v-card-title class="blue">
              <h4 class="white--text">VALS EQUIP BLAU: {{ vals_blaus.dau + vals_blaus.rest }}/{{ vals_blaus.total_dau + vals_blaus.total_rest }}</h4>                    
            </v-card-title>
            <v-card-text class="pa-3">
              <v-row>
                <v-col cols="12" class="pb-0">
                  <h4>Vals al joc: {{ vals_blaus.vals_al_joc }}</h4>
                </v-col>
                <v-col cols="6">
                  <h5>DAU: {{ vals_blaus.dau }}/{{ vals_blaus.total_dau }}</h5>
                  <v-row>
                    <v-col cols="12" class="pb-0">
                      <v-btn @click="val('blaus', 'dau', 1)" x-small class="blue--text">VAL BLAU +</v-btn>
                      <v-btn @click="val('blaus', 'dau', -1)" x-small>-</v-btn>
                    </v-col>
                    <v-col cols="12" class="pt-0">
                      <v-btn @click="val_aconseguit('blaus', 'dau', 1)" x-small class="blue white--text">JOC DAU +</v-btn>
                      <v-btn @click="val_aconseguit('blaus', 'dau', -1)" x-small class="blue white--text">-</v-btn>
                    </v-col>
                  </v-row>
                  
                  
                  
                </v-col>
                <v-col cols="6">
                  <h5>REST: {{ vals_blaus.rest }}/{{ vals_blaus.total_rest }}</h5>
                  <v-row>
                    <v-col cols="12" class="pb-0">
                      <v-btn @click="val('blaus', 'rest', 1)" x-small class="blue--text">VAL BLAU +</v-btn>
                      <v-btn @click="val('blaus', 'rest', -1)" x-small>-</v-btn>
                    </v-col>
                    <v-col cols="12" class="pt-0">
                      <v-btn @click="val_aconseguit('blaus', 'rest', 1)" x-small class="blue white--text">JOC REST +</v-btn>
                      <v-btn @click="val_aconseguit('blaus', 'rest', -1)" x-small class="blue white--text">-</v-btn>
                    </v-col>
                  </v-row>
                  
                  
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="tipo == 'Escala i corda'">
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
          <v-row class="pa-0 ma-0" >
            <v-col cols="12" class="text-center ma-0 pa-0">
              <v-btn @click="reiniciar" color="success" x-large>REINICIAR</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="text-center">
              <v-btn @click="goTo('/settings')" class="mt-2" color="primary" x-large>SETTINGS</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="text-center">
             <v-btn @click="reset" color="error" x-large>RESET</v-btn>
            </v-col>
          </v-row>
          
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
import Marcador from '@/components/Marcador.vue'
import MarcadorFronton from '@/components/MarcadorFronton.vue'

import io from "socket.io-client"
/* import { filter } from 'vue/types/umd' */

const axios = require("axios").default

export default {
  name: 'Home',
  components: {
    EstJugador,
    Marcador,
    MarcadorFronton
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
    tipo() {
     return this.$store.getters.get_tipo 
    },
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
    mes_de_deu_total() {
      return this.$store.getters.get_mes_de_deu
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
      return this.$store.getters.canvis_pilota
    },
    vals_rojos() {
      return this.$store.getters.vals_rojos
    },
    vals_blaus() {
      return this.$store.getters.vals_blaus
    },
    pilotes_val() {
      return this.$store.getters.get_pilotes_val
    },
    quinzes_consecutius() {
      return this.$store.getters.quinzes_consecutius
    },
    mes_de_deu_roig() {
      let counter = 0;
    for (let item of this.mes_de_deu_total) {
        if (item == 'roig') {
            counter++
        }
    }
    return counter
    },
    mes_de_deu_blau() {
      let counter = 0;
    for (let item of this.mes_de_deu_total) {
        if (item == 'blau') {
            counter++
        }
    }
    return counter
    },
    // MARCADOR
    marcador() {
      return this.$store.getters.get_marcador
    },
    incremento() {
      return this.$store.getters.get_incremento
    }
    
  },
  methods: {
    busca_jugador(id, equip) {
      let jugadores = ""
      if (equip == "roig") {
        jugadores = [...this.equip_roig]
      } else {
        jugadores = [...this.equip_blau]
      }
      const index = jugadores.findIndex(jug => {
        return jug.id == id
      })
      return index
    },
    total_jugadores(equipo) {
      const total = equipo.filter(jug => {
        return jug.nombre != ""
      })
      return total
    },
    /* busca_jugador(id) {
      const jugadores = [...equip_roig, ...equip_blau]

    }, */
    reset() {
      localStorage.clear()
      this.$store.commit("reset")
      this.$store.commit("save_state")
      this.socketEmit()
    },
    reiniciar() {
      localStorage.clear()
      this.$store.commit("reiniciar")
      this.$store.commit("save_state")
      this.socketEmit()
    },
    estadistica(key) {
      /* switch (key) {
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
      } */
      const jugadores = [...this.equip_roig, ...this.equip_blau]
      const res = jugadores.filter(jug => {
        return jug.tecla.toLowerCase() == key.toLowerCase()
      })
      if(res.length > 0) {
      
        if(res[0].id <= 19) {
          this.sumaColpRoig(res[0].id)
        } else {
          this.sumaColpBlau(res[0].id)
        }
      }
        
    },
    canvi_pilota_roig(val) {
      this.$store.commit("canvi_pilota_roig", val)
      this.liveUpdate("CANVIS PILOTA", "DATOS J1", this.canvis_rojos)
      this.liveUpdate("CANVIS PILOTA", "DATOS J2", this.canvis_blaus)
      // console.log(this.canvis_rojos)
      this.$store.commit("save_state")
      this.socketEmit()
    },
    canvi_pilota_blau(val) {
      this.$store.commit("canvi_pilota_blau", val)
      this.liveUpdate("CANVIS PILOTA", "DATOS J1", this.canvis_rojos)
      this.liveUpdate("CANVIS PILOTA", "DATOS J2", this.canvis_blaus)
      this.$store.commit("save_state")
      this.socketEmit()
    },
    acabarQuinze(equip) {
      if (this.colps_quinze >= 11) {
        // console.log(this.colps_quinze)
        this.$store.commit("set_mes_de_deu", equip)
        this.liveUpdate("MES DE DEU", 'PUNTOS ROJO', this.mes_de_deu_roig)
        this.liveUpdate("MES DE DEU", 'PUNTOS AZUL', this.mes_de_deu_blau)
      }
      this.$store.commit("quinze_consecutiu", equip)
      if (equip == 'roig') {
        this.liveUpdate("PARCIALS QUINZES", 'PUNTOS ROJO', this.quinzes_consecutius.total)
        this.liveUpdate("PARCIALS QUINZES", 'PUNTOS AZUL', '0')
      } else if (equip == 'blau') {
        this.liveUpdate("PARCIALS QUINZES", 'PUNTOS AZUL', this.quinzes_consecutius.total)
        this.liveUpdate("PARCIALS QUINZES", 'PUNTOS ROJO', '0')
      }
      this.$store.commit("sumar_punto", {equip: equip, val: 1})
      this.duradaQuinze(false)
      this.liveUpdate()
      this.$store.commit("save_state")
      this.socketEmit()
    },
    restarQuinze(equip) {
      this.$store.commit("sumar_punto", {equip: equip, val: -1})
      this.$store.commit("save_state")
    },
    estColpsRoig(val, id, nombre) {
      let data = {
        id: id,
        val: val
      }
      const index = this.busca_jugador(id, "roig")
      this.$store.commit("colp_roig", data)
      if (val >= 0 ) {
        console.log(val)
        this.$store.commit("quinze_consecutiu", 'roig')
      }
      this.$store.commit("sumar_punto", {equip: 'roig', val: data.val})
      this.liveUpdate("PARCIALS QUINZES", 'PUNTOS ROJO', this.quinzes_consecutius.total)
      this.liveUpdate("PARCIALS QUINZES", 'PUNTOS AZUL', '0')
      if (this.colps_quinze >= 10) {
        this.$store.commit("set_mes_de_deu", "roig")
      }
      this.liveUpdate("MES DE DEU", 'PUNTOS ROJO', this.mes_de_deu_roig)
      this.liveUpdate("MES DE DEU", 'PUNTOS AZUL', this.mes_de_deu_blau)
      this.$store.commit("save_state")
      this.liveUpdate(nombre, "GUANYADORS", this.equip_roig[index].colps_guanyadors)
      this.liveUpdate(nombre, "ERRADES", this.equip_roig[index].errades)
      this.liveUpdate("PARCIALS QUINZES", "PUNTOS ROJO", this.quinzes_consecutius.total)
      this.duradaQuinze(false)
      this.socketEmit()
    },
    estColpsBlau(val, id, nombre) {
      let data = {
        id: id,
        val: val
      }
      const index = this.busca_jugador(id, "blau")
      // console.log(index)
      this.$store.commit("colp_blau", data)
      if (val >= 0 ) this.$store.commit("quinze_consecutiu", 'blau')
      this.$store.commit("sumar_punto", {equip: 'blau', val: data.val})
      this.liveUpdate("PARCIALS QUINZES", 'PUNTOS AZUL', this.quinzes_consecutius.total)
      this.liveUpdate("PARCIALS QUINZES", 'PUNTOS ROJO', '0')
      if (this.colps_quinze >= 10) {
        this.$store.commit("set_mes_de_deu", "blau")
      }
      this.liveUpdate("MES DE DEU", 'PUNTOS ROJO', this.mes_de_deu_roig)
      this.liveUpdate("MES DE DEU", 'PUNTOS AZUL', this.mes_de_deu_blau)
      this.$store.commit("save_state")
      this.duradaQuinze(false)
      this.liveUpdate(nombre, "GUANYADORS", this.equip_blau[index].colps_guanyadors)
      this.liveUpdate(nombre, "ERRADES", this.equip_blau[index].errades)
      this.socketEmit()
    },
    estErradesRoig(val, id, nombre) {
      let data = {
        id: id,
        val: val
      }
      const index = this.busca_jugador(id, "roig")
      this.$store.commit("errada_roig", data)
      if (val >= 0 ) this.$store.commit("quinze_consecutiu", 'blau')
      this.$store.commit("sumar_punto", {equip: 'blau', val: data.val})
      this.liveUpdate("PARCIALS QUINZES", 'PUNTOS AZUL', this.quinzes_consecutius.total)
      this.liveUpdate("PARCIALS QUINZES", 'PUNTOS ROJO', '0')
      if (this.colps_quinze >= 10) {
        this.$store.commit("set_mes_de_deu", "blau")
      }
      this.liveUpdate("MES DE DEU", 'PUNTOS ROJO', this.mes_de_deu_roig)
      this.liveUpdate("MES DE DEU", 'PUNTOS AZUL', this.mes_de_deu_blau)
      this.$store.commit("save_state")
      this.duradaQuinze(false)
      this.liveUpdate(nombre, "GUANYADORS", this.equip_roig[index].colps_guanyadors)
      this.liveUpdate(nombre, "ERRADES", this.equip_roig[index].errades)
      this.socketEmit()
    },
    estErradesBlau(val, id, nombre) {
      let data = {
        id: id,
        val: val
      }
      const index = this.busca_jugador(id, "blau")
      this.$store.commit("errada_blau", data)
      if (val >= 0 ) this.$store.commit("quinze_consecutiu", 'roig')
      this.$store.commit("sumar_punto", {equip: 'roig', val: data.val})
      this.liveUpdate("PARCIALS QUINZES", 'PUNTOS ROJO', this.quinzes_consecutius.total)
      this.liveUpdate("PARCIALS QUINZES", 'PUNTOS AZUL', '0')
      if (this.colps_quinze >= 10) {
        this.$store.commit("set_mes_de_deu", "roig")
      }
      this.liveUpdate("MES DE DEU", 'PUNTOS ROJO', this.mes_de_deu_roig)
      this.liveUpdate("MES DE DEU", 'PUNTOS AZUL', this.mes_de_deu_blau)
      this.$store.commit("save_state")
      this.duradaQuinze(false)
      this.liveUpdate(nombre, "GUANYADORS", this.equip_blau[index].colps_guanyadors)
      this.liveUpdate(nombre, "ERRADES", this.equip_blau[index].errades)
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
      // console.log("suma colp blau")
      this.activo= true
      this.$store.commit("suma_colp_blau", id)
      this.$store.commit("save_state")
      this.sumaColpQuinze()
      this.duradaQuinze(true)
    },
    tretaRoig(val) {
      this.$store.commit("treta_roig", val)
      this.$store.commit("save_state")
      this.liveUpdate("TRETA ROIG", "JUGADOR", this.feridor_roig.nombre)
      this.liveUpdate("TRETA ROIG", "NUM 1", this.feridor_roig.tretes_directes)
      this.liveUpdate("TRETA ROIG", "NUM 2", this.feridor_roig.errades_treta)
      this.socketEmit()
    },
    erradatretaRoig(val) {
      this.$store.commit("errada_treta_roig", val)
      this.$store.commit("save_state")
      this.liveUpdate("TRETA ROIG", "JUGADOR", this.feridor_roig.nombre)
      this.liveUpdate("TRETA ROIG", "NUM 1", this.feridor_roig.tretes_directes)
      this.liveUpdate("TRETA ROIG", "NUM 2", this.feridor_roig.errades_treta)
      this.socketEmit()
    },
    tretaBlau(val) {
      this.$store.commit("treta_blau", val)
      this.$store.commit("save_state")
      this.liveUpdate("TRETA BLAU", "JUGADOR", this.feridor_blau.nombre)
      this.liveUpdate("TRETA BLAU", "NUM 1", this.feridor_blau.tretes_directes)
      this.liveUpdate("TRETA BLAU", "NUM 2", this.feridor_blau.errades_treta)
      this.socketEmit()
    },
    erradatretaBlau(val) {
      this.$store.commit("errada_treta_blau", val)
      this.$store.commit("save_state")
      this.liveUpdate("TRETA BLAU", "JUGADOR", this.feridor_blau.nombre)
      this.liveUpdate("TRETA BLAU", "NUM 1", this.feridor_blau.tretes_directes)
      this.liveUpdate("TRETA BLAU", "NUM 2", this.feridor_blau.errades_treta)
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
    // PILOTES DE VAL
    val(equip, treta, val) {
      
      this.$store.commit("pilota_val", {equip, treta, val})
      this.$store.commit("save_state")
      const input = equip == 'rojos' ? "VALS ROIG" : "VALS BLAU" 
      const eq = equip == 'rojos' ? this.vals_rojos : this.vals_blaus
      // console.log(eq.dau)
      this.$store.commit("set_val_str", "")
      this.liveUpdate(input + " TOTAL", "PUNTOS", eq.dau + eq.rest + "/" + (eq.total_dau + eq.total_rest))
      this.liveUpdate(input, "NUM 1", eq.dau + "/" + eq.total_dau)
      this.liveUpdate(input, "NUM 2", eq.rest + "/" +  eq.total_rest)
      this.socketEmit()
    },
    val_aconseguit(equip, treta, val) {
      this.$store.commit("val_aconseguit", {equip, treta, val})
      const input = equip == 'rojos' ? "VALS ROIG" : "VALS BLAU" 
      const eq = equip == 'rojos' ? this.vals_rojos : this.vals_blaus
      this.liveUpdate(input + " TOTAL", "PUNTOS", eq.dau + eq.rest + "/" + (eq.total_dau + eq.total_rest))
      this.liveUpdate(input, "NUM 1", eq.dau + "/" + eq.total_dau)
      this.liveUpdate(input, "NUM 2", eq.rest + "/" +  eq.total_rest)
      this.socketEmit()
      this.$store.commit("save_state")
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
        this.liveUpdate("ÚLTIM QUINZE", "Temps Quinze", this.calcular_tiempo(Date.now(), this.durada))
        this.liveUpdate("ÚLTIM QUINZE", "Colps Quinze", this.colps_quinze)
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
    goTo(url) {
      /* window.removeEventListener("keyup", (e) => {
        console.log(e.key)
        this.$router.push(url)
      }, true) */
      this.$router.push(url)
      
    },
    
    async liveUpdate (nombre, capa, val) {
      let dir = this.url +"API/?Function=SetText&Input=" + nombre + "&SelectedName=" + capa + ".Text&Value=" + val
      const send = await axios.post(dir)
        .catch(err => {
          console.log("Error de conexión " + err)
        })
      this.status = send.status
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
        pilotes_val: this.pilotes_val,
        mes_de_deu_total: this.mes_de_deu_total,
        marcador: this.marcador,
        marcador_temp: this.marcador_temp,
        tipo: this.tipo,
        url: this.url,
        mes_de_deu: this.mes_de_deu_total
      }
      this.socket.emit("estadistica", est)
    },
    tecla: function(e) {
      this.estadistica(e.key)
    }
    
  },
  created() {
    this.socket = io(this.$store.getters.server)
    let fecha_test = new Date()
    fecha_test.setHours(fecha_test.getHours() + 0)
    this.liveUpdate ("TEST", "TextBlock1", "Conectado " + fecha_test.toTimeString())
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
      this.$store.commit("set_tipo", data.tipo)
      this.$store.commit("set_pilotes_val", data.pilotes_val)
      this.$store.commit("set_mes_de_deu_total", data.mes_de_deu_total)

      this.$store.commit("save_state")
      
    })
     window.addEventListener("keyup", this.tecla)
  },
  beforeDestroy() {
    window.removeEventListener("keyup", this.tecla)
  }
}
</script>
