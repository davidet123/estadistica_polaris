import Vue from 'vue'
import Vuex from 'vuex'
/* import axios from 'axios'
import VueAxios from 'vue-axios' */

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //http://192.168.1.103:8088
    /* url: "http://192.168.1.95:8088/", */
    url: "http://192.168.10.210:8088/", /* CONEXION VMIX */
    server: "http://192.168.10.195:3000/", /* CONEXIÓN WEBSOCKET */
    rojos: [{
      id: 0,
      nombre: "SAUL",
      colps_guanyadors: 0,
      errades: 0,
      colps_totals: 0,
      tecla: "s"
    },
    {
      id: 1,
      nombre: "GUILLEM",
      colps_guanyadors: 0,
      errades: 0,
      colps_totals: 0,
      tecla: "d"
    },
    {
      id: 2,
      nombre: "JOAN",
      colps_guanyadors: 0,
      errades: 0,
      colps_totals: 0,
      tecla: "f"
    },
  ],
  blaus: [{
      id: 3,
      nombre: "ADRIÁN II",
      colps_guanyadors: 0,
      errades: 0,
      colps_totals: 0,
      tecla: "l"
    },
    {
      id: 4,
      nombre: "CUADRAT",
      colps_guanyadors: 0,
      errades: 0,
      colps_totals: 0,
      tecla: "k"
    },
    {
      id: 5,
      nombre: "ÓSCAR",
      colps_guanyadors: 0,
      errades: 0,
      colps_totals: 0,
      tecla: "j"
    },
  ],
  feridors: [{
      id: 6,
      nombre: "JOAN",
      tretes_directes: 0,
      errades_treta: 0
    },
    {
      id: 7,
      nombre: "ÓSCAR",
      tretes_directes: 0,
      errades_treta: 0
    }
    ],
    caigudes: [{
      id: 8,
      nombre: "SAUL",
      caigudes: 0,
      quinzes: 0
    },
    {
      id: 9,
      nombre: "ADRIÁN II",
      caigudes: 0,
      quinzes: 0
    },
    
    ],
    durada: null,
    canvis_pilota: {rojos: 0, blaus: 0},
    durades: [],
    durada_joc: null
  },
  getters: {
    server: state => {
      return state.server
    },
    durada: state => {
      return state.durada
    },
    durada_joc: state => {
      return state.durada_joc
    },
    durades: state => {
      return state.durades
    },
    canvis_pilota: state => {
      return state.canvis_pilota
    },
    equip_roig: (state) => {
      return state.rojos
    },
    equip_blau: (state) => {
      return state.blaus
    },
    feridor_roig: (state) => {
      return state.feridors[0]
    },
    feridor_blau: (state) => {
      return state.feridors[1]
    },
    caigudes_roig: state => {
      return state.caigudes[0]
    },
    caigudes_blau: state => {
      return state.caigudes[1]
    },
    colps_totals_rojos: state => {
      let total = 0
      state.rojos.forEach(jug => {
        total += jug.colps_totals
      })
      return total
    },
    colps_totals_blaus: state => {
      let total = 0
      state.blaus.forEach(jug => {
        total += jug.colps_totals
      })
      return total
    },
    url: state => {
      return state.url
    }
  },
  mutations: {
    set_durada_joc: (context, payload)=> {
      context.durada_joc = payload
    },
    set_durades: (context, payload) => {
      context.durades = payload
      //localStorage.setItem("durades", JSON.stringify(payload))
    },
    add_durada: (context,payload) => {
      context.durades.push(payload + " min")
    },
    set_rojos: (context, payload) => {
      context.rojos = payload
      //localStorage.setItem("rojos", JSON.stringify(payload))
    },
    set_blaus: (context, payload) => {
      context.blaus = payload
      //localStorage.setItem("blaus", JSON.stringify(payload))
    },
    set_tretes: (context, payload) => {
      context.feridors = payload
      //localStorage.setItem("feridors", JSON.stringify(payload))
    },
    set_caigudes: (context, payload) => {
      context.caigudes = payload
      //localStorage.setItem("caigudes", JSON.stringify(payload))
    },
    set_durada: (context, payload) => {
      context.durada = payload
    },
    set_canvis_pilota: (context, payload) => {
      context.canvis_pilota = payload
    },
    set_url: (context, payload) => {
      context.url = payload
    },
    set_server: (context, payload) => {
      context.server = payload
    },
    canvi_pilota_roig: (context, payload) => {
      context.canvis_pilota.rojos += payload
      let canvis = {rojos: context.canvis_pilota.rojos, 
      blaus: context.canvis_pilota.blaus}
      localStorage.setItem("canvis_pilota", JSON.stringify(canvis))
    },
    canvi_pilota_blau: (context, payload) => {
      context.canvis_pilota.blaus += payload
      let canvis = {rojos: context.canvis_pilota.rojos, 
        blaus: context.canvis_pilota.blaus}
        localStorage.setItem("canvis_pilota", JSON.stringify(canvis))
      
    },
    colp_roig: (context, payload) => {
      context.rojos[payload.id].colps_guanyadors += payload.val
    },
    colp_blau: (context, payload) => {
      context.blaus[payload.id -3].colps_guanyadors += payload.val
    },
    errada_roig: (context, payload) => {
      context.rojos[payload.id].errades += payload.val
    },
    errada_blau: (context, payload) => {
      context.blaus[payload.id-3].errades += payload.val
    },
    suma_colp_roig: (context, payload) => {
      context.rojos[payload].colps_totals ++
    },
    suma_colp_blau: (context, payload) => {
      context.blaus[payload-3].colps_totals ++
    },
    treta_roig: (context, payload) => {
      context.feridors[0].tretes_directes += payload
    },
    errada_treta_roig: (context, payload) => {
      context.feridors[0].errades_treta += payload
    },
    treta_blau: (context, payload) => {
      context.feridors[1].tretes_directes += payload
    },
    errada_treta_blau: (context, payload) => {
      context.feridors[1].errades_treta += payload
    },
    caiguda_roig: (context, payload) => {
      context.caigudes[0].caigudes += payload
    },
    quinze_caiguda_roig: (context, payload) => {
      context.caigudes[0].caigudes += payload
      context.caigudes[0].quinzes += payload
    },
    caiguda_blau: (context, payload) => {
      context.caigudes[1].caigudes += payload
    },
    quinze_caiguda_blau: (context, payload) => {
      context.caigudes[1].caigudes += payload
      context.caigudes[1].quinzes += payload
    },
    save_state: (context) => {
      localStorage.setItem("rojos", JSON.stringify(context.rojos))
      localStorage.setItem("blaus", JSON.stringify(context.blaus))
      localStorage.setItem("feridors", JSON.stringify(context.feridors))
      localStorage.setItem("caigudes", JSON.stringify(context.caigudes))
      localStorage.setItem("durades", JSON.stringify(context.durades))
      localStorage.setItem("url", JSON.stringify(context.url))
      localStorage.setItem("server", JSON.stringify(context.server))
    },
    load_state: (context) => {
      let rojos = JSON.parse(localStorage.getItem("rojos"))
      let blaus = JSON.parse(localStorage.getItem("blaus"))
      let feridors = JSON.parse(localStorage.getItem("feridors"))
      let caigudes = JSON.parse(localStorage.getItem("caigudes"))
      let durades = JSON.parse(localStorage.getItem("durades"))
      let canvis_pilota = JSON.parse(localStorage.getItem("canvis_pilota"))
      let url = JSON.parse(localStorage.getItem("url"))
      let server = JSON.parse(localStorage.getItem("server"))
      context.rojos = rojos
      context.blaus = blaus
      context.feridors = feridors
      context.caigudes = caigudes
      context.durades = durades || []
      context.canvis_pilota = canvis_pilota || {rojos: 0, blaus: 0}
      context.url = url
      context.server = server
    },
    reset: context => {
      context.rojos.forEach(jug => {
        jug.colps_totals = 0
        jug.errades = 0
        jug.colps_guanyadors = 0
      })
      context.blaus.forEach(jug => {
        jug.colps_totals = 0
        jug.errades = 0
        jug.colps_guanyadors = 0
      })
      context.feridors.forEach(jug => {
        jug.tretes_directes = 0
        jug.errades_treta = 0
      })
      context.caigudes.forEach(jug => {
        jug.caigudes = 0
        jug.quinzes = 0
      })
    },
    update_partida: (context, payload) => {
      context.rojos = payload.rojos
      context.blaus = payload.blaus
      context.feridors = payload.feridors
      context.caigudes = payload.caigudes
      context.server = payload.server
      context.url = payload.url
      console.log(context.server)
    }

    
    

  },
  actions: {
    
  },
  modules: {
  }
})
