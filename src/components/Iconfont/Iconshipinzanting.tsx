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

const Iconshipinzanting: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M830.357333 128.021333L705.621333 128c-22.784 0-31.082667 2.24-39.424 6.4a44.970667 44.970667 0 0 0-19.370666 18.176c-4.437333 7.808-6.826667 15.552-6.826667 36.949333v644.970667c0 21.333333 2.389333 29.12 6.826667 36.949333 4.373333 7.744 11.136 14.058667 19.392 18.133334 8.32 4.181333 16.576 6.421333 39.424 6.421333h124.736c22.784 0 31.082667-2.24 39.424-6.4 8.362667-4.181333 14.912-10.325333 19.370666-18.176 4.437333-7.808 6.826667-15.552 6.826667-36.949333V189.525333c0-21.333333-2.389333-29.12-6.826667-36.949333a44.992 44.992 0 0 0-19.392-18.133333c-8.32-4.181333-16.576-6.4-39.424-6.4z m-512 0L193.621333 128c-22.784 0-31.082667 2.24-39.424 6.4a44.970667 44.970667 0 0 0-19.370666 18.176c-4.437333 7.808-6.826667 15.552-6.826667 36.949333v644.970667c0 21.333333 2.389333 29.12 6.826667 36.949333 4.373333 7.744 11.136 14.058667 19.392 18.133334 8.32 4.181333 16.576 6.421333 39.424 6.421333h124.736c22.784 0 31.082667-2.24 39.424-6.4 8.362667-4.181333 14.912-10.325333 19.370666-18.176 4.437333-7.808 6.826667-15.552 6.826667-36.949333V189.525333c0-21.333333-2.389333-29.12-6.826667-36.949333a44.992 44.992 0 0 0-19.392-18.133333c-8.32-4.181333-16.576-6.4-39.424-6.4z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconshipinzanting.defaultProps = {
  size: 18
}

export default Iconshipinzanting
