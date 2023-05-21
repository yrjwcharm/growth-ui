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

const IconthumbUpLinebeifen: FunctionComponent<Props> = ({
  size,
  color,
  style: _style,
  ...rest
}) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M619.52 365.397333h264.817778c45.738667 0 82.773333 37.546667 82.773333 83.854223v88.177777c0 10.922667-2.104889 21.788444-6.257778 31.857778l-128 314.993778a41.358222 41.358222 0 0 1-38.286222 25.941333H98.247111A41.642667 41.642667 0 0 1 56.888889 868.295111V449.251556c0-23.153778 18.545778-41.927111 41.358222-41.927112H242.346667a41.244444 41.244444 0 0 0 33.792-17.749333L501.76 65.763556a20.48 20.48 0 0 1 26.168889-6.656l75.036444 38.001777a105.244444 105.244444 0 0 1 53.987556 119.580445l-37.376 148.707555zM305.208889 473.884444v352.540445h461.710222l117.475556-288.995556v-88.177777h-264.760889c-25.543111 0-49.664-11.946667-65.308445-32.426667A84.650667 84.650667 0 0 1 539.306667 344.746667l37.376-148.707556a21.048889 21.048889 0 0 0-10.808889-23.893333l-27.306667-13.824-194.901333 279.608889c-10.353778 14.791111-23.552 26.965333-38.570667 35.953777z m-82.773333 17.237334H139.662222v335.303111h82.716445V491.121778z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

IconthumbUpLinebeifen.defaultProps = {
  size: 18
}

export default IconthumbUpLinebeifen
