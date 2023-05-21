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

const Iconsanjiaozuo: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M226.56 486.122667l483.776-392.746667c13.184-10.730667 34.56-10.730667 47.786667 0 6.336 5.12 9.877333 12.117333 9.877333 19.370667v798.506666c0 15.146667-15.146667 27.413333-33.792 27.413334-8.96 0-17.536-2.901333-23.872-8.042667l-483.797333-392.746667c-17.6-14.293333-17.6-37.461333 0-51.733333v-0.021333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconsanjiaozuo.defaultProps = {
  size: 18
}

export default Iconsanjiaozuo
