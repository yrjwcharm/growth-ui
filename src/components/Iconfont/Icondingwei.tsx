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

const Icondingwei: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M853.333333 448c0-188.522667-152.810667-341.333333-341.333333-341.333333S170.666667 259.477333 170.666667 448c0 140.074667 110.165333 292.010667 341.397333 451.946667C743.210667 740.373333 853.333333 588.48 853.333333 448zM535.744 987.008a42.666667 42.666667 0 0 1-47.466667-0.021333C219.648 806.890667 85.333333 627.2 85.333333 448 85.333333 212.352 276.352 21.333333 512 21.333333s426.666667 191.018667 426.666667 426.666667c0 179.669333-134.314667 359.338667-402.922667 539.008zM512 618.666667a170.666667 170.666667 0 1 1 0-341.333334 170.666667 170.666667 0 0 1 0 341.333334z m0-85.333334a85.333333 85.333333 0 1 0 0-170.666666 85.333333 85.333333 0 0 0 0 170.666666z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Icondingwei.defaultProps = {
  size: 18
}

export default Icondingwei
