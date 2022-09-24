<template>
    <div class="control" :style="status == 200 ? 'border: 1px solid red' : 'border: none '">
        <v-container>

        </v-container>

    <v-row>
        <v-col class="text-center mt-4">
            <h3>Panel de control</h3>
        </v-col>
    </v-row>
    <v-row> 
        <v-btn @click="toVmix('TRINQUET')">TRINQUET</v-btn>
        <v-btn @click="toVmix('ROTULOS')">ROTULOS</v-btn>
        <v-btn @click="toVmix('ROTULOS 2 LINEAS')">HOMES BONS</v-btn>

    </v-row>
    </div>
</template>

<script>
const axios = require("axios").default

export default {
    data() {
        return {
           status: null
        }
    },
   
    computed: {
        url() {
            return this.$store.getters.url
        },
    },
    methods: {
        async toVmix (input) {
            let f = 'OverlayInput2'
            let dir = this.url +"API/?Function=" + f + "&Input=" + input
            const send = await axios.post(dir)
            .catch(err => {
                console.log("Error de conexión " + err)
            })
            this.status = send.status
        },
    }

}
</script>
    
<style>
    
</style>