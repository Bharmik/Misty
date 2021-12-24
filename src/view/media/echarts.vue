<template>
  <div>
    <div id="myChart" :style="{width: '100%', height: '7.5rem'}"></div>
    <div id="main" :style="{width: '100%', height: '8.5rem'}"></div>
    <div id="main1" :style="{width: '100%', height: '7.5rem'}"></div>
    <div id="main2" :style="{width: '100%', height: '7.5rem'}"></div>
    <div id="main3" :style="{width: '100%', height: '9.5rem'}"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import ecStat from 'echarts-stat'
export default {
  data () {
    return {

    }
  },
  mounted () {
    this.demo1() // 柱状图
    this.demo2() // 雷达图
    this.demo3() // 散点图
    this.demo4() // 散点图2
    this.demo5() // 自定义雷达图
  },
  methods: {
    demo1 () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: 'ECharts 柱状图demo'
        },
        tooltip: {},
        xAxis: {
          data: ['ss1', 'ss2', 'ss3', 'ss4', 'ss5', 'ss6']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      })
    },
    demo2 () {
      var chartDom = document.getElementById('main')
      var myChart = echarts.init(chartDom)
      var option
      // Schema:
      // date,AQIindex,PM2.5,PM10,CO,NO2,SO2
      const dataBJ = [
        [55, 9, 56, 0.46, 18, 6, 1],
        [25, 11, 21, 0.65, 34, 9, 2],
        [56, 7, 63, 0.3, 14, 5, 3],
        [33, 7, 29, 0.33, 16, 6, 4],
        [42, 24, 44, 0.76, 40, 16, 5],
        [82, 58, 90, 1.77, 68, 33, 6],
        [74, 49, 77, 1.46, 48, 27, 7],
        [78, 55, 80, 1.29, 59, 29, 8],
        [267, 216, 280, 4.8, 108, 64, 9],
        [185, 127, 216, 2.52, 61, 27, 10],
        [39, 19, 38, 0.57, 31, 15, 11],
        [41, 11, 40, 0.43, 21, 7, 12],
        [64, 38, 74, 1.04, 46, 22, 13],
        [108, 79, 120, 1.7, 75, 41, 14],
        [108, 63, 116, 1.48, 44, 26, 15],
        [33, 6, 29, 0.34, 13, 5, 16],
        [94, 66, 110, 1.54, 62, 31, 17],
        [186, 142, 192, 3.88, 93, 79, 18],
        [57, 31, 54, 0.96, 32, 14, 19],
        [22, 8, 17, 0.48, 23, 10, 20],
        [39, 15, 36, 0.61, 29, 13, 21],
        [94, 69, 114, 2.08, 73, 39, 22],
        [99, 73, 110, 2.43, 76, 48, 23],
        [31, 12, 30, 0.5, 32, 16, 24],
        [42, 27, 43, 1, 53, 22, 25],
        [154, 117, 157, 3.05, 92, 58, 26],
        [234, 185, 230, 4.09, 123, 69, 27],
        [160, 120, 186, 2.77, 91, 50, 28],
        [134, 96, 165, 2.76, 83, 41, 29],
        [52, 24, 60, 1.03, 50, 21, 30],
        [46, 5, 49, 0.28, 10, 6, 31]
      ]
      const dataGZ = [
        [26, 37, 27, 1.163, 27, 13, 1],
        [85, 62, 71, 1.195, 60, 8, 2],
        [78, 38, 74, 1.363, 37, 7, 3],
        [21, 21, 36, 0.634, 40, 9, 4],
        [41, 42, 46, 0.915, 81, 13, 5],
        [56, 52, 69, 1.067, 92, 16, 6],
        [64, 30, 28, 0.924, 51, 2, 7],
        [55, 48, 74, 1.236, 75, 26, 8],
        [76, 85, 113, 1.237, 114, 27, 9],
        [91, 81, 104, 1.041, 56, 40, 10],
        [84, 39, 60, 0.964, 25, 11, 11],
        [64, 51, 101, 0.862, 58, 23, 12],
        [70, 69, 120, 1.198, 65, 36, 13],
        [77, 105, 178, 2.549, 64, 16, 14],
        [109, 68, 87, 0.996, 74, 29, 15],
        [73, 68, 97, 0.905, 51, 34, 16],
        [54, 27, 47, 0.592, 53, 12, 17],
        [51, 61, 97, 0.811, 65, 19, 18],
        [91, 71, 121, 1.374, 43, 18, 19],
        [73, 102, 182, 2.787, 44, 19, 20],
        [73, 50, 76, 0.717, 31, 20, 21],
        [84, 94, 140, 2.238, 68, 18, 22],
        [93, 77, 104, 1.165, 53, 7, 23],
        [99, 130, 227, 3.97, 55, 15, 24],
        [146, 84, 139, 1.094, 40, 17, 25],
        [113, 108, 137, 1.481, 48, 15, 26],
        [81, 48, 62, 1.619, 26, 3, 27],
        [56, 48, 68, 1.336, 37, 9, 28],
        [82, 92, 174, 3.29, 0, 13, 29],
        [106, 116, 188, 3.628, 101, 16, 30],
        [118, 50, 0, 1.383, 76, 11, 31]
      ]
      const dataSH = [
        [91, 45, 125, 0.82, 34, 23, 1],
        [65, 27, 78, 0.86, 45, 29, 2],
        [83, 60, 84, 1.09, 73, 27, 3],
        [109, 81, 121, 1.28, 68, 51, 4],
        [106, 77, 114, 1.07, 55, 51, 5],
        [109, 81, 121, 1.28, 68, 51, 6],
        [106, 77, 114, 1.07, 55, 51, 7],
        [89, 65, 78, 0.86, 51, 26, 8],
        [53, 33, 47, 0.64, 50, 17, 9],
        [80, 55, 80, 1.01, 75, 24, 10],
        [117, 81, 124, 1.03, 45, 24, 11],
        [99, 71, 142, 1.1, 62, 42, 12],
        [95, 69, 130, 1.28, 74, 50, 13],
        [116, 87, 131, 1.47, 84, 40, 14],
        [108, 80, 121, 1.3, 85, 37, 15],
        [134, 83, 167, 1.16, 57, 43, 16],
        [79, 43, 107, 1.05, 59, 37, 17],
        [71, 46, 89, 0.86, 64, 25, 18],
        [97, 71, 113, 1.17, 88, 31, 19],
        [84, 57, 91, 0.85, 55, 31, 20],
        [87, 63, 101, 0.9, 56, 41, 21],
        [104, 77, 119, 1.09, 73, 48, 22],
        [87, 62, 100, 1, 72, 28, 23],
        [168, 128, 172, 1.49, 97, 56, 24],
        [65, 45, 51, 0.74, 39, 17, 25],
        [39, 24, 38, 0.61, 47, 17, 26],
        [39, 24, 39, 0.59, 50, 19, 27],
        [93, 68, 96, 1.05, 79, 29, 28],
        [188, 143, 197, 1.66, 99, 51, 29],
        [174, 131, 174, 1.55, 108, 50, 30],
        [187, 143, 201, 1.39, 89, 53, 31]
      ]
      const lineStyle = {
        width: 1,
        opacity: 0.5
      }
      option = {
        backgroundColor: '#161627',
        title: {
          text: '雷达图demo2',
          left: 'center',
          textStyle: {
            color: '#eee'
          }
        },
        legend: {
          bottom: 5,
          data: ['ss1', 'ss2', 'ss3'],
          itemGap: 20,
          textStyle: {
            color: '#fff',
            fontSize: 14
          },
          selectedMode: 'single'
        },
        radar: {
          indicator: [
            { name: 'DVC', max: 300 },
            { name: 'KEL', max: 250 },
            { name: 'PMI', max: 300 },
            { name: 'COP', max: 5 },
            { name: 'NDK', max: 200 },
            { name: 'SOC', max: 100 }
          ],
          shape: 'circle',
          splitNumber: 5,
          axisName: {
            color: 'rgb(238, 197, 102)'
          },
          splitLine: {
            lineStyle: {
              color: [
                'rgba(238, 197, 102, 0.1)',
                'rgba(238, 197, 102, 0.2)',
                'rgba(238, 197, 102, 0.4)',
                'rgba(238, 197, 102, 0.6)',
                'rgba(238, 197, 102, 0.8)',
                'rgba(238, 197, 102, 1)'
              ].reverse()
            }
          },
          splitArea: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(238, 197, 102, 0.5)'
            }
          }
        },
        series: [
          {
            name: 'ss1',
            type: 'radar',
            lineStyle: lineStyle,
            data: dataBJ,
            symbol: 'none',
            itemStyle: {
              color: '#F9713C'
            },
            areaStyle: {
              opacity: 0.1
            }
          },
          {
            name: 'ss2',
            type: 'radar',
            lineStyle: lineStyle,
            data: dataSH,
            symbol: 'none',
            itemStyle: {
              color: '#B3E4A1'
            },
            areaStyle: {
              opacity: 0.05
            }
          },
          {
            name: 'ss3',
            type: 'radar',
            lineStyle: lineStyle,
            data: dataGZ,
            symbol: 'none',
            itemStyle: {
              color: 'rgb(238, 197, 102)'
            },
            areaStyle: {
              opacity: 0.05
            }
          }
        ]
      }
      option && myChart.setOption(option)
    },
    demo3 () {
      var chartDom = document.getElementById('main1')
      var myChart = echarts.init(chartDom)
      var option
      option = {
        xAxis: {},
        yAxis: {},
        series: [
          {
            symbolSize: 10,
            data: [
              [0, 0],
              [1, 1],
              [13.0, 7.58],
              [9.05, 8.81],
              [11.0, 8.33],
              [14.0, 7.66],
              [13.4, 6.81],
              [10.0, 6.33],
              [14.0, 8.96],
              [12.5, 6.82],
              [9.15, 7.2],
              [11.5, 7.2],
              [3.03, 4.23],
              [12.2, 7.83],
              [2.02, 4.47],
              [1.05, 3.33],
              [4.05, 4.96],
              [6.03, 7.24],
              [12.0, 6.26],
              [12.0, 8.84],
              [7.08, 5.82],
              [5.02, 5.68]
            ],
            type: 'scatter'
          }
        ]
      }
      option && myChart.setOption(option)
    },
    demo4 () {
      var chartDom = document.getElementById('main2')
      var myChart = echarts.init(chartDom)
      var option

      // See https://github.com/ecomfe/echarts-stat
      echarts.registerTransform(ecStat.transform.regression)
      option = {
        dataset: [
          {
            source: [
              [1, 48.4],
              [2, 52.7],
              [3, 59.5],
              [4, 71.0],
              [5, 89.4],
              [6, 102.2],
              [7, 112.5],
              [8, 148.3],
              [9, 169.2],
              [10, 147.9],
              [11, 217.8],
              [12, 238.1],
              [13, 334.4],
              [14, 459.4],
              [15, 578.1],
              [16, 684.6],
              [17, 762.6],
              [18, 795.7]
            ]
          },
          {
            transform: {
              type: 'ecStat:regression',
              config: {
                method: 'exponential'
                // 'end' by default
                // formulaOn: 'start'
              }
            }
          }
        ],
        title: {
          text: '1981 - 1998 GDP (trillion yuan)',
          subtext: 'By ecStat.regression',
          sublink: 'https://github.com/ecomfe/echarts-stat',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        xAxis: {
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        yAxis: {
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [
          {
            name: 'scatter',
            type: 'scatter',
            datasetIndex: 0
          },
          {
            name: 'line',
            type: 'line',
            smooth: true,
            datasetIndex: 1,
            symbolSize: 0.1,
            symbol: 'circle',
            label: { show: true, fontSize: 16, precision: '2' },
            labelLayout: { dx: -40 },
            encode: { label: 2, tooltip: 1 }
          }
        ]
      }

      option && myChart.setOption(option)
    },
    demo5 () {
      var chartDom = document.getElementById('main3')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        color: ['#67F9D8', '#FFE434', '#56A3F1', '#FF917C'],
        title: {
          text: '自定义雷达'
        },
        legend: {},
        radar: [
          {
            indicator: [
              { text: '品牌' },
              { text: '质量' },
              { text: '价格' },
              { text: '资质' },
              { text: '口碑' }
            ],
            center: ['50%', '50%'],
            radius: 120,
            startAngle: 90,
            splitNumber: 4,
            shape: 'circle',
            axisName: {
              formatter: '【{value}】',
              color: '#428BD4'
            },
            splitArea: {
              areaStyle: {
                color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
                shadowColor: 'rgba(0, 0, 0, 0.2)',
                shadowBlur: 10
              }
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(211, 253, 250, 0.8)'
              }
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(211, 253, 250, 0.8)'
              }
            }
          }
          // {
          //   indicator: [
          //     { text: 'Indicator1', max: 150 },
          //     { text: 'Indicator2', max: 150 },
          //     { text: 'Indicator3', max: 150 },
          //     { text: 'Indicator4', max: 120 },
          //     { text: 'Indicator5', max: 108 },
          //     { text: 'Indicator6', max: 72 }
          //   ],
          //   center: ['75%', '50%'],
          //   radius: 120,
          //   axisName: {
          //     color: '#fff',
          //     backgroundColor: '#666',
          //     borderRadius: 3,
          //     padding: [3, 5]
          //   }
          // }
        ],
        series: [
          {
            type: 'radar',
            emphasis: {
              lineStyle: {
                width: 4
              }
            },
            data: [
              {
                value: [100, 8, 0.4, -80, 2000],
                name: 'Data A'
              },
              {
                value: [60, 5, 0.3, -100, 1500],
                name: 'Data B',
                areaStyle: {
                  color: 'rgba(255, 228, 52, 0.6)'
                }
              }
            ]
          }
          // {
          //   type: 'radar',
          //   radarIndex: 1,
          //   data: [
          //     {
          //       value: [120, 118, 130, 100, 99, 70],
          //       name: 'Data C',
          //       symbol: 'rect',
          //       symbolSize: 12,
          //       lineStyle: {
          //         type: 'dashed'
          //       },
          //       label: {
          //         show: true,
          //         formatter: function (params) {
          //           return params.value
          //         }
          //       }
          //     },
          //     {
          //       value: [100, 93, 50, 90, 70, 60],
          //       name: 'Data D',
          //       areaStyle: {
          //         color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
          //           {
          //             color: 'rgba(255, 145, 124, 0.1)',
          //             offset: 0
          //           },
          //           {
          //             color: 'rgba(255, 145, 124, 0.9)',
          //             offset: 1
          //           }
          //         ])
          //       }
          //     }
          //   ]
          // }
        ]
      }

      option && myChart.setOption(option)
    }
  }
}
</script>

<style>
</style>
