// 交互图例
import { line_colors, chart_colors, Font } from '@/config'
import F2 from '@antv/f2'

export type ChartTagsType = {
  value: any
  date: string
  tag: {
    text: string
    color: string
  }
}[]

// 折线图data
export type LineChartDataType = {
  value: any
  type: string
  date: string
  nav?: string
}
// 扇形图data
export type PieChartDataType = {
  name: string
  ratio: number
}

interface ChartPropsType {
  haschart?: any
  id?: string // canvas的id
  data: any // 折线图/扇形图 数据
  tags?: ChartTagsType
  colors?: string[] // 折线颜色
  showArea?: boolean // 是否展示面积区域
  areaColors?: string[] // 折线区域颜色
  percent?: boolean // y轴%显示
  tofixed?: number // y轴取tofixed位小数
  width?: number
  appendPadding?: number | number[]
  yunit?: string // 运算符
  height?: number
  max?: any
  min?: any
  alias?: any

  startOnZero?: boolean // true: 面积区域以x0轴为基准; false: 面积区域以x最小轴为基准;
  legend?: boolean // 是否使用自带的legend
  legendConfig?: any // 设置自带的legend的样式
  tickCountX?: number // X坐标轴上刻度点的个数
  tickCountY?: number // Y坐标轴上刻度点的个数
  ticksX?: any[] | null // 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。
  ticksY?: any[] | null // 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。
  adjust?: null | 'stack' | 'dodge' // 用于绘制层叠图、分组图
  showAxisX?: boolean // 是否渲染X轴
  showAxisY?: boolean // 是否渲染Y轴
  isTimeDivision?: boolean
  rect?: {
    color: string
    end_date: string
    start_date: string
    opacity?: number
  }[]
  padding?: number | 'auto' | (number | 'auto')[] | undefined
  onChange?: ({ items }: any) => void
  onHide?: ({ items }: any) => void
  labelX?: ({ items }: any) => void
  labelY?: ({ items }: any) => void
  onLastHalfAreaChange?: (p: any) => void
}

