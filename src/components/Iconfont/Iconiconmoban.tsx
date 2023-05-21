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

const Iconiconmoban: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M751.04 956.501333C511.701333 1094.677333 205.674667 1012.672 67.498667 773.333333A500.373333 500.373333 0 0 1 0.426667 523.157333c0-276.352 224.042667-500.394667 500.394666-500.394666 276.352 0 500.394667 224.042667 500.394667 500.394666 0 178.773333-95.36 343.957333-250.197333 433.344z m159.232-433.344c0-226.133333-183.317333-409.429333-409.429333-409.429333S91.434667 297.045333 91.434667 523.157333s183.296 409.386667 409.408 409.386667c226.133333 0 409.429333-183.274667 409.429333-409.386667z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M396.096 748.757333c-21.44-21.44-21.44-42.88 0-64.341333l193.002667-193.002667c21.44-21.44 42.88-21.44 64.341333 0 21.44 21.461333 21.44 42.88 0 64.341334l-193.002667 193.002666c-21.44 21.44-42.88 21.44-64.341333 0z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <path
        d="M396.096 298.410667c21.44-21.44 42.88-21.44 64.341333 0l193.002667 193.002666c21.44 21.461333 21.44 42.88 0 64.341334-21.44 21.44-42.88 21.44-64.341333 0l-193.002667-193.002667c-21.44-21.44-21.44-42.88 0-64.341333z"
        fill={getIconColor(color, 2, '#333333')}
      />
    </svg>
  )
}

Iconiconmoban.defaultProps = {
  size: 18
}

export default Iconiconmoban
