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

const Iconjianshe: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M541.226667 49.237333c-35.349333 4.416-35.349333 8.832-13.269334 13.248 70.677333 30.933333 136.917333 92.757333 247.338667 238.506667 123.669333 163.413333 114.837333 158.997333 185.514667 92.736 52.992-44.16 52.992-44.16-26.517334-136.917333C775.296 66.901333 704.64 27.157333 541.226667 49.237333z"
        fill={getIconColor(color, 0, '#163A8E')}
      />
      <path
        d="M413.141333 80.149333C37.717333 150.826667-103.616 605.738667 165.802667 875.157333c225.258667 225.237333 600.661333 163.413333 750.826666-123.669333 26.496-48.576 52.992-150.186667 44.16-154.581333-8.810667-8.832-198.741333-26.496-234.069333-26.496-13.248 0-26.496 8.832-70.677333 44.16-123.669333 92.757333-181.077333 136.917333-185.493334 136.917333-167.829333-203.178667-189.909333-229.674667-189.909333-234.090667 225.237333-181.077333 238.506667-189.909333 238.506667-189.909333 145.728 176.661333 189.909333 229.674667 189.909333 229.674667 8.832 0 128.085333-83.925333 145.749333-101.589334l8.832-8.832c-75.093333-101.589333-123.669333-163.413333-185.493333-238.506666-97.173333-123.669333-154.602667-150.165333-265.002667-128.085334z"
        fill={getIconColor(color, 1, '#163A8E')}
      />
    </svg>
  )
}

Iconjianshe.defaultProps = {
  size: 18
}

export default Iconjianshe
