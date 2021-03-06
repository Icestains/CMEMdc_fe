<template>
  <div
    :class="className"
    :style="{height:height,width:width}"
  />
</template>

<script>
  import echarts from 'echarts'

  require('echarts/theme/macarons') // echarts theme
  import resize from './mixins/resize'
  import { parseTime } from '@/utils'

  export default {
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '500px'
      },
      autoResize: {
        type: Boolean,
        default: true
      },
      chartData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        chart: null
      }
    },
    watch: {
      chartData: {
        deep: true,
        handler(val) {
          this.setOptions(val)
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initChart()
      })
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')
        this.setOptions(this.chartData)
      },
      setOptions({ randomDataTime, randomData, clientId } = {}) {
        randomDataTime = randomDataTime.map(v => {
          v = parseTime(v, '{m}-{d} {h}:{i}:{s}')
          return v
        })
        console.log(clientId)
        this.chart.setOption({
          xAxis: {
            data: randomDataTime,
            boundaryGap: false,
            axisTick: {
              show: false
            }
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            top: 30,
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            padding: [5, 10]
          },
          yAxis: {
            axisTick: {
              show: false
            }
          },
          legend: {
            data: [clientId]
          },
          series: [{
            name: clientId,
            itemStyle: {
              normal: {
                color: '#409EFF',
                lineStyle: {
                  color: '#409EFF',
                  width: 2
                }
              }
            },
            smooth: false,
            type: 'line',
            data: randomData,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          }]

        })
      }
    }
  }
</script>
