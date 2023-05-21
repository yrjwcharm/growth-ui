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

const Icondingzhi: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M554.666667 368.469333V960a21.333333 21.333333 0 0 1-21.333334 21.333333h-42.666666a21.333333 21.333333 0 0 1-21.333334-21.333333V368.533333l-183.573333 183.573334a21.333333 21.333333 0 0 1-30.165333 0l-30.165334-30.165334a21.333333 21.333333 0 0 1 0-30.165333l271.530667-271.530667a21.333333 21.333333 0 0 1 30.165333 0l271.530667 271.530667a21.333333 21.333333 0 0 1 0 30.165333l-30.186667 30.165334a21.333333 21.333333 0 0 1-30.165333 0L554.666667 368.469333zM277.333333 42.666667h469.333334a21.333333 21.333333 0 0 1 21.333333 21.333333v42.666667a21.333333 21.333333 0 0 1-21.333333 21.333333H277.333333a21.333333 21.333333 0 0 1-21.333333-21.333333V64a21.333333 21.333333 0 0 1 21.333333-21.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Icondingzhi.defaultProps = {
  size: 18
}

export default Icondingzhi
