/*
 * @Date: 2023-02-13 18:46:01
 * @LastEditors: lizhengfeng lizhengfeng@licaimofang.com
 * @LastEditTime: 2023-02-24 11:07:28
 * @FilePath: /growth-ui/src/routes/index.tsx
 * @Description:
 */
import { FC, lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const MyPlanDetal = lazy(() => import('@/pages/my-plan-detail'))
const DiagnosticReport = lazy(() => import('@/pages/fund-assistant/diagnostic-report'))
const MemberServiceProtocol = lazy(() => import('@/pages/fund-assistant/member-service-protocol'))
const SignalDetailsNackups = lazy(() => import('@/pages/fund-assistant/signal-details-backups'))
const SignalDetails = lazy(() => import('@/pages/fund-assistant/signal-details'))
const DouyinActiPk = lazy(() => import('@/pages/landing-page/douyin-acti-pk'))
const DouyinTiktokLaunch = lazy(() => import('@/pages/landing-page/douyin-tiktok-launch'))
const DouyinDiagnostic = lazy(() => import('@/pages/landing-page/douyin-diagnostic'))
const Dy = lazy(() => import('@/pages/landing-page/dy'))
const Douyin = lazy(() => import('@/pages/landing-page/douyin'))
/** 买卖信号 一元购 */
const DouyinOne = lazy(() => import('@/pages/landing-page/douyin/one'))
const DouyinLaunch = lazy(() => import('@/pages/landing-page/douyin-ak/one'))
const FixedPlanDetail = lazy(() => import('@/pages/fixed-plan-detail'))
const FundDetails = lazy(() => import('@/pages/fund-details'))
import { Loading, NotFound } from './Placeholder'
const TestPage =lazy(()=>import('@/pages/testpage/index'))
interface ILoadingProps {
  Comp: FC
  loading?: boolean
  title?: string
}

const LoadingWrap = ({ Comp, loading = false, title = '' }: ILoadingProps) => {
  document.title = title
  return (
    <Suspense fallback={loading && <Loading />}>
      <Comp />
    </Suspense>
  )
}

const router = createBrowserRouter([
  {path:'testPage',element:<LoadingWrap Comp={TestPage}/>},
  { path: '/my-plan-detail', element: <LoadingWrap Comp={MyPlanDetal} /> },
  { path: '/fund-assistant/diagnostic-report', element: <LoadingWrap Comp={DiagnosticReport} /> },
  {
    path: '/fund-assistant/member-service-protocol',
    element: <LoadingWrap Comp={MemberServiceProtocol} />
  },
  {
    path: '/fund-assistant/signal-details-backups',
    element: <LoadingWrap Comp={SignalDetailsNackups} />
  },
  {
    path: '/fund-assistant/signal-details',
    element: <LoadingWrap Comp={SignalDetails} title="买卖点信号详情" />
  },
  {
    path: '/fund-details/index',
    element: <LoadingWrap Comp={FundDetails} title="基金理财助手" />
  },
  { path: '/landing-page/douyin-one', element: <LoadingWrap Comp={DouyinOne} /> },
  { path: '/landing-page/douyin-launch', element: <LoadingWrap Comp={DouyinLaunch} /> },
  { path: '/landing-page/douyin', element: <LoadingWrap Comp={Douyin} /> },
  { path: '/landing-page/douyin-acti-pk', element: <LoadingWrap Comp={DouyinActiPk} /> },
  {
    path: '/landing-page/douyin-tiktok-launch',
    element: <LoadingWrap Comp={DouyinTiktokLaunch} />
  },
  { path: '/landing-page/douyin-diagnostic', element: <LoadingWrap Comp={DouyinDiagnostic} /> },
  { path: '/landing-page/dy', element: <LoadingWrap Comp={Dy} /> },
  { path: '/fixed-plan-detail', element: <LoadingWrap Comp={FixedPlanDetail} /> },
  {
    path: '*',
    element: (
      <div>
        <NotFound />
      </div>
    )
  }
])

export default function RouterApp() {
  return <RouterProvider router={router} />
}
