/* tslint:disable */
/* eslint-disable */

import { CSSProperties, SVGAttributes, FunctionComponent } from 'react'
import { getIconColor } from './helper'

interface Props extends Omit<SVGAttributes<SVGElement>, 'color'> {
  size?: number
  color?: string | string[]
}

const DEFAULT_STYLE: CSSProperties = {
  display: 'block'
}

const Icondingtouxuanze: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M737.962667 124.202667h134.741333c24.810667 0 44.928 20.096 44.928 44.906666v291.946667h-89.834667V348.8H109.141333v494.08H468.48v89.813333H64.213333a44.906667 44.906667 0 0 1-44.906666-44.906666V169.109333c0-24.810667 20.117333-44.906667 44.928-44.906666h134.741333V34.346667h134.741333v89.813333h269.504v-89.813333h134.741334v89.813333zM198.976 573.354667V438.613333h134.741333v134.741334H198.976z m224.576 0V438.613333h134.741333v134.741334h-134.741333zM198.976 753.024V618.24h134.741333v134.762667H198.976z"
        fill={getIconColor(color, 0, '#F54A45')}
      />
      <path
        d="M950.229333 625.450667l62.805334-7.893334-11.136-89.130666-190.890667 23.850666h-0.106667l-28.010666 3.52v174.4h89.813333V675.413333c3.648 3.285333 7.466667 6.4 10.794667 10.069334a134.634667 134.634667 0 0 1 34.133333 89.642666 134.890667 134.890667 0 0 1-134.741333 134.762667 134.890667 134.890667 0 0 1-134.762667-134.762667 135.210667 135.210667 0 0 1 68.736-117.482666l-44.117333-78.250667a225.109333 225.109333 0 0 0-114.453334 195.733333c0 123.84 100.757333 224.597333 224.597334 224.597334 123.818667 0 224.576-100.757333 224.576-224.597334a224.128 224.128 0 0 0-56.96-149.44l-0.277334-0.256v0.042667z"
        fill={getIconColor(color, 1, '#CCAD86')}
      />
    </svg>
  )
}

Icondingtouxuanze.defaultProps = {
  size: 18
}

export default Icondingtouxuanze
