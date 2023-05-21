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

const Iconzhuanzai: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M502.208 320.426667V85.738667c0-5.76 2.282667-11.285333 6.314667-15.36a21.397333 21.397333 0 0 1 30.442666 0L951.893333 489.173333a32.768 32.768 0 0 1 0 46.058667L538.965333 953.642667c-4.053333 4.053333-9.514667 6.357333-15.232 6.357333-11.882667 0-21.525333-9.728-21.525333-21.717333V704.64h-42.944c-166.741333 0-293.034667 34.197333-369.685333 134.72-6.357333 8.32-13.226667 16.874667-23.36 30.144a11.584 11.584 0 0 1-7.509334 4.906667c-5.76 0.746667-10.282667-2.325333-11.733333-9.216a362.218667 362.218667 0 0 1-5.184-61.098667c0-262.848 206.144-483.648 460.416-483.648z m0 85.589333c-164.906667 0-317.717333 124.714667-355.84 270.826667 85.610667-52.266667 233.28-58.026667 354.752-58.026667h83.989333v149.226667l272-255.829334L585.109333 234.666667v170.709333l-82.88 0.618667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  )
}

Iconzhuanzai.defaultProps = {
  size: 18
}

export default Iconzhuanzai
