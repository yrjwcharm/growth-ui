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

const IconUrl: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M534.442667 375.530667c18.261333 7.637333 35.733333 17.984 51.904 31.061333 91.562667 74.133333 105.664 208.469333 31.530666 300.053333l-120.832 149.205334c-74.154667 91.562667-208.490667 105.685333-300.053333 31.530666S91.306667 678.890667 165.461333 587.328l115.562667-142.72 3.690667 35.050667a148.693333 148.693333 0 0 0 23.808 66.602666l-76.736 94.784A128 128 0 1 0 430.72 802.133333l120.832-149.226666a128 128 0 0 0-74.794667-206.165334l57.685334-71.253333z m-64.32 269.013333a213.418667 213.418667 0 0 1-51.904-31.082667c-91.562667-74.133333-105.685333-208.469333-31.530667-300.032l120.832-149.226666c74.133333-91.562667 208.469333-105.685333 300.032-31.530667s105.685333 208.490667 31.552 300.053333l-115.562667 142.72-3.690666-35.050666a148.693333 148.693333 0 0 0-23.808-66.602667l76.736-94.784a128 128 0 0 0-198.954667-161.088l-120.832 149.205333a128 128 0 0 0 74.794667 206.165334l-57.664 71.253333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

IconUrl.defaultProps = {
  size: 18
}

export default IconUrl
