import { down_color, up_color } from '@/config/variables'

const getValueColor = (val: string) => {
  if (parseFloat(val) === 0) {
    return '#1F2329'
  } else {
    if (val.indexOf('-') !== -1) {
      return down_color
    } else {
      return up_color
    }
  }
}

export default getValueColor
