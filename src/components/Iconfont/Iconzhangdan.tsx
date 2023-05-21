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

const Iconzhangdan: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M896 384v512a42.666667 42.666667 0 0 1-42.666667 42.666667H170.666667a42.666667 42.666667 0 0 1-42.666667-42.666667V384H85.333333a42.666667 42.666667 0 0 1-42.666666-42.666667V128a42.666667 42.666667 0 0 1 42.666666-42.666667h853.333334a42.666667 42.666667 0 0 1 42.666666 42.666667v213.333333a42.666667 42.666667 0 0 1-42.666666 42.666667h-42.666667z m-85.333333 0H213.333333v469.333333h597.333334V384zM128 298.666667h768V170.666667H128v128z m234.666667 170.666666h298.666666a21.333333 21.333333 0 0 1 21.333334 21.333334v42.666666a21.333333 21.333333 0 0 1-21.333334 21.333334H362.666667a21.333333 21.333333 0 0 1-21.333334-21.333334v-42.666666a21.333333 21.333333 0 0 1 21.333334-21.333334z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconzhangdan.defaultProps = {
  size: 18
}

export default Iconzhangdan
