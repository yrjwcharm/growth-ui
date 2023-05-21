import { FC } from 'react'
import './style.less'

interface IProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  numberOfLines?: number
  ellipsizeMode?: 'tail' | 'clip' | 'head' | 'middle'
}

const Text: FC<IProps> = (props) => {
  let _props = { ...props }
  delete _props.numberOfLines
  delete _props.ellipsizeMode
  let _style = ''
  if (props.ellipsizeMode && (!props.numberOfLines || props.numberOfLines === 1)) {
    // 单行省略
    _style = `${props.ellipsizeMode}-1`
  }
  return (
    <span className={_style} {..._props}>
      {props.children}
    </span>
  )
}
export default Text
