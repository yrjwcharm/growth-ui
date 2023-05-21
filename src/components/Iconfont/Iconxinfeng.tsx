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

const Iconxinfeng: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M106.666667 128h810.666666a42.666667 42.666667 0 0 1 42.666667 42.666667v682.666666a42.666667 42.666667 0 0 1-42.666667 42.666667H106.666667a42.666667 42.666667 0 0 1-42.666667-42.666667V170.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z m42.666666 85.333333v597.333334h725.333334V213.333333H149.333333z m361.365334 290.624l257.92-181.248a10.666667 10.666667 0 0 1 16.789333 8.725334v63.061333a21.333333 21.333333 0 0 1-8.981333 17.386667l-250.154667 177.472a21.333333 21.333333 0 0 1-13.397333 3.904 21.248 21.248 0 0 1-15.509334-3.626667L247.274667 413.653333a21.333333 21.333333 0 0 1-9.045334-17.450666V331.52a10.666667 10.666667 0 0 1 16.832-8.704l255.637334 181.12z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconxinfeng.defaultProps = {
  size: 18
}

export default Iconxinfeng
