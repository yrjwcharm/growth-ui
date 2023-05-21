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

const Iconyuanmiaoshu: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 0c282.794667 0 512 229.205333 512 512S794.794667 1024 512 1024 0 794.794667 0 512 229.205333 0 512 0z m53.333333 448h-106.666666a10.666667 10.666667 0 0 0-10.666667 10.666667V533.333333a10.666667 10.666667 0 0 0 10.666667 10.666667h21.333333v128H426.666667a10.666667 10.666667 0 0 0-10.666667 10.666667v74.666666a10.666667 10.666667 0 0 0 10.666667 10.666667h202.666666a10.666667 10.666667 0 0 0 10.666667-10.666667V682.666667a10.666667 10.666667 0 0 0-10.666667-10.666667H576v-213.333333a10.666667 10.666667 0 0 0-10.666667-10.666667z m0-192H490.666667a10.666667 10.666667 0 0 0-10.666667 10.666667V341.333333a10.666667 10.666667 0 0 0 10.666667 10.666667h74.666666a10.666667 10.666667 0 0 0 10.666667-10.666667v-74.666666a10.666667 10.666667 0 0 0-10.666667-10.666667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconyuanmiaoshu.defaultProps = {
  size: 18
}

export default Iconyuanmiaoshu
