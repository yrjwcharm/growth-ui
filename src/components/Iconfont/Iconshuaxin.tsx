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

const Iconshuaxin: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M757.12 341.333333c-53.973333-77.376-143.637333-128-245.12-128-164.949333 0-298.666667 133.717333-298.666667 298.666667s133.717333 298.666667 298.666667 298.666667c135.296 0 249.6-89.962667 286.293333-213.333334h88.192C847.68 768.341333 694.741333 896 512 896c-212.074667 0-384-171.925333-384-384S299.925333 128 512 128c120.64 0 228.266667 55.616 298.666667 142.613333V149.333333a21.333333 21.333333 0 0 1 21.333333-21.333333h42.666667a21.333333 21.333333 0 0 1 21.333333 21.333333v234.666667a42.666667 42.666667 0 0 1-42.666667 42.666667H618.666667a21.333333 21.333333 0 0 1-21.333334-21.333334v-42.666666a21.333333 21.333333 0 0 1 21.333334-21.333334h138.453333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconshuaxin.defaultProps = {
  size: 18
}

export default Iconshuaxin
