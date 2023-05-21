/*
 * @Date: 2023-02-13 14:09:58
 * @LastEditors: lizhengfeng lizhengfeng@licaimofang.com
 * @LastEditTime: 2023-02-13 19:42:12
 * @FilePath: /growth-ui/src/routes/Placeholder.tsx
 * @Description:
 */
import ActivityIndicator from '@/components/ActivityIndicator'
import View from '@/components/View'
import notfoundimg from '@/assets/images/404.png'
import forbiddenimg from '@/assets/images/403.png'

export const Loading = () => (
  <View style={{ justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      {/* <Text style={{ color: '#8F959E', fontSize: '20px' }}>加载中,请稍后...</Text> */}
    </View>
  </View>
)
export const NotFound = () => (
  <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
    <img src={notfoundimg} style={{ width: '50vw', height: '30vw' }} />
  </View>
)
export const Forbidden = () => (
  <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
    <img src={forbiddenimg} style={{ width: '50vw', height: '30vw' }} />
  </View>
)
