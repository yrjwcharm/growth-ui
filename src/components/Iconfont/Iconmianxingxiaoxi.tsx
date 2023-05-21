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

const Iconmianxingxiaoxi: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M917.333333 64c23.573333 0 42.666667 19.498667 42.666667 43.562667V746.24c0 24.064-19.093333 43.562667-42.666667 43.562667h-192l-183.168 157.44a42.026667 42.026667 0 0 1-60.330666 0L298.666667 789.802667H85.333333c-23.573333 0-42.666667-19.498667-42.666666-43.562667V107.562667C42.666667 83.498667 61.76 64 85.333333 64h832zM341.333333 362.666667h-85.333333a21.333333 21.333333 0 0 0-21.333333 21.333333v85.333333a21.333333 21.333333 0 0 0 21.333333 21.333334h85.333333a21.333333 21.333333 0 0 0 21.333334-21.333334v-85.333333a21.333333 21.333333 0 0 0-21.333334-21.333333z m213.333334 0h-85.333334a21.333333 21.333333 0 0 0-21.333333 21.333333v85.333333a21.333333 21.333333 0 0 0 21.333333 21.333334h85.333334a21.333333 21.333333 0 0 0 21.333333-21.333334v-85.333333a21.333333 21.333333 0 0 0-21.333333-21.333333z m213.333333 0h-85.333333a21.333333 21.333333 0 0 0-21.333334 21.333333v85.333333a21.333333 21.333333 0 0 0 21.333334 21.333334h85.333333a21.333333 21.333333 0 0 0 21.333333-21.333334v-85.333333a21.333333 21.333333 0 0 0-21.333333-21.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconmianxingxiaoxi.defaultProps = {
  size: 18
}

export default Iconmianxingxiaoxi
