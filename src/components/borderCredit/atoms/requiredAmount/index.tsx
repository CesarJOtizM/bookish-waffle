import React from 'react'
import { Plus, Minus } from 'feather-icons-react'
import { formatMoney } from '@helpers/formatMoney'
import type {
  calculatorValues,
  loanAmount,
  mont
} from '@components/borderCredit/organisms/calculator/Calculator'
import styles from './requiredAmount.module.scss'
import { getAllMonts } from '@helpers/getAllMonts'
import { useFormikContext } from 'formik'

interface Iprops {
  amount: number
  maxAmount: number
  minAmount: number
  allAmounts: loanAmount[]
  setAmount: React.Dispatch<React.SetStateAction<number>>
  setMonts: React.Dispatch<React.SetStateAction<mont[]>>
}

const RequiredAmount: React.FC<Iprops> = ({
  amount,
  maxAmount = 0,
  minAmount,
  allAmounts,
  setAmount,
  setMonts
}) => {
  const { setFieldValue, values } = useFormikContext<calculatorValues>()

  const handlePlus: () => void = () => {
    const newMonts = allAmounts.find(el => el.loanAmount === amount + 100)
    const newPayment = newMonts?.installmentGroups.find(
      el => el.months === parseInt(values.months)
    )
    if (newPayment) setFieldValue('paymentAmount', newPayment?.paymentAmount)
    else {
      setFieldValue('months', (parseInt(values.months) + 1).toString())
    }
    setMonts(getAllMonts(newMonts?.installmentGroups as mont[]))
    setAmount(prev => prev + 100)
  }

  const handleMinus: () => void = () => {
    const newMonts = allAmounts.find(el => el.loanAmount === amount - 100)
    const newPayment = newMonts?.installmentGroups.find(
      el => el.months === parseInt(values.months)
    )
    setFieldValue('paymentAmount', newPayment?.paymentAmount)
    setMonts(getAllMonts(newMonts?.installmentGroups as mont[]))
    setAmount(prev => prev - 100)
  }

  return (
    <div className={styles.wrapper}>
      <h1>Monto a solicitar</h1>
      <div className={styles.amount}>
        <button onClick={handleMinus} disabled={minAmount === amount}>
          <Minus size="10px" />
        </button>
        <h2>{formatMoney(amount)}</h2>
        <button onClick={handlePlus} disabled={amount === maxAmount}>
          <Plus size="10px" />
        </button>
      </div>
    </div>
  )
}

export default RequiredAmount
