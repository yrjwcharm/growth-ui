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

const Iconfaxian: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512.085333 250.453333c287.509333-183.936 447.210667-28.330667 261.546667 261.76 185.493333 289.813333 26.069333 445.717333-261.546667 261.696-286.933333 183.573333-447.68 29.056-261.546666-261.717333-184.234667-287.808-28.885333-447.530667 261.546666-261.717333z m218.666667 322.133334a885.290667 885.290667 0 0 1-158.144 157.973333c48.704 28.117333 162.986667 79.104 200.021333 42.090667 25.28-25.28 13.653333-104.32-41.856-200.042667z m-437.376 0c-55.509333 95.744-67.136 174.784-41.856 200.064 36.693333 36.650667 149.973333-13.141333 200.021333-42.090667a885.333333 885.333333 0 0 1-158.165333-157.952z m218.709333-239.445334a835.776 835.776 0 0 0-179.093333 179.050667 835.797333 835.797333 0 0 0 179.093333 179.029333 836.416 836.416 0 0 0 179.050667-179.029333 835.626667 835.626667 0 0 0-179.050667-179.050667z m36.266667 142.826667a51.114667 51.114667 0 1 1-72.32 72.234667 51.114667 51.114667 0 0 1 72.32-72.234667z m24.256-182.144a884.202667 884.202667 0 0 1 158.165333 157.952c123.242667-212.544 30.037333-266.730667-158.165333-157.952zM251.52 251.733333c-25.28 25.258667-13.653333 104.32 41.856 200.042667a884.181333 884.181333 0 0 1 158.165333-157.952c-48.64-28.138667-162.965333-79.146667-200.021333-42.090667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconfaxian.defaultProps = {
  size: 18
}

export default Iconfaxian