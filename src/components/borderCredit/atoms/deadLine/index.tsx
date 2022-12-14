import React from 'react'
import { Field, useFormikContext } from 'formik'
import styles from './deadLine.module.scss'
import {
  calculatorValues,
  mont
} from '@components/borderCredit/organisms/calculator/Calculator'

interface offer {
  offer: mont[]
}

const DeadLine: React.FC<offer> = ({ offer }) => {
  const { setFieldValue, handleChange } = useFormikContext<calculatorValues>()

  return (
    <>
      <div className={styles.wrapper}>
        <h1>Selecciona el plazo en meses</h1>

        <div className={styles.term}>
          {offer.map(el => {
            return (
              <React.Fragment key={el.months}>
                <Field
                  type="radio"
                  name="months"
                  id={`radio${el.months}`}
                  disabled={!el.paymentAmount}
                  value={el.months.toString()}
                  onChange={(e: React.ChangeEvent) => {
                    setFieldValue('weeks', el.weeks)
                    setFieldValue('paymentAmount', el.paymentAmount)
                    handleChange(e)
                  }}
                />
                <label
                  className={!el.paymentAmount ? styles.disable : ''}
                  htmlFor={`radio${el.months}`}
                >
                  {el.months}
                </label>
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default DeadLine
