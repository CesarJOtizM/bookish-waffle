import React, { useEffect, useState } from 'react'
import { Formik, useFormikContext } from 'formik'
import { formatMoney } from '@helpers/formatMoney'
import DeadLine from '@components/borderCredit/atoms/deadLine'
import Footer from '@components/borderCredit/molecules/footer/Footer'
import RequiredAmount from '@components/borderCredit/atoms/requiredAmount'
import styles from './calculator.module.scss'
import { requestData } from '@helpers/requestData'
import { formValues } from '@components/borderCredit'
import { getAllMonts } from '@helpers/getAllMonts'
import Loader from '@components/borderCredit/atoms/loader/Loader'

interface IProps {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export interface loanAmount {
  loanAmount: number
  installmentGroups: {
    months: number
    weeks: number
    paymentAmount: number
  }[]
}
export interface mont {
  months: number
  weeks?: number
  paymentAmount?: number
}

export interface calculatorValues {
  months: string
  weeks: number
  paymentAmount: number
}

const Calculator: React.FC<IProps> = ({ setStep }) => {
  const [loader, setLoader] = useState(true)
  const [amount, setAmount] = useState(0)
  const [allAmounts, setAllAmounts] = useState<loanAmount[]>([])
  const [minAmount, setMinAmount] = useState(0)
  const [maxAmount, setMaxAmount] = useState(0)
  const [monts, setMonts] = useState<mont[]>([])

  const {
    values: fValues,
    // submitForm,
    setFieldValue
  } = useFormikContext<formValues>()

  useEffect(() => {
    ;(async () => {
      const { data, error, loaded } = await requestData(
        `${process.env.NEXT_PUBLIC_BORDER_URL}/calculate/offer`,
        'POST',
        {
          data: {
            salary: fValues.salary,
            years: fValues.age
          }
        },
        {
          'x-api-key': 'b33c881f-886d-44d0-aa98-98c7cd5584d9',
          'message-id': Date.now()
        }
      )
      if (!error && loaded) {
        setAllAmounts(data)
        setAmount(data[0].loanAmount)
        setMaxAmount(data[0].loanAmount)
        setMinAmount(data[data.length - 1].loanAmount)
        setMonts(getAllMonts(data[0].installmentGroups))
      } else {
        console.log(error)
      }
    })()
  }, [fValues.age, fValues.salary])

  const handleSubmit = async (values: calculatorValues) => {
    setFieldValue('requestNumber', 'BC1234568780')
    setStep(prev => prev + 1)
  }

  const initialValues: calculatorValues = {
    paymentAmount: 0,
    weeks: 0,
    months: '0'
  }

  return (
    <>
      {loader ? (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, handleSubmit }) => (
            <>
              <div className={styles.wrapper}>
                <section className={styles.dataSection}>
                  <h1>Tus datos</h1>
                  <div className={styles.data}>
                    <div className={styles.item}>
                      <p>Nombre:</p>
                      <p>{fValues.fullName}</p>
                    </div>
                    <div className={styles.item}>
                      <p>Compañía:</p>
                      <p>{fValues.company}</p>
                    </div>
                    <div className={styles.item}>
                      <p>Antigüedad:</p>
                      <p>{Math.round(fValues.age)}</p>
                    </div>
                  </div>
                </section>

                <section className={styles.calculator}>
                  <RequiredAmount
                    setMonts={setMonts}
                    allAmounts={allAmounts}
                    amount={amount}
                    maxAmount={maxAmount}
                    minAmount={minAmount}
                    setAmount={setAmount}
                  />
                  <DeadLine offer={monts} />

                  <div className={styles.payment}>
                    <h1>Aportación semanal</h1>
                    <div className={styles.paymentAmount}>
                      {values.paymentAmount === 0 ? (
                        <h2> ----- </h2>
                      ) : (
                        <h2>{formatMoney(values.paymentAmount)} </h2>
                      )}
                      <span> / </span>
                      <div className={styles.period}>Semana</div>
                    </div>
                  </div>
                </section>
              </div>
              <Footer
                text="Aceptar pre-oferta"
                action={handleSubmit}
                prev
                setStep={setStep}
              />
            </>
          )}
        </Formik>
      ) : (
        <Loader />
      )}
    </>
  )
}
export default Calculator