// 折线图
export const baseAreaChart = ({
  id = 'chart',
  data,
  colors = line_colors,
  areaColors = [],
  percent = false,
  tofixed = 2,
  yunit = '',
  appendPadding = 0,
  tags = [],
  max = null,
  min = null,
  showArea = true,
  startOnZero = false,
  tickCountX = 2,
  ticksX = null,
  tickCountY = 5,
  ticksY = null,
  adjust = null,
  showAxisX = true, // 是否渲染X轴
  showAxisY = true, // 是否渲染Y轴
  onChange,
  onHide,
  onLastHalfAreaChange, // 最近半年的区域
  labelX,
  labelY,
  padding = 'auto',
  haschart,
  rect,
  isTimeDivision = false,
  legend = false
}: ChartPropsType) => {
  let chart: any
  if (haschart) {
    chart = haschart
    chart.clear()
  }

  chart = new F2.Chart({
    id: id,
    pixelRatio: window.devicePixelRatio,
    appendPadding: appendPadding,
    padding
  })
  chart.source(data)
  chart.scale(
    'date',
    isTimeDivision
      ? {
          type: 'timeCat',
          tickCount: tickCountX,
          ticks: ticksX,
          mask: 'HH:mm',
          range: [0, 1]
        }
      : {
          type: 'timeCat',
          tickCount: tickCountX,
          ticks: ticksX,
          range: [0, 1]
        }
  )
  chart.scale('value', {
    tickCount: tickCountY,
    ticks: ticksY,
    range: [0, 1],
    // max: max,
    // min: min,
    formatter: (value: any) => {
      return percent ? (value * 100).toFixed(tofixed) + '%' : value.toFixed(tofixed)
    }
  })
  if (showAxisX) {
    chart.axis('date', {
      label:
        labelX ||
        function label(text: any, index: any, total: any) {
          const textCfg = {
            textAlign: '',
            fontFamily: ''
          }
          if (index === 0) {
            textCfg.textAlign = 'left'
          } else if (index === total - 1) {
            textCfg.textAlign = 'right'
          }
          textCfg.fontFamily = Font.dinBold
          return textCfg
        }
    })
  } else {
    chart.axis('date', false)
  }

  if (showAxisY) {
    chart.axis('value', {
      label:
        labelY ||
        function label(text: any) {
          const cfg = {
            text: '',
            fontFamily: ''
          }
          cfg.text =
            // Math.abs(parseFloat(text)) < 1 && Math.abs(parseFloat(text)) > 0
            parseFloat(text).toFixed(2) + (yunit ? yunit : '')
          // : parseFloat(text) + (yunit ? yunit : '')
          cfg.fontFamily = Font.dinBold
          return cfg
        }
    })
  } else {
    chart.axis('value', false)
  }

  if (legend) {
    chart.legend({
      position: 'bottom',
      align: 'center',
      clickable: false
      // marker: function marker(x, y, r, ctx) {
      //   console.log('marker', x, y, r, ctx)
      //   // 11px * 9px
      //   ctx.save()
      //   ctx.lineWidth = 2
      //   ctx.strokeStyle = ctx.fillStyle
      //   ctx.moveTo(x - 5.5, y - 4)
      //   ctx.lineTo(x + 5.5, y - 4)
      //   ctx.stroke()
      //   ctx.restore()
      //   ctx.globalAlpha = 0.1
      //   ctx.moveTo(x - 5.5, y - 4)
      //   ctx.lineTo(x + 5.5, y - 4)
      //   ctx.lineTo(x + 5.5, y + 4)
      //   ctx.lineTo(x - 5.5, y + 4)
      //   ctx.closePath()
      // }
      // itemMarginBottom: 6
    })
  } else {
    chart.legend(false)
  }

  chart.tooltip({
    // crosshairsStyle: {
    //   stroke: '#E74949',
    //   lineWidth: 0.5,
    //   lineDash: [2],
    // },
    crosshairsType: 'y',
    custom: true,
    onChange: function (obj: any) {
      if (onChange) {
        onChange({ obj, type: 'onChange' })
      }
    },
    onHide: function (obj: any) {
      if (onHide) {
        onHide({ obj, type: 'onHide' })
      }
    },
    showCrosshairs: true,
    // showXTip: true,
    // showYTip: true,
    // snap: true,
    tooltipMarkerStyle: {
      radius: 1
    },
    triggerOn: ['touchstart', 'touchmove'],
    triggerOff: 'touchend',
    xTipBackground: {
      fill: '#E74949'
    },
    yTipBackground: {
      fill: '#E74949'
    }
  })

  tags.forEach((element) => {
    if (element.tag.text) {
      chart.guide().tag({
        position: [element.date, element.value],
        //  position: 0,
        // content: element.tag.text,
        content: element.tag.text,
        direct: 'tr',
        // limitInPlot:true,
        background: {
          fill: element.tag.color,
          padding: 2
        },
        pointStyle: {
          fill: element.tag.color
        },
        textStyle: {
          fontSize: 10 // 字体大小
        },
        offsetY: 0
      })
    } else {
      chart.guide().point({
        position: [element.date, element.value],
        style: {
          fill: element.tag.color, // 点的填充颜色
          r: 1,
          // stroke: '#fff', // 线的描边
          stroke: element.tag.color, // 线的描边
          lineWidth: 4 // 线的边框,
          // strokeOpacity: 0
        }
      })
    }
  })

  if (showArea) {
    chart
      .area({ startOnZero: startOnZero })
      .position('date*value')
      .shape('smooth')
      .adjust(adjust)
      .color('type', areaColors.length > 0 ? areaColors : colors)
      .animate({
        appear: {
          animation: 'groupWaveIn',
          duration: 500
        }
      })
  }

  if (rect && rect.length > 0) {
    rect.forEach((item) => {
      chart.guide().rect({
        start: [item.start_date, 'max'],
        end: [item.end_date, 'min'],
        style: {
          fillOpacity: item?.opacity || 0.15,
          fill: item.color
        }
      })
    })
  }
  // chart.guide().regionFilter({ // 绘制区域过滤
  //   start: [ '2017-07-06', 'min'],
  //   end: ['2017-07-24', 'max'],
  //   color: '#FF4D4F'
  // });
  chart
    .line()
    .position('date*value')
    .shape('smooth')
    .color('type', colors)

    .animate({
      appear: {
        animation: 'groupWaveIn',
        duration: 500
      }
    })
    .style('type', {
      lineWidth: 1
    })

  if (onLastHalfAreaChange) {
    let filterArr = data.filter((item: { nav: string | null }) => item.nav != null)
    let last = filterArr[filterArr.length - 1]

    chart.on('beforerender', () => {
      const end = chart.getPosition(last)
      onLastHalfAreaChange({ x: end.x, y: end.y })
    })
  }

  chart.render()
  return chart
}

// 扇形图
export const basicPieChart = ({
  id = 'chart',
  data,
  colors = chart_colors,
  // width = parseFloat(wp(100)) - 50,
  // height = 200,
  legend = false
}: ChartPropsType) => {
  const map: any = {}
  data?.forEach((item: { name: string; ratio: number }) => {
    map[item.name] = (item.ratio * 100).toFixed(2) + '%'
  })
  let chart = new F2.Chart({
    id: id,
    pixelRatio: window.devicePixelRatio,
    // width:${width},
    // height: ${height},
    appendPadding: [5, 15, 15, 30]
  })
  chart.source(data)
  chart.scale('ratio', {
    formatter: function formatter(val) {
      return val + '%'
    }
  })
  if (legend) {
    chart.legend({
      position: 'right',
      align: 'center',
      itemMarginBottom: 6,
      itemFormatter: function itemFormatter(val) {
        return val + '  ' + map[val]
      },
      marker: {
        symbol: 'circle', // marker 的形状
        radius: 3 // 半径大小
      },
      nameStyle: {
        fontSize: 13,
        lineHeight: 18,
        color: '#545968'
      }
    })
  } else {
    chart.legend(false)
  }
  chart.coord('polar', {
    transposed: true,
    innerRadius: 0.7,
    radius: 0.85
  })
  chart.axis(false)
  chart.tooltip(false)
  chart.interval().position('a*ratio').color('name', colors).adjust('stack')
  chart.render()
}
