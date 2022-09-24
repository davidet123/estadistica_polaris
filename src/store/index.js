import Vue from 'vue'
import Vuex from 'vuex'
/* import axios from 'axios'
import VueAxios from 'vue-axios' */

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //http://192.168.1.103:8088
    /* url: "http://192.168.1.95:8088/", */
    /* url: "http://192.168.50.200:8088/",  *//* CONEXION VMIX */
    /* server: "http://192.168.50.55:3000/", */ /* CONEXIÓN WEBSOCKET */
    url: "http://192.168.0.100:8088/", /* CONEXION VMIX */
    server: "http://192.168.0.101:3000/",/* CONEXIÓN WEBSOCKET */
    /* rojos: [{
      id: 0,
      nombre: "TONET IV",
      colps_guanyadors: 0,
      errades: 0,
      colps_totals: 0,
      tecla: "s"
    },
    {
      id: 1,
      nombre: "BRISCA",
      colps_guanyadors: 0,
      errades: 0,
      colps_totals: 0,
      tecla: "d"
    },
    {
      id: 2,
      nombre: "MURCIANET",
      colps_guanyadors: 0,
      errades: 0,
      colps_totals: 0,
      tecla: "f"
    },
    ],
    blaus: [{
      id: 3,
      nombre: "MOLTÓ",
      colps_guanyadors: 0,
      errades: 0,
      colps_totals: 0,
      tecla: "l"
    },
    {
      id: 4,
      nombre: "CANARI",
      colps_guanyadors: 0,
      errades: 0,
      colps_totals: 0,
      tecla: "k"
    },
    {
      id: 5,
      nombre: "RICARDET",
      colps_guanyadors: 0,
      errades: 0,
      colps_totals: 0,
      tecla: "j"
    },
    ],
    feridors: [{
      id: 6,
      nombre: "TONET IV",
      tretes_directes: 0,
      errades_treta: 0
    },
    {
      id: 7,
      nombre: "MOLTÓ",
      tretes_directes: 0,
      errades_treta: 0
    }
    ],
    caigudes: [{
      id: 8,
      nombre: "PUCHOL II",
      caigudes: 0,
      quinzes: 0
    },
    {
      id: 9,
      nombre: "MARC",
      caigudes: 0,
      quinzes: 0
    },

    ], */
    incremento: 5,
    punts_consecutius: { equip: 'roig', total: 0 },
    mes_de_deu: [],
    rojos: [],
    blaus: [],
    feridors: [],
    caigudes: [],
    durada: null,
    canvis_pilota: { rojos: 0, blaus: 0 },
    durades: [],
    durada_joc: null,
    pilotes_val: {
      rojos: {
        dau: 0,
        rest: 0,
        total_dau: 0,
        total_rest: 0,
        vals_al_joc: 0
      },
      blaus: {
        dau: 0,
        rest: 0,
        total_dau: 0,
        total_rest: 0,
        vals_al_joc: 0
      }
    },
    marcador: {
      punts_rojos: 0,
      punts_blaus: 0,
      jocs_rojos: 0,
      jocs_blaus: 0
    },
    marcador_temp: [],
    val_str: "",
    tipo: null
  },
  getters: {
    server: state => {
      return state.server
    },
    get_tipo: state => {
      return state.tipo
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
    quinzes_consecutius: state => {
      return state.punts_consecutius
    },
    get_pilotes_val: state => {
      return state.pilotes_val
    },
    vals_rojos: state => {
      // console.log("state=> ", state.pilotes_val.rojos)
      return state.pilotes_val.rojos
    },
    vals_blaus: state => {
      return state.pilotes_val.blaus
    },
    get_val_str: state => {
      return state.val_str
    },
    url: state => {
      return state.url
    },
    url_server: state => {
      return state.server
    },
    buscaJugador: (state, id) => {
      const jugadores = [...state.rojos, ...state.blaus]
      const jugador = jugadores.findIndex(jug => {
        return jug.id == id
      })
      return jugador

    },
    get_mes_de_deu: state => {
      return state.mes_de_deu
    },
    // MARCADOR
    get_marcador: state => {
      return state.marcador
    },
    get_incremento: state => {
      return state.incremento
    }
  },
  mutations: {
    set_url: (context, payload) => {
      context.url = payload
    },
    set_durada_joc: (context, payload) => {
      context.durada_joc = payload
    },
    set_durades: (context, payload) => {
      context.durades = payload
      //localStorage.setItem("durades", JSON.stringify(payload))
    },
    add_durada: (context, payload) => {
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
    canvi_pilota_roig: (context, payload) => {
      context.canvis_pilota.rojos += payload
      let canvis = {
        rojos: context.canvis_pilota.rojos,
        blaus: context.canvis_pilota.blaus
      }
      localStorage.setItem("canvis_pilota", JSON.stringify(canvis))
    },
    canvi_pilota_blau: (context, payload) => {
      context.canvis_pilota.blaus += payload
      let canvis = {
        rojos: context.canvis_pilota.rojos,
        blaus: context.canvis_pilota.blaus
      }
      localStorage.setItem("canvis_pilota", JSON.stringify(canvis))

    },
    colp_roig: (context, payload) => {
      const index = context.rojos.findIndex(jug => {
        return jug.id == payload.id
      })
      context.rojos[index].colps_guanyadors += payload.val
    },
    colp_blau: (context, payload) => {
      const index = context.blaus.findIndex(jug => {
        return jug.id == payload.id
      })
      context.blaus[index].colps_guanyadors += payload.val
    },
    errada_roig: (context, payload) => {
      const index = context.rojos.findIndex(jug => {
        return jug.id == payload.id
      })
      context.rojos[index].errades += payload.val
    },
    errada_blau: (context, payload) => {
      const index = context.blaus.findIndex(jug => {
        return jug.id == payload.id
      })
      context.blaus[index].errades += payload.val
    },
    suma_colp_roig: (context, payload) => {
      const val = context.rojos.findIndex(jug => {
        return jug.id == payload
      })
      context.rojos[val].colps_totals++
    },
    suma_colp_blau: (context, payload) => {
      const val = context.blaus.findIndex(jug => {
        return jug.id == payload
      })
      context.blaus[val].colps_totals++
    },
    quinze_consecutiu: (context, payload) => {
      let actual = context.punts_consecutius.equip
      if (payload == actual) {
        context.punts_consecutius.total++
      } else {
        context.punts_consecutius.equip = payload
        context.punts_consecutius.total = 1
      }
    },
    set_mes_de_deu: (context, payload) => {
      context.mes_de_deu.push(payload)
    },
    set_mes_de_deu_total: (context, payload) => {
      context.mes_de_deu = payload
    },
    set_marcador: (context, payload) => {
      context.marcador = payload
    },
    set_marcador_temp: (context, payload) => {
      context.marcador.temp = payload
    },
    set_tipo: (context, payload) => {
      context.tipo = payload
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
    // PILOTES DE VAL
    pilota_val: (context, payload) => {
      const equip = payload.equip
      const treta = "total_" + payload.treta

      const val = payload.val
      context.pilotes_val[equip][treta] += val
      context.pilotes_val[equip].vals_al_joc++
    },
    val_aconseguit: (context, payload) => {
      const treta = payload.treta
      context.pilotes_val[payload.equip][treta] += payload.val
      context.pilotes_val.rojos.vals_al_joc = 0
      context.pilotes_val.blaus.vals_al_joc = 0
    },
    set_val_str: (context, payload) => {
      context.val_str = payload
    },
    set_pilotes_val: (context, payload) => {
      context.pilotes_val = payload
    },
    //MARCADOR 
    sumar_punto: (context, payload) => {
      if (context.tipo != 'Frontó') {
        if (payload.val >= 0) {

          // console.log(context.marcador_temp)
          let m = context.marcador
          context.marcador_temp.push(
            {
              punts_rojos: m.punts_rojos,
              punts_blaus: m.punts_blaus,
              jocs_rojos: m.jocs_rojos,
              jocs_blaus: m.jocs_blaus
            }

          )
          if (payload.equip == "roig") {
            m.punts_rojos += payload.val
            if (m.punts_rojos >= 4) {
              m.punts_rojos = 0
              m.punts_blaus = 0
              m.jocs_rojos += context.incremento
            }
            if (m.punts_rojos == 3 && m.punts_blaus == 3) {
              m.punts_rojos = 2
              m.punts_blaus = 2
            }
          } else if (payload.equip == "blau") {
            m.punts_blaus += payload.val
            if (m.punts_blaus >= 4) {
              m.punts_rojos = 0
              m.punts_blaus = 0
              m.jocs_blaus += context.incremento
            }
            if (m.punts_rojos == 3 && m.punts_blaus == 3) {
              m.punts_rojos = 2
              m.punts_blaus = 2
            }
          }
        } else {
          if (context.marcador_temp.length >= 1) {
            let temp = context.marcador_temp.pop()
            context.val_str = ""
            context.marcador.punts_rojos = temp.punts_rojos
            context.marcador.punts_blaus = temp.punts_blaus
            context.marcador.jocs_rojos = temp.jocs_rojos
            context.marcador.jocs_blaus = temp.jocs_blaus
          }
          context.punts_consecutius.total >= 1 ? context.punts_consecutius.total -= 1 : 0
        }
        if (context.marcador.punts_rojos == 3) {
          context.val_str = "Pilota val ROJOS"
        } else if (context.marcador.punts_blaus == 3) {
          context.val_str = "Pilota val BLAUS"
        } else {
          context.val_str = ""
        }
        // FrONTON
      } else if (context.tipo == 'Frontó') {
        let m = context.marcador
        if (payload.equip == "roig") {
          m.punts_rojos += payload.val
          if (m.punts_rojos <= 0) { m.punts_rojos = 0 }
        } else if (payload.equip == "blau") {
          m.punts_blaus += payload.val
          if (m.punts_blaus <= 0) { m.punts_blaus = 0 }
        }

        if (payload.val <= 0) {
          context.punts_consecutius.total >= 1 ? context.punts_consecutius.total -= 1 : 0
        }


        /* if (payload.val >= 0) {
          let m = context.marcador
          context.marcador_temp.push(
            {
              punts_rojos: m.punts_rojos,
              punts_blaus: m.punts_blaus,
              jocs_rojos: m.jocs_rojos,
              jocs_blaus: m.jocs_blaus
            }
          )
          if (payload.equip == "roig") {
            m.punts_rojos += payload.val
          } else if (payload.equip == "blau") {
            m.punts_blaus += payload.val
          }
        } else if (payload.val <= 0) {
          if (context.marcador_temp.length >= 1) {
            console.log(context.marcador_temp.length)
            let temp = context.marcador_temp.pop()
            console.log(temp)
            context.marcador.punts_rojos = temp.punts_rojos
            context.marcador.punts_blaus = temp.punts_blaus
            context.marcador.jocs_rojos = temp.jocs_rojos
            context.marcador.jocs_blaus = temp.jocs_blaus
          }
        } */
      }
    },




    save_state: (context) => {
      localStorage.setItem("rojos", JSON.stringify(context.rojos))
      localStorage.setItem("blaus", JSON.stringify(context.blaus))
      localStorage.setItem("feridors", JSON.stringify(context.feridors))
      localStorage.setItem("caigudes", JSON.stringify(context.caigudes))
      localStorage.setItem("durades", JSON.stringify(context.durades))
      localStorage.setItem("pilotes_val", JSON.stringify(context.pilotes_val))
      localStorage.setItem("canvis_pilota", JSON.stringify(context.canvis_pilota))
      localStorage.setItem("mes_de_deu_total", JSON.stringify(context.mes_de_deu))
      localStorage.setItem("marcador", JSON.stringify(context.marcador))
      localStorage.setItem("marcador_temp", JSON.stringify(context.marcador_temp))
      localStorage.setItem("tipo", JSON.stringify(context.tipo))
      localStorage.setItem("url", JSON.stringify(context.url))
      localStorage.setItem("incremento", JSON.stringify(context.tipo == "Llargues" ? 1 : 5))
    },
    load_state: (context) => {
      let rojos = JSON.parse(localStorage.getItem("rojos"))
      let blaus = JSON.parse(localStorage.getItem("blaus"))
      let feridors = JSON.parse(localStorage.getItem("feridors"))
      let caigudes = JSON.parse(localStorage.getItem("caigudes"))
      let durades = JSON.parse(localStorage.getItem("durades"))
      let canvis_pilota = JSON.parse(localStorage.getItem("canvis_pilota"))
      let pilotes_val = JSON.parse(localStorage.getItem("pilotes_val"))
      let mes_de_deu = JSON.parse(localStorage.getItem("mes_de_deu_total"))
      let marcador = JSON.parse(localStorage.getItem("marcador"))
      let marcador_temp = JSON.parse(localStorage.getItem("marcador_temp"))
      let tipo = JSON.parse(localStorage.getItem("tipo"))
      let incremento = JSON.parse(localStorage.getItem("incremento"))
      context.rojos = rojos
      context.blaus = blaus
      context.feridors = feridors
      context.caigudes = caigudes
      context.durades = durades || []
      context.canvis_pilota = canvis_pilota || { rojos: 0, blaus: 0 }
      context.pilotes_val = pilotes_val
      context.mes_de_deu = mes_de_deu
      context.marcador = marcador
      context.marcador_temp = marcador_temp
      context.tipo = tipo
      context.incremento = incremento
    },
    set_state: (context, payload) => {
      for (let i = 0; i < context.rojos.length; i++) {
        context.rojos[i].nombre = payload.rojos[i].nombre
        context.rojos[i].tecla = payload.rojos[i].tecla
      }
      for (let i = 0; i < context.blaus.length; i++) {
        context.blaus[i].nombre = payload.blaus[i].nombre
        context.blaus[i].tecla = payload.blaus[i].tecla
      }
      context.feridors[0] = payload.treta_roig
      context.feridors[1] = payload.treta_blau
      context.caigudes[0].nombre = context.rojos[0].nombre
      context.caigudes[1].nombre = context.blaus[0].nombre
      context.tipo = payload.tipo
      context.incremento = payload.tipo == "Llargues" ? 1 : 5

      context.url = payload.url
      context.server = payload.server

    },
    reiniciar: (context) => {
      context.rojos.forEach(jug => {
        jug.colps_guanyadors = 0
        jug.errades = 0
        jug.colps_totals = 0
      })
      context.blaus.forEach(jug => {
        jug.colps_guanyadors = 0
        jug.errades = 0
        jug.colps_totals = 0
      })
      context.feridors.forEach(jug => {
        jug.tretes_directes = 0,
          jug.errades_treta = 0
      })
      context.caigudes.forEach(jug => {
        jug.caigudes = 0,
          jug.quinzes = 0
      })
      context.pilotes_val = {
        rojos: {
          dau: 0,
          rest: 0,
          total_dau: 0,
          total_rest: 0,
          vals_al_joc: 0
        },
        blaus: {
          dau: 0,
          rest: 0,
          total_dau: 0,
          total_rest: 0,
          vals_al_joc: 0
        }
      }
      context.canvis_pilota = { rojos: 0, blaus: 0 }
      context.durades = []
      context.mes_de_deu = []
      context.punts_consecutius = { equip: 'roig', total: 0 }
      const tanteo_inicial = context.tipo == 'Escala i corda' ? 15 : 0
      context.marcador = {
        punts_rojos: 0,
        punts_blaus: 0,
        jocs_rojos: tanteo_inicial,
        jocs_blaus: tanteo_inicial
      }
      context.marcador_temp = []
    },
    reset: (context) => {
      let rojos = [{
        id: 0,
        nombre: "ROIG 1",
        colps_guanyadors: 0,
        errades: 0,
        colps_totals: 0,
        tecla: "a"
      },
      {
        id: 1,
        nombre: "ROIG 2",
        colps_guanyadors: 0,
        errades: 0,
        colps_totals: 0,
        tecla: "s"
      },
      {
        id: 2,
        nombre: "ROIG 3",
        colps_guanyadors: 0,
        errades: 0,
        colps_totals: 0,
        tecla: "d"
      },
      {
        id: 3,
        nombre: "ROIG 4",
        colps_guanyadors: 0,
        errades: 0,
        colps_totals: 0,
        tecla: "f"
      },
      {
        id: 4,
        nombre: "ROIG 5",
        colps_guanyadors: 0,
        errades: 0,
        colps_totals: 0,
        tecla: "g"
      },
      {
        id: 5,
        nombre: "ROIG 6",
        colps_guanyadors: 0,
        errades: 0,
        colps_totals: 0,
        tecla: "a"
      },

      ]
      let blaus = [{
        id: 20,
        nombre: "BLAU 1",
        colps_guanyadors: 0,
        errades: 0,
        colps_totals: 0,
        tecla: "l"
      },
      {
        id: 21,
        nombre: "BLAU 2",
        colps_guanyadors: 0,
        errades: 0,
        colps_totals: 0,
        tecla: "k"
      },
      {
        id: 22,
        nombre: "BLAU 3",
        colps_guanyadors: 0,
        errades: 0,
        colps_totals: 0,
        tecla: "j"
      },
      {
        id: 23,
        nombre: "BLAU 4",
        colps_guanyadors: 0,
        errades: 0,
        colps_totals: 0,
        tecla: "j"
      },
      {
        id: 24,
        nombre: "BLAU 5",
        colps_guanyadors: 0,
        errades: 0,
        colps_totals: 0,
        tecla: "j"
      },
      {
        id: 25,
        nombre: "BLAU 6",
        colps_guanyadors: 0,
        errades: 0,
        colps_totals: 0,
        tecla: "j"
      },
      ]
      let feridors = [{
        id: 15,
        nombre: "TRETA ROIG",
        tretes_directes: 0,
        errades_treta: 0
      },
      {
        id: 23,
        nombre: "TRETA BLAU",
        tretes_directes: 0,
        errades_treta: 0
      }]

      let caigudes = [{
        id: 16,
        nombre: "CAIGUDES ROIG",
        caigudes: 0,
        quinzes: 0
      },
      {
        id: 24,
        nombre: "CAIGUDES BLAU",
        caigudes: 0,
        quinzes: 0
      }]
      let durades = []
      let canvis_pilota = { rojos: 0, blaus: 0 }
      context.rojos = rojos
      context.blaus = blaus
      context.feridors = feridors
      context.caigudes = caigudes
      context.durades = durades
      context.canvis_pilota = canvis_pilota
      context.pilotes_val = {
        rojos: {
          dau: 0,
          rest: 0,
          total_dau: 0,
          total_rest: 0,
          vals_al_joc: 0
        },
        blaus: {
          dau: 0,
          rest: 0,
          total_dau: 0,
          total_rest: 0,
          vals_al_joc: 0
        }
      }
      context.mes_de_deu = []
      context.tipo = null
      context.punts_consecutius = { equip: 'roig', total: 0 }
      context.marcador = {
        punts_rojos: 0,
        punts_blaus: 0,
        jocs_rojos: 0,
        jocs_blaus: 0
      }
      context.marcador_temp = []


      /* commit("save_state") */
    }




  },
  actions: {

  },
  modules: {
  }
})
