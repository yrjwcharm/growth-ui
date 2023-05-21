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

const Iconguodu: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M655.530667 554.666667H64a21.333333 21.333333 0 0 1-21.333333-21.333334v-42.666666a21.333333 21.333333 0 0 1 21.333333-21.333334h591.466667l-183.573334-183.573333a21.333333 21.333333 0 0 1 0-30.165333l30.165334-30.165334a21.333333 21.333333 0 0 1 30.165333 0l271.530667 271.530667a21.333333 21.333333 0 0 1 0 30.165333L532.224 798.656a21.333333 21.333333 0 0 1-30.165333 0l-30.165334-30.186667a21.333333 21.333333 0 0 1 0-30.165333L655.530667 554.666667zM981.333333 277.333333v469.333334a21.333333 21.333333 0 0 1-21.333333 21.333333h-42.666667a21.333333 21.333333 0 0 1-21.333333-21.333333V277.333333a21.333333 21.333333 0 0 1 21.333333-21.333333h42.666667a21.333333 21.333333 0 0 1 21.333333 21.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconguodu.defaultProps = {
  size: 18
}

export default Iconguodu
