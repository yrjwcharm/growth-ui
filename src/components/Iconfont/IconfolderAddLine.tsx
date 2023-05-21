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

const IconfolderAddLine: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M529.664 213.333333H896a42.666667 42.666667 0 0 1 42.666667 42.666667v597.333333a42.666667 42.666667 0 0 1-42.666667 42.666667H128a42.666667 42.666667 0 0 1-42.666667-42.666667V170.666667a42.666667 42.666667 0 0 1 42.666667-42.666667h316.330667l85.333333 85.333333zM170.666667 213.333333v597.333334h682.666666V298.666667h-358.997333l-85.333333-85.333334H170.666667z m298.666666 298.666667V384h85.333334v128h128v85.333333h-128v128h-85.333334v-128H341.333333v-85.333333h128z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

IconfolderAddLine.defaultProps = {
  size: 18
}

export default IconfolderAddLine
