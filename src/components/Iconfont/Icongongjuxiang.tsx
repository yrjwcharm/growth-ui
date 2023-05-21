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

const Icongongjuxiang: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M704 106.666667a42.666667 42.666667 0 0 1 42.666667 42.666666v85.333334h149.333333a42.666667 42.666667 0 0 1 42.666667 42.666666v597.333334a42.666667 42.666667 0 0 1-42.666667 42.666666H128a42.666667 42.666667 0 0 1-42.666667-42.666666V277.333333a42.666667 42.666667 0 0 1 42.666667-42.666666h149.333333V149.333333a42.666667 42.666667 0 0 1 42.666667-42.666666h384zM277.333333 533.333333H170.666667v298.666667h682.666666V533.333333h-106.666666v42.666667h-85.333334v-42.666667H362.666667v42.666667h-85.333334v-42.666667z m576-213.333333H170.666667v128h106.666666v-42.666667h85.333334v42.666667h298.666666v-42.666667h85.333334v42.666667h106.666666v-128z m-192-128H362.666667v42.666667h298.666666V192z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Icongongjuxiang.defaultProps = {
  size: 18
}

export default Icongongjuxiang
