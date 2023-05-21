import styles from './index.module.less'
import { SpinLoading } from 'antd-mobile'
const Index = () => {
  return (
    <div className={styles.spinWrap}>
      <SpinLoading color="#0051cc" style={{ '--size': '22px' }} />
    </div>
  )
}
export default Index
