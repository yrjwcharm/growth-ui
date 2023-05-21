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

const IconmessageFillbeifen: FunctionComponent<Props> = ({
  size,
  color,
  style: _style,
  ...rest
}) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M720.156444 813.966222L910.222222 967.111111V157.582222a43.235556 43.235556 0 0 0-42.666666-43.804444H99.555556a43.235556 43.235556 0 0 0-42.666667 43.804444v612.579556c0 24.177778 19.114667 43.804444 42.666667 43.804444h620.600888zM654.222222 420.124444v87.495112h-341.333333V420.124444h341.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

IconmessageFillbeifen.defaultProps = {
  size: 18
}

export default IconmessageFillbeifen
