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

const Iconsanjiaoyou: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M797.44 537.877333l-483.776 392.746667c-13.184 10.730667-34.56 10.730667-47.786667 0-6.336-5.12-9.877333-12.117333-9.877333-19.370667V112.746667C256 97.6 271.146667 85.333333 289.792 85.333333c8.96 0 17.536 2.901333 23.872 8.042667l483.797333 392.746667c17.6 14.293333 17.6 37.461333 0 51.733333v0.021333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconsanjiaoyou.defaultProps = {
  size: 18
}

export default Iconsanjiaoyou
