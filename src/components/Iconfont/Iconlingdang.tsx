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

const Iconlingdang: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M426.666667 117.76V85.333333a21.333333 21.333333 0 0 1 21.333333-21.333333h128a21.333333 21.333333 0 0 1 21.333333 21.333333v32.426667c147.2 39.125333 256 177.066667 256 341.248V704h64a21.333333 21.333333 0 0 1 21.333334 21.333333v42.666667a21.333333 21.333333 0 0 1-21.333334 21.333333H106.666667a21.333333 21.333333 0 0 1-21.333334-21.333333v-42.666667a21.333333 21.333333 0 0 1 21.333334-21.333333h64V459.008C170.666667 294.826667 279.466667 156.885333 426.666667 117.76zM256 704h512V459.136C768 311.594667 653.376 192 512 192s-256 119.594667-256 267.136V704z m149.333333 149.333333h213.333334a21.333333 21.333333 0 0 1 21.333333 21.333334v42.666666a21.333333 21.333333 0 0 1-21.333333 21.333334H405.333333a21.333333 21.333333 0 0 1-21.333333-21.333334v-42.666666a21.333333 21.333333 0 0 1 21.333333-21.333334z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconlingdang.defaultProps = {
  size: 18
}

export default Iconlingdang
