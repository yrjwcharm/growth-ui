type TInfo = {
  is_monetary?: boolean
  funding_date: string
  name: string
  code: string
  view: {
    rise: string
    fall: string
    expect_rise_fall: number
    bullet_screen_open: number
  }
  nav_info: {
    daily_return: string
    date: string
    inc: number
    inc_ratio: number
    nav: number
    week_apr: number
  }
  year_yield: {
    title: string
    value: string
  }
}
type TYieldInfo = {
  day_inc: string
  day_profit: number

  fund_code: string

  hold_amount: string
  hold_day: string

  hold_inc: string

  hold_profit: number

  hold_ratio: string

  import_nav: number

  nav_date: string
}
