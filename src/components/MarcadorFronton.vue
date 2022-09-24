<template>
  <v-container class="my-0 py-0">
    <h3 class="mb-0"><span class="red white--text px-4"> {{ marcador.punts_rojos }}</span> | <span
        class="blue white--text px-4">{{ marcador.punts_blaus }}</span></h3>
  </v-container>
</template>

<script>
export default {
  data() {
    return {


    }
  },
  props: { marcador: Object },
  computed: {
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