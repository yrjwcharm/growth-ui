/*
 * @Date: 2023-01-03 11:15:35
 * @LastEditors: lizhengfeng lizhengfeng@licaimofang.com
 * @LastEditTime: 2023-03-02 15:53:15
 * @FilePath: /growth-ui/src/pages/fund-assistant/signal-details/components/ActiveBall/services.ts
 * @Description:
 */
import request from '@/services/request'

/** 获取需要展示活动的页面  */
export function callGetAllPageActivity() {
  return request('/assistant/activity/page/show?user_type=2', {
    method: 'GET'
  })
  // return JSON.parse(`
  //   {
  // "/pages/web-signal-details/index": {
  //   "buyCountDown": {
  //     "show_txt": "7天",
  //     "url": "/packageMenuActivity/pages/setmenu-activity/index"
  //   }
  // }
  //   }
  // `)
}
