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

const Iconzhuanfa: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M745.258667 354.474667c-124.224 0.298667-222.613333 23.082667-305.216 68.16-79.018667 43.136-140.544 105.941333-182.826667 186.602666a512.256 512.256 0 0 0-18.816 40.085334c-2.538667 6.037333-5.76 14.464-9.664 25.237333a20.821333 20.821333 0 0 1-19.562667 13.738667h-44.16a20.842667 20.842667 0 0 1-19.797333-27.328l2.218667-6.656c10.24-29.781333 22.4-57.813333 36.373333-84.437334C233.813333 474.666667 307.2 399.957333 400.661333 349.013333c92.949333-50.602667 203.904-77.696 344.597334-78.016l-120.256-120.554666a20.906667 20.906667 0 0 1 0-29.504l29.44-29.525334a20.778667 20.778667 0 0 1 29.44 0l206.016 206.549334a20.821333 20.821333 0 0 1 0 29.504l-206.037334 206.549333a20.778667 20.778667 0 0 1-29.44 0l-29.44-29.504a20.906667 20.906667 0 0 1 0-29.504l120.277334-120.554667z m132.010666 438.144v104.32c0 23.04-18.624 41.728-41.6 41.728H169.621333A41.685333 41.685333 0 0 1 128 896.938667v-104.32c0-11.52 9.322667-20.864 20.821333-20.864h41.6c11.52 0 20.821333 9.344 20.821334 20.864v62.592H794.026667v-62.592c0-11.52 9.322667-20.864 20.821333-20.864h41.6c11.52 0 20.821333 9.344 20.821333 20.864z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconzhuanfa.defaultProps = {
  size: 18
}

export default Iconzhuanfa
