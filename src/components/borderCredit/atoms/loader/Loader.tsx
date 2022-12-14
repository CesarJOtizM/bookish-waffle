import React from 'react'
import styles from './loader.module.scss'

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader} />
      <div>
        <p>Estamos consultando tu información, apreciamos tu paciencia.</p>
      </div>
    </div>
  )
}

export default Loader
