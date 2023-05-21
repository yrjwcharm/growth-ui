import { FC } from 'react'

import styles from './index.module.less'

interface IProps {
  title?: string
  subTitle?: string
  rightTitle?: string
  rightTitleBold?: string
}

const SubCardTitle: FC<IProps> = ({ title, subTitle, rightTitle, rightTitleBold }) => {
  return (
    <div className={styles['sub-card-title']}>
      <div className={styles['title-left']}>
        {title ? <div className={styles['title']}>{title}</div> : null}
        {subTitle ? <div className={styles['sub-title']}>{subTitle}</div> : null}
      </div>
      {rightTitle ? <div className={styles['right-title']}>{rightTitle}</div> : null}
      {rightTitleBold ? <div className={styles['right-title-bold']}>{rightTitleBold}</div> : null}
    </div>
  )
}

export default SubCardTitle
