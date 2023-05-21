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

const Iconshang: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 329.472L165.056 676.416a21.333333 21.333333 0 0 1-30.186667 0l-30.165333-30.165333a21.333333 21.333333 0 0 1 0-30.165334L481.834667 238.933333a42.666667 42.666667 0 0 1 60.330666 0l377.130667 377.130667a21.333333 21.333333 0 0 1 0 30.165333l-30.165333 30.165334a21.333333 21.333333 0 0 1-30.186667 0L512 329.472z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconshang.defaultProps = {
  size: 18
}

export default Iconshang
