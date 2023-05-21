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

const Icongengduo: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M746.666667 448h128v128h-128v-128z m-469.333334 0v128H149.333333v-128h128z m298.666667 0v128h-128v-128h128z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Icongengduo.defaultProps = {
  size: 18
}

export default Icongengduo
