<template>
  <v-container class="ma-o pa-0">
    <v-card>
      <v-card-title :class="id <= 19 ? 'red' : 'blue'">
        <h4 class="white--text">{{tecla.toUpperCase() }} - {{ nombre }} | {{ colps_totals }}</h4>
      </v-card-title>
      <v-card-text>
        <p class="pa-2">Colps guanyadors: <span class="font-weight-black">{{ colps }}</span> </p>
        <v-btn @click="colp(1)" x-small>+</v-btn>
        <v-btn @click="colp(-1)" x-small>-</v-btn>
        <p class="pa-2">Errades no forçades: <span class="font-weight-black">{{ errades }}</span></p>
        <v-btn @click="errada(1)" x-small>+</v-btn>
        <v-btn @click="errada(-1)" x-small>-</v-btn>
        <p class="mt-3">Efectivitat: <span class="font-weight-black">{{ calcPorcentaje(colps, colps_totals) }}</span></p>
        <p class="mt-3">Percentatge colps: <span class="font-weight-black">{{ percentatge }}</span></p>
      </v-card-text>
      <v-card-actions>
        
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>

const axios = require("axios").default


export default {
  /* props: ["nombre", "colps", "errades"] */
  props: {
  nombre: String,
  colps: Number,
  errades: Number,
  id: Number,
  colps_totals: Number,
  tecla: String
},
computed: {
  url() {
      return this.$store.getters.url
    },
  colps_totals_rojos() {
    return this.$store.getters.colps_totals_rojos
  },
  colps_totals_blaus() {
    return this.$store.getters.colps_totals_blaus
  },
  percentatge() {
    if (this.id < 19) {
      return this.calcPorcentaje(this.colps_totals,this.colps_totals_rojos) 
    } else {
      return this.calcPorcentaje(this.colps_totals,this.colps_totals_blaus) 
    }
  }
},
methods: {
  /* colpEst(val) {
    console.log(val)
    console.log(this.id)
  } */
  colp(val) {
    //this.update(this.nombre, "GUANYADORS")
    this.$emit('colpEst', val, this.id, this.nombre)
    
  },
  errada(val) {
    this.$emit('erradaEst', val, this.id, this.nombre)
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
  async update ( nombre, capa) {
      /* let nombre = "DE LA VEGA"
      let capa = "GUANYADORS" */
      let val = this.colps
      let dir = this.url +"API/?Function=SetText&Input=" + nombre + "&SelectedName=" + capa + ".Text&Value=" + val
      // console.log(dir)
      let res =  await axios.post(dir)
      
      console.log(res)
    }
}
}
</script>

<style>
</style>