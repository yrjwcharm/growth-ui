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

const Iconhuaxia: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M982.997333 238.741333l-35.882666-45.952s-140.736 22.976-137.877334-56.021333c0 0 10.026667-58.88-91.904-35.925333 0 0-24.448-22.976-22.976-35.84 0 0 7.168-34.496-103.402666-15.829334 0 0-163.712 20.096-343.253334 225.450667 0 0-180.949333 147.904-180.949333-4.309333 0 0-99.093333 100.522667-45.952 180.970666 0 0 60.330667 84.693333 175.232 15.744 0 0-35.904 278.613333 147.904 423.68 0 0 192.405333 178.069333 413.632 114.88 0 0 185.237333-38.762667 255.594667-225.450666 0 0-33.002667 33.045333-47.381334 30.165333 0 0 50.261333-60.330667 53.12-86.186667 0 0-1.408-35.925333-30.144 20.117334 0 0 7.210667-34.453333-12.949333-17.237334 0 0-97.685333 113.450667-139.264 119.210667 0 0-308.778667 182.4-449.578667-185.28 0 0-60.245333-173.738667 81.877334-304.426667 142.186667-130.730667 281.514667-117.76 409.28-22.976 0 0 64.661333-73.258667 91.968-58.88 0 0 24.384-14.378667 12.906666-35.904z"
        fill={getIconColor(color, 0, '#E50012')}
      />
      <path
        d="M552.170667 459.882667l305.92-1.429334v232.661334h-305.92V459.882667z"
        fill={getIconColor(color, 1, '#DBDCDC')}
      />
    </svg>
  )
}

Iconhuaxia.defaultProps = {
  size: 18
}

export default Iconhuaxia
