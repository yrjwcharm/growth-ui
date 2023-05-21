/*
 * @Date: 2023-01-03 14:28:39
 * @LastEditors: lizhengfeng lizhengfeng@licaimofang.com
 * @LastEditTime: 2023-01-31 18:29:19
 * @FilePath: /growth-ui/.eslintrc.js
 * @Description:
 */
module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
    __webpack_public_path__: true,
    wx: true
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/naming-convention': 'off',
    'no-param-reassign': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'no-nested-ternary': 'off',
    'no-underscore-dangle': 'off',
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off'
  }
}
