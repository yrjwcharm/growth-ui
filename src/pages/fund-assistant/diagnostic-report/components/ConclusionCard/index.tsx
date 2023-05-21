/*
 * @Date: 2023-01-03 14:28:40
 * @LastEditors: lizhengfeng lizhengfeng@licaimofang.com
 * @LastEditTime: 2023-02-21 15:18:58
 * @FilePath: /growth-ui/src/pages/fund-assistant/diagnostic-report/components/ConclusionCard/index.tsx
 * @Description:
 */
import { FC } from 'react'

import styles from './index.module.less'

interface IProps {
  data: string
}

const ConclusionCard: FC<IProps> = ({ data }) => {
  return (
    <div className={styles['card-conclusion-container']}>
      <div className={styles['card-triangle']} />
      <div className={styles['card-conclusion']}>
        <div
          dangerouslySetInnerHTML={{
            __html: data
          }}
        />
      </div>
    </div>
  )
}

export default ConclusionCard
