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

const Iconxingye: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M1024 529.813333c0-128.981333-177.813333-234.112-397.482667-234.112-175.637333 0-324.821333 67.2-377.130666 160.426667a55.146667 55.146667 0 0 0-7.701334 27.626667c0 23.296 14.869333 43.882667 37.973334 57.429333l201.514666 114.346667c10.453333 5.418667 22.570667 8.682667 36.330667 8.682666s25.877333-3.264 36.330667-8.682666l191.04-108.373334c12.672-7.594667 20.906667-18.986667 20.906666-31.445333s-7.68-23.296-19.797333-30.869333l-71.04-40.661334-157.44 89.429334-118.912-67.754667c46.250667-40.64 131.584-68.266667 230.122667-68.266667 146.986667 0 265.898667 61.226667 265.898666 137.109334-3.285333 117.034667-177.813333 208.085333-389.76 202.666666C292.330667 731.946667 123.306667 632.234667 126.08 515.178667c1.642667-154.453333 207.552-277.994667 459.690667-275.84 22.570667 0.554667 44.586667 1.642667 66.069333 3.797333C600.085333 224.170667 535.125333 213.333333 464.64 213.333333c-56.170667 0-109.013333 7.04-154.154667 19.498667C127.722667 281.621333 0 396.501333 0 529.792 0 708.672 229.013333 853.333333 512 853.333333s512-144.682667 512-323.52z"
        fill={getIconColor(color, 0, '#004186')}
      />
    </svg>
  )
}

Iconxingye.defaultProps = {
  size: 18
}

export default Iconxingye