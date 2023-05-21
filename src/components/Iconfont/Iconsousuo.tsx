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

const Iconsousuo: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M769.130667 673.493333l144.682666 144.682667a21.333333 21.333333 0 0 1 0 30.165333l-36.202666 36.202667a21.333333 21.333333 0 0 1-30.165334 0L706.56 743.68A361.258667 361.258667 0 0 1 469.333333 832c-200.298667 0-362.666667-162.368-362.666666-362.666667S269.034667 106.666667 469.333333 106.666667s362.666667 162.368 362.666667 362.666666c0 75.712-23.189333 146.005333-62.869333 204.16zM469.333333 742.4c150.826667 0 273.066667-122.24 273.066667-273.066667S620.16 196.266667 469.333333 196.266667 196.266667 318.506667 196.266667 469.333333 318.506667 742.4 469.333333 742.4z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconsousuo.defaultProps = {
  size: 18
}

export default Iconsousuo
