/*
 * @Date: 2023-02-13 18:46:01
 * @LastEditors: lizhengfeng lizhengfeng@licaimofang.com
 * @LastEditTime: 2023-02-17 18:57:45
 * @FilePath: /growth-ui/src/components/Toast/index.tsx
 * @Description:
 */
import { Toast, ToastShowProps } from 'antd-mobile'
import ActivityIndicator from '@/components/ActivityIndicator'
import IconFont from '../Iconfont'

export default {
  hide: Toast.clear,
  show: (opt?: ToastShowProps) => {
    if (opt) {
      Toast.show(opt)
      return
    }
    Toast.show({
      content: <ActivityIndicator />
    })
  },
  failed: (msg: string, duration?: number) => {
    Toast.show({
      icon: <IconFont style={{ marginRight: 8 }} size={20} name="no" color="#fff" />,
      content: msg,
      duration: duration,
      position: 'bottom'
    })
  },
  info: (msg: string, duration?: number) => {
    Toast.show({
      content: msg,
      duration: duration,
      position: 'bottom'
    })
  }
}
