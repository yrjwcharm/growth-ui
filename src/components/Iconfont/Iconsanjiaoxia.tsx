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

const Iconsanjiaoxia: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M486.122667 797.44L93.376 313.664c-10.730667-13.184-10.730667-34.56 0-47.786667 5.12-6.336 12.117333-9.877333 19.370667-9.877333h798.506666c15.146667 0 27.413333 15.146667 27.413334 33.792 0 8.96-2.901333 17.536-8.042667 23.872l-392.746667 483.797333c-14.293333 17.6-37.461333 17.6-51.733333 0h-0.021333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconsanjiaoxia.defaultProps = {
  size: 18
}

export default Iconsanjiaoxia
