import React from 'react'
import Image from 'next/image'
import styles from './poweredBy.module.scss'

const PoweredBy: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.text}>POWERED BY</div>
      <div>
        <Image
          src="https://mox-s3-console-assets.s3.us-east-1.amazonaws.com/logo_color.svg"
          alt="log"
          width={60}
          height={30}
        />
      </div>
    </div>
  )
}

export default PoweredBy
