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

const Iconqianbao: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M896 341.333333v-128H128v597.333334h768v-128h-170.666667a170.666667 170.666667 0 1 1 0-341.333334h170.666667zM92.074667 128h839.850666C959.232 128 981.333333 146.090667 981.333333 168.426667v687.146666C981.333333 877.909333 959.210667 896 931.925333 896H92.074667C64.768 896 42.666667 877.909333 42.666667 855.573333V168.426667C42.666667 146.090667 64.789333 128 92.074667 128zM896 426.666667h-170.666667a85.333333 85.333333 0 1 0 0 170.666666h170.666667v-170.666666z m-170.666667 42.666666a42.666667 42.666667 0 1 1 0 85.333334 42.666667 42.666667 0 0 1 0-85.333334z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconqianbao.defaultProps = {
  size: 18
}

export default Iconqianbao
