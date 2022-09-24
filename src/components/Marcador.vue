<template>
  <v-container class="my-0 py-0">
    <p class="mb-0">{{ marcador.jocs_rojos }} | <span class="red white--text px-2"> {{ puntos[marcador.punts_rojos]
    }}</span> | <span class="blue white--text px-2">{{puntos[marcador.punts_blaus]}}</span> | {{ marcador.jocs_blaus
        }} </p>
    <p>{{ vals_str }}</p>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      puntos: ['NET', '15', '30', 'VAL']

    }
  },
  props: { marcador: Object },
  computed: {
    vals_str() {
      return this.$store.getters.get_val_str
    },
    tipo() {
      return this.$store.getters.get_tipo
    }
    /* marcador() {
      return this.$store.getters.get_marcador
    } */
  }
}
</script>

<style>

</style>