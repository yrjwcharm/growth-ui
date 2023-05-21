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

const IconthumbUpFillbeifen: FunctionComponent<Props> = ({
  size,
  color,
  style: _style,
  ...rest
}) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M100.864 394.069333H232.675556V910.222222H100.864A43.52 43.52 0 0 1 56.888889 867.214222v-430.08c0-23.779556 19.683556-43.064889 43.975111-43.064889z m232.675556-55.580444l281.315555-275.285333a22.357333 22.357333 0 0 1 28.785778-1.991112l37.489778 27.477334c21.276444 15.644444 30.890667 42.325333 24.291555 67.527111l-50.631111 194.844444h281.315556c48.526222 0 87.893333 38.513778 87.893333 86.016v90.510223c0 11.264-2.275556 22.414222-6.599111 32.768l-136.078222 323.242666a43.975111 43.975111 0 0 1-40.618667 26.624H364.600889a43.52 43.52 0 0 1-43.975111-43.008v-498.346666c0-11.377778 4.664889-22.300444 12.913778-30.378667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

IconthumbUpFillbeifen.defaultProps = {
  size: 18
}

export default IconthumbUpFillbeifen
