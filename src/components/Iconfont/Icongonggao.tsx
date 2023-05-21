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

const Icongonggao: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M395.136 256h211.882667l-105.941334-105.941333L395.136 256z m-108.608 0l183.68-183.68c3.648-3.648 7.872-6.421333 12.373333-8.298667a38.4 38.4 0 0 1 46.869334 5.802667L715.648 256H938.666667a42.666667 42.666667 0 0 1 42.666666 42.666667v597.333333a42.666667 42.666667 0 0 1-42.666666 42.666667H85.333333a42.666667 42.666667 0 0 1-42.666666-42.666667V298.666667a42.666667 42.666667 0 0 1 42.666666-42.666667h201.173334zM128 341.333333v512h768V341.333333H128z m192 128h384a21.333333 21.333333 0 0 1 21.333333 21.333334v42.666666a21.333333 21.333333 0 0 1-21.333333 21.333334H320a21.333333 21.333333 0 0 1-21.333333-21.333334v-42.666666a21.333333 21.333333 0 0 1 21.333333-21.333334z m0 170.666667h213.333333a21.333333 21.333333 0 0 1 21.333334 21.333333v42.666667a21.333333 21.333333 0 0 1-21.333334 21.333333H320a21.333333 21.333333 0 0 1-21.333333-21.333333v-42.666667a21.333333 21.333333 0 0 1 21.333333-21.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Icongonggao.defaultProps = {
  size: 18
}

export default Icongonggao
