import { FC } from 'react'

interface IProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const View: FC<IProps> = (props) => {
  return (
    <div {...props} style={{ display: 'flex', flexDirection: 'column', ...props.style }}>
      {props.children}
    </div>
  )
}
export default View
