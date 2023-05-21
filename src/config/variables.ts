export const down_color = '#4BA471'
export const up_color = '#E74949'
export const line_colors = ['#E74949']
export const chart_colors = ['#E74949']

export const level_color: {
  [propsName: number]: {
    color: string
    text: string
  }
} = {
  1: {
    color: '#4BA471',
    // text: '显著低估'
    text: '买点信号'
  },
  2: {
    // color: '#9EC43E',
    // text: '低估'
    color: '#FFAF00',
    text: '持有信号'
  },
  3: {
    color: '#FFAF00',
    text: '持有信号'
    // text: '正常'
  },
  4: {
    // color: '#FF7D41',
    // text: '高估'
    color: '#FFAF00',
    text: '持有信号'
  },
  5: {
    color: '#E74949',
    text: '卖点信号'
    // text: '显著高估'卖点信号
  }
}

export const level_color_3: {
  [propsName: number]: {
    color: string
    text: string
    area: number[]
    opcity_color: string
  }
} = {
  1: {
    color: '#E74949',
    text: '高估',
    area: [0, 0.3],
    opcity_color: 'rgba(231, 73, 73, 0.15)'
  },
  2: {
    color: '#FFAF00',
    text: '正常',
    area: [0.3, 0.7],
    opcity_color: 'rgba(255, 175, 0, 0.15)'
  },
  3: {
    color: '#4BA471',
    text: '低估',
    area: [0.7, 1],
    opcity_color: 'rgba(75, 164, 113, 0.15)'
  }
}
