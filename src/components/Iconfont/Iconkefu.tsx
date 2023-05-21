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

const Iconkefu: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1072 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M890.434783 672.322783c0 126.263652-87.30713 235.52-209.830957 262.633739l-28.404869-85.793392a178.220522 178.220522 0 0 0 125.373217-87.262608H667.826087c-49.196522 0-89.043478-40.158609-89.043478-89.666783v-179.244522c0-49.508174 39.846957-89.622261 89.043478-89.62226h130.80487C776.147478 224.077913 624.684522 89.666783 445.217391 89.666783s-330.930087 134.455652-353.413565 313.700174H222.608696c49.196522 0 89.043478 40.069565 89.043478 89.62226v179.244522a89.35513 89.35513 0 0 1-89.043478 89.622261H89.043478c-49.196522 0-89.043478-40.069565-89.043478-89.622261v-224.077913C0 200.614957 199.323826 0 445.217391 0s445.217391 200.659478 445.217392 448.155826v224.166957z m-89.043479-0.089044v-179.244522h-133.565217v179.244522h133.565217zM89.043478 492.989217v179.244522h133.565218v-179.244522H89.043478z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconkefu.defaultProps = {
  size: 18
}

export default Iconkefu
