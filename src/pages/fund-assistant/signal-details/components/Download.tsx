/*
 * @Date: 2023-02-08 18:51:20
 * @LastEditors: lizhengfeng lizhengfeng@licaimofang.com
 * @LastEditTime: 2023-02-08 18:54:06
 * @FilePath: /growth-ui/src/pages/fund-assistant/signal-details/components/Download.tsx
 * @Description: 下载app
 */

import { useState } from 'react'
import DownLoadModal from '@/pages/fund-assistant/diagnostic-report/components/DownLoadModal'
import Modal from '@/components/Modal'
import { history } from 'umi'
import '../index.less'
export default function Download() {
  const query = history.location.query
  const [showGuide, setShowGuide] = useState(false)
  const [downLoadModal] = useState({
    button: require('@/assets/images/img_btn.png'), // 点击按钮
    jump_url: 'https://a.app.qq.com/o/simple.jsp?pkgname=com.licaimofang.app', // 复制的下载链接
    pop_up: require('@/assets/images/guide.png') // 弹窗背景图
  })

  return (
    <Modal visible={showGuide}>
      <DownLoadModal
        data={downLoadModal}
        closeModal={() => {
          setShowGuide(false)
        }}
        query={query}
      />
    </Modal>
  )
}
