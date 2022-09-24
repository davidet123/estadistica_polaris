<template>
  <div id="graph" class="pr-8 verde">
    <v-sparkline
      :value="value1"
      color= "red"
      :smooth="radius || false"
      :padding="padding"
      :line-width="width"
      :stroke-linecap="lineCap"
      :gradient-direction="gradientDirection"
      :fill="fill"
      :type="type"
      :auto-line-width="autoLineWidth"
      auto-draw
      height="40"
      class="fill"
    ></v-sparkline>
    <v-sparkline
      :value="value2"
      color="blue"
      :smooth="radius || false"
      :padding="padding"
      :line-width="width"
      :stroke-linecap="lineCap"
      :gradient-direction="gradientDirection"
      :fill="fill"
      :type="type"
      :auto-line-width="autoLineWidth"
      auto-draw
      class="fill"
      
      height="40"
    ></v-sparkline>
    <v-sparkline
      :value="value2"
      color="blue"
      :smooth="radius || false"
      :padding="padding"
      :line-width="width"
      :stroke-linecap="lineCap"
      :gradient-direction="gradientDirection"
      :fill="fill"
      :type="type"
      :auto-line-width="autoLineWidth"
      auto-draw
      class="fill"
      height="40"
    ></v-sparkline>
  </div>
</template>

<script>

const gradients = [
    /* ['#222'],
    ['#42b3f4'],
    ['red', 'blue'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'], */
    ['red','black', 'blue'],
    ['blue']
    
  ]

export default {
  data: () => ({
      width: 2,
      radius: 0,
      padding: 8,
      lineCap: 'round',
      gradient: gradients[0],
      value1: [0, 1, 2, 2, 3, 2, 3, 4, 5, 6, 6, 6, 7, 6, 5],
      value2: [0, -1, -2, -1, -2, 2, 3, 4, 5, 8, 9, 6, 7, 6, 15],
      gradientDirection: 'top',
      gradients,
      fill: false,
      type: 'trend',
      autoLineWidth: false,
    }),
}
</script>

<style>
#graph {
  width: 1920px;
  height: 1080px;
}
.fill {
  /* position: absolute;  */
  background: rgb(0,0,0,0)
}
.verde {
  background: rgb(0,255,0)
}

</style>