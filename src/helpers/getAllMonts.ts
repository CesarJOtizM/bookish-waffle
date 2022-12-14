import { mont } from '@components/borderCredit/organisms/calculator/Calculator'

export const getAllMonts = (currentMonts: mont[]) => {
  const emptyMonts: mont[] = [
    {
      months: 1
    },
    {
      months: 2
    },
    {
      months: 3
    },
    {
      months: 4
    },
    {
      months: 5
    },
    {
      months: 6
    },
    {
      months: 7
    },
    {
      months: 8
    },
    {
      months: 9
    },
    {
      months: 10
    },
    {
      months: 11
    },
    {
      months: 12
    }
  ]

  const allMonts: mont[] = []

  emptyMonts.forEach(el => {
    const findMont = currentMonts.find(elmet => elmet.months === el.months)
    if (findMont) allMonts.push({ ...findMont })
    else allMonts.push({ ...el })
  })
  return allMonts.splice(2, 12)
}
