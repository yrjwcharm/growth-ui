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

const Iconxiazai: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M896 789.333333v106.666667a42.666667 42.666667 0 0 1-42.666667 42.666667H170.666667a42.666667 42.666667 0 0 1-42.666667-42.666667v-106.666667a21.333333 21.333333 0 0 1 21.333333-21.333333h42.666667a21.333333 21.333333 0 0 1 21.333333 21.333333v64h597.333334v-64a21.333333 21.333333 0 0 1 21.333333-21.333333h42.666667a21.333333 21.333333 0 0 1 21.333333 21.333333z m-341.333333-190.485333l128.426666-128.426667a21.333333 21.333333 0 0 1 30.186667 0l30.165333 30.165334a21.333333 21.333333 0 0 1 0 30.165333l-211.2 211.2a21.269333 21.269333 0 0 1-30.144 0l-211.2-211.2a21.333333 21.333333 0 0 1 0-30.165333l30.165334-30.186667a21.333333 21.333333 0 0 1 30.186666 0L469.333333 588.501333V128a21.333333 21.333333 0 0 1 21.333334-21.333333h42.666666a21.333333 21.333333 0 0 1 21.333334 21.333333v470.848z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconxiazai.defaultProps = {
  size: 18
}

export default Iconxiazai
