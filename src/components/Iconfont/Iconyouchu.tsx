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

const Iconyouchu: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M109.738667 541.184l-4.736 27.050667h142.890666l6.378667-27.050667H109.738667zM473.173333 568.106667l4.736-27.050667h-161.92l-6.4 27.050667h163.584z m90.410667-136.512l-22.208 109.568-6.272 27.050666-22.229333 109.44H287.488l-4.736 25.429334h263.338667l34.986666-161.92 22.229334-109.568h315.797333l-23.744 109.568H642.986667l-57.194667 271.36H258.88l-4.714667 25.408H620.8l34.858667-160.256 22.229333-109.44h212.629333l-22.229333 109.44h-150.826667l-33.301333 160.256-23.765333 109.568H168.362667l57.088-269.824H19.2l23.765333-109.44 4.714667-27.093334 23.765333-109.546666h204.714667l57.088-269.824h225.386667l28.586666-136.512H1004.8l-23.765333 109.44H625.514667L620.8 161.706667l-22.229333 109.546666h-225.493334l-6.4 25.408H631.68l4.736-25.386666 23.872-109.568h315.904l-23.744 109.546666H699.989333l-28.586666 134.976h-326.826667l-6.378667 25.408h225.386667z"
        fill={getIconColor(color, 0, '#006F46')}
      />
    </svg>
  )
}

Iconyouchu.defaultProps = {
  size: 18
}

export default Iconyouchu
