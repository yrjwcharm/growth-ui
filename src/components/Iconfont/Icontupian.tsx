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

const Icontupian: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M432.682667 767.509333l-182.4-0.426666a12.8 12.8 0 0 1-9.024-21.866667l176.32-176.341333a17.066667 17.066667 0 0 1 24.128 0l81.386666 81.365333 215.765334-215.765333A17.066667 17.066667 0 0 1 768 446.506667V755.2a12.8 12.8 0 0 1-12.8 12.8H436.245333a12.8 12.8 0 0 1-3.562666-0.490667zM128 938.666667a42.666667 42.666667 0 0 1-42.666667-42.666667V128a42.666667 42.666667 0 0 1 42.666667-42.666667h768a42.666667 42.666667 0 0 1 42.666667 42.666667v768a42.666667 42.666667 0 0 1-42.666667 42.666667H128z m42.666667-85.333334h682.666666V170.666667H170.666667v682.666666z m85.333333-597.333333h128v128h-128v-128z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Icontupian.defaultProps = {
  size: 18
}

export default Icontupian
