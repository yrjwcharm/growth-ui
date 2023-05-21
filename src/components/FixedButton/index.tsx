import './index.less'
const FixedButton = ({
  title,
  onClick,
  disabled = false
}: {
  title: string
  onClick: any
  disabled?: boolean
}) => {
  return (
    <div className="fixed-button" onClick={!disabled && onClick}>
      <div className="tool-btn" style={{ background: !disabled ? '#0051cc' : '#999' }}>
        <span>{title}</span>
      </div>
    </div>
  )
}
export default FixedButton
