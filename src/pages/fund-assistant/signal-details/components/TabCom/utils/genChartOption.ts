import { level_color_3 } from '@/config/variables'

import * as echarts from 'echarts/core'
import { GaugeChart } from 'echarts/charts'
import {
  GraphicComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'

import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  GaugeChart,
  GraphicComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
])

export const genChartOption = (signalLevel: number) => {
  const gauge_info = {
    chart: {
      // ticks: [
      //   [0, '持有'],
      //   [0.62, '买入'],
      //   [1, '-']
      // ],
      ticks: [
        [0, '-'],
        [0.16, '高估'],
        [0.5, '正常'],
        [0.86, '低估']
      ],
      // value_area: [0, 0.3]
      // value_area: [0.3, 0.7]
      value_area: signalLevel ? level_color_3[signalLevel].area : level_color_3[1].area
    },
    title: `{tgray|今日估值}\n{sgray|${
      signalLevel ? level_color_3[signalLevel].text : level_color_3[1].text
    }区间}`
    // title: '{tgray|建议持有}\n{sgray|可降低成本}{c| }{d|0%}'
  }
  let ticks = gauge_info.chart.ticks.reduce((memo, cur) => {
    // @ts-ignore
    memo[cur[0] * 100] = cur[1]
    return memo
  }, {})

  let badTickValue = gauge_info.chart?.ticks?.[1]?.[0]
  let axisLabelDistance = badTickValue > 0.3 && badTickValue < 0.7 ? 50 : 60

  return {
    color: [
      '#545968',
      '#FF7D41',
      'rgba(225,100,92,0.3)',
      'rgba(102,148,243,0.3)',
      'rgba(248,168,64,0.3)',
      'rgba(204, 143, 221,0.3)',
      'rgba(93, 193, 98,0.3)',
      'rgba(199, 172, 107,0.3)',
      'rgba(98, 196, 199,0.3)',
      'rgba(233, 127, 173,0.3)',
      'rgba(194, 224, 127,0.3)',
      'rgba(177, 180, 197, 0.3)',
      'rgba(231, 139, 97, 0.3)',
      'rgba(134, 131, 201, 0.3)',
      'rgba(235, 221, 105, 0.3)'
    ],
    series: [
      {
        type: 'gauge',
        center: ['50%', 135],
        radius: 105,
        min: 0,
        max: 100,
        splitNumber: 50,
        progress: {
          show: true,
          width: 36
        },
        pointer: {
          show: false
        },
        emphasis: {
          disabled: true
        },
        axisLine: {
          lineStyle: {
            width: 36,
            color: [
              [
                1,
                {
                  type: 'radial',
                  x: 0.5,
                  y: 0.6,
                  r: 0.65,
                  colorStops: [
                    {
                      offset: 0.55,
                      color: '#F7F8F9' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#fff' // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }
              ]
            ]
          }
        },
        axisTick: {
          distance: -46,
          splitNumber: 1,
          length: 5,
          lineStyle: {
            width: 1,
            color: '#E2E4EA'
          }
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: true,
          distance: -axisLabelDistance,
          color: '#9AA1B2',
          formatter: (val: any) => {
            // @ts-ignore
            return ticks[val] === '-' ? '' : ticks[val] || ''
          },
          padding: [20, 0, 0, 0],
          fontSize: 16
        },
        anchor: {
          show: false
        },
        title: {
          show: false
        },

        data: gauge_info.chart.value_area.map((value, idx, arr) => {
          return {
            value: value * 100 >= 100 ? 99.99 : value * 100,
            itemStyle: {
              color:
                idx === 0
                  ? arr.length > 1
                    ? '#f9fafa'
                    : new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        { offset: 0, color: '#F7F7F9' },
                        { offset: 1, color: '#E6E7EB' }
                      ])
                  : signalLevel
                  ? level_color_3[signalLevel].opcity_color
                  : level_color_3[1].opcity_color
              // new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              //     {
              //       offset: +arr[idx - 1],
              //       // color: '#E6F6E8'
              //       color: signalLevel
              //         ? level_color_3[signalLevel].opcity_color
              //         : level_color_3[1].opcity_color
              //     },
              //     // { offset: +value, color: '#BCEEBF' }
              //     {
              //       offset: +value,
              //       color: signalLevel
              //         ? level_color_3[signalLevel].color
              //         : level_color_3[1].color
              //     }
              //   ])
            },
            detail: {
              show: idx === 0,
              valueAnimation: true,
              width: 150,
              offsetCenter: [0, 0],
              formatter: gauge_info.title || ' ',
              rich: {
                tgray: {
                  color: signalLevel ? level_color_3[signalLevel].color : level_color_3[1].color,
                  fontWeight: '500',
                  fontSize: 24,
                  lineHeight: 34
                },
                sgray: {
                  fontSize: 16,
                  color: signalLevel ? level_color_3[signalLevel].color : level_color_3[1].color,
                  lineHeight: 22,
                  fontFamily: 'DIN Alternate-Bold, DIN Alternate',
                  verticalAlign: 'middle'
                }
              }
            }
          }
        })
      },
      {
        type: 'gauge',
        center: ['50%', 135],
        radius: 105,
        emphasis: {
          disabled: true
        },
        min: 0,
        max: 100,
        progress: {
          show: true,
          width: 6
        },
        pointer: {
          show: false
        },
        axisLine: {
          lineStyle: {
            width: 6,
            color: [[1, '#E2E4EA']]
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        detail: {
          show: false
        },
        data: gauge_info.chart.value_area.map((value, idx) => {
          return {
            value: value * 100 >= 100 ? 99.99 : value * 100,
            itemStyle: {
              color:
                idx === 0
                  ? '#949AA8'
                  : signalLevel
                  ? level_color_3[signalLevel].color
                  : level_color_3[1].color
            }
          }
        })
      }
    ]
  }
}
