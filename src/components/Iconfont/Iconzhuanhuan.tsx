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

const Iconzhuanhuan: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M106.666667 358.976a21.333333 21.333333 0 0 0 21.333333 21.333333h778.666667c38.570667 0 57.344-47.104 29.333333-73.642666L717.866667 100.010667a21.333333 21.333333 0 0 0-30.165334 0.810666l-29.525333 31.168a21.333333 21.333333 0 0 0 0.618667 29.973334l140.8 136.810666H128a21.333333 21.333333 0 0 0-21.333333 21.333334v38.869333zM117.333333 640c-38.570667 0-57.344 47.104-29.333333 73.642667L306.133333 920.32a21.333333 21.333333 0 0 0 30.165334-0.832l29.354666-30.954667a21.333333 21.333333 0 0 0-0.832-30.165333L224.426667 725.333333H896a21.333333 21.333333 0 0 0 21.333333-21.333333v-42.666667a21.333333 21.333333 0 0 0-21.333333-21.333333H117.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconzhuanhuan.defaultProps = {
  size: 18
}

export default Iconzhuanhuan
