import { Field } from 'formik'
import React from 'react'
import styles from './checkbox.module.scss'

interface IProps {
  name: string
  label: React.ReactNode
}

const Checkbox: React.FC<IProps> = ({ name, label }) => {
  return (
    <div className={styles.container}>
      <Field type="checkbox" name={name} id={name} />
      <label htmlFor={name}>{label}</label>
    </div>
  )
}

export default Checkbox
