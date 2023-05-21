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

const Iconliebiao2: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M307.562667 789.76a25.386667 25.386667 0 0 0 0-43.498667l-181.098667-109.162666a25.386667 25.386667 0 0 0-38.485333 21.76v218.304a25.386667 25.386667 0 0 0 38.506666 21.738666l181.077334-109.162666zM917.333333 128H192a21.333333 21.333333 0 0 0-21.333333 21.333333v42.666667a21.333333 21.333333 0 0 0 21.333333 21.333333h725.333333a21.333333 21.333333 0 0 0 21.333334-21.333333V149.333333a21.333333 21.333333 0 0 0-21.333334-21.333333z m0 597.333333H448a21.333333 21.333333 0 0 0-21.333333 21.333334v42.666666a21.333333 21.333333 0 0 0 21.333333 21.333334h469.333333a21.333333 21.333333 0 0 0 21.333334-21.333334v-42.666666a21.333333 21.333333 0 0 0-21.333334-21.333334z m0-298.666666H192a21.333333 21.333333 0 0 0-21.333333 21.333333v42.666667a21.333333 21.333333 0 0 0 21.333333 21.333333h725.333333a21.333333 21.333333 0 0 0 21.333334-21.333333v-42.666667a21.333333 21.333333 0 0 0-21.333334-21.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconliebiao2.defaultProps = {
  size: 18
}

export default Iconliebiao2
