import numeral from 'numeral'

export const formatNumber = (amount: string | number) => {
  return numeral(amount).format('0,0')
}

export const formatNumberWithDecimal = (amount: string | number) => {
  return numeral(amount).format('0,0.00')
}

export const formatMoney = (amount: string | number) => {
  return numeral(amount).format('$0,0')
}

export const formatDecimal = (amount: string | number) => {
  return numeral(amount).format('0.0[00]')
}
