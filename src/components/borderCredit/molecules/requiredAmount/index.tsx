import React from 'react'
import { Plus, Minus } from 'feather-icons-react'
import styles from './requiredAmount.module.scss'
import { formatMoney } from '../../../../helpers/formatMoney'

interface Iprops {
  amount: number
  maxAmount: number
  minAmount: number
  setAmount: React.Dispatch<React.SetStateAction<number>>
}

const RequiredAmount: React.FC<Iprops> = ({
  amount,
  maxAmount = 0,
  minAmount,
  setAmount
}) => {
  const handlePlus: () => void = () => {
    setAmount(prev => prev + 500)
  }

  const handleMinus: () => void = () => {
    setAmount(prev => prev - 500)
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
