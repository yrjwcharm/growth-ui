import { defineConfig } from 'umi'
const REACT_APP_ENV: string | undefined = process.env.REACT_APP_ENV

const BASE_PATH = '/'

// 移动端适配
const script1 = `(function (doc, win) { // iife函数
  var docEl = doc.documentElement; // 获取文档对象
  resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'; // 获取浏览器重置宽度事件
  recalc = function () { // 设置根字体size
      var clientWidth = docEl.clientWidth; // 获取设备宽度
      if (!clientWidth) return; // 若未定义设备宽度则停止执行函数
      docEl.style.fontSize = 50 * (clientWidth / 375) + 'px'; // 设置根字体size为50px
  };
  if (!doc.addEventListener) return; // 若没有监听对象则停止执行函数
  win.addEventListener(resizeEvt, recalc, false); // 监听重置浏览器大小时
  doc.addEventListener('DOMContentLoaded', recalc, false); // 监听文档内容加载完毕事件
}(document,window))`
const script2 = 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js'
// 解决点击事件的300ms延迟(在检测到touchend事件的时候，会通过DOM自定义事件立即出发模拟一个click事件，并把浏览器在300ms之后真正的click事件阻止掉)
// const script2 = `if ('addEventListener' in document) {
//   document.addEventListener('DOMContentLoaded', function() {
//     FastClick.attach(document.body);
//   }, false);
// }`

export default defineConfig({
  chainWebpack(config: {
    merge: (arg0: {
      optimization: {
        // minimize: true,
        splitChunks: {
          chunks: string // initial、async和all
          minSize: number // 形成一个新代码块最小的体积
          minChunks: number // 引入两次及以上被打包
          automaticNameDelimiter: string
          cacheGroups: {
            vendor: {
              // 打包两个页面的公共代码
              name: string // 分离包的名字
              test: RegExp
              chunks: string
              priority: number // 打包优先级
            }
            echarts: { name: string; test: RegExp; chunks: string; priority: number }
            commons: {
              // 其余同步加载包
              name: string
              chunks: string
              minChunks: number
              priority: number
            }
          }
        }
      }
    }) => void
    plugin: (arg0: string) => {
      (): any
      new (): any
      use: {
        (arg0: any): { (): any; new (): any; tap: { (arg0: () => RegExp[]): void; new (): any } }
        new (): any
      }
    }
  }) {
    // config.optimization.minimize(true)
    // config.plugin('TerserPlugin').use(
    //   new TerserPlugin({
    //     terserOptions: {
    //       // 移除 console
    //       // 其它优化选项 https://segmentfault.com/a/1190000010874406
    //       compress: {
    //         warnings: false,
    //         drop_console: true,
    //         drop_debugger: true,
    //         pure_funcs: ['console.log']
    //       }
    //     }
    //   }),
    //   []
    // )
    config.merge({
      optimization: {
        // minimize: true,
        splitChunks: {
          chunks: 'async', // initial、async和all
          minSize: 30000, // 形成一个新代码块最小的体积
          minChunks: 2, // 引入两次及以上被打包
          automaticNameDelimiter: '.',
          cacheGroups: {
            vendor: {
              // 打包两个页面的公共代码
              name: 'vendors', // 分离包的名字
              test: /^.*node_modules[\\/](?!lodash|antd|moment).*$/,
              chunks: 'all',
              priority: 100 // 打包优先级
            },
            echarts: {
              name: 'echarts',
              test: /[\\/]node_modules[\\/]echarts[\\/]/,
              chunks: 'async',
              priority: 100
            },
            commons: {
              // 其余同步加载包
              name: 'commons',
              chunks: 'all',
              minChunks: 2,
              priority: 80
            }
          }
        }
      }
    })
    //过滤掉momnet的那些不使用的国际化文件
    config
      .plugin('replace')
      .use(require('webpack').ContextReplacementPlugin)
      .tap(() => {
        return [/moment[/\\]locale$/, /zh-cn/]
      })
  },
  nodeModulesTransform: {
    type: 'none'
  },
  links: [
    {
      rel: 'apple-touch-icon',
      href: `${BASE_PATH}static/logo.png`
    }
  ],
  copy: [
    {
      from: '/src/assets/images/logo.png',
      to: `/static/logo.png`
    }
  ],
  // devtool: 'source-map',
  // chunks: REACT_APP_ENV !== 'development' ? ['vendors', 'umi'] : ['umi'],
  // chainWebpack: function (config, { webpack }) {
  //   if (REACT_APP_ENV !== 'development') {
  //     config.merge({
  //       optimization: {
  //         minimize: true,
  //         splitChunks: {
  //           chunks: 'all',
  //           minSize: 30000,
  //           minChunks: 1,
  //           automaticNameDelimiter: '.',
  //           cacheGroups: {
  //             vendor: {
  //               name: 'vendors',
  //               test({ resource }: any) {
  //                 return /[\\/]node_modules[\\/]/.test(resource)
  //               },
  //               priority: 10
  //             }
  //           }
  //         }
  //       }
  //     })
  //   }
  // },
  dva: {
    hmr: true
  },
  hash: true,
  publicPath: BASE_PATH,
  base: BASE_PATH,
  fastRefresh: {},
  metas: [
    {
      name: 'referrer',
      content: 'no-referrer'
    }
  ],
  // outputPath: outputPath,
  define: {
    // 添加这个自定义的环境变量
    'process.env.REACT_APP_ENV': REACT_APP_ENV // * 本地开发环境：dev，测试服：test，正式服：pro
  },
  proxy: {
    '/assistant': {
      target: 'http://192.168.66.142:8010/',
      // target: 'http://assistant-api.yitao.mofanglicai.com.cn/',
      changeOrigin: true
      // pathRewrite: { '^': '' }
    }
  },
  scripts: [script1, script2]
})
