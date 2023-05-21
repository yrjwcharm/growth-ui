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

const Iconyuantishi: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M0 512c0 282.794667 229.205333 512 512 512s512-229.205333 512-512S794.794667 0 512 0 0 229.205333 0 512z m490.666667 160h74.666666a10.666667 10.666667 0 0 1 10.666667 10.666667v74.666666a10.666667 10.666667 0 0 1-10.666667 10.666667H490.666667a10.666667 10.666667 0 0 1-10.666667-10.666667V682.666667a10.666667 10.666667 0 0 1 10.666667-10.666667zM490.666667 256h74.666666a10.666667 10.666667 0 0 1 10.666667 10.666667v298.666666a10.666667 10.666667 0 0 1-10.666667 10.666667H490.666667a10.666667 10.666667 0 0 1-10.666667-10.666667v-298.666666a10.666667 10.666667 0 0 1 10.666667-10.666667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconyuantishi.defaultProps = {
  size: 18
}

export default Iconyuantishi
