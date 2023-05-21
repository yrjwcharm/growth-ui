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

const IconaBianzu3: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M560.298667 86.912l375.04 253.866667a85.333333 85.333333 0 0 1 37.461333 70.698666v483.797334a85.333333 85.333333 0 0 1-85.333333 85.333333H136.533333a85.333333 85.333333 0 0 1-85.333333-85.333333V411.52a85.333333 85.333333 0 0 1 37.546667-70.698667l375.978666-253.994666a85.333333 85.333333 0 0 1 95.573334 0.085333z m-35.84 52.992a21.333333 21.333333 0 0 0-20.693334-1.834667l-3.242666 1.792-375.893334 253.994667a21.333333 21.333333 0 0 0-9.002666 13.482667l-0.426667 4.181333v483.754667a21.333333 21.333333 0 0 0 17.493333 20.992l3.84 0.341333h750.933334a21.333333 21.333333 0 0 0 20.992-17.493333l0.341333-3.84V411.434667a21.333333 21.333333 0 0 0-6.144-14.933334l-3.242667-2.688-374.997333-253.909333z"
        fill={getIconColor(color, 0, '#646C80')}
      />
      <path
        d="M537.6 585.728a32 32 0 0 1 31.701333 27.648l0.298667 4.352v319.701333a32 32 0 0 1-63.701333 4.352l-0.298667-4.352v-319.701333a32 32 0 0 1 32-32z"
        fill={getIconColor(color, 1, '#646C80')}
      />
    </svg>
  )
}

IconaBianzu3.defaultProps = {
  size: 18
}

export default IconaBianzu3
