import React from 'react'
import styles from './deadLine.module.scss'
import { Formik, Form, Field } from 'formik'

interface offer {
  offer: { mont: number; payment?: number }[]
  setPayment: React.Dispatch<React.SetStateAction<number>>
}

interface values {
  deadLine: string
}

const DeadLine: React.FC<offer> = ({ offer, setPayment }) => {
  const initialValues: values = {
    deadLine: ''
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => console.log(values)}
    >
      {() => (
        <Form>
          <div className={styles.wrapper}>
            <h1>Selecciona el plazo en meses</h1>

            <div className={styles.term}>
              {offer.map(el => {
                return (
                  <React.Fragment key={el.mont}>
                    <Field
                      type="radio"
                      name="deadLine"
                      id={`radio${el.mont}`}
                      disabled={!el.payment}
                      value={el.mont.toString()}
                    />
                    <label
                      className={!el.payment ? styles.disable : ''}
                      htmlFor={`radio${el.mont}`}
                      onClick={() =>
                        el.payment ? setPayment(el.payment as number) : null
                      }
                    >
                      {el.mont}
                    </label>
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default DeadLine
