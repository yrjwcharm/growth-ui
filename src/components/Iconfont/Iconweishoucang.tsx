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

const Iconweishoucang: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M496.597333 831.552l-228.16 109.738667a35.562667 35.562667 0 0 1-50.773333-35.733334L243.562667 657.066667A35.562667 35.562667 0 0 0 234.666667 629.610667l-168.490667-187.456a35.562667 35.562667 0 0 1 19.008-58.538667l246.506667-52.608a35.562667 35.562667 0 0 0 23.36-16.96l126.186666-218.176a35.562667 35.562667 0 0 1 61.568 0l126.186667 218.176c5.034667 8.704 13.525333 14.869333 23.36 16.96l246.506667 52.608a35.562667 35.562667 0 0 1 19.008 58.538667l-168.490667 187.456c-6.72 7.466667-9.962667 17.450667-8.917333 27.456l25.898666 248.490666a35.562667 35.562667 0 0 1-50.773333 35.733334l-228.16-109.738667a35.562667 35.562667 0 0 0-30.805333 0z m-184.832-5.802667l147.84-71.104a120.896 120.896 0 0 1 104.789334 0l147.84 71.104-16.682667-159.829333a120.896 120.896 0 0 1 30.336-93.354667l110.976-123.456-162.346667-34.645333a120.896 120.896 0 0 1-79.402666-57.685333L512 213.098667l-83.114667 143.68a120.896 120.896 0 0 1-79.402666 57.685333l-162.346667 34.645333 110.976 123.456a120.896 120.896 0 0 1 30.336 93.354667l-16.682667 159.829333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconweishoucang.defaultProps = {
  size: 18
}

export default Iconweishoucang
