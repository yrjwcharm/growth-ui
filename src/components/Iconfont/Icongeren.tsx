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

const Icongeren: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M384 554.666667h256c117.824 0 256 82.282667 256 230.4v115.2c0 21.205333-19.093333 38.4-42.666667 38.4H170.666667c-23.573333 0-42.666667-17.194667-42.666667-38.4v-115.2C128 637.077333 266.176 554.666667 384 554.666667z m426.666667 298.666666v-71.104C810.666667 692.565333 719.829333 640 640 640H384c-78.08 0-170.666667 49.984-170.666667 142.229333V853.333333h597.333334zM512 512c-117.824 0-213.333333-95.509333-213.333333-213.333333S394.176 85.333333 512 85.333333s213.333333 95.509333 213.333333 213.333334-95.509333 213.333333-213.333333 213.333333z m0-85.333333a128 128 0 1 0 0-256 128 128 0 0 0 0 256z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Icongeren.defaultProps = {
  size: 18
}

export default Icongeren
