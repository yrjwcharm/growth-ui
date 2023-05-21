/*
 * @Date: 2023-02-10 17:57:35
 * @LastEditors: lizhengfeng lizhengfeng@licaimofang.com
 * @LastEditTime: 2023-02-13 11:02:27
 * @FilePath: /assistant-h5/src/umi/index.tsx
 * @Description: 兼容 迁移之前的umijs框架
 */
import qs from 'qs'

export const history = {
  location: {
    query: qs.parse(window.location.search.replace('?', ''))
  }
}
