/**
 * 修饰收益颜色
 * @param profit
 */
export const decorationColor = (profit: string | number | undefined) => {
  if (typeof profit == 'string') {
    console.log(+profit?.replace(/%/g, ''))
    return +profit?.replace(/%/g, '') > 0
      ? '#E74949'
      : +profit?.replace(/%/g, '') < 0
      ? '#4BA471'
      : '#121D3A'
  } else if (typeof profit == 'number') {
    return profit > 0 ? '#E74949' : profit < 0 ? '#4BA471' : '#121D3A'
  }
}
