<template>
  <div class="highcharts-container"></div>
</template>

<script>
import Highcharts from 'highcharts/highstock'
import HighchartsMore from 'highcharts/highcharts-more'
import HighchartsDrilldown from 'highcharts/modules/drilldown'
import Highcharts3D from 'highcharts/highcharts-3d'
HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts)
Highcharts3D(Highcharts)
export default {
  props: ['options', 'styles'],
  name: 'chart',
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.initChart()
  },
  updated () {
  },
  methods: {
    initChart () {
      // console.log(this.$el)
      // this.$el.style.width = (this.styles.width || 1140) + 'px'
      // this.$el.style.height = (this.styles.height || 600) + 'px'
      this.chart = new Highcharts.Chart(this.$el, this.options)
    }
  }
}
</script>

<style scoped>
  .highcharts-container {
    width: 1140px;
    height: 600px;
  }
  @media screen and (min-width:992px) and (max-width:1241px){
    .highcharts-container {
      width: 940px;
      height: 530px;
    }
  }

  @media screen and (min-width:768px) and (max-width:991px){
    .highcharts-container {
      width: 720px;
      height: 400px;
    }
  }
  @media screen and (max-width: 767px){
    .highcharts-container{
      display: none;
    }
  }
</style>
