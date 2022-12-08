import { useFormikContext } from 'formik'
import React, { useEffect, useState } from 'react'
import { formatMoney } from '../../../../helpers/formatMoney'
import DeadLine from '../../molecules/deadLine'
import Footer from '../../molecules/footer/Footer'
import RequiredAmount from '../../molecules/requiredAmount'
import styles from './calculator.module.scss'

interface IProps {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

const Calculator: React.FC<IProps> = ({ setStep }) => {
  const [amount, setAmount] = useState(1000)
  const [payment, setPayment] = useState(6)
  const [monts, setMonts] = useState<{ mont: number; payment?: number }[]>([])
  const { submitForm } = useFormikContext()
  useEffect(() => {
    setMonts([
      {
        mont: 3
      },
      {
        mont: 4
      },
      {
        mont: 5
      },
      {
        mont: 6,
        payment: amount / 6
      },
      {
        mont: 7,
        payment: amount / 7
      },
      {
        mont: 8,
        payment: amount / 8
      },
      {
        mont: 9,
        payment: amount / 9
      },
      {
        mont: 10,
        payment: amount / 10
      },
      {
        mont: 11,
        payment: amount / 11
      },
      {
        mont: 12,
        payment: amount / 12
      }
    ])
  }, [amount])

  const maxAmount = 2000
  const minAmount = 500

  return (
    <>
      <div className={styles.wrapper}>
        <section className={styles.dataSection}>
          <h1>Tus datos</h1>
          <div className={styles.data}>
            <div className={styles.item}>
              <p>Nombre:</p>
              <p>Cesar Ortiz</p>
            </div>
            <div className={styles.item}>
              <p>Compañía:</p>
              <p>Company INC.</p>
            </div>
            <div className={styles.item}>
              <p>Antigüedad:</p>
              <p>10 Años</p>
            </div>
          </div>
        </section>

        <section className={styles.calculator}>
          <RequiredAmount
            amount={amount}
            maxAmount={maxAmount}
            minAmount={minAmount}
            setAmount={setAmount}
          />
          <DeadLine offer={monts} setPayment={setPayment} />

          <div className={styles.payment}>
            <h1>Aportación semanal</h1>
            <div className={styles.paymentAmount}>
              {payment === 0 ? (
                <h2> ----- </h2>
              ) : (
                <h2>{formatMoney(payment)} </h2>
              )}
              <span> / </span>
              <div className={styles.period}>Semana</div>
            </div>
          </div>
        </section>
      </div>
      <Footer
        text="Aceptar pre-oferta"
        action={submitForm}
        prev
        setStep={setStep}
      />
    </>
  )
}
export default Calculator
